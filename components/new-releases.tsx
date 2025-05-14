"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import { Heart, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { likeTrack } from "@/lib/actions"

// Mock data generator for new releases
const generateMockReleases = (page: number, limit = 6) => {
  return Array.from({ length: limit }, (_, i) => ({
    id: `${page}-${i + 1}`,
    title: `New Song ${page * limit + i + 1}`,
    artist: `Artist ${((page * limit + i) % 10) + 1}`,
    cover: `/placeholder.svg?height=300&width=300&text=Song+${page * limit + i + 1}`,
    releaseDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    liked: Math.random() > 0.7,
  }))
}

export function NewReleases() {
  const [releases, setReleases] = useState(generateMockReleases(0))
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastElementRef = useRef<HTMLDivElement | null>(null)
  const { toast } = useToast()

  const loadMoreReleases = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const nextPage = page + 1
    // Limit to 5 pages for demo purposes
    if (nextPage > 4) {
      setHasMore(false)
    } else {
      const newReleases = generateMockReleases(nextPage)
      setReleases((prev) => [...prev, ...newReleases])
      setPage(nextPage)
    }

    setLoading(false)
  }, [loading, hasMore, page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreReleases()
        }
      },
      { threshold: 0.1 },
    )

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loadMoreReleases, hasMore])

  useEffect(() => {
    const currentObserver = observerRef.current
    const lastElement = lastElementRef.current

    if (currentObserver && lastElement) {
      currentObserver.observe(lastElement)
    }

    return () => {
      if (currentObserver && lastElement) {
        currentObserver.unobserve(lastElement)
      }
    }
  }, [releases])

  const handleLike = async (song: any, isLiked: boolean) => {
    try {
      await likeTrack(song, isLiked)

      // Update local state
      setReleases((prev) => prev.map((item) => (item.id === song.id ? { ...item, liked: isLiked } : item)))

      toast({
        title: isLiked ? "Added to Library" : "Removed from Library",
        description: `"${song.title}" by ${song.artist} has been ${isLiked ? "added to" : "removed from"} your library.`,
        duration: 3000,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update library",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {releases.map((song, index) => (
        <Card
          key={song.id}
          className="rounded-xl overflow-hidden"
          ref={index === releases.length - 1 ? lastElementRef : null}
        >
          <CardContent className="p-0">
            <div className="relative group">
              <Image
                src={song.cover || "/placeholder.svg"}
                alt={song.title}
                width={300}
                height={300}
                className="object-cover aspect-square"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="ghost" className="rounded-full bg-white/20 hover:bg-white/30">
                  <Play className="h-6 w-6 text-white" />
                  <span className="sr-only">Play {song.title}</span>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className={`rounded-full bg-white/20 hover:bg-white/30 ${song.liked ? "text-red-500" : "text-white"}`}
                  onClick={() => handleLike(song, !song.liked)}
                >
                  <Heart className={`h-6 w-6 ${song.liked ? "fill-current" : ""}`} />
                  <span className="sr-only">
                    {song.liked ? "Unlike" : "Like"} {song.title}
                  </span>
                </Button>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-medium truncate">{song.title}</h3>
              <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
            </div>
          </CardContent>
        </Card>
      ))}

      {loading && (
        <div className="col-span-full flex justify-center py-4">
          <div className="animate-pulse text-muted-foreground">Loading more songs...</div>
        </div>
      )}

      {!hasMore && releases.length > 0 && (
        <div className="col-span-full text-center py-4 text-sm text-muted-foreground">
          You've reached the end of new releases
        </div>
      )}
    </div>
  )
}
