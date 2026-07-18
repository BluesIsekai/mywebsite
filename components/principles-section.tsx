"use client";

import { HighlightText } from "@/components/highlight-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function PrinciplesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const principlesRef = useRef<HTMLDivElement>(null);
    //Headings
    const principles = [
        {
            number: "01",
            titleParts: [
                { text: "BUILD", highlight: true },
                { text: " IN PUBLIC", highlight: false },
            ],
            description: "Keep shipping visible work so progress is easy to follow and easy to improve.",
            align: "left",
        },
        {
            number: "02",
            titleParts: [
                { text: "SHIPPING", highlight: true },
                { text: " > POLISH", highlight: false },
            ],
            description: "Favor useful progress and real feedback over perfect work that never gets out.",
            align: "right",
        },
        {
            number: "03",
            titleParts: [
                { text: "READABLE ", highlight: false },
                { text: "CODE", highlight: true },
            ],
            description: "Write things that are easy to revisit later, because future-you is a real collaborator.",
            align: "left",
        },
        {
            number: "04",
            titleParts: [
                { text: "NEXT ", highlight: false },
                { text: "DIRECTION", highlight: true },
            ],
            description: "Move toward roles and projects where I can build products, learn fast, and stay useful.",
            align: "right",
        },
    ];

    useEffect(() => {
        if (!sectionRef.current || !headerRef.current || !principlesRef.current) return;

        const ctx = gsap.context(() => {
            // Header slide in
            gsap.from(headerRef.current, {
                x: -60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            });

            // Each principle slides in from its aligned side
            const articles = principlesRef.current?.querySelectorAll("article");
            articles?.forEach((article, index) => {
                const isRight = principles[index].align === "right";
                gsap.from(article, {
                    x: isRight ? 80 : -80,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: article,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="principles" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
            {/* Section header */}
            <div ref={headerRef} className="mb-24">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">03 / Approach</span>
                <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">HOW I WORK</h2>
            </div>

            {/* Staggered principles */}
            <div ref={principlesRef} className="space-y-24 md:space-y-32">
                {principles.map((principle, index) => (
                    <article
                        key={index}
                        className={`flex flex-col ${
                            principle.align === "right" ? "items-end text-right" : "items-start text-left"
                        }`}
                    >
                        {/* Annotation label */}
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                            {principle.number} / {principle.titleParts[0].text.split(" ")[0]}
                        </span>

                        <h3 className="font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-8xl tracking-tight leading-none">
                            {principle.titleParts.map((part, i) =>
                                part.highlight ? (
                                    <HighlightText key={i} parallaxSpeed={0.6}>
                                        {part.text}
                                    </HighlightText>
                                ) : (
                                    <span key={i}>{part.text}</span>
                                ),
                            )}
                        </h3>

                        {/* Description */}
                        <p className="mt-6 max-w-md font-mono text-sm text-muted-foreground leading-relaxed">
                            {principle.description}
                        </p>

                        {/* Decorative line */}
                        <div
                            className={`mt-8 h-[1px] bg-border w-24 md:w-48 ${principle.align === "right" ? "mr-0" : "ml-0"}`}
                        />
                    </article>
                ))}
            </div>
        </section>
    );
}
