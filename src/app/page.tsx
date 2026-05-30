export default function Home() {
  return (
    <main className="flex min-h-dvh bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-5xl flex-col justify-center gap-8 px-6 py-16">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="text-sm font-medium text-muted-foreground">
            Next.js App Router + shadcn/ui
          </p>
          <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">
            어드민 프로젝트 스캐폴딩
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            pnpm, React 19, Tailwind CSS v4, shadcn/ui, Motion, Zustand, ESLint,
            Prettier 기준 설정이 준비된 초기 상태입니다.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            "semantic token 기반 스타일",
            "App Router와 Server Component 기본값",
            "format/lint/typecheck/build 검증 스크립트",
          ].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-border bg-card p-4 text-sm text-card-foreground"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
