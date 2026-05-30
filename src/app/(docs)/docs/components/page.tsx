import { Component } from "lucide-react"
import Link from "next/link"

import { appRoutes } from "@/lib/routes"

const componentDocs = [
  {
    href: appRoutes.docsButton,
    title: "Button",
    description:
      "기본 action, 보조 action, 위험 action, icon button 상태를 확인합니다.",
  },
] as const

export default function ComponentDocsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 border-b border-border pb-6">
        <p className="text-sm font-medium text-muted-foreground">Docs</p>
        <div className="flex items-center gap-2">
          <Component className="size-5 text-muted-foreground" />
          <h1 className="text-2xl font-semibold tracking-normal">컴포넌트</h1>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          shadcn/ui generated component와 프로젝트 조합 규칙을 페이지 단위로
          확인합니다.
        </p>
      </header>

      <section className="grid gap-3 md:grid-cols-2">
        {componentDocs.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-border bg-card p-4 text-card-foreground hover:bg-muted"
          >
            <h2 className="text-base font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          </Link>
        ))}
      </section>
    </div>
  )
}
