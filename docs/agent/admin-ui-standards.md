# shadcn 어드민 UI 표준

이 문서는 이 저장소에서 Codex가 "shadcn으로 만드는 어드민" 작업을 수행할 때 따라야 할 기술 제원과 UI 생성 규칙을 정의한다. 루트 `AGENTS.md`는 짧은 라우팅 지침만 담고, 시각 언어는 루트 `DESIGN.md`, admin shell과 편집 가능한 menu builder는 `docs/agent/admin-layout-standards.md`, 코드 작성 규칙은 `docs/agent/code-conventions.md`를 함께 따른다.

## 기준 문서

- Codex `AGENTS.md`: https://developers.openai.com/codex/guides/agents-md
- Codex customization: https://developers.openai.com/codex/concepts/customization
- Codex skills: https://developers.openai.com/codex/skills
- shadcn/ui skills: https://ui.shadcn.com/docs/skills
- shadcn Tailwind v4: https://ui.shadcn.com/docs/tailwind-v4
- Motion React 설치: https://motion.dev/docs/react-installation
- Motion 접근성: https://motion.dev/docs/react-accessibility
- Motion bundle size: https://motion.dev/docs/react-reduce-bundle-size
- `awesome-design-md`: https://github.com/VoltAgent/awesome-design-md

## 기술 제원

- Framework는 Next.js App Router를 사용한다.
- UI runtime은 React 19를 사용한다.
- UI system은 shadcn/ui source component와 shadcn이 선택한 Radix/Base primitive를 따른다.
- Styling은 Tailwind CSS v4, CSS-first configuration, semantic token, OKLCH-compatible theme value를 기준으로 한다.
- Typography는 `pretendard` package의 `Pretendard Variable` 가변 다이나믹 서브셋을 기본 sans-serif font로 사용한다.
- Animation은 `motion` package 기반 Motion for React를 사용한다.
- Icon은 shadcn-compatible icon pattern을 따른다. `components.json`에 다른 `iconLibrary`가 없으면 lucide를 기본 후보로 본다.
- Form과 validation은 shadcn `Field`, `FieldGroup`, `FieldSet`, input group, 접근 가능한 invalid/disabled state를 사용한다.
- Notification은 deprecated shadcn toast pattern 대신 Sonner를 사용한다.

## Next.js App Router 규칙

- Server Component를 기본값으로 둔다. hook, browser API, local interactive state, client-only library가 필요할 때만 `'use client'`를 추가한다.
- route 구조는 `app/`, `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts` convention을 따른다.
- UI form/action에서 시작되는 mutation은 실용적이면 Server Action을 우선 검토한다.
- 외부 API, webhook, non-UI consumer, protocol endpoint는 Route Handler를 사용한다.
- request waterfall을 피한다. 독립 async work는 일찍 시작하고, 의존성이 없으면 `Promise.all`로 합친다.
- server/client boundary를 넘는 props에는 non-serializable 값을 넣지 않는다.
- 구체적인 Edge runtime 제약이 없으면 Node.js runtime을 기본값으로 둔다.

## React 19 규칙

- mutation UX에 맞으면 action과 form-state primitive를 우선 검토한다.
- optimistic UI는 rollback 동작이 명확하고 사용자 action이 복구 가능할 때만 사용한다.
- effect에서 derived state를 동기화하지 않는다. render 중 계산하거나, 비용이 큰 계산만 memoize한다.
- 큰 Client Component는 시각 조각이 아니라 interaction boundary 기준으로 나눈다.
- callback에서만 읽는 값 때문에 불필요한 subscription과 re-render를 만들지 않는다.

## shadcn/ui 조합 규칙

- custom markup을 만들기 전에 shadcn component가 있는지 먼저 확인한다.
- card가 적합한 곳에서는 `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` 구조를 갖춘다.
- `Dialog`, `Sheet`, `Drawer`에는 접근 가능한 title이 반드시 있어야 한다.
- 시각적으로 제목을 숨겨야 할 때는 같은 의미의 label이 화면에 있는지 확인하고 `sr-only` title을 둔다.
- form은 ad hoc `div` stack 대신 `FieldGroup`, `Field`, `FieldLabel`, `FieldDescription`, `FieldError` pattern을 사용한다.
- `InputGroup` 안에는 `InputGroupInput` 또는 `InputGroupTextarea`를 사용한다.
- input 안의 button은 absolute-positioned custom markup이 아니라 `InputGroupAddon`을 사용한다.
- validation은 `Field`에 `data-invalid`, control에 `aria-invalid`를 함께 둔다.
- disabled state는 `Field`에 `data-disabled`, control에 `disabled`를 함께 둔다.
- 작은 고정 선택지는 의미에 따라 `ToggleGroup`, `RadioGroup`, `Select`, `Tabs`를 사용하고, active-state button 반복 구현은 피한다.
- table은 shadcn table primitive와 loading, empty, pagination, sorting, filter state를 함께 설계한다.
- Sidebar navigation은 shadcn sidebar pattern을 사용한다. desktop은 persistent sidebar, mobile은 `Sheet` 기반 navigation을 기본으로 한다.
- editable Sidebar와 menu builder의 세부 기준은 `docs/agent/admin-layout-standards.md`를 따른다.
- toast는 Sonner, loading placeholder는 `Skeleton`, empty state는 `Empty`, status label은 `Badge`, separator는 `Separator`를 사용한다.
- shadcn `Button`에 `isLoading`이나 `isPending` prop을 새로 만들지 않는다. `Spinner`와 `disabled`를 조합한다.
- `TabsTrigger`는 반드시 `TabsList` 안에 둔다.
- `Avatar`에는 `AvatarFallback`을 포함한다.
- icon import는 project의 shadcn `iconLibrary`를 따른다. shadcn 초기화 후에는 `lucide-react`라고 가정하지 않는다.

