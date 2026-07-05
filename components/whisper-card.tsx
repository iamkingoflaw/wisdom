"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import type { Whisper } from "@/lib/types"
import { timeAgo, initials } from "@/lib/utils"

export function WhisperCard({
  whisper,
  index,
  canDelete = false,
  onDelete,
}: {
  whisper: Whisper
  index?: number
  canDelete?: boolean
  onDelete?: (id: string) => Promise<void> | void
}) {
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!onDelete) return
    setDeleting(true)
    try {
      await onDelete(whisper.id)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <article className="group relative rounded-xl border border-border/70 bg-card p-5 transition-colors hover:border-primary/40">
      <div className="flex items-start gap-4">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-serif text-sm font-semibold text-primary"
          aria-hidden="true"
        >
          {initials(whisper.author_name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-serif text-lg leading-relaxed text-card-foreground text-pretty">
            {whisper.content}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <span className="font-medium text-foreground/80">{whisper.author_name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={whisper.created_at}>{timeAgo(whisper.created_at)}</time>
            {typeof index === "number" && (
              <>
                <span aria-hidden="true">·</span>
                <span>Whisper #{index}</span>
              </>
            )}
          </div>
        </div>
        {canDelete && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            aria-label="Delete this whisper"
            className="shrink-0 rounded-md p-2 text-muted-foreground opacity-0 transition-all hover:bg-destructive/15 hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100 disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  )
}
