import Link from "next/link"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NewReleases } from "@/components/new-releases"
import { Categories } from "@/components/categories"
import { RecommendedSongs } from "@/components/recommended-songs"
import { MobileNav } from "@/components/mobile-nav"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <MobileNav />

      <main className="container px-4 py-6 md:py-10">
        <section className="space-y-4 py-4 md:py-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">TuneInto</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Search, discover, and download your favorite music
            </p>
          </div>

          <div className="mx-auto max-w-md">
            <form action="/search" className="relative">
              <Input
                type="search"
                name="q"
                placeholder="Search songs, artists, albums..."
                className="h-12 pl-10 pr-4 rounded-full"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Button type="submit" size="sm" className="absolute right-1.5 top-1.5 rounded-full px-4">
                Search
              </Button>
            </form>
          </div>
        </section>

        <section className="py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight">New Releases</h2>
            <Link href="/new-releases" className="text-sm font-medium text-primary hover:underline">
              See All
            </Link>
          </div>
          <NewReleases />
        </section>

        <section className="py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
            <Link href="/categories" className="text-sm font-medium text-primary hover:underline">
              Browse All
            </Link>
          </div>
          <Categories />
        </section>

        <section className="py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight">You May Also Like</h2>
            <Link href="/recommended" className="text-sm font-medium text-primary hover:underline">
              See All
            </Link>
          </div>
          <RecommendedSongs />
        </section>
      </main>
    </div>
  )
}
