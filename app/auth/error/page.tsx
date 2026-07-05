import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { AuthShell } from "@/components/auth-shell"

export default function AuthErrorPage() {
  return (
    <AuthShell title="Something went wrong" subtitle="We couldn't complete that request.">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-destructive/40 bg-destructive/10 text-destructive">
          <AlertTriangle className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Your authentication link may have expired or already been used. Please try signing in
          again.
        </p>
        <Link
          href="/auth/login"
          className="mt-2 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Back to sign in
        </Link>
      </div>
    </AuthShell>
  )
}
