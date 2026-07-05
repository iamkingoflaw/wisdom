"use client"

import Link from "next/link"
import { useState } from "react"
import { Feather, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const MAX = 280

export function WhisperComposer({
  userId,
  authorName,
  isAuthed,
}: {
  userId: string | null
  authorName: string | null
  isAuthed: boolean
}) {
  const [content, setContent] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isAuthed) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card/50 p-6 text-center">
        <Feather className="mx-auto mb-3 h-6 w-6 text-primary" aria-hidden="true" />
        <p className="font-serif text-lg text-card-foreground">Add your whisper to the Codex</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to inscribe a line of wisdom that will live among a billion others.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link
            href="/auth/sign-up"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Create an account
          </Link>
          <Link
            href="/auth/login"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Sign in
          </Link>
        </div>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = content.trim()
    if (!trimmed || !userId) return

    setSubmitting(true)
    setError(null)
    const supabase = createClient()
    const { error: insertError } = await supabase.from("whispers").insert({
      user_id: userId,
      author_name: authorName || "Anonymous",
      content: trimmed,
    })
    setSubmitting(false)

    if (insertError) {
      setError(insertError.message)
      return
    }
    setContent("")
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-4">
      <label htmlFor="whisper" className="sr-only">
        Your whisper of wisdom
      </label>
      <textarea
        id="whisper"
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, MAX))}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            (e.metaKey || e.ctrlKey) &&
            !e.nativeEvent.isComposing &&
            e.keyCode !== 229
          ) {
            handleSubmit(e)
          }
        }}
        rows={3}
        placeholder="Inscribe a whisper of wisdom for humanity…"
        className="w-full resize-none bg-transparent font-serif text-lg leading-relaxed text-card-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-3">
        <span className="text-xs text-muted-foreground">
          {content.length}/{MAX} · <kbd className="font-sans">⌘/Ctrl + Enter</kbd> to inscribe
        </span>
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Feather className="h-4 w-4" aria-hidden="true" />
          )}
          Inscribe
        </button>
      </div>
    </form>
  )
}
