"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ExternalLink, Heart, MessageCircle, Repeat } from "lucide-react"

interface TweetEmbedProps {
  tweetUrl: string
  className?: string
  fallbackData?: {
    authorName: string
    authorUsername: string
    authorImage: string
    content: string
    date: string
    likes?: number
    retweets?: number
    replies?: number
  }
}

export default function TweetEmbed({
  tweetUrl,
  className,
  fallbackData = {
    authorName: "Andrej Karpathy",
    authorUsername: "karpathy",
    authorImage: "https://pbs.twimg.com/profile_images/1296667294148382721/9Pr_1ms1_400x400.jpg",
    content:
      "I think the most underrated aspect of AI is that it will help us understand ourselves better. We're building these systems in our image, and the process of doing so is forcing us to formalize and understand our own intelligence, consciousness, and values.",
    date: "Nov 1, 2023",
    likes: 12453,
    retweets: 2134,
    replies: 342,
  },
}: TweetEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Try to load Twitter widgets script
    if (!document.getElementById("twitter-widgets-script")) {
      const script = document.createElement("script")
      script.id = "twitter-widgets-script"
      script.src = "https://platform.twitter.com/widgets.js"
      script.async = true

      script.onload = () => {
        if (window.twttr) {
          try {
            window.twttr.widgets.load()
            setIsLoaded(true)
          } catch (e) {
            console.error("Error loading Twitter widgets:", e)
            setError(true)
          }
        }
      }

      script.onerror = () => {
        console.error("Failed to load Twitter widgets script")
        setError(true)
      }

      document.body.appendChild(script)
    } else if (window.twttr) {
      try {
        window.twttr.widgets.load()
        setIsLoaded(true)
      } catch (e) {
        console.error("Error loading Twitter widgets:", e)
        setError(true)
      }
    }

    return () => {
      // Cleanup if needed
    }
  }, [tweetUrl])

  // If we have an error or while loading, show the fallback
  if (error || !isLoaded) {
    return (
      <Card className={`max-w-xl mx-auto ${className}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={fallbackData.authorImage || "/placeholder.svg"} alt={fallbackData.authorName} />
              <AvatarFallback>{fallbackData.authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{fallbackData.authorName}</div>
              <div className="text-sm text-muted-foreground">@{fallbackData.authorUsername}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base mb-2">{fallbackData.content}</p>
          <p className="text-sm text-muted-foreground">{fallbackData.date}</p>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex justify-between w-full text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{fallbackData.replies}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Repeat className="h-4 w-4" />
              <span className="text-xs">{fallbackData.retweets}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span className="text-xs">{fallbackData.likes}</span>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-xs">
              <a href={tweetUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" /> View on X
              </a>
            </Button>
          </div>
        </CardFooter>
      </Card>
    )
  }

  // If Twitter widgets loaded successfully, try to render the tweet
  return (
    <div className={className}>
      <blockquote className="twitter-tweet" data-dnt="true">
        <a href={tweetUrl}>Loading tweet...</a>
      </blockquote>
      {/* Fallback in case Twitter widgets don't render properly */}
      <div className="mt-2 text-center text-sm text-muted-foreground">
        <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
          View tweet on X
        </a>
      </div>
    </div>
  )
}

// Add TypeScript interface for the Twitter widgets
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void
      }
    }
  }
}
