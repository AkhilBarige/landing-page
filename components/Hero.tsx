"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function Hero() {
    const subtextRef = useRef<HTMLParagraphElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)

    const [statsVisible, setStatsVisible] = useState(false)

    useEffect(() => {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: "0px 0px -100px 0px",
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target as HTMLElement
                    const animationClass = target.dataset.animation
                    if (animationClass && animationClass.trim() !== "") {
                        target.classList.add(animationClass)
                    }
                    if (target === statsRef.current) setStatsVisible(true)
                }
            })
        }, observerOptions)

        if (subtextRef.current) observer.observe(subtextRef.current)
        if (ctaRef.current) observer.observe(ctaRef.current)
        if (statsRef.current) observer.observe(statsRef.current)

        return () => observer.disconnect()
    }, [])

    // Animated counter helper
    const Counter = ({ target, label }: { target: number; label: string }) => {
        const [count, setCount] = useState(0)
        useEffect(() => {
            if (statsVisible) {
                let start = 0
                const step = target / 50 // 50 steps
                const interval = setInterval(() => {
                    start += step
                    if (start >= target) {
                        setCount(target)
                        clearInterval(interval)
                    } else {
                        setCount(Math.floor(start))
                    }
                }, 30)
            }
        }, [statsVisible, target])
        return (
            <div className="flex flex-col items-center transition-all hover:scale-110">
                <div className="mb-2 text-3xl font-bold md:text-4xl">{count}{label.includes("%") ? "%" : ""}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        )
    }

    return (
        <section
            className="relative container mx-auto max-w-7xl px-4 py-24 md:py-32 overflow-hidden"
            aria-labelledby="hero-heading"
        >
            {/* Background gradient adapts to theme */}
            <div
                className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-primary/10 via-background to-accent/10 dark:from-primary/20 dark:to-accent/20"
                aria-hidden="true"
            />

            {/* Floating blobs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 animate-[float_6s_ease-in-out_infinite]" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 animate-[float_8s_ease-in-out_infinite_2s]" />

            <div className="flex flex-col items-center text-center">
                {/* Announcement pill */}
                <div
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm transition-all hover:scale-105 hover:shadow-lg animate-fade-in"
                    role="status"
                >
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    <span>Announcing $20M in Series A Funding</span>
                </div>

                {/* Heading */}
                <h1
                    id="hero-heading"
                    className="mb-6 max-w-4xl text-balance text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl animate-fade-in-up"
                >
                    The complete platform to automate workflows
                </h1>

                {/* Subtext */}
                <p
                    ref={subtextRef}
                    data-animation="scroll-fade-in"
                    className="mb-10 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl"
                >
                    Stop configuring and start innovating. Securely build, deploy, and scale workflow automation with StreamLine. Trusted by 10,000+ teams worldwide.
                </p>

                {/* CTA buttons */}
                <div
                    ref={ctaRef}
                    data-animation="scroll-slide-up"
                    className="flex flex-col items-center gap-4 sm:flex-row"
                >
                    <Button
                        size="lg"
                        className="gap-2 transition-transform hover:scale-105 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:shadow-lg"
                    >
                        Get Started Free
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="transition-transform hover:scale-105 bg-transparent"
                    >
                        View Demo
                    </Button>
                </div>

                {/* Stats with animated counters */}
                <div
                    ref={statsRef}
                    className="mt-16 grid w-full grid-cols-2 gap-8 md:grid-cols-4 lg:gap-16"
                    role="list"
                >
                    <Counter target={98} label="Customer Satisfaction" />
                    <Counter target={10000} label="Active Users" />
                    <Counter target={5000000} label="Workflows Automated" />
                    <Counter target={24} label="Expert Support (hrs)" />
                </div>
            </div>
        </section>
    )
}