"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export function SectionCursorWrapper({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!containerRef.current || !cursorRef.current) return;

        const container = containerRef.current;
        const cursor = cursorRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(cursor, {
                x: x,
                y: y,
                duration: 0.5,
                ease: "power3.out",
            });
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative">
            <div
                ref={cursorRef}
                className={cn(
                    "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
                    "w-12 h-12 rounded-full border-2 border-(--accent-glow) bg-(--accent-soft)",
                    "transition-opacity duration-300",
                    isHovering ? "opacity-100" : "opacity-0",
                )}
            />
            {children}
        </div>
    );
}
