# 코드 컨벤션

이 문서는 이 저장소에서 Next.js, React 19, shadcn/ui, Tailwind CSS v4, Motion for React 기반 어드민 앱을 구현할 때 따를 코드 작성 규칙을 정의한다. 앱 scaffold 전에는 이 규칙을 기준으로 계획을 세우고, scaffold 후에는 실제 설정 파일이 더 구체적인 기준이 된다.

## TypeScript

- TypeScript는 strict mode를 전제로 작성한다.
- `any`는 금지한다.
- 외부 입력처럼 타입을 모를 때는 `unknown`에서 좁혀 쓴다.
- nullable 값은 type에 명시하고, UI에 전달하기 전에 fallback을 정한다.
- public helper, Server Action, Route Handler, shared component props에는 명시적 type을 둔다.
- 객체 shape가 UI와 API 양쪽에서 쓰이면 `type`으로 이름을 붙이고 재사용한다.
- `enum`보다 string union과 `as const` object를 우선한다.

## Skill 우선순위와 충돌 해결

- 이 문서는 프로젝트 기본값을 정의한다.
- 더 구체적인 규칙이 필요한 작업에서는 `.agents/skills`의 `next-best-practices`, `vercel-react-best-practices`, `shadcn` 내용을 우선 확인한다.
- Next.js framework convention, RSC boundary, Route Handler, metadata, error handling은 `next-best-practices`가 이 문서보다 우선한다.
- React/Next.js performance, bundle size, waterfall, server/client rendering 최적화는 `vercel-react-best-practices`가 이 문서보다 우선한다.
- shadcn/ui component composition, form structure, icon import, Tailwind token usage는 `shadcn` skill이 이 문서보다 우선한다.
- skill끼리 충돌하면 framework/runtime correctness를 먼저 따르고, 그다음 shadcn accessibility/composition, 그다음 project convention 순서로 결정한다.

## 파일과 폴더 구조

