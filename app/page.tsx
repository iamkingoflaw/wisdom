import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { CodexFeed } from "@/components/codex-feed"
import type { Whisper } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: whispers } = await supabase
    .from("whispers")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50)

  const { count } = await supabase
    .from("whispers")
    .select("*", { count: "exact", head: true })

  const authorName =
    (user?.user_metadata?.display_name as string) ?? user?.email?.split("@")[0] ?? null

  return (
    <div className="min-h-dvh">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border/60">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url(/cosmic-codex.png)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6 md:py-28">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-primary">
            A Billion Whispers of Wisdom
          </p>
          <h1 className="text-balance font-serif text-4xl font-semibold leading-tight text-foreground md:text-6xl">
            The Codex of Humanity
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            One shared, eternal book. Every voice adds a single line of wisdom — a whisper that
            joins the collective memory of humankind, preserved for all who come after.
          </p>
          {typeof count === "number" && count > 0 && (
            <p className="mt-8 font-serif text-2xl text-foreground">
              <span className="text-primary">{count.toLocaleString()}</span> whispers and counting
            </p>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 py-12 md:px-6">
        <CodexFeed
          initialWhispers={(whispers as Whisper[]) ?? []}
          totalCount={count ?? 0}
          userId={user?.id ?? null}
          authorName={authorName}
        />
      </main>

      <footer className="border-t border-border/60 py-8">
        <p className="text-center text-sm text-muted-foreground">
          The Codex of Humanity · Written by all, owned by none.
        </p>
      </footer>
    </div>
  )
}
