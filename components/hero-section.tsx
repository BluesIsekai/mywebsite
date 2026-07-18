"use client";

import { AnimatedNoise } from "@/components/animated-noise";
import { BitmapChevron } from "@/components/bitmap-chevron";
import { ScrambleTextOnHover } from "@/components/scramble-text";
import { SplitFlapAudioProvider, SplitFlapMuteToggle, SplitFlapText } from "@/components/split-flap-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !contentRef.current) return;

        const ctx = gsap.context(() => {
            gsap.to(contentRef.current, {
                y: -100,
                opacity: 0,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-screen flex items-center pl-6 md:pl-28 pr-6 md:pr-12"
        >
            <AnimatedNoise opacity={0.03} />

            {/* Left vertical labels */}
            <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block whitespace-nowrap">
                    BLUESISEKAI
                </span>
            </div>

            {/* Main content */}
            <div ref={contentRef} className="flex-1 w-full">
                <SplitFlapAudioProvider>
                    <div className="relative">
                        <SplitFlapText text="BLUESISEKAI" speed={80} />
                        <div className="mt-4">
                            <SplitFlapMuteToggle />
                        </div>
                    </div>
                </SplitFlapAudioProvider>

                <h2 className="mt-4 font-[var(--font-bebas)] text-[clamp(1.2rem,2.8vw,2.2rem)] tracking-[0.02em] text-muted-foreground/80">
                    Building ideas into reality.
                    Still learning every day.
                </h2>

                <p className="mt-12 max-w-lg font-mono text-[15px] leading-8 text-muted-foreground/85">
                    I'm BluesIsekai. I build interfaces, experiments, and systems—always learning, always iterating.
                    This portfolio is a snapshot of that journey.
                </p>

                <div className="mt-16 flex items-center gap-8">
                    <a
                        href="#work"
                        className="group inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
                    >
                        <ScrambleTextOnHover text="View Projects" as="span" duration={0.6} />
                        <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
                    </a>
                    <a
                        href="#colophon"
                        className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                        About & Links
                    </a>
                </div>
            </div>

            {/* Floating info tag */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
                <div className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    v1.0 / ALWAYS EVOLVING
                </div>
            </div>
        </section>
    );
}
