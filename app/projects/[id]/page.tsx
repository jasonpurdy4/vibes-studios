"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ArrowLeft, Calendar, Edit, Save, ThumbsUp, Upload, User } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  tags: z.string(),
  status: z.enum(["past", "current", "future", "proposed"]),
  imageUrl: z.string().optional(),
})

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
      status: "future" as const,
      imageUrl: "",
    },
  })

  useEffect(() => {
    const loadProject = () => {
      const savedProjects = localStorage.getItem("vibesProjects")
      if (savedProjects) {
        const allProjects = JSON.parse(savedProjects)

        // Search for the project in all categories
        const categories = ["past", "current", "future", "proposed"]
        let foundProject = null

        for (const category of categories) {
          const found = allProjects[category]?.find((p: any) => p.id === params.id)
          if (found) {
            foundProject = { ...found, category }
            break
          }
        }

        if (foundProject) {
          setProject(foundProject)
          setImagePreview(foundProject.image)

          // Set form values
          form.reset({
            title: foundProject.title,
            description: foundProject.description,
            tags: foundProject.tags.join(", "),
            status: foundProject.status,
            imageUrl: foundProject.image,
          })
        } else {
          // Project not found, redirect to projects page
          router.push("/projects")
        }
      }
      setIsLoading(false)
    }

    loadProject()
  }, [params.id, router, form])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL for preview
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setImagePreview(result)
        form.setValue("imageUrl", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!project) return

    const updatedProject = {
      ...project,
      title: values.title,
      description: values.description,
      tags: values.tags.split(",").map((tag: string) => tag.trim()),
      status: values.status,
      image: imagePreview || project.image,
    }

    // Update project in localStorage
    const savedProjects = localStorage.getItem("vibesProjects")
    if (savedProjects) {
      const allProjects = JSON.parse(savedProjects)

      // Remove from old category if status changed
      if (project.status !== values.status) {
        allProjects[project.status] = allProjects[project.status].filter((p: any) => p.id !== project.id)
      } else {
        // Update in current category
        const index = allProjects[project.status].findIndex((p: any) => p.id === project.id)
        if (index !== -1) {
          allProjects[project.status][index] = updatedProject
        }
      }

      // Add to new category if status changed
      if (project.status !== values.status) {
        if (!allProjects[values.status]) {
          allProjects[values.status] = []
        }
        allProjects[values.status].push(updatedProject)
      }

      localStorage.setItem("vibesProjects", JSON.stringify(allProjects))
    }

    setProject(updatedProject)
    setIsEditing(false)
    toast({
      title: "Project updated",
      description: "Your changes have been saved successfully.",
    })
  }

  const handleVote = () => {
    if (!project) return

    const updatedProject = {
      ...project,
      votes: (project.votes || 0) + 1,
    }

    // Update project in localStorage
    const savedProjects = localStorage.getItem("vibesProjects")
    if (savedProjects) {
      const allProjects = JSON.parse(savedProjects)
      const index = allProjects[project.status].findIndex((p: any) => p.id === project.id)
      if (index !== -1) {
        allProjects[project.status][index] = updatedProject
        localStorage.setItem("vibesProjects", JSON.stringify(allProjects))
      }
    }

    setProject(updatedProject)
    toast({
      title: "Vote recorded",
      description: "Thank you for your vote!",
    })
  }

  if (isLoading) {
    return (
      <div className="container py-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-pulse text-lg">Loading project details...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container py-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Project not found</h1>
            <p className="mt-4">The project you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="mt-6">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Button asChild variant="outline" size="sm">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="details">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              {project.status === "future" && !isEditing && (
                <Button variant="outline" size="sm" onClick={handleVote}>
                  <ThumbsUp className="mr-2 h-4 w-4" /> Vote ({project.votes || 0})
                </Button>
              )}
              <Button variant={isEditing ? "default" : "outline"} size="sm" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? (
                  <>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" /> Edit Project
                  </>
                )}
              </Button>
            </div>
          </div>

          <TabsList className="mb-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="edit" disabled={!isEditing}>
              Edit Project
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">{project.description}</p>
                  </CardContent>
                </Card>

                {project.status === "proposed" && project.budget > 0 && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Budget</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">${project.budget}</p>
                      <p className="text-muted-foreground mt-2">
                        This is the amount the proposer is willing to pay for this project.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Project Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-video w-full overflow-hidden rounded-md">
                      <Image
                        src={project.image || "/placeholder.svg?height=200&width=400"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Project Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Badge
                          variant="outline"
                          className={`
                            ${project.status === "past" ? "bg-green-100 text-green-800" : ""}
                            ${project.status === "current" ? "bg-blue-100 text-blue-800" : ""}
                            ${project.status === "future" ? "bg-yellow-100 text-yellow-800" : ""}
                            ${project.status === "proposed" ? "bg-purple-100 text-purple-800" : ""}
                          `}
                        >
                          {project.status === "past" && "Completed"}
                          {project.status === "current" && "In Progress"}
                          {project.status === "future" && "Upcoming"}
                          {project.status === "proposed" && "Proposed"}
                        </Badge>
                      </div>

                      {project.createdAt && (
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Added on {new Date(project.createdAt).toLocaleDateString()}</span>
                        </div>
                      )}

                      {project.proposedBy && (
                        <div className="flex items-center text-sm">
                          <User className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            Proposed by {project.proposerName || "Anonymous"} ({project.proposedBy})
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="edit">
            {isEditing && (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Project</CardTitle>
                  <CardDescription>Make changes to the project details below.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea className="min-h-32" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                              <Input placeholder="AI, Music, Wellness, etc. (comma separated)" {...field} />
                            </FormControl>
                            <FormDescription>Separate tags with commas.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="past">Completed</SelectItem>
                                <SelectItem value="current">In Progress</SelectItem>
                                <SelectItem value="future">Upcoming</SelectItem>
                                <SelectItem value="proposed">Proposed</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <FormLabel>Project Image</FormLabel>
                        <div className="mt-2">
                          <div className="relative aspect-video w-full overflow-hidden rounded-md mb-4">
                            <Image
                              src={imagePreview || "/placeholder.svg?height=200&width=400"}
                              alt="Project image preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex items-center">
                            <Input
                              type="file"
                              accept="image/*"
                              id="image-upload"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById("image-upload")?.click()}
                            >
                              <Upload className="mr-2 h-4 w-4" /> Upload New Image
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button type="submit">
                          <Save className="mr-2 h-4 w-4" /> Save Changes
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  )
}
