"use client"

import Link from "next/link"
import { Zap, Twitter, Github, Linkedin, Facebook, ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"

export default function Footer() {
    const [showBackToTop, setShowBackToTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <footer className="border-t border-border bg-muted/30 dark:bg-muted/20 relative">
            <div className="container mx-auto max-w-7xl px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
                    {/* Brand + Social */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="mb-4 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                <Zap className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold">StreamLine</span>
                        </Link>
                        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                            The complete platform to automate workflows and boost productivity for modern teams.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {[
                                { href: "https://twitter.com", icon: Twitter, color: "#1DA1F2" },
                                { href: "https://github.com/AkhilBarige", icon: Github, color: "#333" },
                                { href: "https://linkedin.com", icon: Linkedin, color: "#0A66C2" },
                                { href: "https://facebook.com", icon: Facebook, color: "#1877F2" },
                            ].map(({ href, icon: Icon, color }, i) => (
                                <Link
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                    style={{ transition: "background-color 0.3s" }}
                                >
                                    <Icon
                                        className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-white"
                                        style={{ color }}
                                    />
                                    <span className="sr-only">{href}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Product</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
                            <li><Link href="#pricing" className="hover:text-foreground">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Security</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Roadmap</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Company</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-foreground">About</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Resources + Newsletter */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Resources</h3>
                        <ul className="space-y-3 text-sm mb-6">
                            <li><Link href="#" className="hover:text-foreground">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-foreground">API Reference</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Community</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Support</Link></li>
                        </ul>

                        {/* Newsletter */}
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                aria-label="Email for newsletter"
                            />
                            <button
                                type="submit"
                                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
                    <p>© 2025 StreamLine. All rights reserved.</p>
                </div>
            </div>

            {/* Back to top button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${showBackToTop ? "translate-y-0 opacity-100 animate-pulse" : "pointer-events-none translate-y-16 opacity-0"
                    }`}
                aria-label="Back to top"
            >
                <ArrowUp className="h-5 w-5" />
            </button>
        </footer>
    )
}