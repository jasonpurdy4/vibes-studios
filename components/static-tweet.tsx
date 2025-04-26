import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Heart, MessageCircle, Repeat } from "lucide-react"

interface StaticTweetProps {
  author: {
    name: string
    username: string
    image: string
  }
  content: string
  date: string
  stats?: {
    likes?: number
    retweets?: number
    replies?: number
  }
  url: string
  className?: string
}

export default function StaticTweet({ author, content, date, stats, url, className = "" }: StaticTweetProps) {
  return (
    <Card className={`max-w-xl mx-auto ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={author.image || "/placeholder.svg"} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{author.name}</div>
            <div className="text-sm text-muted-foreground">@{author.username}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-base mb-2 whitespace-pre-wrap">{content}</p>
        <p className="text-sm text-muted-foreground">{date}</p>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex justify-between w-full text-muted-foreground">
          {stats && (
            <>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">{stats.replies || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Repeat className="h-4 w-4" />
                <span className="text-xs">{stats.retweets || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span className="text-xs">{stats.likes || 0}</span>
              </div>
            </>
          )}
          <Button variant="ghost" size="sm" asChild className="text-xs ml-auto">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-1" /> View on X
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
