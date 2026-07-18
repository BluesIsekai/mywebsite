import { NextResponse } from "next/server";

//export const revalidate = 3600; // Cache the response for 1 hour

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

const PINNED_REPOS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            homepageUrl
            stargazerCount
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
`;

interface GitHubRepoNode {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

interface GitHubGraphQLResponse {
  data?: {
    user?: {
      pinnedItems?: {
        nodes?: (GitHubRepoNode | null)[];
      };
    };
  };
  errors?: { message: string }[];
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    return NextResponse.json(
      { error: "GitHub environment variables GITHUB_TOKEN or GITHUB_USERNAME are not configured." },
      { status: 500 }
    );
  }

  try {
    // const response = await fetch(GITHUB_GRAPHQL_API, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //     "User-Agent": "portfolio-app",
    //   },
    //   body: JSON.stringify({
    //     query: PINNED_REPOS_QUERY,
    //     variables: { username },
    //   }),
    //   next: { revalidate: 3600 },
    // });

    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "User-Agent": "portfolio-app",
      },
      body: JSON.stringify({
        query: PINNED_REPOS_QUERY,
        variables: { username },
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `GitHub API error: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    const json = (await response.json()) as GitHubGraphQLResponse;

    if (json.errors && json.errors.length > 0) {
      return NextResponse.json(
        { error: `GitHub GraphQL error: ${json.errors[0].message}` },
        { status: 400 }
      );
    }

    const nodes = json.data?.user?.pinnedItems?.nodes || [];
    const repositories = nodes
      .filter((node): node is GitHubRepoNode => node !== null)
      .map((node) => ({
        id: node.id,
        name: node.name,
        description: node.description,
        url: node.url,
        homepageUrl: node.homepageUrl,
        stargazerCount: node.stargazerCount,
        primaryLanguage: node.primaryLanguage
          ? {
            name: node.primaryLanguage.name,
            color: node.primaryLanguage.color,
          }
          : null,
      }));

    return NextResponse.json(repositories);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error occurred while fetching pinned repositories." },
      { status: 500 }
    );
  }
}
