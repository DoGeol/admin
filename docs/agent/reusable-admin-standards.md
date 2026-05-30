# 재사용 가능한 어드민 구성 표준

이 문서는 이 저장소를 나중에 보일러플레이트, 내부 UI package, 또는 shadcn registry로 확장할 수 있도록 현재 단일 레포 안에서 지켜야 할 컴포넌트 분리와 테마 정책을 정의한다. 지금 단계에서는 registry를 구현하지 않는다. 대신 registry-ready한 구조와 코드 습관을 유지한다.

## 목표

- 이 저장소는 단일 어드민 앱이 아니라 재사용 가능한 admin foundation이다.
- 실제 어드민 화면, 문서, 재사용 컴포넌트를 같은 레포에서 함께 검증한다.
- 나중에 다른 어드민 프로젝트를 만들 때 보일러플레이트로 복사하거나, 내부 package로 분리하거나, shadcn registry item으로 배포할 수 있게 만든다.
- 현재는 `src` 안에서 책임을 분리하고, monorepo나 registry 전환은 별도 작업으로 남긴다.
- `/`는 실제 어드민 preview, `/docs`는 컴포넌트 조합과 정책 예시를 확인하는 문서 영역으로 유지한다.

## 기준 문서

- shadcn `components.json`: https://ui.shadcn.com/docs/components-json
- shadcn registry: https://ui.shadcn.com/docs/registry
- shadcn monorepo: https://ui.shadcn.com/docs/monorepo
- shadcn Tailwind v4: https://ui.shadcn.com/docs/tailwind-v4

## 폴더 책임

- `src/components/ui`: shadcn CLI가 생성한 source component 영역이다. upstream shadcn component와의 차이를 최소화한다.
- `src/components/admin`: 여러 어드민에서 재사용할 수 있는 admin block과 composition component를 둔다.
- `src/components/docs`: `/docs` 문서 화면 전용 component를 둔다.
- `src/app/(admin)`: 실제 어드민 preview와 demo route를 둔다. 가능한 `src/components/admin` 조합으로 구성한다.
- `src/app/(docs)`: component, pattern, theme 사용법을 설명하는 문서 route를 둔다.
- `src/lib`: route, utility, motion preset, theme helper처럼 UI와 앱 양쪽에서 쓰는 순수 helper를 둔다.
- `src/hooks`: reusable hook이 생길 때만 만든다. 한 화면에만 쓰는 hook은 해당 route 또는 component 가까이에 둔다.

권장 구조는 다음을 기준으로 한다.

```txt
src/
  app/
    (admin)/
    (docs)/
    globals.css
  components/
    ui/
    admin/
    docs/
  lib/
    motion.ts
    routes.ts
    themes.ts
```

`src/components/admin`과 `src/lib/themes.ts`는 실제 코드가 필요해질 때 만든다. 빈 폴더나 빈 index file을 먼저 만들지 않는다.

## 컴포넌트 분류

### shadcn primitive

- 예: `Button`, `Card`, `Dialog`, `Sheet`, `Field`, `Table`, `Badge`.
- 위치는 `src/components/ui`다.
- shadcn CLI가 설치한 구조, slot, accessibility attribute를 우회하지 않는다.
- 수정이 필요하면 먼저 shadcn docs와 `components.json` 기준을 확인한다.

### admin block

- 예: `AdminShell`, `PageHeader`, `MetricCard`, `DataSurface`, `FilterBar`, `StatusBadge`, `MenuTree`, `ThemePreview`.
- 위치는 `src/components/admin`이다.
- shadcn primitive를 조합해 업무 화면에서 반복되는 구조를 만든다.
- business domain, 특정 API, 특정 storage key, 실제 고객명에 직접 의존하지 않는다.
- label, data, action은 props나 composition으로 받는다.
- block 내부에서 route 이동을 강제하지 않는다. 링크가 필요하면 `href` 또는 render prop으로 받는다.

### app screen

- 예: `/`, `/settings/menu` 같은 route page.
- 위치는 `src/app/(admin)`이다.
- admin block과 mock/demo data를 조합해 실제 어드민 화면을 보여준다.
- app screen은 특정 업무 맥락을 담아도 되지만, reusable block에 그 맥락을 밀어 넣지 않는다.

### docs screen

- 예: `/docs/components/button`, `/docs/patterns`, `/docs/foundation`.
- 위치는 `src/app/(docs)`다.
- docs screen은 사용법, 상태, variant, theme 예시를 보여준다.
- docs 전용 navigation이나 설명 UI는 `src/components/docs`에 둔다.

## 재사용 가능성 기준

- 다른 어드민 프로젝트로 옮겼을 때 이름만 바꿔도 쓸 수 있으면 `src/components/admin` 후보로 본다.
- 특정 page에서만 의미가 있으면 route 가까이에 둔다.
- 2개 이상의 admin route에서 반복되고 props로 일반화할 수 있으면 `src/components/admin`으로 승격한다.
- component props는 serializable value와 React node composition을 우선한다.
- 외부 state store, browser storage, route hook, data fetching을 admin block 안에 숨기지 않는다.
- 필요한 shadcn component가 아직 없으면 먼저 shadcn CLI로 추가하고, 그 위에 admin block을 만든다.
- 하나의 admin block은 한 가지 구조적 책임만 갖는다.

## 테마 정책

