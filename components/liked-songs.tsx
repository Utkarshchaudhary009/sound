"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { likeTrack } from "@/lib/actions"

// This would normally be fetched from your MongoDB database
const initialLikedSongs = [
  {
    id: "1",
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    cover: "/placeholder.svg?height=80&width=80",
    duration: "3:54",
  },
  {
    id: "2",
    title: "Dance Monkey",
    artist: "Tones and I",
    album: "The Kids Are Coming",
    cover: "/placeholder.svg?height=80&width=80",
    duration: "3:29",
  },
  {
    id: "3",
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    album: "Divinely Uninspired To A Hellish Extent",
    cover: "/placeholder.svg?height=80&width=80",
    duration: "3:02",
  },
]

export function LikedSongs() {
  const [likedSongs, setLikedSongs] = useState(initialLikedSongs)

  // In a real app, you would fetch the liked songs from your API
  useEffect(() => {
    // Example fetch call (commented out)
    // const fetchLikedSongs = async () => {
    //   const response = await fetch('/api/liked');
    //   const data = await response.json();
    //   setLikedSongs(data);
    // };
    // fetchLikedSongs();
  }, [])

  const handleUnlike = async (song: any) => {
    try {
      await likeTrack(song, false)
      setLikedSongs(likedSongs.filter((s) => s.id !== song.id))
    } catch (error) {
      console.error("Failed to unlike song:", error)
    }
  }

  return (
    <div className="space-y-4">
      {likedSongs.length > 0 ? (
        likedSongs.map((song) => (
          <Card key={song.id} className="overflow-hidden hover:bg-accent/50 transition-colors">
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
                    className="h-8 w-8 rounded-full text-red-500"
                    onClick={() => handleUnlike(song)}
                  >
                    <Heart className="h-4 w-4 fill-current" />
                    <span className="sr-only">Unlike {song.title}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">You haven't liked any songs yet.</p>
          <p className="text-muted-foreground mt-2">
            Start exploring and click the heart icon to add songs to your library.
          </p>
        </div>
      )}
    </div>
  )
}
