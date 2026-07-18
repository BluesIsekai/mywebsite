"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Highlights (WHO I AM)
const profileHighlights = [
    {
        date: "Why",
        title: "Building Publicly",
        note: "I enjoy turning ideas into real projects and sharing the process as I learn.",
    },
    {
        date: "How",
        title: "Always Learning",
        note: "Every project pushes me to learn something new, whether it's a framework, a concept, or an entirely different way of thinking.",
    },
    {
        date: "What",
        title: "Curiosity First",
        note: "I like experimenting, solving problems, and creating things that are useful, interesting, or simply fun to build.",
    },
    {
        date: "Next",
        title: "Keep Growing",
        note: "My goal is simple: keep building better software, keep learning from every project, and never stop improving.",
    },
];

export function SignalsSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !headerRef.current || !cardsRef.current) return;

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
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                },
            );

            const cards = cardsRef.current?.querySelectorAll("article");
            if (cards) {
                gsap.fromTo(
                    cards,
                    { x: -100, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                    },
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="signals" ref={sectionRef} className="relative py-32 pl-6 md:pl-28">

            {/* Section header */}
            <div ref={headerRef} className="mb-16 pr-6 md:pr-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / About</span>
                <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">WHY I BUILD</h2>
            </div>

            {/* Horizontal scroll container */}
            <div
                ref={el => {
                    scrollRef.current = el;
                    cardsRef.current = el;
                }}
                className="flex gap-8 overflow-x-auto pb-8 pr-12 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {profileHighlights.map((signal, index) => (
                    <SignalCard key={index} signal={signal} index={index} />
                ))}
            </div>
        </section>
    );
}

function SignalCard({ signal, index }: { signal: { date: string; title: string; note: string }; index: number }) {
    return (
        <article
            className={cn(
                "group relative flex-shrink-0 w-80",
                "transition-transform duration-500 ease-out",
                "hover:-translate-y-2",
            )}
        >
            {/* Card with paper texture effect */}
            <div className="relative bg-card border border-border/50 md:border-t md:border-l md:border-r-0 md:border-b-0 p-8">
                {/* Top torn edge effect */}
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

                {/* Issue number - editorial style */}
                <div className="flex items-baseline justify-between mb-8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        No. {String(index + 1).padStart(2, "0")}
                    </span>
                    <time className="font-mono text-[10px] text-muted-foreground/60">{signal.date}</time>
                </div>

                {/* Title */}
                <h3 className="font-[var(--font-bebas)] text-4xl tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
                    {signal.title}
                </h3>

                {/* Divider line */}
                <div className="w-12 h-px bg-accent/60 mb-6 group-hover:w-full transition-all duration-500" />

                {/* Description */}
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">{signal.note}</p>

                {/* Bottom right corner fold effect */}
                <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-background rotate-45 translate-x-4 translate-y-4 border-t border-l border-border/30" />
                </div>
            </div>

            {/* Shadow/depth layer */}
            <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </article>
    );
}
