# shadcn Admin UI Standards

이 문서는 이 저장소에서 Codex가 "shadcn으로 만드는 어드민" 작업을 수행할 때 따라야 할 기술 제원과 UI 생성 규칙을 정리한다. 루트 `AGENTS.md`는 짧은 라우팅 지침만 담고, 실제 판단 기준은 이 문서를 우선 참고한다. Sidebar shell과 편집 가능한 menu builder를 다룰 때는 `docs/agent/admin-layout-standards.md`를 함께 따른다.

## Source Baseline

- Codex `AGENTS.md`: https://developers.openai.com/codex/guides/agents-md
- Codex customization: https://developers.openai.com/codex/concepts/customization
- Codex skills: https://developers.openai.com/codex/skills
- shadcn/ui skills: https://ui.shadcn.com/docs/skills
- shadcn Tailwind v4: https://ui.shadcn.com/docs/tailwind-v4
- Motion React installation: https://motion.dev/docs/react-installation
- Motion accessibility: https://motion.dev/docs/react-accessibility
- Motion reduce bundle size: https://motion.dev/docs/react-reduce-bundle-size

## Technical Spec

- Framework: Next.js App Router.
- UI runtime: React 19.
- UI system: shadcn/ui source components, Radix/Base primitives as selected by shadcn.
- Styling: Tailwind CSS v4, CSS-first configuration, semantic tokens, OKLCH-compatible theme values.
- Animation: Motion for React through the `motion` package.
- Icons: shadcn-compatible icon patterns. Default to lucide only when `components.json` has no different `iconLibrary`.
- Forms and validation: shadcn `Field`, `FieldGroup`, `FieldSet`, input groups, and accessible invalid/disabled states.
- Notifications: Sonner instead of deprecated shadcn toast patterns.

## Next.js App Router Rules

- Prefer Server Components by default. Add `'use client'` only for hooks, browser APIs, local interactive state, or client-only libraries.
- Keep route structure idiomatic: `app/`, layouts, pages, loading states, error boundaries, not-found handling, and route handlers.
- Use Server Actions for mutations initiated by UI forms/actions when practical. Use route handlers for external APIs, webhooks, non-UI consumers, and protocol-style endpoints.
- Avoid request waterfalls. Start independent async work early and join with `Promise.all` where data dependencies allow it.
- Keep non-serializable values out of props crossing the server/client boundary.
- Default to the Node.js runtime unless a concrete Edge runtime constraint exists.

## React 19 Rules

- Prefer actions and form-state primitives for mutation UX where they fit the workflow.
- Use optimistic UI only when rollback behavior is clear and the user action is reversible or recoverable.
- Avoid derived state in effects. Compute from props/state during render or memoize only expensive work.
- Split large client components by interaction boundary, not by visual micro-fragments.
- Keep callback-only reads out of reactive subscriptions when they would cause avoidable re-renders.

## shadcn/ui Composition Rules

- Use existing shadcn components before custom markup. Check the shadcn skill and CLI docs for component availability.
- Compose full component structures: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter` where cards are appropriate.
- Dialog, Sheet, and Drawer must have accessible titles. Use visually hidden titles only when the visual design already has an equivalent label.
- Forms use `FieldGroup`, `Field`, `FieldLabel`, `FieldDescription`, and `FieldError` patterns instead of ad hoc `div` stacks.
- `InputGroup` must use `InputGroupInput` or `InputGroupTextarea`. Buttons inside inputs use `InputGroupAddon`, not absolute-positioned custom markup.
- Field validation uses both container and control state: `data-invalid` on `Field`, `aria-invalid` on the control; `data-disabled` on `Field`, `disabled` on the control.
- Option sets with a small fixed number of choices use `ToggleGroup`, `RadioGroup`, `Select`, or `Tabs` based on interaction semantics, not repeated active-state buttons.
- Tables use shadcn table primitives with explicit empty, loading, pagination, sorting, and filter states.
- Sidebar navigation uses the shadcn sidebar pattern when available. Keep primary navigation persistent on desktop and sheet/drawer-based on mobile. Editable Sidebar/menu-builder details are defined in `docs/agent/admin-layout-standards.md`.
- Toasts use Sonner. Loading states use `Skeleton`. Empty states use `Empty`. Status labels use `Badge`. Separators use `Separator`.
- Button loading states use `Spinner` plus `disabled`; do not invent `isLoading` or `isPending` props for shadcn `Button`.
- `TabsTrigger` must be inside `TabsList`. `Avatar` must include `AvatarFallback`.
- Icon imports follow the project's shadcn `iconLibrary`; do not assume `lucide-react` after shadcn initializes a different icon library.

## Tailwind CSS v4 Styling Rules

- Use CSS-first Tailwind v4 conventions. Prefer `@import "tailwindcss";`, `@theme`, and project CSS variables over legacy JS config assumptions.
- Use semantic tokens such as `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `text-card-foreground`, `bg-primary`, and `text-primary-foreground`.
- Do not use raw product colors like `bg-blue-500`, `text-slate-700`, or one-off hex values in component markup.
- Use `gap-*` for spacing between children. Do not use `space-x-*` or `space-y-*` for new layouts.
- Use `size-*` when width and height match.
- Use `truncate` instead of manually combining overflow, ellipsis, and whitespace utilities.
- Avoid manual `z-index` on overlay components. Let Dialog, Sheet, Popover, Tooltip, and DropdownMenu manage stacking.
- Do not add decorative gradient orbs, bokeh blobs, or one-note palettes. Admin UI should be restrained, readable, and data-focused.

