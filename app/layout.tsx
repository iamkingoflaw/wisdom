import type { Metadata } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

export const metadata: Metadata = {
  title: "The Codex of Humanity — A Billion Whispers of Wisdom",
  description:
    "A global, collaborative book where humanity inscribes its wisdom — one whisper at a time. Add your line to the eternal Codex.",
  generator: "v0.app",
}

export const viewport = {
  themeColor: "#1a1533",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
