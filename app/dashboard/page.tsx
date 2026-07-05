import { redirect } from "next/navigation"
import { Feather, Globe, CalendarDays } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { StatCard } from "@/components/stat-card"
import { MyWhispers } from "@/components/my-whispers"
import type { Whisper } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const authorName =
    (user.user_metadata?.display_name as string) ?? user.email?.split("@")[0] ?? "Anonymous"

  const { data: myWhispers } = await supabase
    .from("whispers")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const { count: globalCount } = await supabase
    .from("whispers")
    .select("*", { count: "exact", head: true })

  const memberSince = new Date(user.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <div className="min-h-dvh">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-10 md:px-6">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Your sanctuary</p>
          <h1 className="mt-1 text-balance font-serif text-3xl font-semibold text-foreground">
            Welcome, {authorName}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage your contributions to the eternal Codex of Humanity.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard icon={Feather} label="Your whispers" value={(myWhispers?.length ?? 0).toLocaleString()} />
          <StatCard icon={Globe} label="Global whispers" value={(globalCount ?? 0).toLocaleString()} />
          <StatCard icon={CalendarDays} label="Member since" value={memberSince} />
        </div>

        <MyWhispers
          initialWhispers={(myWhispers as Whisper[]) ?? []}
          userId={user.id}
          authorName={authorName}
        />
      </main>
    </div>
  )
}
