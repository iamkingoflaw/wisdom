"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { LogOut, LayoutDashboard } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function HeaderActions({
  email,
  displayName,
}: {
  email: string | null
  displayName: string | null
}) {
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)

  async function handleSignOut() {
    setSigningOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.refresh()
    router.push("/")
  }

  if (!email) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/auth/login"
          className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Sign in
        </Link>
        <Link
          href="/auth/sign-up"
          className="rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Add your whisper
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/dashboard"
        className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>
      <span className="hidden max-w-[10rem] truncate text-sm text-muted-foreground md:inline" title={displayName ?? email}>
        {displayName ?? email}
      </span>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={signingOut}
        className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-60"
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">{signingOut ? "Signing out…" : "Sign out"}</span>
      </button>
    </div>
  )
}
