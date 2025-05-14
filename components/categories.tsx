"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"

// Mock data generator for categories
const generateMockCategories = (page: number, limit = 6) => {
  const categoryNames = [
    "Pop",
    "Hip Hop",
    "Rock",
    "Electronic",
    "R&B",
    "Indie",
    "Jazz",
    "Classical",
    "Country",
    "Reggae",
    "Metal",
    "Folk",
    "Blues",
    "Soul",
    "Funk",
    "Disco",
    "Techno",
    "House",
    "Ambient",
    "Punk",
    "Alternative",
    "K-Pop",
    "Latin",
    "Afrobeat",
  ]

  return Array.from({ length: limit }, (_, i) => {
    const index = (page * limit + i) % categoryNames.length
    return {
      id: `cat-${page}-${i + 1}`,
      name: categoryNames[index],
      cover: `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(categoryNames[index])}`,
      color: [
        "bg-pink-500",
        "bg-purple-500",
        "bg-red-500",
        "bg-blue-500",
        "bg-yellow-500",
        "bg-green-500",
        "bg-indigo-500",
        "bg-orange-500",
        "bg-teal-500",
        "bg-cyan-500",
        "bg-rose-500",
        "bg-emerald-500",
      ][index % 12],
    }
  })
}

export function Categories() {
  const [categories, setCategories] = useState(generateMockCategories(0))
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastElementRef = useRef<HTMLAnchorElement | null>(null)

  const loadMoreCategories = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const nextPage = page + 1
    // Limit to 3 pages for demo purposes
    if (nextPage > 2) {
      setHasMore(false)
    } else {
      const newCategories = generateMockCategories(nextPage)
      setCategories((prev) => [...prev, ...newCategories])
      setPage(nextPage)
    }

    setLoading(false)
  }, [loading, hasMore, page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreCategories()
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
  }, [loadMoreCategories, hasMore])

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
  }, [categories])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((category, index) => (
        <Link
          key={category.id}
          href={`/category/${category.id}`}
          className="block transition-transform hover:scale-105"
          ref={index === categories.length - 1 ? lastElementRef : null}
        >
          <Card className="overflow-hidden rounded-xl border-0">
            <CardContent className="p-0">
              <div className={`relative h-[140px] ${category.color}`}>
                <Image
                  src={category.cover || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="font-bold text-white text-xl drop-shadow-md">{category.name}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}

      {loading && (
        <div className="col-span-full flex justify-center py-4">
          <div className="animate-pulse text-muted-foreground">Loading more categories...</div>
        </div>
      )}

      {!hasMore && categories.length > 0 && (
        <div className="col-span-full text-center py-4 text-sm text-muted-foreground">
          You've reached the end of categories
        </div>
      )}
    </div>
  )
}
