# admin

Next.js App Router, React 19, shadcn/ui, Tailwind CSS v4 기반 어드민 프로젝트입니다.

## 개발

```bash
pnpm install
pnpm dev
```

개발 서버 기본 주소는 `http://localhost:3000`입니다.

## 검증

```bash
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
```

전체 검증은 다음 명령으로 실행합니다.

```bash
pnpm check
```

## 폰트

기본 sans-serif 폰트는 `pretendard` 패키지의 `Pretendard Variable` 가변 다이나믹 서브셋을 사용합니다. CSS 진입점은 `src/app/globals.css`이며, CDN이나 `next/font/google`에 의존하지 않습니다.

## 포맷

```bash
pnpm format
```
