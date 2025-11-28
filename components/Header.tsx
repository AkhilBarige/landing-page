"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Zap, Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "./Theme-provider"
import { useState, useEffect } from "react"

export default function Header() {
    const { theme, toggleTheme } = useTheme()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
            const totalHeight = document.body.scrollHeight - window.innerHeight
            const progress = (window.scrollY / totalHeight) * 100
            setScrollProgress(progress)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMobileMenuOpen(false)
        }
        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [])

    return (
        <header
            className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled
                ? "border-border/60 bg-background/80 backdrop-blur-lg shadow-lg"
                : "border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
                }`}
            role="banner"
        >
            {/* Scroll progress bar */}
            <div
                className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
                aria-hidden="true"
            />

            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2" aria-label="StreamLine Home">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <Zap className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
                    </div>
                    <span className="text-xl font-bold">StreamLine</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
                    {["Features", "Testimonials", "Pricing", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded-sm px-2 py-1"
                        >
                            {item}
                            <span className="absolute left-0 bottom-0 h-0.5 w-full scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Theme toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="transition-transform hover:scale-110"
                        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5" aria-hidden="true" />
                        ) : (
                            <Moon className="h-5 w-5" aria-hidden="true" />
                        )}
                    </Button>

                    {/* Auth buttons */}
                    <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                        Sign In
                    </Button>
                    <Button size="sm" className="hidden md:inline-flex">
                        Get Started
                    </Button>

                    {/* Mobile menu toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" aria-hidden="true" />
                        ) : (
                            <Menu className="h-5 w-5" aria-hidden="true" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <nav
                    id="mobile-menu"
                    className="md:hidden border-t border-border bg-background/95 backdrop-blur animate-in slide-in-from-top-5 duration-300"
                    aria-label="Mobile navigation"
                >
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
                        {["Features", "Testimonials", "Pricing", "Contact"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 px-3 rounded-md hover:bg-muted focus:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <div className="flex gap-2 mt-2">
                            <Button variant="ghost" size="sm" className="flex-1">
                                Sign In
                            </Button>
                            <Button size="sm" className="flex-1">
                                Get Started
                            </Button>
                        </div>
                    </div>
                </nav>
            )}
        </header>
    )
}
