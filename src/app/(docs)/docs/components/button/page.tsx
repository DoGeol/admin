import { Plus, Settings2, Trash2 } from "lucide-react"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Button",
  description: "shadcn/ui Button 컴포넌트 문서",
}

export default function ButtonDocsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 border-b border-border pb-6">
        <p className="text-sm font-medium text-muted-foreground">Components</p>
        <h1 className="text-2xl font-semibold tracking-normal">Button</h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          admin 화면 action에 사용하는 Button variant와 size를 확인합니다.
        </p>
      </header>

      <section className="grid gap-4">
        <article className="rounded-lg border border-border bg-card p-4 text-card-foreground">
          <h2 className="text-base font-semibold">Variant</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button>기본</Button>
            <Button variant="secondary">보조</Button>
            <Button variant="outline">외곽선</Button>
            <Button variant="ghost">고스트</Button>
            <Button variant="destructive">
              <Trash2 />
              삭제
            </Button>
          </div>
        </article>

        <article className="rounded-lg border border-border bg-card p-4 text-card-foreground">
          <h2 className="text-base font-semibold">Size</h2>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button size="xs">XS</Button>
            <Button size="sm">SM</Button>
            <Button>Default</Button>
            <Button size="lg">LG</Button>
            <Button size="icon" aria-label="설정">
              <Settings2 />
            </Button>
          </div>
        </article>

        <article className="rounded-lg border border-border bg-card p-4 text-card-foreground">
          <h2 className="text-base font-semibold">Admin Action</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button>
              <Plus />
              항목 추가
            </Button>
            <Button variant="outline">취소</Button>
            <Button disabled>저장 중</Button>
          </div>
        </article>
      </section>
    </div>
  )
}
