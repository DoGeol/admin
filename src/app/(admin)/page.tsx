import {
  ArrowUpRight,
  BookOpenText,
  CheckCircle2,
  Clock3,
  ListChecks,
  Settings2,
} from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { appRoutes } from "@/lib/routes"

const metrics = [
  { label: "오늘 처리", value: "128", change: "+12.4%" },
  { label: "승인 대기", value: "24", change: "-3건" },
  { label: "오류 이벤트", value: "3", change: "확인 필요" },
] as const

const queues = [
  { label: "신규 조직 승인", owner: "운영", time: "12분 전" },
  { label: "권한 변경 검토", owner: "보안", time: "28분 전" },
  { label: "결제 상태 동기화", owner: "정산", time: "41분 전" },
] as const

export default function AdminHome() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted-foreground">운영 홈</p>
            <h1 className="text-2xl font-semibold tracking-normal">
              어드민 작업 현황
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              실제 업무 화면은 이 영역을 기준으로 확장하고, 컴포넌트와 화면 패턴
              검증은 문서 영역에서 분리해 관리합니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={appRoutes.docsHome}
              className={buttonVariants({ variant: "outline" })}
            >
              <BookOpenText />
              문서 보기
            </Link>
            <Link href={appRoutes.menuSettings} className={buttonVariants()}>
              <Settings2 />
              메뉴 관리
            </Link>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-3">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-lg border border-border bg-card p-4 text-card-foreground"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </p>
                <CheckCircle2 className="size-4 text-muted-foreground" />
              </div>
              <div className="mt-5 flex items-end justify-between gap-4">
                <p className="text-2xl font-semibold">{metric.value}</p>
                <p className="text-xs font-medium text-muted-foreground">
                  {metric.change}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <article className="rounded-lg border border-border bg-card text-card-foreground">
            <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
              <div>
                <h2 className="text-base font-semibold">작업 큐</h2>
                <p className="text-sm text-muted-foreground">
                  우선 확인이 필요한 운영 항목입니다.
                </p>
              </div>
              <ListChecks className="size-4 text-muted-foreground" />
            </div>
            <div className="divide-y divide-border">
              {queues.map((queue) => (
                <div
                  key={queue.label}
                  className="grid gap-3 px-4 py-3 sm:grid-cols-[1fr_auto_auto] sm:items-center"
                >
                  <p className="text-sm font-medium">{queue.label}</p>
                  <p className="text-sm text-muted-foreground">{queue.owner}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock3 className="size-3.5" />
                    {queue.time}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-lg border border-border bg-card p-4 text-card-foreground">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold">문서 영역</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  `/docs`는 제품 화면과 분리된 내부 디자인 시스템 문서입니다.
                </p>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground" />
            </div>
            <div className="mt-5 grid gap-2">
              <Link
                href={appRoutes.docsComponents}
                className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                컴포넌트 문서
              </Link>
              <Link
                href={appRoutes.docsPatterns}
                className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                화면 패턴
              </Link>
              <Link
                href={appRoutes.docsFoundation}
                className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                기초 정책
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}
