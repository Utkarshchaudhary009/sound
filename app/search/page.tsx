import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, Play, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MobileNav } from "@/components/mobile-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock search results
const searchResults = {
  songs: [
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
      title: "Perfect",
      artist: "Ed Sheeran",
      album: "÷ (Divide)",
      cover: "/placeholder.svg?height=80&width=80",
      duration: "4:23",
    },
    {
      id: "3",
      title: "Thinking Out Loud",
      artist: "Ed Sheeran",
      album: "x (Multiply)",
      cover: "/placeholder.svg?height=80&width=80",
      duration: "4:41",
    },
    {
      id: "4",
      title: "Photograph",
      artist: "Ed Sheeran",
      album: "x (Multiply)",
      cover: "/placeholder.svg?height=80&width=80",
      duration: "4:19",
    },
    {
      id: "5",
      title: "Bad Habits",
      artist: "Ed Sheeran",
      album: "=",
      cover: "/placeholder.svg?height=80&width=80",
      duration: "3:51",
    },
  ],
  artists: [
    {
      id: "1",
      name: "Ed Sheeran",
      image: "/placeholder.svg?height=200&width=200&text=Ed+Sheeran",
      followers: "85.4M",
    },
  ],
  albums: [
    {
      id: "1",
      title: "÷ (Divide)",
      artist: "Ed Sheeran",
      cover: "/placeholder.svg?height=200&width=200&text=Divide",
      year: "2017",
    },
    {
      id: "2",
      title: "x (Multiply)",
      artist: "Ed Sheeran",
      cover: "/placeholder.svg?height=200&width=200&text=Multiply",
      year: "2014",
    },
    {
      id: "3",
      title: "= (Equals)",
      artist: "Ed Sheeran",
      cover: "/placeholder.svg?height=200&width=200&text=Equals",
      year: "2021",
    },
  ],
}

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || ""

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
          <h1 className="text-2xl font-bold">Search Results</h1>
        </div>

        <form action="/search" className="relative mb-6">
          <Input
            type="search"
            name="q"
            placeholder="Search songs, artists, albums..."
            defaultValue={query}
            className="h-12 pl-10 pr-4 rounded-full"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
          <Button type="submit" size="sm" className="absolute right-1.5 top-1.5 rounded-full px-4">
            Search
          </Button>
        </form>

        {query ? (
          <Tabs defaultValue="songs">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="songs">Songs</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
            </TabsList>

            <TabsContent value="songs" className="space-y-4">
              {searchResults.songs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                >
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
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" asChild>
                        <Link href={`/download/${song.id}`}>
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download {song.title}</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="artists" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.artists.map((artist) => (
                <Link key={artist.id} href={`/artist/${artist.id}`} className="block group">
                  <div className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="relative w-32 h-32 mb-3 overflow-hidden rounded-full">
                      <Image
                        src={artist.image || "/placeholder.svg"}
                        alt={artist.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="font-medium">{artist.name}</h3>
                    <p className="text-sm text-muted-foreground">{artist.followers} followers</p>
                  </div>
                </Link>
              ))}
            </TabsContent>

            <TabsContent value="albums" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.albums.map((album) => (
                <Link key={album.id} href={`/album/${album.id}`} className="block group">
                  <div className="flex flex-col p-4 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="relative aspect-square mb-3 overflow-hidden rounded-md">
                      <Image
                        src={album.cover || "/placeholder.svg"}
                        alt={album.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="font-medium truncate">{album.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{album.artist}</p>
                    <p className="text-xs text-muted-foreground">{album.year}</p>
                  </div>
                </Link>
              ))}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Enter a search term to find songs, artists, and albums</p>
          </div>
        )}
      </main>
    </div>
  )
}
