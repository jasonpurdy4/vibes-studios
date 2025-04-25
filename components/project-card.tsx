"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ThumbsUp } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  image?: string
  tags: string[]
  votes: number
}

interface ProjectCardProps {
  project: Project
  category: "past" | "current" | "future"
  onVote: () => void
  showVoteButton: boolean
}

export default function ProjectCard({ project, category, onVote, showVoteButton }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={project.image || "/placeholder.svg?height=200&width=400"}
          alt={project.title}
          fill
          className="object-cover"
        />
        {category === "current" && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600">
              In Progress
            </Badge>
          </div>
        )}
        {category === "future" && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-yellow-500 text-white hover:bg-yellow-600">
              Upcoming
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Button variant="ghost" size="sm">
          View Details
        </Button>
        {showVoteButton && (
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={onVote}>
            <ThumbsUp className="h-3 w-3" />
            <span>{project.votes}</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
