import Link from "next/link"
import { ArrowRight, Code, Lightbulb, Sparkles, Vote } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import FeatureCard from "@/components/feature-card"
import ProjectsPreview from "@/components/projects-preview"
import StaticTweet from "@/components/static-tweet"

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

          <div className="mt-12 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Insights from the AI Community</h3>
            <StaticTweet
              author={{
                name: "Andrej Karpathy",
                username: "karpathy",
                image: "https://pbs.twimg.com/profile_images/1296667294148382721/9Pr_1ms1_400x400.jpg",
              }}
              content={
                "There's a new kind of coding I call \"vibe coding\", where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. It's possible because the LLMs (e.g. Cursor Composer w Sonnet) are getting too good. Also I just talk to Composer with SuperWhisper so I barely even touch the keyboard. I ask for the dumbest things like \"decrease the padding on the sidebar by half\" because I'm too lazy to find it. I \"Accept All\" always, I don't read the diffs anymore. When I get error messages I just copy paste them in with no comment, usually that fixes it. The code grows beyond my usual comprehension, I'd have to really read through it for a while. Sometimes the LLMs can't fix a bug so I just work around it or ask for random changes until it goes away. It's not too bad for throwaway weekend projects, but still quite amusing. I'm building a project or webapp, but it's not really coding - I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works."
              }
              date="Nov 1, 2023"
              stats={{
                likes: 12453,
                retweets: 2134,
                replies: 342,
              }}
              url="https://x.com/karpathy/status/1886192184808149383"
              className="max-w-2xl mx-auto"
            />
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
                <Link href="/consulting">
                  <Vote className="mr-2 h-4 w-4" /> Work With Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
