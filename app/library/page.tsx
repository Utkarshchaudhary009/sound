import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { LikedSongs } from "@/components/liked-songs"
import { LoginPrompt } from "@/components/login-prompt"

export default async function LibraryPage() {
  const user = await currentUser()

  return (
    <div className="min-h-screen bg-background">
      <MobileNav />

      <main className="container px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to home</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Your Library</h1>
        </div>

        {user ? (
          <>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Liked Songs</h2>
              </div>
              <LikedSongs />
            </div>
          </>
        ) : (
          <LoginPrompt />
        )}
      </main>
    </div>
  )
}
