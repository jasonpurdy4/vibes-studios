"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ThumbsUp } from "lucide-react"

// This would typically come from a database
const projectsData = [
  {
    id: "1",
    title: "Mood Music Generator",
    description: "An AI-powered music generator that creates custom tracks based on your current mood and vibe.",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["AI", "Music", "Emotion"],
    status: "past",
  },
  {
    id: "3",
    title: "Resonance Social Network",
    description:
      "A social platform that connects people based on their emotional and creative wavelengths rather than traditional metrics.",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Social", "Connection", "Community"],
    status: "current",
  },
  {
    id: "4",
    title: "Ambient Workspace",
    description:
      "An adaptive workspace environment that adjusts lighting, sound, and interface based on your current task and mood.",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Workspace", "Ambient", "Adaptive"],
    status: "future",
    votes: 42,
  },
]

export default function ProjectsPreview() {
  const [projects, setProjects] = useState(projectsData)

  const handleVote = (id: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id && project.status === "future" ? { ...project, votes: (project.votes || 0) + 1 } : project,
      ),
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            {project.status === "current" && (
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600">
                  In Progress
                </Badge>
              </div>
            )}
            {project.status === "future" && (
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-yellow-500 text-white hover:bg-yellow-600">
                  Upcoming
                </Badge>
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold mb-2">{project.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <Button asChild variant="ghost" size="sm">
              <Link href={`/projects?tab=${project.status}`}>View Details</Link>
            </Button>
            {project.status === "future" && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleVote(project.id)}
              >
                <ThumbsUp className="h-3 w-3" />
                <span>{project.votes || 0}</span>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
