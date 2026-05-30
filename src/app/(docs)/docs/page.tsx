import { Boxes, Component, Layers3 } from "lucide-react"
import Link from "next/link"

import { appRoutes } from "@/lib/routes"

const sections = [
  {
    href: appRoutes.docsComponents,
    title: "컴포넌트",
    description: "shadcn/ui 기반 요소의 variant, 상태, 사용 규칙을 확인합니다.",
    icon: Component,
  },
  {
    href: appRoutes.docsPatterns,
    title: "화면 패턴",
    description:
      "table, filter, form, detail panel 같은 admin 화면 조합을 정리합니다.",
    icon: Layers3,
  },
  {
    href: appRoutes.docsFoundation,
    title: "기초 정책",
    description: "semantic token, Pretendard, Motion 적용 기준을 확인합니다.",
    icon: Boxes,
  },
] as const

export default function DocsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 border-b border-border pb-6">
        <p className="text-sm font-medium text-muted-foreground">Docs</p>
        <h1 className="text-2xl font-semibold tracking-normal">어드민 문서</h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          실제 제품 화면과 분리된 문서 영역입니다. 컴포넌트, 화면 패턴, 기초
          정책을 같은 URL 체계 안에서 확인합니다.
        </p>
      </header>

      <section className="grid gap-3 md:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon

          return (
            <Link
              key={section.href}
              href={section.href}
              className="rounded-lg border border-border bg-card p-4 text-card-foreground hover:bg-muted"
            >
              <Icon className="size-4 text-muted-foreground" />
              <h2 className="mt-4 text-base font-semibold">{section.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {section.description}
              </p>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
