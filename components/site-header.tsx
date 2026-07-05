import Link from "next/link"
import { BookOpen } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { HeaderActions } from "@/components/header-actions"

export async function SiteHeader() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold text-foreground">The Codex</span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">of Humanity</span>
          </span>
        </Link>
        <HeaderActions
          email={user?.email ?? null}
          displayName={(user?.user_metadata?.display_name as string) ?? null}
        />
      </div>
    </header>
  )
}
