# admin

Next.js App Router, React 19, shadcn/ui, Tailwind CSS v4 기반 어드민 프로젝트입니다.

## 개발

```bash
pnpm install
pnpm dev
```

개발 서버 기본 주소는 `http://localhost:3000`입니다.

## 라우팅

로컬 개발 기준 주요 URL은 다음과 같습니다.

- `/`: 실제 어드민 홈
- `/settings/menu`: 메뉴 관리 화면
- `/docs`: 문서 홈
- `/docs/components`: 컴포넌트 문서
- `/docs/patterns`: 화면 패턴 문서
- `/docs/foundation`: 기초 정책 문서

GitHub Pages 배포에서는 repo 이름 `admin`을 base path로 사용하므로 같은 화면이 `/admin/*` 아래에 노출됩니다. 앱 내부 route에는 `/admin` segment를 직접 만들지 않습니다.

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

GitHub Pages 정적 export 빌드는 다음 명령으로 확인합니다.

```bash
pnpm build:pages
```

## 폰트

기본 sans-serif 폰트는 `pretendard` 패키지의 `Pretendard Variable` 가변 다이나믹 서브셋을 사용합니다. CSS 진입점은 `src/app/globals.css`이며, CDN이나 `next/font/google`에 의존하지 않습니다.

## 포맷

```bash
pnpm format
```
