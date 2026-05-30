# admin

Next.js App Router, React 19, shadcn/ui, Tailwind CSS v4 기반 어드민 foundation입니다. 실제 어드민 preview와 `/docs` 문서를 함께 운영하면서, 나중에 보일러플레이트나 내부 UI package로 분리하기 쉬운 구조를 목표로 합니다.

## 목표

- `/`에서 실제 어드민 화면을 빠르게 검증합니다.
- `/docs`에서 shadcn 기반 컴포넌트 조합, 화면 패턴, theme 예시를 문서화합니다.
- registry 구현은 아직 포함하지 않고, 먼저 `src/components/admin` 중심의 내부 재사용 구조를 정리합니다.

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
