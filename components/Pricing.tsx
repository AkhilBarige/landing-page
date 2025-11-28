"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useState } from "react"

const plans = [
    {
        name: "Starter",
        monthlyPrice: "29",
        annualPrice: "24",
        description: "Perfect for individuals and small teams",
        features: [
            "Up to 1,000 workflow executions/month",
            "Basic integrations",
            "Email support",
            "7-day history",
            "Community access",
        ],
        cta: "Start Free Trial",
        popular: false,
    },
    {
        name: "Professional",
        monthlyPrice: "99",
        annualPrice: "82",
        description: "For growing teams with advanced needs",
        features: [
            "Up to 10,000 workflow executions/month",
            "Advanced integrations",
            "Priority support",
            "30-day history",
            "Advanced analytics",
            "Custom workflows",
        ],
        cta: "Start Free Trial",
        popular: true,
    },
    {
        name: "Enterprise",
        monthlyPrice: "Custom",
        annualPrice: "Custom",
        description: "For large organizations at scale",
        features: [
            "Unlimited workflow executions",
            "All integrations",
            "24/7 dedicated support",
            "Unlimited history",
            "Advanced security",
            "Custom SLA",
            "White-label options",
        ],
        cta: "Contact Sales",
        popular: false,
    },
]

export default function Pricing() {
    const [isAnnual, setIsAnnual] = useState(false)

    return (
        <section
            id="pricing"
            className="container mx-auto max-w-7xl px-4 py-24"
            aria-labelledby="pricing-heading"
        >
            <div className="mb-16 text-center animate-fade-in">
                <h2
                    id="pricing-heading"
                    className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl"
                >
                    Simple, transparent pricing
                </h2>
                <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
                    Choose the perfect plan for your needs. All plans include a 14-day free trial.
                </p>

                {/* Billing cycle toggle */}
                <div
                    className="mt-8 flex items-center justify-center gap-4"
                    role="group"
                    aria-label="Billing cycle selector"
                >
                    <span
                        className={`text-sm font-medium transition-colors ${!isAnnual ? "text-foreground" : "text-muted-foreground"
                            }`}
                        id="monthly-label"
                    >
                        Monthly
                    </span>
                    <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        role="switch"
                        aria-checked={isAnnual}
                        aria-labelledby="monthly-label annual-label"
                        className={`relative h-7 w-12 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${isAnnual ? "bg-primary" : "bg-muted"
                            }`}
                    >
                        <span
                            className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-background shadow-md transition-transform duration-300 ${isAnnual ? "translate-x-5" : "translate-x-0"
                                }`}
                        />
                    </button>
                    <span
                        className={`text-sm font-medium transition-colors ${isAnnual ? "text-foreground" : "text-muted-foreground"
                            }`}
                        id="annual-label"
                    >
                        Annual
                        <span className="ml-1 text-xs text-primary">(Save 17%)</span>
                    </span>
                </div>
            </div>

            {/* Pricing cards */}
            <div
                className="grid gap-6 md:grid-cols-3 lg:gap-8"
                role="list"
                aria-label="Pricing plans"
            >
                {plans.map((plan, index) => {
                    const delays = ["animation-delay-100", "animation-delay-200", "animation-delay-300"]
                    return (
                        <Card
                            key={index}
                            role="listitem"
                            aria-label={`${plan.name} plan${plan.popular ? ", recommended" : ""}`}
                            className={`relative border-border bg-card p-8 transition-all hover:scale-105 hover:shadow-2xl animate-scale-in ${delays[index]} animation-fill-both ${plan.popular ? "border-2 border-primary shadow-xl animate-glow" : ""
                                }`}
                        >
                            {/* Recommended badge */}
                            {plan.popular && (
                                <div
                                    className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-size-[200%_100%] animate-gradient px-4 py-1 text-sm font-medium text-primary-foreground shadow-lg"
                                    aria-label="Recommended plan"
                                >
                                    ⭐ Recommended
                                </div>
                            )}

                            {/* Enterprise badge */}
                            {plan.name === "Enterprise" && (
                                <div className="absolute top-4 right-4 rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                                    Custom Pricing
                                </div>
                            )}

                            {/* Plan title + description */}
                            <div className="mb-6">
                                <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                                <p className="text-sm text-muted-foreground">{plan.description}</p>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    {plan.monthlyPrice !== "Custom" && (
                                        <span className="text-2xl font-semibold">$</span>
                                    )}
                                    <span className="text-5xl font-bold">
                                        {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                                    </span>
                                    {plan.monthlyPrice !== "Custom" && (
                                        <span className="text-muted-foreground">/month</span>
                                    )}
                                </div>
                                {isAnnual && plan.monthlyPrice !== "Custom" && (
                                    <p className="mt-1 text-xs text-muted-foreground">Billed annually</p>
                                )}
                            </div>

                            {/* CTA */}
                            <Button
                                className="mb-6 w-full transition-transform hover:scale-105 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:shadow-lg focus:ring-2 focus:ring-ring"
                                variant={plan.popular ? "default" : "outline"}
                                size="lg"
                                aria-label={`${plan.cta} for ${plan.name} plan`}
                            >
                                {plan.cta}
                            </Button>

                            {/* Features */}
                            <ul
                                className="space-y-3"
                                role="list"
                                aria-label={`${plan.name} plan features`}
                            >
                                {plan.features.map((feature, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-3 transition-all hover:translate-x-1 hover:text-foreground"
                                    >
                                        <Check className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                                        <span className="text-sm text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    )
                })}
            </div>
        </section>
    )
}