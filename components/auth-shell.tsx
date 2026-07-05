import Link from "next/link"
import { BookOpen } from "lucide-react"

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-dvh items-center justify-center px-4 py-12">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url(/cosmic-codex.png)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-background/85" aria-hidden="true" />

      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex flex-col items-center gap-2 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
            <BookOpen className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="font-serif text-xl font-semibold text-foreground">The Codex of Humanity</span>
        </Link>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h1 className="text-balance font-serif text-2xl font-semibold text-card-foreground">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
