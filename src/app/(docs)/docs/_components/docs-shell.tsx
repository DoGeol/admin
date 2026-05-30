import { ArrowLeft, BookOpenText } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

import { appRoutes, type AppRoute } from "@/lib/routes"

const docsNavItems: ReadonlyArray<{
  href: AppRoute
  label: string
  description: string
}> = [
  {
    href: appRoutes.docsHome,
    label: "문서 홈",
    description: "문서 영역의 진입점",
  },
  {
    href: appRoutes.docsComponents,
    label: "컴포넌트",
    description: "shadcn/ui 조합과 상태",
  },
  {
    href: appRoutes.docsPatterns,
    label: "화면 패턴",
    description: "운영 화면 구성 규칙",
  },
  {
    href: appRoutes.docsFoundation,
    label: "기초 정책",
    description: "토큰, 폰트, Motion",
  },
]

export function DocsShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:px-8">
        <aside className="flex flex-col gap-5 lg:sticky lg:top-6 lg:h-[calc(100dvh-3rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={appRoutes.home}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              어드민
            </Link>
            <BookOpenText className="size-4 text-muted-foreground" />
          </div>

          <nav aria-label="문서" className="grid gap-2">
            {docsNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-border bg-card px-3 py-2.5 text-card-foreground hover:bg-muted"
              >
                <span className="block text-sm font-medium">{item.label}</span>
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                  {item.description}
                </span>
              </Link>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </main>
  )
}
