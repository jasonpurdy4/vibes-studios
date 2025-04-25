"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Project title must be at least 3 characters.",
    })
    .max(50, {
      message: "Project title must not exceed 50 characters.",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  tags: z.string().optional(),
  budget: z
    .string()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Budget must be a valid number",
    })
    .transform((val) => (val ? Number(val) : 0)),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function ProposePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
      budget: "",
      name: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Process the form data
    const newProject = {
      id: `proposal-${Date.now()}`, // Generate a unique ID
      title: values.title,
      description: values.description,
      tags: values.tags ? values.tags.split(",").map((tag) => tag.trim()) : [],
      budget: values.budget,
      votes: 0,
      proposedBy: values.email,
      proposerName: values.name,
      status: "proposed",
      image: "/placeholder.svg?height=200&width=400",
      createdAt: new Date().toISOString(),
    }

    // Add the new project to localStorage
    const savedProjects = localStorage.getItem("vibesProjects")
    if (savedProjects) {
      const allProjects = JSON.parse(savedProjects)
      allProjects.proposed = [...allProjects.proposed, newProject]
      localStorage.setItem("vibesProjects", JSON.stringify(allProjects))
    }

    // Reset form and show success message
    setTimeout(() => {
      setIsSubmitting(false)
      form.reset()
      toast({
        title: "Project proposal submitted!",
        description: "Thank you for your contribution to Vibes Studios.",
      })
    }, 1000)
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Propose a Project</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have an idea for a vibe coding project? Share it with the community and it might become the next big thing!
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Proposal</CardTitle>
            <CardDescription>
              Fill out the form below to submit your project idea. The community will be able to vote on it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a catchy title for your project" {...field} />
                      </FormControl>
                      <FormDescription>This will be the main title displayed for your project.</FormDescription>
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
                        <Textarea
                          placeholder="Describe your project idea, its purpose, and how it relates to vibe coding"
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Provide enough detail for others to understand your vision.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="AI, Music, Wellness, etc. (comma separated)" {...field} />
                      </FormControl>
                      <FormDescription>Add relevant tags to categorize your project.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget (USD)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="How much are you willing to pay for this project?"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the amount you're willing to pay for this project (optional).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Proposal"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}