- shadcn 방식에 맞춰 CSS variable 기반 semantic token으로 테마를 구성한다.
- 컴포넌트는 `bg-primary`, `text-muted-foreground`, `border-border`, `bg-card` 같은 semantic utility만 사용한다.
- raw color utility나 one-off hex value로 어드민별 색을 직접 넣지 않는다.
- 어드민별 테마는 CSS variable set을 교체하는 방식으로 처리한다.
- 테마 선택은 `data-admin-theme` attribute 또는 작은 theme provider로 확장할 수 있게 설계한다.
- 현재 기본값은 `:root` token이다.
- 테마 variant가 필요하면 다음 형태를 우선한다.

```css
:root {
  --background: ...;
  --foreground: ...;
  --primary: ...;
  --primary-foreground: ...;
  --action: ...;
  --action-foreground: ...;
  --success: ...;
  --success-foreground: ...;
}

[data-admin-theme="linear"] {
  --primary: ...;
  --primary-foreground: ...;
}

[data-admin-theme="flex"] {
  --action: ...;
  --action-foreground: ...;
}
```

- Tailwind CSS v4에서는 새 CSS variable을 `@theme inline`에 등록한 뒤 사용한다.
- `--action`, `--success`, `--insight` 같은 project token은 shadcn 기본 token을 대체하지 않고 보조 token으로 둔다.
- 테마 변경은 component 구조 변경 없이 token 교체만으로 가능한지 먼저 확인한다.

테마 구현이 필요해지면 다음 책임 분리를 우선한다.

- `src/app/globals.css`: shadcn 기본 token, project token, `@theme inline`, theme attribute별 CSS variable set을 둔다.
- `src/lib/themes.ts`: 선택 가능한 theme id, label, 설명 같은 serializable metadata만 둔다.
- `src/components/admin/theme-*`: theme preview, theme switcher처럼 실제 interaction이 있는 UI가 필요할 때만 만든다.
- 실제 route는 theme id를 전달하거나 attribute를 적용한다. reusable admin block이 theme id를 내부에서 직접 읽지 않는다.

theme id는 문자열 union으로 관리한다.

```ts
export const adminThemeIds = ["default", "linear", "flex"] as const

export type AdminThemeId = (typeof adminThemeIds)[number]
```

theme attribute는 app shell 또는 preview root에 적용한다.

```tsx
<div data-admin-theme={themeId}>{children}</div>
```

## shadcn 호환성

- `components.json`의 `style`, `iconLibrary`, `aliases`, `tailwind.css`, `tailwind.cssVariables`를 신뢰한다.
- shadcn component를 추가하거나 수정할 때는 `pnpm dlx shadcn@latest docs <component>`로 현재 API와 composition을 확인한다.
- shadcn generated component에 project-specific business prop을 추가하지 않는다.
- 필요한 project variant는 가능한 wrapper 또는 admin block에서 해결한다.
- generated component에 variant를 추가해야 할 때는 semantic token과 기존 cva pattern을 유지한다.
- `src/components/admin`은 shadcn registry item으로 전환될 수 있다는 전제로 import path와 dependency를 단순하게 유지한다.

## `/docs`의 역할

- `/docs`는 단순 설명 페이지가 아니라 reusable admin block의 사용 예시와 검증 공간이다.
- 새 admin block을 만들면 가능하면 `/docs`에 최소 하나의 사용 예시를 추가한다.
- docs 예시는 loading, empty, error, long text, narrow width 같은 상태를 보여주는 방향을 우선한다.
- theme token이 늘어나면 `/docs/foundation`에서 시각 예시를 제공한다.
- `/docs`에만 필요한 장식이나 설명 UI를 실제 admin route로 가져오지 않는다.

## 향후 분리 기준

- `src/components/admin`이 충분히 안정되면 `packages/admin-ui` 또는 `packages/ui`로 분리할 수 있다.
- monorepo 전환 시 shadcn CLI가 이해할 수 있도록 각 workspace에 `components.json`을 둔다.
- package로 분리하기 전까지는 app 내부 alias와 package public API를 섞어서 설계하지 않는다.
- `src/components/admin`의 외부 노출 후보는 component 파일, props type, token 이름, docs 예시 기준으로 판단한다.
- shadcn registry 전환 시 `registry.json`과 item별 JSON을 별도 작업으로 만든다.
- registry 전환 전까지는 `public/r` output이나 registry namespace를 만들지 않는다.
- 분리 작업 전에는 import 경로, theme token, dependency, docs 예시가 registry-ready한지 점검한다.

## 금지 사항

- registry 구현을 미리 넣지 않는다.
- `src/components/ui`에 app-specific business logic을 넣지 않는다.
- reusable admin block이 특정 route, localStorage key, API path에 직접 의존하지 않게 한다.
- theme별 차이를 component branch로 해결하지 않는다.
- admin별 색상을 raw utility로 직접 넣지 않는다.
- docs 전용 component를 실제 admin workflow의 필수 dependency로 만들지 않는다.

## 검증 체크리스트

- 새 reusable component가 `src/components/admin` 또는 더 적절한 가까운 위치에 있는지 확인한다.
- shadcn primitive가 필요한데 custom markup으로 대체하지 않았는지 확인한다.
- component markup에 raw product color가 없는지 확인한다.
- theme 변경이 CSS variable 교체로 가능한지 확인한다.
- reusable block이 route, storage, domain data에 직접 결합되어 있지 않은지 확인한다.
- `/docs`에 사용 예시를 추가해야 하는 block인지 확인한다.
