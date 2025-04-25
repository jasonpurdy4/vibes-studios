import Link from "next/link"
import { Sparkles } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="font-bold">Vibes Studios</span>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Vibes Studios. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/projects" className="text-sm text-muted-foreground hover:underline">
            Projects
          </Link>
          <Link href="/propose" className="text-sm text-muted-foreground hover:underline">
            Propose
          </Link>
          <Link href="/admin" className="text-sm text-muted-foreground hover:underline">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
