"use client"

import { Workflow, Zap, Shield, BarChart3 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const features = [
    {
        icon: Workflow,
        title: "Smart Automation",
        description:
            "Build powerful workflows with our visual builder. Connect your favorite tools and automate repetitive tasks in minutes.",
        tooltip: "Drag-and-drop interface with 100+ integrations",
        demoUrl: "/workflow-automation-dashboard-interface.jpg",
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description:
            "Execute workflows at incredible speeds. Our optimized infrastructure ensures your automations run without delays.",
        tooltip: "Process 10,000+ tasks per second",
        demoUrl: "/speed-performance-metrics-dashboard.jpg",
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description:
            "Bank-level encryption and compliance certifications. Your data is protected with the highest security standards.",
        tooltip: "SOC 2, ISO 27001, GDPR compliant",
        demoUrl: "/security-compliance-certifications-dashboard.jpg",
    },
    {
        icon: BarChart3,
        title: "Advanced Analytics",
        description:
            "Gain insights into your workflows with detailed analytics. Track performance and optimize your processes.",
        tooltip: "Real-time insights with custom reports",
        demoUrl: "/analytics-dashboard.png",
    },
]

export default function Features() {
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("scroll-fade-in")
                }
            })
        }, observerOptions)

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <section
            id="features"
            className="container mx-auto max-w-7xl px-4 py-24"
            aria-labelledby="features-heading"
        >
            <div className="mb-16 text-center animate-fade-in">
                <h2
                    id="features-heading"
                    className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl"
                >
                    Everything you need to succeed
                </h2>
                <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
                    Powerful features designed to streamline your workflow and boost productivity
                </p>
            </div>

            <div
                className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:gap-8"
                role="list"
                aria-label="Product features"
            >
                {features.map((feature, index) => {
                    const Icon = feature.icon
                    const animationDelay = `animation-delay-${(index + 1) * 150}`
                    const isHovered = hoveredIndex === index

                    return (
                        <Card
                            key={index}
                            ref={(el) => {
                                cardsRef.current[index] = el
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`group relative overflow-hidden border border-border bg-card p-8 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:border-transparent hover:shadow-2xl hover:shadow-primary/20 ${animationDelay} hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5`}
                            role="listitem"
                            tabIndex={0}
                            onFocus={() => setHoveredIndex(index)}
                            onBlur={() => setHoveredIndex(null)}
                            aria-label={`${feature.title}: ${feature.description}`}
                        >
                            {/* Icon */}
                            <div
                                className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-primary/20"
                                aria-hidden="true"
                            >
                                <Icon className="h-7 w-7 text-primary transition-transform duration-500 group-hover:scale-110" />
                            </div>

                            {/* Title + Description */}
                            <h3 className="mb-3 text-xl font-semibold transition-colors group-hover:text-primary">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Hover demo preview */}
                            <div
                                className={`absolute inset-x-0 bottom-0 transform transition-all duration-500 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                                    }`}
                                aria-hidden={!isHovered}
                            >
                                <div className="bg-gradient-to-t from-background via-background/95 to-transparent p-6 pt-12">
                                    <div className="mb-3 overflow-hidden rounded-lg border border-primary/20 shadow-lg">
                                        <img
                                            src={feature.demoUrl || "/placeholder.svg"}
                                            alt={`${feature.title} demonstration showing ${feature.tooltip}`}
                                            className="h-48 w-full object-cover bg-background transition-transform duration-1000 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>
                                    <p className="text-center text-sm font-medium text-primary">
                                        {feature.tooltip}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </section>
    )
}