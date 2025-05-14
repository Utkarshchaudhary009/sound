"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Search, Library, Menu, LogIn } from "lucide-react"
import { useUser, SignInButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { isSignedIn, user } = useUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2 font-bold">
          <Link href="/" className="flex items-center gap-1">
            TuneInto
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80">
              Home
            </Link>
            <Link href="/search" className="transition-colors hover:text-foreground/80">
              Search
            </Link>
            <Link href="/library" className="transition-colors hover:text-foreground/80">
              Library
            </Link>

            {!isSignedIn && (
              <SignInButton mode="modal">
                <Button size="sm" variant="outline" className="gap-1">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </SignInButton>
            )}

            {isSignedIn && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{user.firstName || user.username}</span>
              </div>
            )}
          </nav>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <div className="px-7">
                <Link href="/" className="flex items-center gap-2 font-bold" onClick={() => setOpen(false)}>
                  TuneInto
                </Link>
              </div>
              <nav className="flex flex-col gap-4 text-lg font-medium mt-8">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-7 py-2 hover:bg-accent hover:text-accent-foreground rounded-l-full transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                <Link
                  href="/search"
                  className="flex items-center gap-2 px-7 py-2 hover:bg-accent hover:text-accent-foreground rounded-l-full transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Search className="h-5 w-5" />
                  Search
                </Link>
                <Link
                  href="/library"
                  className="flex items-center gap-2 px-7 py-2 hover:bg-accent hover:text-accent-foreground rounded-l-full transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Library className="h-5 w-5" />
                  Library
                </Link>

                {!isSignedIn && (
                  <div className="px-7 py-4 mt-4 border-t">
                    <SignInButton mode="modal">
                      <Button className="w-full gap-2" onClick={() => setOpen(false)}>
                        <LogIn className="h-4 w-4" />
                        Sign In
                      </Button>
                    </SignInButton>
                  </div>
                )}

                {isSignedIn && (
                  <div className="px-7 py-4 mt-4 border-t">
                    <div className="text-sm text-muted-foreground">Signed in as:</div>
                    <div className="font-medium">{user.fullName || user.username}</div>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
