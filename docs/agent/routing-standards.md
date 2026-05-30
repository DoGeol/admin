# 라우팅 표준

이 문서는 이 저장소의 URL 구조와 GitHub Pages 배포 기준을 정의한다. 화면 구현 규칙은 `docs/agent/admin-ui-standards.md`, admin shell과 메뉴 규칙은 `docs/agent/admin-layout-standards.md`, 코드 작성 규칙은 `docs/agent/code-conventions.md`를 함께 따른다.

## 기본 원칙

- 로컬 개발 URL과 GitHub Pages 배포 URL을 분리해서 생각한다.
- repo 이름 `admin`은 GitHub Pages project site의 base path로 사용한다.
- 앱 내부 route에서 `/admin` segment를 새로 만들지 않는다.
- 실제 어드민 앱은 `/`를 기준으로 둔다.
- 내부 문서와 컴포넌트 확인 영역은 `/docs` 아래에 둔다.
- 제품 admin navigation과 `/docs` navigation은 분리한다.

## URL 구조

로컬 개발 기준:

- `/`: 실제 어드민 홈
- `/settings/menu`: 메뉴 관리 화면
- `/docs`: 문서 홈
- `/docs/components`: 컴포넌트 문서 목록
- `/docs/components/button`: Button 컴포넌트 문서
- `/docs/patterns`: 화면 패턴 문서
- `/docs/foundation`: 토큰, 타이포그래피, Motion 같은 기초 정책 문서

GitHub Pages 배포 기준:

- `/admin/`: 실제 어드민 홈
- `/admin/settings/menu/`: 메뉴 관리 화면
- `/admin/docs/`: 문서 홈
- `/admin/docs/components/`: 컴포넌트 문서 목록
- `/admin/docs/components/button/`: Button 컴포넌트 문서
- `/admin/docs/patterns/`: 화면 패턴 문서
- `/admin/docs/foundation/`: 기초 정책 문서

## App Router 구조

- URL에 영향을 주지 않는 route group을 사용한다.
- 실제 어드민 화면은 `src/app/(admin)` 아래에 둔다.
- 문서 화면은 `src/app/(docs)/docs` 아래에 둔다.
- 문서 전용 component는 `src/app/(docs)/docs/_components` private folder에 둔다.
- shared route 상수는 `src/lib/routes.ts`에 둔다.

권장 구조:

```txt
src/app/layout.tsx

src/app/(admin)/page.tsx
src/app/(admin)/settings/menu/page.tsx

src/app/(docs)/docs/layout.tsx
src/app/(docs)/docs/page.tsx
src/app/(docs)/docs/components/page.tsx
src/app/(docs)/docs/components/button/page.tsx
src/app/(docs)/docs/patterns/page.tsx
src/app/(docs)/docs/foundation/page.tsx
src/app/(docs)/docs/_components/docs-shell.tsx
```

## GitHub Pages

- GitHub Pages 배포 빌드는 `GITHUB_PAGES=true` 환경 변수로 구분한다.
- GitHub Pages 빌드에서만 Next.js `basePath`를 `/admin`으로 설정한다.
- GitHub Pages 빌드에서만 `output: "export"`와 `trailingSlash: true`를 사용한다.
- `assetPrefix`는 CDN 목적이 아니면 사용하지 않는다.
- `_next` 정적 자산이 GitHub Pages에서 정상 제공되도록 publishing source root에 `.nojekyll`이 포함되게 한다.
- 앱 내부 링크는 `next/link`와 `src/lib/routes.ts`의 route 상수를 사용한다. 문자열 조합으로 base path를 직접 붙이지 않는다.

## 검증

- 로컬 개발에서는 `/`, `/docs`, `/docs/components`, `/settings/menu`가 접근 가능해야 한다.
- GitHub Pages 빌드는 `GITHUB_PAGES=true pnpm build`로 확인한다.
- route 추가 후에는 `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build`를 실행한다.
- UI route 변경 후에는 browser에서 desktop과 mobile viewport를 확인한다.
