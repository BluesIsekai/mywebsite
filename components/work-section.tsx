"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Repository {
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

const getSpan = (index: number) => {
    const spans = [
        "col-span-2 row-span-2", // featured (large) card
        "col-span-1 row-span-1",
        "col-span-1 row-span-2",
        "col-span-1 row-span-1",
        "col-span-2 row-span-1",
        "col-span-1 row-span-1",
    ];
    return spans[index % spans.length] || "col-span-1 row-span-1";
};

const loadingSpans = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
];

export function WorkSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRepositories = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/github/pinned");
            if (!res.ok) {
                throw new Error(`Failed to load repositories: ${res.statusText}`);
            }
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setRepositories(data);
        } catch (err: any) {
            setError(err?.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRepositories();
    }, []);

    useEffect(() => {
        if (loading || error || repositories.length === 0) return;
        if (!sectionRef.current || !headerRef.current || !gridRef.current) return;

        const ctx = gsap.context(() => {
            // Header slide in from left
            gsap.fromTo(
                headerRef.current,
                { x: -60, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    },
                },
            );

            const cards = gridRef.current?.querySelectorAll(".work-card");
            if (cards && cards.length > 0) {
                gsap.set(cards, { y: 60, opacity: 0 });
                gsap.to(cards, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    },
                });
            }
        }, sectionRef);

        // Recalculate ScrollTrigger parameters since dynamic content rendered
        ScrollTrigger.refresh();

        return () => ctx.revert();
    }, [loading, error, repositories]);

    return (
        <section ref={sectionRef} id="work" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">

            {/* Section header */}
            <div ref={headerRef} className="mb-16 flex items-end justify-between">
                <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / Projects</span>
                    <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
                        SELECTED REPOS
                    </h2>
                </div>
                <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
                    A curated snapshot of the public work I&apos;ve put on GitHub and continue to improve.
                </p>
            </div>

            {/* Asymmetric grid */}
            <div
                ref={gridRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[200px]"
            >
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => {
                        const span = loadingSpans[index] || "col-span-1 row-span-1";
                        return (
                            <div
                                key={index}
                                className={cn(
                                    "border border-border/20 p-5 flex flex-col justify-between bg-card/5 animate-pulse rounded-none",
                                    span
                                )}
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/20" />
                                        <div className="h-3 w-16 bg-muted-foreground/20 rounded" />
                                    </div>
                                    <div className="h-7 w-3/4 bg-muted-foreground/20 rounded mt-2" />
                                </div>
                                <div className="space-y-2 mt-4">
                                    <div className="h-3 w-5/6 bg-muted-foreground/20 rounded" />
                                    <div className="h-3 w-2/3 bg-muted-foreground/20 rounded" />
                                </div>
                            </div>
                        );
                    })
                ) : error ? (
                    <div className="col-span-2 md:col-span-4 border border-destructive/20 bg-destructive/5 p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[300px]">
                        <div className="p-3 rounded-full bg-destructive/10 text-destructive">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-[var(--font-bebas)] text-2xl tracking-wide text-foreground">
                                FAILED TO LOAD PROJECTS
                            </h3>
                            <p className="font-mono text-xs text-muted-foreground max-w-md">
                                {error}
                            </p>
                        </div>
                        <button
                            onClick={fetchRepositories}
                            className="font-mono text-xs px-4 py-2 border border-border hover:border-accent hover:text-accent transition-colors duration-300 cursor-pointer"
                        >
                            RETRY
                        </button>
                    </div>
                ) : (
                    repositories.map((repo, index) => (
                        <WorkCard
                            key={repo.id}
                            repository={repo}
                            index={index}
                            persistHover={index === 0}
                            span={getSpan(index)}
                        />
                    ))
                )}
            </div>
        </section>
    );
}

function WorkCard({
    repository,
    index,
    persistHover = false,
    span,
}: {
    repository: Repository;
    index: number;
    persistHover?: boolean;
    span: string;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [isScrollActive, setIsScrollActive] = useState(false);

    useEffect(() => {
        if (!persistHover || !cardRef.current) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: cardRef.current,
                start: "top 80%",
                onEnter: () => setIsScrollActive(true),
            });
        }, cardRef);

        return () => ctx.revert();
    }, [persistHover]);

    const isActive = isHovered || isScrollActive;

    const displayDescription = repository.description || "A public repository on GitHub. Click to explore code, issues, and contributions.";

    return (
        <a
            ref={cardRef}
            href={repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "work-card group relative border border-border/40 p-5 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden",
                span,
                isActive && "border-accent/60",
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background layer */}
            <div
                className={cn(
                    "absolute inset-0 bg-accent/5 transition-opacity duration-500",
                    isActive ? "opacity-100" : "opacity-0",
                )}
            />

            {/* Content */}
            <div className="relative z-10">
                <div className="flex items-center gap-2">
                    {repository.primaryLanguage?.color && (
                        <span
                            className="w-1.5 h-1.5 rounded-full inline-block shrink-0 animate-pulse"
                            style={{ backgroundColor: repository.primaryLanguage.color }}
                        />
                    )}
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {repository.primaryLanguage?.name || "GitHub"}
                    </span>
                </div>
                <h3
                    className={cn(
                        "mt-3 font-[var(--font-bebas)] text-2xl md:text-4xl tracking-tight transition-colors duration-300",
                        isActive ? "text-accent" : "text-foreground",
                    )}
                >
                    {repository.name}
                </h3>
            </div>

            {/* Description - reveals on hover */}
            <div className="relative z-10">
                <p
                    className={cn(
                        "font-mono text-xs text-muted-foreground leading-relaxed transition-all duration-500 max-w-[280px]",
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                    )}
                >
                    {displayDescription}
                </p>
            </div>

            {/* Index marker */}
            <span
                className={cn(
                    "absolute bottom-4 right-4 font-mono text-[10px] transition-colors duration-300",
                    isActive ? "text-accent" : "text-muted-foreground/40",
                )}
            >
                {String(index + 1).padStart(2, "0")}
            </span>

            {/* Corner line */}
            <div
                className={cn(
                    "absolute top-0 right-0 w-12 h-12 transition-all duration-500",
                    isActive ? "opacity-100" : "opacity-0",
                )}
            >
                <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
                <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
            </div>
        </a>
    );
}
