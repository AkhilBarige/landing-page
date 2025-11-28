"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setIsSuccess(true)

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({ name: "", email: "", company: "", message: "" })
            setIsSuccess(false)
        }, 3000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    return (
        <section id="contact" className="container mx-auto max-w-7xl px-4 py-24">
            <div className="mb-16 text-center">
                <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">{"Get in touch"}</h2>
                <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
                    {"Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Contact Form */}
                <Card className="relative overflow-hidden border-border bg-card p-8">
                    {isSuccess && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card/95 backdrop-blur-sm">
                            <div className="animate-scale-up mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                                <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        className="animate-checkmark"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-2xl font-bold animate-fade-in">Message sent!</h3>
                            <p className="text-muted-foreground animate-fade-in">{"We'll get back to you soon."}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Akhil Barige"
                                className={errors.name ? "border-destructive" : ""}
                            />
                            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className={errors.email ? "border-destructive" : ""}
                            />
                            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Acme Inc."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">
                                Message <span className="text-destructive">*</span>
                            </Label>
                            <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us about your project..."
                                rows={5}
                                className={errors.message ? "border-destructive" : ""}
                            />
                            {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                        </div>

                        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </Card>

                {/* Contact Info & Map */}
                <div className="space-y-6">
                    <Card className="border-border bg-card p-6">
                        <h3 className="mb-4 text-xl font-bold">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-medium">Email</p>
                                    <a href="mailto:hello@streamline.com" className="text-muted-foreground hover:text-primary">
                                        akhilbarige21@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-medium">Phone</p>
                                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary">
                                        +1 (234) 567-890
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-medium">Office</p>
                                    <p className="text-muted-foreground">Block-C,Gachibowli, Hyderabad,Telangana</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Map Preview */}
                    <Card className="overflow-hidden border-border bg-card">
                        <div className="relative h-[300px] w-full">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4584856786517!2d78.32112368468185!3d17.44000597975771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93d4e63ff2f%3A0x4b7a3f1de9b3d0f5!2sGachibowli%2C%20Hyderabad%2C%20Telangana%2C%20India!5e0!3m2!1sen!2sin!4v1234567890123"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Office Location"
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}
