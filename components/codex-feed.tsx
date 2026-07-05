"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Whisper } from "@/lib/types"
import { WhisperComposer } from "@/components/whisper-composer"
import { WhisperCard } from "@/components/whisper-card"

export function CodexFeed({
  initialWhispers,
  totalCount,
  userId,
  authorName,
}: {
  initialWhispers: Whisper[]
  totalCount: number
  userId: string | null
  authorName: string | null
}) {
  const [whispers, setWhispers] = useState<Whisper[]>(initialWhispers)
  const [count, setCount] = useState(totalCount)

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel("whispers-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "whispers" },
        (payload) => {
          const next = payload.new as Whisper
          setWhispers((prev) => {
            if (prev.some((w) => w.id === next.id)) return prev
            return [next, ...prev]
          })
          setCount((c) => c + 1)
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "whispers" },
        (payload) => {
          const removed = payload.old as { id: string }
          setWhispers((prev) => prev.filter((w) => w.id !== removed.id))
          setCount((c) => Math.max(0, c - 1))
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="space-y-6">
      <WhisperComposer userId={userId} authorName={authorName} isAuthed={Boolean(userId)} />

      <div className="flex items-center justify-between px-1">
        <h2 className="font-serif text-xl font-semibold text-foreground">The Living Pages</h2>
        <span className="text-sm text-muted-foreground">
          {count.toLocaleString()} {count === 1 ? "whisper" : "whispers"} inscribed
        </span>
      </div>

      {whispers.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border bg-card/50 p-8 text-center text-muted-foreground">
          The Codex awaits its first whisper. Be the one to begin.
        </p>
      ) : (
        <div className="space-y-3">
          {whispers.map((whisper, i) => (
            <WhisperCard key={whisper.id} whisper={whisper} index={count - i} />
          ))}
        </div>
      )}
    </div>
  )
}
