"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Quote, ChevronLeft, ChevronRight, Star, Users, Award } from "lucide-react"

const testimonials = [
    {
        quote:
            "StreamLine has transformed how we handle our daily operations. What used to take hours now takes minutes. The ROI has been incredible.",
        author: "Sarah Johnson",
        role: "CTO, TechCorp",
        avatar: "/professional-woman-diverse.png",
        initials: "SJ",
        rating: 5,
    },
    {
        quote:
            "The best automation platform we've used. The interface is intuitive and the support team is always there when we need them.",
        author: "Michael Chen",
        role: "Operations Director, Innovate Inc",
        avatar: "/professional-man.jpg",
        initials: "MC",
        rating: 5,
    },
    {
        quote:
            "We've saved countless hours and reduced errors significantly. StreamLine is now an essential part of our workflow infrastructure.",
        author: "Emily Rodriguez",
        role: "Head of Product, DataFlow",
        avatar: "/hispanic-professional-woman.png",
        initials: "ER",
        rating: 5,
    },
    {
        quote:
            "The automation capabilities are unmatched. We've increased our team productivity by 300% since implementing StreamLine.",
        author: "David Park",
        role: "CEO, StartupHub",
        avatar: "/asian-businessman-meeting.png",
        initials: "DP",
        rating: 5,
    },
    {
        quote:
            "Excellent platform with robust features. The analytics dashboard gives us insights we never had before. Highly recommended!",
        author: "Lisa Thompson",
        role: "VP of Engineering, CloudScale",
        avatar: "/professional-woman-diverse.png",
        initials: "LT",
        rating: 5,
    },
]

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [pausedByUser, setPausedByUser] = useState(false)

    const testimonialsPerView = 3
    const maxIndex = Math.max(0, testimonials.length - testimonialsPerView)

    // autoplay logic
    useEffect(() => {
        if (!isAutoPlaying || pausedByUser) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
        }, 5000)

        return () => clearInterval(interval)
    }, [isAutoPlaying, pausedByUser, maxIndex])

    const handlePrev = () => {
        setIsAutoPlaying(false)
        setPausedByUser(true)
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
    }

    const handleNext = () => {
        setIsAutoPlaying(false)
        setPausedByUser(true)
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }

    // keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handlePrev()
            if (e.key === "ArrowRight") handleNext()
            if (e.key === " ") setIsAutoPlaying((prev) => !prev) // space toggles autoplay
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [maxIndex])

    return (
        <section
            id="testimonials"
            className="border-y border-border bg-muted/30 py-24"
            aria-labelledby="testimonials-heading"
        >
            <div className="container mx-auto max-w-7xl px-4">
                {/* Heading */}
                <div className="mb-16 text-center animate-fade-in">
                    <h2
                        id="testimonials-heading"
                        className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl"
                    >
                        Trusted by industry leaders
                    </h2>
                    <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
                        See what our customers have to say about StreamLine
                    </p>

                    {/* Trust indicators */}
                    <div
                        className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm"
                        role="list"
                        aria-label="Trust indicators"
                    >
                        <div
                            className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 animate-fade-in-up"
                            role="listitem"
                        >
                            <Users className="h-4 w-4 text-primary" aria-hidden="true" />
                            <span className="font-semibold">Trusted by 2,500+ companies</span>
                        </div>
                        <div
                            className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 animate-fade-in-up animation-delay-200"
                            role="listitem"
                        >
                            <Star className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
                            <span className="font-semibold">4.9/5 average rating</span>
                        </div>
                        <div
                            className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 animate-fade-in-up animation-delay-400"
                            role="listitem"
                        >
                            <Award className="h-4 w-4 text-primary" aria-hidden="true" />
                            <span className="font-semibold">Industry recognized</span>
                        </div>
                    </div>
                </div>

                {/* Carousel */}
                <div
                    className="relative"
                    role="region"
                    aria-label="Customer testimonials carousel"
                    aria-live="polite"
                >
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-in-out gap-6"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / testimonialsPerView + 2)}%)`,
                            }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <Card
                                    key={index}
                                    className="relative min-w-[calc(33.333%-1rem)] border-border bg-card p-8 transition-all hover:scale-105 hover:shadow-xl shrink-0 animate-fade-in-up"
                                    role="article"
                                    aria-label={`Testimonial from ${testimonial.author}`}
                                >
                                    <Quote className="mb-4 h-8 w-8 text-primary/20" aria-hidden="true" />

                                    {/* Star rating */}
                                    <div
                                        className="mb-4 flex gap-1"
                                        role="img"
                                        aria-label={`${testimonial.rating} out of 5 stars`}
                                    >
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className="h-5 w-5 fill-primary text-primary transition-transform hover:scale-110"
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <blockquote className="mb-6 text-lg leading-relaxed italic text-muted-foreground">
                                        “{testimonial.quote}”
                                    </blockquote>

                                    {/* Author */}
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div
                                                className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-accent opacity-75 blur-sm animate-pulse"
                                                aria-hidden="true"
                                            />
                                            <Avatar className="relative transition-transform hover:scale-110 border-2 border-background">
                                                <AvatarImage
                                                    src={testimonial.avatar || "/placeholder.svg"}
                                                    alt={`${testimonial.author}, ${testimonial.role}`}
                                                    loading="lazy"
                                                />
                                                <AvatarFallback>{testimonial.initials}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div>
                                            <div className="font-semibold">{testimonial.author}</div>
                                            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 rounded-full bg-background shadow-lg hover:scale-110 transition-transform focus:ring-2 focus:ring-ring"
                        onClick={handlePrev}
                        aria-label="View previous testimonials"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 rounded-full bg-background shadow-lg hover:scale-110 transition-transform focus:ring-2 focus:ring-ring"
                        onClick={handleNext}
                        aria-label="View next testimonials"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>

                    {/* Dots navigation */}
                    <div
                        className="mt-8 flex justify-center gap-2"
                        role="tablist"
                        aria-label="Testimonial carousel navigation"
                    >
                        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                            <button
                                key={i}
                                role="tab"
                                aria-selected={i === currentIndex}
                                aria-label={`Go to testimonial group ${i + 1}`}
                                className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${i === currentIndex
                                    ? "w-8 bg-primary animate-pulse"
                                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                    }`}
                                onClick={() => {
                                    setIsAutoPlaying(false)
                                    setCurrentIndex(i)
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}