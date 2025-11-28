import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, SearchX } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="text-center">
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-3xl" />
                        <SearchX className="relative h-24 w-24 text-primary animate-bounce" aria-hidden="true" />
                    </div>
                </div>

                <h1 className="mb-4 text-7xl font-bold tracking-tight md:text-9xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    404
                </h1>

                <h2 className="mb-4 text-2xl font-semibold md:text-3xl">Page Not Found</h2>

                <p className="mb-8 max-w-md mx-auto text-muted-foreground text-lg">
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button asChild size="lg" className="gap-2 transition-transform hover:scale-105">
                        <Link href="/">
                            <Home className="h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="gap-2 transition-transform hover:scale-105 bg-transparent"
                    >
                        <Link href="javascript:history.back()">
                            <ArrowLeft className="h-4 w-4" />
                            Go Back
                        </Link>
                    </Button>
                </div>

                <div className="mt-12 text-sm text-muted-foreground">
                    <p>
                        Need help?{" "}
                        <Link href="#contact" className="text-primary hover:underline">
                            Contact our support team
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
