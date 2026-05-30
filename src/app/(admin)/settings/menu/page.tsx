import { Settings2 } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "메뉴 관리",
  description: "어드민 Sidebar 메뉴 관리 화면",
}

export default function MenuSettingsPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8 lg:px-8">
        <header className="flex flex-col gap-2 border-b border-border pb-6">
          <p className="text-sm font-medium text-muted-foreground">설정</p>
          <div className="flex items-center gap-2">
            <Settings2 className="size-5 text-muted-foreground" />
            <h1 className="text-2xl font-semibold tracking-normal">
              메뉴 관리
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            published menu와 draft menu를 분리하는 편집 화면은 다음 작업에서
            구현합니다.
          </p>
        </header>

        <section className="rounded-lg border border-border bg-card p-5 text-card-foreground">
          <h2 className="text-base font-semibold">구현 대기</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            이 route는 `/settings/menu` 경계를 먼저 고정하기 위한
            placeholder입니다. 실제 편집 UI는 `zustand`, `localStorage`,
            `sessionStorage`, Motion `Reorder` 기준으로 확장합니다.
          </p>
        </section>
      </div>
    </main>
  )
}
