import { Boxes } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "기초 정책",
  description: "어드민 디자인 기초 정책 문서",
}

const foundations = [
  {
    title: "색상",
    body: "component markup에서는 semantic token을 사용하고 raw color utility를 새로 추가하지 않습니다.",
  },
  {
    title: "타이포그래피",
    body: "기본 sans-serif는 pretendard 패키지의 Pretendard Variable 가변 다이나믹 서브셋입니다.",
  },
  {
    title: "Motion",
    body: "enter, exit, layout, reorder 같은 의미 있는 전환은 Motion for React를 우선 검토합니다.",
  },
] as const

export default function FoundationPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 border-b border-border pb-6">
        <p className="text-sm font-medium text-muted-foreground">Docs</p>
        <div className="flex items-center gap-2">
          <Boxes className="size-5 text-muted-foreground" />
          <h1 className="text-2xl font-semibold tracking-normal">기초 정책</h1>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          색상, 폰트, 움직임 기준을 실제 화면 구현 전에 확인합니다.
        </p>
      </header>

      <section className="grid gap-3">
        {foundations.map((foundation) => (
          <article
            key={foundation.title}
            className="rounded-lg border border-border bg-card p-4 text-card-foreground"
          >
            <h2 className="text-base font-semibold">{foundation.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {foundation.body}
            </p>
          </article>
        ))}
      </section>
    </div>
  )
}
