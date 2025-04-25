"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Clock, Lightbulb } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// This would typically come from a database
const initialProjects = {
  past: [
    {
      id: "1",
      title: "Mood Music Generator",
      description: "An AI-powered music generator that creates custom tracks based on your current mood and vibe.",
      tags: ["AI", "Music", "Emotion"],
      votes: 0,
    },
    {
      id: "2",
      title: "Vibe Check Dashboard",
      description:
        "A personal dashboard that helps you track your emotional state and productivity throughout the day.",
      tags: ["Dashboard", "Productivity", "Wellness"],
      votes: 0,
    },
  ],
  current: [
    {
      id: "3",
      title: "Resonance Social Network",
      description:
        "A social platform that connects people based on their emotional and creative wavelengths rather than traditional metrics.",
      tags: ["Social", "Connection", "Community"],
      votes: 0,
    },
  ],
  future: [
    {
      id: "4",
      title: "Ambient Workspace",
      description:
        "An adaptive workspace environment that adjusts lighting, sound, and interface based on your current task and mood.",
      tags: ["Workspace", "Ambient", "Adaptive"],
      votes: 42,
    },
    {
      id: "5",
      title: "Emotional Code Analyzer",
      description:
        "A tool that analyzes code not just for efficiency and bugs, but for its emotional impact and developer experience.",
      tags: ["Developer Tools", "Analysis", "Experience"],
      votes: 28,
    },
    {
      id: "6",
      title: "Vibe Collaboration Suite",
      description:
        "A set of tools designed to enhance remote collaboration by focusing on emotional synchronization between team members.",
      tags: ["Collaboration", "Remote Work", "Team"],
      votes: 15,
    },
  ],
  proposed: [
    {
      id: "7",
      title: "Emotional API",
      description: "An API that allows developers to integrate emotional intelligence into their applications.",
      tags: ["API", "Developer Tools", "Emotion"],
      votes: 5,
      proposedBy: "jane@example.com",
    },
    {
      id: "8",
      title: "Vibe Visualization Tool",
      description: "A tool that visualizes the emotional impact of different design choices in real-time.",
      tags: ["Design", "Visualization", "UX"],
      votes: 12,
      proposedBy: "mark@example.com",
    },
  ],
}

export default function AdminPage() {
  const [projects, setProjects] = useState(initialProjects)

  const handleDragEnd = (result: any) => {
    const { source, destination } = result

    // Dropped outside the list
    if (!destination) {
      return
    }

    // Same position
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return
    }

    // Get the project from source
    const sourceList = [...projects[source.droppableId as keyof typeof projects]]
    const [removed] = sourceList.splice(source.index, 1)

    // If moving to a different list
    if (source.droppableId !== destination.droppableId) {
      const destinationList = [...projects[destination.droppableId as keyof typeof projects]]
      destinationList.splice(destination.index, 0, removed)

      setProjects({
        ...projects,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destinationList,
      })

      toast({
        title: "Project moved",
        description: `"${removed.title}" moved to ${destination.droppableId} category.`,
      })
    } else {
      // Same list, different position
      sourceList.splice(destination.index, 0, removed)
      setProjects({
        ...projects,
        [source.droppableId]: sourceList,
      })
    }
  }

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "rgba(0, 0, 0, 0.05)" : "",
    padding: 8,
    borderRadius: 4,
  })

  const getItemStyle = (isDragging: boolean) => ({
    userSelect: "none",
    opacity: isDragging ? 0.8 : 1,
  })

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Project Management</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Drag and drop projects between categories to update their status.
          </p>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Past Projects */}
            <div>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    <CardTitle>Completed</CardTitle>
                  </div>
                  <CardDescription>Projects that have been finished</CardDescription>
                </CardHeader>
                <CardContent>
                  <Droppable droppableId="past">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        className="min-h-[200px]"
                      >
                        {projects.past.map((project, index) => (
                          <Draggable key={project.id} draggableId={project.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  ...getItemStyle(snapshot.isDragging),
                                }}
                                className="mb-3 p-3 bg-background border rounded-md"
                              >
                                <h3 className="font-medium">{project.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </div>

            {/* Current Projects */}
            <div>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-blue-500" />
                    <CardTitle>In Progress</CardTitle>
                  </div>
                  <CardDescription>Projects currently being worked on</CardDescription>
                </CardHeader>
                <CardContent>
                  <Droppable droppableId="current">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        className="min-h-[200px]"
                      >
                        {projects.current.map((project, index) => (
                          <Draggable key={project.id} draggableId={project.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  ...getItemStyle(snapshot.isDragging),
                                }}
                                className="mb-3 p-3 bg-background border rounded-md"
                              >
                                <h3 className="font-medium">{project.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </div>

            {/* Future Projects */}
            <div>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
                    <CardTitle>Upcoming</CardTitle>
                  </div>
                  <CardDescription>Planned projects for the future</CardDescription>
                </CardHeader>
                <CardContent>
                  <Droppable droppableId="future">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        className="min-h-[200px]"
                      >
                        {projects.future.map((project, index) => (
                          <Draggable key={project.id} draggableId={project.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  ...getItemStyle(snapshot.isDragging),
                                }}
                                className="mb-3 p-3 bg-background border rounded-md"
                              >
                                <h3 className="font-medium">{project.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-muted-foreground">Votes: {project.votes}</span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </div>

            {/* Proposed Projects */}
            <div>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center">
                    <ArrowRight className="mr-2 h-5 w-5 text-purple-500" />
                    <CardTitle>Proposed</CardTitle>
                  </div>
                  <CardDescription>Projects suggested by the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <Droppable droppableId="proposed">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        className="min-h-[200px]"
                      >
                        {projects.proposed.map((project, index) => (
                          <Draggable key={project.id} draggableId={project.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  ...getItemStyle(snapshot.isDragging),
                                }}
                                className="mb-3 p-3 bg-background border rounded-md"
                              >
                                <h3 className="font-medium">{project.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-muted-foreground">By: {project.proposedBy}</span>
                                  <span className="text-xs text-muted-foreground">Votes: {project.votes}</span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </div>
          </div>
        </DragDropContext>
      </div>
      <Toaster />
    </div>
  )
}
