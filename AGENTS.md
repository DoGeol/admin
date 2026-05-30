# Project Agent Instructions

## Purpose

이 저장소는 Next.js, React 19, shadcn/ui, Tailwind CSS v4로 어드민 제품을 만들기 위한 작업 공간이다. 이 파일은 짧고 지속적인 지침만 담는다. 자세한 UI, 컴포넌트, 검증 규칙은 `docs/agent/admin-ui-standards.md`를 따르고, 코드 작성 규칙은 `docs/agent/code-conventions.md`를 따른다.

## Skill Routing

- Next.js App Router, RSC 경계, route handler, metadata, caching, framework convention 작업에는 `next-best-practices`를 사용한다.
- React/Next.js 성능, waterfall, bundle size, server/client rendering, re-render 검토에는 `vercel-react-best-practices`를 사용한다.
- shadcn/ui 컴포넌트 탐색, 설치, 조합, 스타일링, form, icon, registry 작업에는 `shadcn`을 사용한다.
- 작업 내용이 skill description과 맞으면 `.agents/skills`의 프로젝트 로컬 skill을 우선한다.

## Working Rules

- 사용자가 명시적으로 요청하지 않으면 앱 scaffold, package 설치, `shadcn init`을 실행하지 않는다.
- custom UI를 만들기 전에 shadcn/ui가 제공하는 컴포넌트나 패턴이 있는지 먼저 확인한다.
- semantic design token과 Tailwind v4 CSS-first convention을 따른다. 제품 UI에 raw color utility를 새로 도입하지 않는다.
- 애니메이션은 Motion for React를 기본 선택으로 사용한다. 단순 색상/opacity transition을 제외한 enter/exit, layout, gesture, shared transition은 Motion으로 구현한다.
- 어드민 화면은 조밀하고 업무 중심적인 인터페이스로 다룬다. landing-page composition, oversized hero section, nested card, decorative gradient를 피한다.
- 변경은 요청 범위에 한정한다. skill 자체 업데이트가 목적이 아니라면 upstream skill 파일 내용은 보존한다.

## Verification

- 문서 전용 변경은 파일 배치와 필수 참조를 검증한다.
- 향후 앱 변경에서는 완료를 주장하기 전에 가능한 lint, typecheck, test, build를 실행한다.
- UI 변경에서는 실행 가능한 앱이 있을 때 desktop/mobile browser screenshot으로 동작을 확인한다.
