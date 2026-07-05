import Link from "next/link"
import { MailCheck } from "lucide-react"
import { AuthShell } from "@/components/auth-shell"

export default function SignUpSuccessPage() {
  return (
    <AuthShell title="Check your inbox" subtitle="One more step to join the Codex.">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
          <MailCheck className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="text-sm leading-relaxed text-muted-foreground">
          We&apos;ve sent a confirmation link to your email. Confirm your address, and your account
          will be ready to inscribe wisdom into the Codex.
        </p>
        <Link
          href="/auth/login"
          className="mt-2 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Continue to sign in
        </Link>
      </div>
    </AuthShell>
  )
}
