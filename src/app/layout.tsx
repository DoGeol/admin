import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Admin",
  description: "shadcn/ui 기반 어드민 프로젝트",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
