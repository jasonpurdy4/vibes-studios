"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"

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
import { Check, ArrowLeft, Loader2 } from "lucide-react"
import { Elements } from "@stripe/react-stripe-js"
import { stripePromise } from "@/lib/stripe"
import { createPaymentIntent } from "@/app/actions/payment"
import { PaymentElement, AddressElement, useStripe, useElements } from "@stripe/react-stripe-js"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  projectIdea: z
    .string()
    .min(10, {
      message: "Project idea must be at least 10 characters.",
    })
    .max(1000, {
      message: "Project idea must not exceed 1000 characters.",
    }),
  budget: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Budget must be a valid number",
    })
    .transform((val) => (val ? Number(val) : 0)),
})

function PaymentForm({
  clientSecret,
  amount,
  onSuccess,
  onCancel,
}: {
  clientSecret: string
  amount: number
  onSuccess: () => void
  onCancel: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage(undefined)

    // Process the payment with Stripe
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setIsProcessing(false)
    } else {
      // Payment succeeded - this code won't run as the page will redirect
      onSuccess()
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Complete Your Payment</CardTitle>
        <CardDescription>You're paying ${amount.toLocaleString()} for your project</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <PaymentElement />
            <AddressElement options={{ mode: "billing" }} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isProcessing}>
            Cancel
          </Button>
          <Button type="submit" disabled={!stripe || isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              `Pay $${amount.toLocaleString()}`
            )}
          </Button>
        </CardFooter>
        {errorMessage && <p className="text-destructive text-center mt-4">{errorMessage}</p>}
      </form>
    </Card>
  )
}

export default function ConsultingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState<"form" | "payment" | "success">("form")
  const [paymentDetails, setPaymentDetails] = useState<{
    clientSecret: string
    amount: number
  } | null>(null)
  const [projectDetails, setProjectDetails] = useState<{
    name: string
    email: string
    projectIdea: string
    budget: number
  } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      projectIdea: "",
      budget: "0",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Store project details
    setProjectDetails({
      name: values.name,
      email: values.email,
      projectIdea: values.projectIdea,
      budget: values.budget,
    })

    try {
      // If budget is $0, skip payment
      if (values.budget <= 0) {
        // Submit project without payment
        handleFreeProject(values)
      } else {
        // Create payment intent for paid projects
        const result = await createPaymentIntent(values.budget, values.email)

        if (result.success && result.clientSecret) {
          setPaymentDetails({
            clientSecret: result.clientSecret,
            amount: values.budget,
          })
          setCurrentStep("payment")
        } else {
          toast({
            title: "Error",
            description: result.error || "Something went wrong. Please try again.",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Error processing submission:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleFreeProject(values: z.infer<typeof formSchema>) {
    // For free projects, just show success message
    toast({
      title: "Project Submitted!",
      description: "Thanks for your project idea! We'll review it and get back to you soon.",
    })
    setCurrentStep("success")
  }

  function handlePaymentSuccess() {
    setCurrentStep("success")
  }

  function handlePaymentCancel() {
    setCurrentStep("form")
    setPaymentDetails(null)
  }

  function handleStartOver() {
    form.reset()
    setCurrentStep("form")
    setPaymentDetails(null)
    setProjectDetails(null)
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Tell Me What To Build</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have an idea for a project? Let me build it for you! Share your vision and set your budget - even $0 is
            perfectly fine.
          </p>
        </div>

        {currentStep === "form" && (
          <Card>
            <CardHeader>
              <CardTitle>Project Proposal</CardTitle>
              <CardDescription>
                Describe what you want built and how much you're willing to pay. No budget? No problem - $0 is
                absolutely acceptable!
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
                        <FormLabel>Your Name</FormLabel>
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
                    name="projectIdea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What can we build together?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your project idea in detail. What should it do? What problem does it solve?"
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Be as specific as possible about what you want built.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Budget (USD)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" placeholder="0" {...field} />
                        </FormControl>
                        <FormDescription>
                          How much are you willing to pay for this project? $0 is perfectly acceptable!
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                      </>
                    ) : (
                      "Submit Project Idea"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {currentStep === "payment" && paymentDetails && (
          <div>
            <Button variant="outline" className="mb-6" onClick={handlePaymentCancel}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Form
            </Button>

            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: paymentDetails.clientSecret,
                appearance: {
                  theme: "stripe",
                  variables: {
                    colorPrimary: "#6d28d9",
                    colorBackground: "#ffffff",
                    colorText: "#1f2937",
                  },
                },
              }}
            >
              <PaymentForm
                clientSecret={paymentDetails.clientSecret}
                amount={paymentDetails.amount}
                onSuccess={handlePaymentSuccess}
                onCancel={handlePaymentCancel}
              />
            </Elements>
          </div>
        )}

        {currentStep === "success" && projectDetails && (
          <Card>
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-center">Project Submitted Successfully!</CardTitle>
              <CardDescription className="text-center">
                Thank you for your project idea{projectDetails.budget > 0 ? " and payment" : ""}!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Project Details:</h3>
                <p className="mt-1 whitespace-pre-wrap">{projectDetails.projectIdea}</p>
              </div>
              {projectDetails.budget > 0 && (
                <div>
                  <h3 className="font-medium">Budget:</h3>
                  <p className="mt-1">${projectDetails.budget.toLocaleString()}</p>
                </div>
              )}
              <p className="text-muted-foreground">
                We'll review your project idea and get back to you at {projectDetails.email} soon.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStartOver} className="w-full">
                Submit Another Project
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="font-bold text-primary">1</span>
                </div>
                <h3 className="font-bold mb-2">Share Your Idea</h3>
                <p className="text-muted-foreground">Describe what you want built in as much detail as possible.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="font-bold text-primary">2</span>
                </div>
                <h3 className="font-bold mb-2">Set Your Budget</h3>
                <p className="text-muted-foreground">Decide how much you're willing to pay - even $0 is fine!</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="font-bold text-primary">3</span>
                </div>
                <h3 className="font-bold mb-2">Get Your Project</h3>
                <p className="text-muted-foreground">
                  I'll review your idea and build it according to your specifications.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Can I really pay $0?</h3>
                <p className="text-muted-foreground mt-1">
                  I'm happy to consider projects with no budget. I select projects based on interest and learning
                  opportunity.
                </p>
              </div>
              <div>
                <h3 className="font-bold">What types of projects do you build?</h3>
                <p className="text-muted-foreground mt-1">
                  I specialize in web applications, AI integrations, and interactive experiences. If you're unsure if
                  your idea fits, just ask!
                </p>
              </div>
              <div>
                <h3 className="font-bold">How long does it take to build a project?</h3>
                <p className="text-muted-foreground mt-1">
                  Timeline depends on project complexity and current workload. After reviewing your idea, I'll provide
                  an estimated completion date.
                </p>
              </div>
              <div>
                <h3 className="font-bold">What happens after I submit my idea?</h3>
                <p className="text-muted-foreground mt-1">
                  I'll review your submission and reach out via email to discuss details, clarify requirements, and
                  confirm next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