- Next.js special file은 App Router convention을 따른다: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`.
- `components/ui`는 shadcn generated component 영역으로 취급한다.
- 제품 요구로 shadcn generated component를 수정할 때도 shadcn composition과 token 규칙을 유지한다.
- 재사용 가능한 admin block은 `src/components/admin`에 둔다.
- `/docs` 전용 component는 `src/components/docs`에 둔다.
- route 한 곳에만 쓰는 component는 해당 route 가까이에 둔다.
- 전역 공유가 실제로 필요할 때만 shared component로 승격한다.
- 공통 utility는 `src/lib` 계열에 둔다.
- 나중에 package나 registry로 분리될 수 있는 코드는 route, storage, app-specific API에 직접 의존하지 않게 한다.
- `src/components/admin`에서 `src/app`을 import하지 않는다.
- reusable admin block은 `localStorage`, `sessionStorage`, URL hook, app store를 내부에 숨기지 않고 props나 composition으로 값을 받는다.
- 앱 생성 전에는 정확한 path를 계획에 명시하고, 생성 후에는 실제 alias와 폴더 구조를 따른다.
- 한 파일이 서로 다른 책임을 갖기 시작하면 작은 파일로 나눈다.
- 관련 없는 선행 refactor는 하지 않는다.

## Import와 export

- 프로젝트 내부 import는 설정된 alias가 있으면 `@/`를 사용한다.
- reusable module은 named export를 기본으로 한다.
- Next.js special file과 dynamic import 대상처럼 framework가 요구하는 경우에는 default export를 허용한다.
- 프로젝트 내부 barrel file은 새로 만들지 않는다.
- 외부 package는 Next.js `optimizePackageImports`를 우선하고, typed subpath가 검증된 경우에만 direct import를 사용한다.
- `lucide-react` 같은 icon package는 deep import가 implicit `any`를 만들 수 있다.
- icon import 방식은 shadcn `components.json`의 `iconLibrary`와 Vercel bundle rule을 확인한 뒤 정한다.
- type 전용 import는 `import type`을 사용한다.

## React 컴포넌트

- Server Component를 기본값으로 둔다.
- hook, browser API, local interactive state, Motion runtime interaction이 필요할 때만 Client Component로 전환한다.
- Client Component boundary는 작게 유지한다.
- data fetching과 권한 검사는 가능한 서버 쪽에 둔다.
- `metadata`와 `generateMetadata`는 Server Component에서만 사용한다.
- metadata가 필요한 page는 client logic을 child component로 분리한다.
- Client Component는 async function으로 만들지 않는다.
- async data는 server parent에서 가져와 serializable props로 전달한다.
- Server Component에서 Client Component로 전달하는 props는 JSON-serializable 값으로 제한한다.
- Server Action은 예외로 전달할 수 있다.
- props type은 component 가까이에 둔다.
- 여러 파일에서 공유될 때만 별도 type module로 이동한다.
- Component 이름은 PascalCase, hook은 `use*`, event handler는 `handle*`로 작성한다.
- derived state를 effect로 동기화하지 않는다.
- render 중 계산하거나, 비용이 클 때만 memoize한다.
- loading, empty, error state가 필요한 component는 해당 state를 props 또는 composition으로 명확히 받는다.

## Server Action, Route Handler, data flow

- UI form mutation은 Server Action을 우선 검토한다.
- 외부 서비스, webhook, non-UI consumer, protocol endpoint는 Route Handler를 사용한다.
- Server Action은 public endpoint처럼 취급한다.
- 각 action 내부에서 입력 검증, 인증, 권한 확인을 수행한다.
- Route Handler는 입력 검증, 인증, 권한 확인, 실패 응답을 handler 안에서 명확히 처리한다.
- 같은 route segment에 `page.tsx`와 `route.ts`를 함께 두지 않는다.
- 같은 개념의 page/API가 모두 필요하면 `/users` page와 `/api/users` route처럼 path를 분리한다.
- URL에 남아야 하는 list state는 `searchParams`로 표현한다: search, filter, sort, page, page size.
- optimistic update는 실패 시 rollback 또는 재동기화 흐름이 명확할 때만 사용한다.

## 스타일링

- class 조합에는 `cn()`을 사용한다.
- 반복 variant가 생기면 `class-variance-authority` 또는 shadcn component variant pattern을 우선 검토한다.
- semantic token을 우선하고 raw color utility를 새로 쓰지 않는다.
- 기본 sans-serif font는 `pretendard` package의 `Pretendard Variable` 가변 다이나믹 서브셋을 사용한다.
- build가 network에 의존하지 않도록 `next/font/google`이나 CDN import를 기본값으로 쓰지 않는다.
- 어드민별 theme은 component class branch가 아니라 `src/app/globals.css`의 CSS variable set과 `data-admin-theme` attribute로 처리한다.
- custom project token은 `@theme inline`에 등록한 뒤 semantic utility로 사용한다.
- layout spacing은 `gap-*`을 기본으로 한다.
- `cn()`은 조건부 layout/state class 병합용이다.
- shadcn component의 color, typography, overlay stacking을 우회하는 허가로 `cn()`을 사용하지 않는다.
- component 내부에서 shadcn primitive의 구조, slot, accessibility attribute를 깨지 않는다.

## Motion

- Motion component는 기본적으로 작은 Client Component leaf 안에서만 사용한다.
- `motion/react-client`는 hook, event handler, browser API가 없는 정적 Motion component가 Server Component tree 안에 필요할 때만 검토한다.
- 공통 transition은 한 곳에 모으고, 화면마다 임의 duration/easing을 늘리지 않는다.
- Animation은 사용자의 작업 이해를 돕는 목적이어야 한다.
- 장식용 반복 animation은 만들지 않는다.
- reduced motion 대응이 없으면 큰 이동, parallax, drag-heavy animation을 추가하지 않는다.

## 오류 처리

- 사용자에게 보여줄 수 있는 오류와 log용 오류를 구분한다.
- Server Action 실패는 form state, toast, inline field error 중 UX에 맞는 방식으로 전달한다.
- Route Handler는 HTTP status와 JSON body를 일관되게 반환한다.
- catch block에서 `redirect`, `permanentRedirect`, `notFound`, `forbidden`, `unauthorized` 같은 Next.js control flow를 삼키지 않는다.
- catch 안에서는 `unstable_rethrow(error)`를 먼저 호출한 뒤 일반 오류를 처리한다.

## 테스트와 검증

- 앱 변경 후에는 사용 가능한 lint, typecheck, test, build를 실행한다.
- UI 변경은 desktop/mobile viewport에서 screenshot 또는 browser 확인을 수행한다.
- 중요한 admin workflow는 loading, empty, error, long text, narrow width state를 확인한다.
- Motion이 포함된 UI는 normal motion과 reduced motion 동작을 함께 확인한다.
- 문서만 바꾼 경우에는 파일 존재, 링크 참조, 필수 keyword 검색으로 검증한다.
