import TweetEmbed from "@/components/tweet-embed"

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
            <TweetEmbed
              tweetUrl="https://x.com/karpathy/status/1886192184808149383?lang=en"
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
