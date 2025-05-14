"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Heart, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { likeTrack } from "@/lib/actions"

// Mock data for recommended songs
const recommendedSongs = [
  {
    id: "1",
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    cover: "/placeholder.svg?height=80&width=80",
    duration: "3:54",
    liked: false,
  },
  {
    id: "2",
    title: "Dance Monkey",
    artist: "Tones and I",
    album: "The Kids Are Coming",
    cover: "/placeholder.svg?height=80&width=80",
    duration: "3:29",
    liked: true,
  },
  {
    id: "3",
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    album: "Divinely Uninspired To A Hellish Extent",
    cover: "/placeholder.svg?height=80&width=80",
    duration: "3:02",
    liked: false,
  },
  {
    id: "4",
    title: "Bad Guy",
    artist: "Billie Eilish",
    album: "When We All Fall Asleep, Where Do We Go?",
    cover: "/placeholder.svg?height=80&width=80",
    duration: "3:14",
    liked: false,
  },
  {
    id: "5",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    cover: "/placeholder.svg?height=80&width=80",
    duration: "2:54",
    liked: true,
  },
  {
    id: "6",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    cover: "/placeholder.svg?height=80&width=80",
    duration: "3:23",
    liked: false,
  },
  {
    id: "7",
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    album: "F*CK LOVE 3: OVER YOU",
    cover: "/placeholder.svg?height=80&width=80",
    duration: "2:21",
    liked: false,
  },
  {
    id: "8",
    title: "Montero (Call Me By Your Name)",
    artist: "Lil Nas X",
    album: "Montero",
    cover: "/placeholder.svg?height=80&width=80",
    duration: "2:17",
    liked: true,
  },
]

export function RecommendedSongs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollSpeed = 0.5 // pixels per frame
  const [songs, setSongs] = useState(recommendedSongs)
  const { toast } = useToast()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrameId: number
    let lastTimestamp: number

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp
      const elapsed = timestamp - lastTimestamp

      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + (scrollSpeed * elapsed) / 16

        // Reset when all items have scrolled
        if (newPosition > container.scrollHeight / 2) {
          return 0
        }

        return newPosition
      })

      lastTimestamp = timestamp
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const handleLike = async (song: any, isLiked: boolean) => {
    try {
      await likeTrack(song, isLiked)

      // Update local state
      setSongs((prev) => prev.map((item) => (item.id === song.id ? { ...item, liked: isLiked } : item)))

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

  // Duplicate the songs to create a seamless loop
  const displaySongs = [...songs, ...songs]

  return (
    <div className="relative overflow-hidden h-[400px] md:h-[500px]">
      <div
        ref={containerRef}
        className="absolute w-full transition-transform duration-1000"
        style={{ transform: `translateY(-${scrollPosition}px)` }}
      >
        {displaySongs.map((song, index) => (
          <Card key={`${song.id}-${index}`} className="mb-3 overflow-hidden hover:bg-accent/50 transition-colors">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <Image
                  src={song.cover || "/placeholder.svg"}
                  alt={song.title}
                  width={60}
                  height={60}
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-grow min-w-0">
                <h3 className="font-medium truncate">{song.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                <p className="text-xs text-muted-foreground truncate">{song.album}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground hidden sm:inline-block">{song.duration}</span>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                    <Play className="h-4 w-4" />
                    <span className="sr-only">Play {song.title}</span>
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`h-8 w-8 rounded-full ${song.liked ? "text-red-500" : ""}`}
                    onClick={() => handleLike(song, !song.liked)}
                  >
                    <Heart className={`h-4 w-4 ${song.liked ? "fill-current" : ""}`} />
                    <span className="sr-only">
                      {song.liked ? "Unlike" : "Like"} {song.title}
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
