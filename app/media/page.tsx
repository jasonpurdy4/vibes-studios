import StaticTweet from "@/components/static-tweet"

export default function MediaPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Media</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Articles, tweets, and resources about vibe coding and related topics.
          </p>
        </div>

        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Featured Tweets</h2>
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

          <div>
            <h2 className="text-2xl font-bold mb-4">Articles</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">The Rise of Emotional Design</h3>
                <p className="text-muted-foreground mb-4">
                  How designers are incorporating emotional intelligence into digital experiences.
                </p>
                <a href="#" className="text-primary hover:underline">
                  Read more →
                </a>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Coding with Empathy</h3>
                <p className="text-muted-foreground mb-4">
                  Why understanding user emotions is crucial for modern software development.
                </p>
                <a href="#" className="text-primary hover:underline">
                  Read more →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
