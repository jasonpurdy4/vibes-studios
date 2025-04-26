import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Code, Lightbulb, Users } from "lucide-react"
import Link from "next/link"

export default function EducationPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">AI Education & Training</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Empower your team with the knowledge and skills to leverage AI in your business. Our workshops and training
            programs are designed to help businesses understand and implement AI solutions.
          </p>
        </div>

        <div className="grid gap-12">
          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Learn AI Prototyping</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our hands-on workshops teach your team how to rapidly prototype AI-powered applications, turning ideas
                into functional demos in days, not months.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <p>Practical, hands-on learning with real-world applications</p>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <p>Customized curriculum based on your industry and needs</p>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <p>Learn to leverage the latest AI models and tools</p>
                </div>
              </div>
              <Button asChild className="mt-6">
                <Link href="/consulting">Schedule a Consultation</Link>
              </Button>
            </div>
            <div className="bg-muted rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <Code className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Hands-on Learning</h3>
                <p className="text-muted-foreground">
                  Our workshops focus on practical implementation, not just theory. You'll build real prototypes during
                  the training.
                </p>
              </div>
            </div>
          </div>

          {/* Programs Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Our Programs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Lightbulb className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>AI Fundamentals</CardTitle>
                  <CardDescription>For teams new to AI</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    A comprehensive introduction to AI concepts, capabilities, and limitations. Learn how AI can be
                    applied to your specific business challenges.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>AI/ML basics</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Use case identification</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Implementation strategies</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Code className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Rapid Prototyping</CardTitle>
                  <CardDescription>For developers and product teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Learn to quickly build functional AI prototypes using the latest tools and frameworks. Turn concepts
                    into demos in days, not months.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>API integration</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>UI/UX for AI applications</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Testing and iteration</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Executive Briefings</CardTitle>
                  <CardDescription>For leadership teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Strategic sessions for executives on how AI can transform your business, including ROI
                    considerations and implementation roadmaps.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Strategic planning</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>ROI analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Competitive landscape</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">What Our Clients Say</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <p className="italic">
                    "The AI prototyping workshop transformed how our team approaches innovation. We went from concept to
                    working demo in just two days. Incredible value."
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <span className="font-bold">JD</span>
                    </div>
                    <div>
                      <p className="font-semibold">Jane Doe</p>
                      <p className="text-sm text-muted-foreground">CTO, Tech Innovators Inc.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="italic">
                    "The executive briefing gave us clarity on how to strategically implement AI across our
                    organization. The roadmap they provided was invaluable."
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <span className="font-bold">MS</span>
                    </div>
                    <div>
                      <p className="font-semibold">Michael Smith</p>
                      <p className="text-sm text-muted-foreground">CEO, Future Forward Ltd.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-muted rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to empower your team with AI skills?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Schedule a consultation to discuss your specific needs and how our education programs can help your
              business leverage AI effectively.
            </p>
            <Button asChild size="lg">
              <Link href="/consulting">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
