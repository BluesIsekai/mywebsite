"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ColophonSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const bodyRef = useRef<HTMLParagraphElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                x: -40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 90%",
                },
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 82%",
                },
            });

            tl.from(titleRef.current, {
                y: 120,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
            })
                .from(
                    bodyRef.current,
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.6"
                )
                .from(
                    dividerRef.current,
                    {
                        scaleX: 0,
                        transformOrigin: "left center",
                        duration: 0.8,
                        ease: "power2.out",
                    },
                    "-=0.3"
                )
                .from(
                    footerRef.current,
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.4"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="colophon"
            className="relative border-t border-border/30 py-32 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden"
        >
            {/* Header */}
            <div ref={headerRef}>
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
                    05 / OUTRO
                </span>
            </div>

            {/* Hero Outro */}
            <div className="mt-14">
                <h2
                    ref={titleRef}
                    className="font-[var(--font-bebas)] uppercase leading-[0.9] tracking-tight text-[clamp(4rem,9vw,10rem)]"
                >
                    UNTIL THE NEXT COMMIT.
                </h2>

                <p
                    ref={bodyRef}
                    className="mt-12 max-w-2xl font-mono text-[15px] leading-8 text-muted-foreground"
                >
                    This portfolio is a snapshot of my journey so far.
                    <br />
                    Every project began as an idea worth exploring, and every one
                    taught me something along the way.
                    <br />
                    <br />
                    Thanks for taking the time to explore my work.
                </p>
            </div>

            {/* Divider */}
            <div
                ref={dividerRef}
                className="mt-24 h-px w-full bg-border/20"
            />

            {/* Footer */}
            <div
                ref={footerRef}
                className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
            >
                {/* Links */}
                <div className="flex flex-wrap gap-8">
                    {[
                        {
                            name: "GitHub",
                            href: "https://github.com/bluesisekai",
                        },
                        {
                            name: "LinkedIn",
                            href: "https://www.linkedin.com/in/tanishq-joshi-b9a90a326/",
                        },
                        {
                            name: "Email",
                            href: "mailto:joshitanishq9@gmail.com",
                        },
                    ].map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-300 hover:text-accent"
                        >
                            <span>{item.name}</span>

                            <ArrowUpRight
                                size={12}
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </a>
                    ))}
                </div>

                {/* Credits */}
                <div className="text-left md:text-right">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        Designed & Developed by BluesIsekai
                    </p>

                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60">
                        Version 1.0 · Always evolving.
                    </p>
                </div>
            </div>
        </section>
    );
}