## Tailwind CSS v4 스타일 규칙

- CSS-first Tailwind v4 convention을 따른다. `@import "tailwindcss";`, `@theme`, project CSS variable을 우선한다.
- font token은 `src/app/globals.css`에서 관리한다. 기본 sans-serif는 `pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css`와 `"Pretendard Variable"` stack을 사용한다.
- component markup에서는 `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `text-card-foreground`, `bg-primary`, `text-primary-foreground` 같은 semantic token을 사용한다.
- `bg-blue-500`, `text-slate-700`, one-off hex value 같은 raw product color를 component markup에 새로 넣지 않는다.
- child 사이 간격은 `gap-*`을 사용한다. 새 layout에 `space-x-*`, `space-y-*`를 쓰지 않는다.
- width와 height가 같으면 `size-*`를 사용한다.
- text overflow는 수동 조합 대신 `truncate`를 사용한다.
- overlay component에는 manual `z-index`를 넣지 않는다. `Dialog`, `Sheet`, `Popover`, `Tooltip`, `DropdownMenu`의 stacking은 primitive에 맡긴다.
- decorative gradient orb, bokeh blob, one-note palette는 만들지 않는다. admin UI는 절제되고 읽기 쉬우며 데이터 중심이어야 한다.

## Motion animation 규칙

- Motion for React를 기본 animation library로 사용한다. 앱에는 `motion` package를 설치한다.
- React Client Component에서는 `motion/react`를 사용한다.
- Server Component tree에서 hook이나 event handler 없는 정적 Motion component가 필요할 때만 `motion/react-client` 사용을 검토한다.
- 단순 hover color, focus ring, opacity transition은 CSS/Tailwind로 처리할 수 있다.
- enter/exit, layout transition, gesture, drag, reorder, shared transition은 Motion을 우선한다.
- shadcn/Radix primitive의 기본 animation과 Motion animation을 같은 요소에 중복 적용하지 않는다.
- `Dialog`, `Sheet`, `Drawer`, `Popover`, `Tooltip`의 접근성 구조와 focus management는 shadcn/Radix가 소유한다.
- Motion은 content/panel 내부의 presentation layer에만 적용한다.
- admin animation은 page/section enter, Sheet/Dialog transition, filter result transition, row reorder, loading/empty 전환처럼 목적이 있는 곳에 제한한다.
- animation property는 `opacity`와 `transform` 중심으로 둔다.
- layout thrashing을 만들 수 있는 `width`, `height`, `top`, `left` animation은 피한다.
- mount/unmount exit animation에는 `AnimatePresence`를 사용하고 direct child에 안정적인 `key`를 둔다.
- layout 변화에는 Motion의 `layout` 또는 `LayoutGroup`을 먼저 검토한다.
- SVG icon/spinner transform animation은 가능하면 wrapper element를 animate한다.
- 반복적이거나 animation-heavy한 화면에서는 `LazyMotion`과 `m` component를 검토한다.
- reduced motion을 반드시 존중한다.
- 공통 transition preset은 `src/lib/motion.ts` 같은 단일 파일에 모아 재사용한다.

## 어드민 요소 규칙

- compact하고 scan하기 쉬운 layout을 만든다.
- marketing-style section보다 table, filter, command menu, form, detail panel, persistent navigation을 우선한다.
- card는 repeated item, dashboard, framed tool에만 사용한다.
- card 안에 card를 넣지 않는다.
- 공통 page shell은 sidebar navigation, top bar, content header, filter/action row, primary data surface, pagination 또는 detail drawer 순서로 구성한다.
- data table은 workflow에 필요하면 loading, empty, error, selected-row state를 포함한다.
- filter는 search input, select, date range, checkbox, segmented/toggle group, clear/reset action처럼 익숙한 control을 사용한다.
- destructive action이나 되돌리기 어려운 mutation에만 confirmation을 사용한다.
- table 맥락을 유지하는 create/edit/detail 흐름은 `Sheet`를 우선한다.
- 짧고 집중된 task는 `Dialog`를 사용한다.
- 복잡한 multi-section form은 full page를 사용한다.
- 익숙한 icon은 button에 사용할 수 있지만, 반복 업무 속도를 늦출 수 있으면 명확한 label을 함께 둔다.
- mobile과 desktop에서 text가 container를 넘치지 않도록 responsive constraint를 둔다.

## 검증 체크리스트

- 문서 전용 변경:
  - `test -f AGENTS.md`
  - `test -f DESIGN.md`
  - `test -f docs/agent/admin-ui-standards.md`
  - `test -f docs/agent/admin-layout-standards.md`
  - `find .agents/skills -maxdepth 2 -name SKILL.md | sort`
  - `test ! -d .codex/skills`
- 앱 변경:
  - 사용 가능한 package manager의 lint, typecheck, test, build를 실행한다.
  - UI 작업은 runtime console error를 확인한다.
  - 의미 있는 UI 변경은 desktop/mobile screenshot으로 확인한다.
  - Motion animation은 normal motion과 reduced motion 동작을 확인한다.
  - loading, empty, error, long text, narrow width state를 확인한다.
