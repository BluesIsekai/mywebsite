import { SmoothScroll } from "@/components/smooth-scroll";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import type React from "react";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-ibm-plex-sans",
});
const ibmPlexMono = IBM_Plex_Mono({
    weight: ["400", "500"],
    subsets: ["latin"],
    variable: "--font-ibm-plex-mono",
});
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });

export const metadata: Metadata = {
    title: "BluesIsekai — Portfolio",
    description:
        "A portfolio of web experiments, open-source projects, and design-driven development work by BluesIsekai.",
    generator: "Next.js",
    icons: {
        icon: [
            {
                url: "/icon-light-32x32.png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/icon-dark-32x32.png",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/icon.svg",
                type: "image/svg+xml",
            },
        ],
        apple: "/apple-icon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark bg-background">
            <body
                className={`${ibmPlexSans.variable} ${bebasNeue.variable} ${ibmPlexMono.variable} font-sans antialiased overflow-x-hidden`}
            >
                <div className="noise-overlay" aria-hidden="true" />
                <SmoothScroll>{children}</SmoothScroll>
                <Analytics />
            </body>
        </html>
    );
}
