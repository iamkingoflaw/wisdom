"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Whisper } from "@/lib/types"
import { WhisperComposer } from "@/components/whisper-composer"
import { WhisperCard } from "@/components/whisper-card"

export function MyWhispers({
  initialWhispers,
  userId,
  authorName,
}: {
  initialWhispers: Whisper[]
  userId: string
  authorName: string
}) {
  const [whispers, setWhispers] = useState<Whisper[]>(initialWhispers)

  async function handleDelete(id: string) {
    const supabase = createClient()
    const { error } = await supabase.from("whispers").delete().eq("id", id)
    if (!error) {
      setWhispers((prev) => prev.filter((w) => w.id !== id))
    }
  }

  // Optimistically show a newly inscribed whisper without a full refresh.
  async function refresh() {
    const supabase = createClient()
    const { data } = await supabase
      .from("whispers")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
    if (data) setWhispers(data as Whisper[])
  }

  return (
    <div className="space-y-6">
      <div onSubmitCapture={() => setTimeout(refresh, 400)}>
        <WhisperComposer userId={userId} authorName={authorName} isAuthed />
      </div>

      <div>
        <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">Your Whispers</h2>
        {whispers.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-card/50 p-8 text-center text-muted-foreground">
            You haven&apos;t inscribed any whispers yet. Add your first line above.
          </p>
        ) : (
          <div className="space-y-3">
            {whispers.map((whisper) => (
              <WhisperCard key={whisper.id} whisper={whisper} canDelete onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