## Motion Animation Rules

- Motion for React를 기본 animation library로 사용한다. 앱에 설치할 때는 `motion` package를 사용한다.
- React Client Component에서는 `motion/react`를 사용한다. Next.js App Router의 Server Component tree에서 hook이나 event handler 없는 정적 Motion component가 필요할 때만 `motion/react-client` 사용을 검토한다.
- 단순 hover color, focus ring, opacity transition은 CSS/Tailwind로 처리할 수 있다. enter/exit, layout transition, gesture, drag, reorder, shared transition은 Motion을 우선한다.
- shadcn/Radix primitive의 기본 animation과 Motion animation을 중복 적용하지 않는다. 같은 요소의 animation owner는 CSS 또는 Motion 중 하나로 유지한다.
- Dialog, Sheet, Drawer, Popover, Tooltip의 접근성 구조와 focus management는 shadcn/Radix가 소유한다. Motion은 content/panel 내부의 presentation layer에만 적용한다.
- Admin UI animation은 빠르고 목적 있게 사용한다: page/section enter, Sheet/Dialog transition, filter result transition, row reorder, loading/empty state 전환에 한정한다.
- Animate property는 `opacity`와 `transform` 중심으로 둔다. `width`, `height`, `top`, `left`처럼 layout thrashing을 만들 수 있는 속성은 피한다.
- Mount/unmount exit animation에는 `AnimatePresence`를 사용하고 direct child에 안정적인 `key`를 둔다.
- Layout 변화에는 Motion의 `layout` 또는 `LayoutGroup`을 먼저 검토한다.
- SVG icon/spinner를 transform 애니메이션할 때는 가능하면 wrapper element를 animate해서 browser acceleration을 유지한다.
- 반복적이거나 animation-heavy한 화면에서는 `LazyMotion`과 `m` component를 검토해 bundle size를 줄인다.
- Reduced motion을 반드시 존중한다. 앱 루트에는 `MotionConfig reducedMotion="user"`를 검토하고, 큰 이동이나 parallax 성격의 animation은 `useReducedMotion`으로 opacity 전환 또는 비활성화 대안을 둔다.
- 공통 transition preset은 앱 생성 후 `src/lib/motion.ts` 같은 단일 파일에 모아 재사용한다.

## Admin Element Rules

- Use compact, scannable layouts. Prioritize tables, filters, command menus, forms, detail panels, and persistent navigation over marketing-style sections.
- Keep cards for repeated items, dashboards, and framed tools only. Do not nest cards inside cards.
- Common page shell: sidebar navigation, top bar actions, content header, filter/action row, primary data surface, pagination or detail drawer.
- Data tables must include loading, empty, error, and selected-row states when the workflow depends on them.
- Filters should use familiar controls: search input, select, date range, checkbox, segmented/toggle group, and clear/reset action.
- Mutating actions should use confirmation only for destructive or hard-to-reverse operations.
- Prefer Sheet for contextual create/edit/detail flows that keep the table visible. Prefer Dialog for focused short tasks. Prefer full pages for complex multi-section forms.
- Buttons should use icons from lucide-react when the icon is familiar. Add clear labels where ambiguity would slow down repeated admin work.
- Text must fit on mobile and desktop. Use responsive layout constraints instead of viewport-scaled font sizes.

## Verification Checklist

- Documentation-only changes:
  - `test -f AGENTS.md`
  - `test -f docs/agent/admin-ui-standards.md`
  - `test -f docs/agent/admin-layout-standards.md`
  - `find .agents/skills -maxdepth 2 -name SKILL.md | sort`
  - `test ! -d .codex/skills`
- Future app changes:
  - Run the package manager's lint, typecheck, test, and build commands when available.
  - Inspect runtime console errors for UI work.
  - Capture desktop and mobile screenshots for meaningful UI changes.
  - Check reduced-motion behavior for meaningful Motion animations.
  - Check loading, empty, error, long-text, and narrow-width states for admin workflows.
