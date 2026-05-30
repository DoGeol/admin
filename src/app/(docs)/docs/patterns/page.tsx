import { Layers3 } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "화면 패턴",
  description: "어드민 화면 패턴 문서",
}

const patterns = [
  {
    title: "목록 화면",
    body: "page header, action row, filter row, primary table, pagination 순서로 구성합니다.",
  },
  {
    title: "상세 확인",
    body: "목록 맥락을 유지해야 하는 상세 정보는 Sheet를 우선 검토합니다.",
  },
  {
    title: "편집 흐름",
    body: "단순 편집은 Dialog, 복잡한 다중 section form은 별도 page로 분리합니다.",
  },
] as const

export default function PatternsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 border-b border-border pb-6">
        <p className="text-sm font-medium text-muted-foreground">Docs</p>
        <div className="flex items-center gap-2">
          <Layers3 className="size-5 text-muted-foreground" />
          <h1 className="text-2xl font-semibold tracking-normal">화면 패턴</h1>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          반복되는 admin 화면의 구조를 같은 기준으로 관리합니다.
        </p>
      </header>

      <section className="grid gap-3">
        {patterns.map((pattern) => (
          <article
            key={pattern.title}
            className="rounded-lg border border-border bg-card p-4 text-card-foreground"
          >
            <h2 className="text-base font-semibold">{pattern.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {pattern.body}
            </p>
          </article>
        ))}
      </section>
    </div>
  )
}
