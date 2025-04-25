import Link from "next/link"
import { ArrowRight, Code, Lightbulb, Sparkles, Vote } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import FeatureCard from "@/components/feature-card"
import ProjectsPreview from "@/components/projects-preview"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />

        <section className="container px-4 py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What is Vibe Coding?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Vibe coding is a revolutionary approach to software development that prioritizes the emotional and
              experiential aspects of code. It's about creating applications that not only function well but also
              resonate with users on a deeper level.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              At Vibes Studios, I explore the intersection of technical excellence and emotional intelligence, crafting
              digital experiences that feel just right.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/projects">
                  Explore My Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container px-4 py-12 md:py-24 bg-muted/50">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-12">The Vibe Coding Journey</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<Code className="h-10 w-10" />}
                title="Past Vibes"
                description="Explore completed projects that showcase the evolution of vibe coding techniques and principles."
              />
              <FeatureCard
                icon={<Sparkles className="h-10 w-10" />}
                title="Current Flow"
                description="See what's currently in development and follow along with the creative process in real-time."
              />
              <FeatureCard
                icon={<Lightbulb className="h-10 w-10" />}
                title="Future Energy"
                description="Discover planned projects, suggest your own ideas, and vote on what should be built next."
              />
            </div>
          </div>
        </section>

        <section className="container px-4 py-12 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
              <Button asChild variant="outline" className="mt-4 md:mt-0">
                <Link href="/projects">View All Projects</Link>
              </Button>
            </div>
            <ProjectsPreview />
            <div className="mt-12 text-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/propose">
                  <Vote className="mr-2 h-4 w-4" /> Propose a Project
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
