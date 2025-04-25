"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProjectCard from "@/components/project-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Vote } from "lucide-react"

// Default projects data (used if no localStorage data is available)
const defaultProjectsData = {
  past: [
    {
      id: "1",
      title: "Mood Music Generator",
      description: "An AI-powered music generator that creates custom tracks based on your current mood and vibe.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["AI", "Music", "Emotion"],
      votes: 0,
      status: "past",
    },
    {
      id: "2",
      title: "Vibe Check Dashboard",
      description:
        "A personal dashboard that helps you track your emotional state and productivity throughout the day.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Dashboard", "Productivity", "Wellness"],
      votes: 0,
      status: "past",
    },
  ],
  current: [
    {
      id: "3",
      title: "Resonance Social Network",
      description:
        "A social platform that connects people based on their emotional and creative wavelengths rather than traditional metrics.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Social", "Connection", "Community"],
      votes: 0,
      status: "current",
    },
  ],
  future: [
    {
      id: "4",
      title: "Ambient Workspace",
      description:
        "An adaptive workspace environment that adjusts lighting, sound, and interface based on your current task and mood.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Workspace", "Ambient", "Adaptive"],
      votes: 42,
      status: "future",
    },
    {
      id: "5",
      title: "Emotional Code Analyzer",
      description:
        "A tool that analyzes code not just for efficiency and bugs, but for its emotional impact and developer experience.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Developer Tools", "Analysis", "Experience"],
      votes: 28,
      status: "future",
    },
    {
      id: "6",
      title: "Vibe Collaboration Suite",
      description:
        "A set of tools designed to enhance remote collaboration by focusing on emotional synchronization between team members.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Collaboration", "Remote Work", "Team"],
      votes: 15,
      status: "future",
    },
  ],
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState(defaultProjectsData)

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem("vibesProjects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }, [])

  const handleVote = (category: "past" | "current" | "future", id: string) => {
    setProjects((prev) => {
      const updatedCategory = [...prev[category]]
      const index = updatedCategory.findIndex((project) => project.id === id)
      if (index !== -1) {
        updatedCategory[index] = {
          ...updatedCategory[index],
          votes: updatedCategory[index].votes + 1,
        }
      }

      const updatedProjects = {
        ...prev,
        [category]: updatedCategory,
      }

      // Save to localStorage
      localStorage.setItem("vibesProjects", JSON.stringify(updatedProjects))

      return updatedProjects
    })
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Explore my vibe coding journey through past, present, and future projects.
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/propose">
              <Vote className="mr-2 h-4 w-4" /> Propose a Project
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="all" className="mt-8">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="current">In Progress</TabsTrigger>
            <TabsTrigger value="future">Upcoming</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid gap-8">
              {projects.past.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Completed Projects</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.past.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        category="past"
                        onVote={() => {}} // No voting for past projects
                        showVoteButton={false}
                      />
                    ))}
                  </div>
                </div>
              )}

              {projects.current.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">In Progress</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.current.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        category="current"
                        onVote={() => {}} // No voting for current projects
                        showVoteButton={false}
                      />
                    ))}
                  </div>
                </div>
              )}

              {projects.future.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Upcoming Projects</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.future.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        category="future"
                        onVote={() => handleVote("future", project.id)}
                        showVoteButton={true}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.past.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  category="past"
                  onVote={() => {}} // No voting for past projects
                  showVoteButton={false}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="current">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.current.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  category="current"
                  onVote={() => {}} // No voting for current projects
                  showVoteButton={false}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="future">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.future.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  category="future"
                  onVote={() => handleVote("future", project.id)}
                  showVoteButton={true}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
