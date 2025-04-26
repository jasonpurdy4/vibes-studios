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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Code, Lightbulb, Sparkles } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  serviceType: z.enum(["project", "consulting", "training"], {
    required_error: "Please select a service type.",
  }),
  budget: z
    .string()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Budget must be a valid number",
    })
    .transform((val) => (val ? Number(val) : 0)),
  message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(500, {
      message: "Message must not exceed 500 characters.",
    }),
})

export default function ConsultingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      serviceType: undefined,
      budget: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Process the form data
    console.log(values)

    // Reset form and show success message
    setTimeout(() => {
      setIsSubmitting(false)
      form.reset()
      toast({
        title: "Inquiry submitted!",
        description: "Thank you for your interest. We'll be in touch soon.",
      })
    }, 1000)
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Work With Us</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Partner with Vibes Studios to bring your vision to life. Whether you need a custom project, strategic
            consulting, or team training, we're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Services</h2>

            <div className="space-y-8">
              <div className="flex">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Custom Projects</h3>
                  <p className="text-muted-foreground mt-2">
                    From concept to completion, we build custom applications that embody the principles of vibe coding,
                    creating experiences that resonate with users.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Strategic Consulting</h3>
                  <p className="text-muted-foreground mt-2">
                    Get expert guidance on implementing AI and emerging technologies in your business, with a focus on
                    creating meaningful user experiences.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Team Training</h3>
                  <p className="text-muted-foreground mt-2">
                    Empower your team with workshops and training programs focused on AI implementation, rapid
                    prototyping, and vibe coding principles.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-bold">Why Choose Us?</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <p>Focus on emotional intelligence in technology</p>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <p>Expertise in cutting-edge AI and development tools</p>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <p>Rapid prototyping and iterative development approach</p>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <p>Commitment to creating meaningful digital experiences</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Fill out the form below to discuss your project or inquire about our services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
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
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="project">Custom Project</SelectItem>
                              <SelectItem value="consulting">Strategic Consulting</SelectItem>
                              <SelectItem value="training">Team Training</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Select the type of service you're interested in.</FormDescription>
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
                            <Input type="number" placeholder="Your estimated budget" {...field} />
                          </FormControl>
                          <FormDescription>Enter your estimated budget for this project (optional).</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your project or inquiry"
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Provide details about your needs and goals.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
