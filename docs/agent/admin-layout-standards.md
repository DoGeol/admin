# 어드민 레이아웃과 메뉴 표준

이 문서는 "shadcn으로 만드는 어드민"의 기본 레이아웃과 편집 가능한 Sidebar 메뉴 모델을 정의한다. 실제 앱 scaffold 전에는 이 문서를 기준으로 화면 구조와 상태 모델을 계획하고, scaffold 후에는 실제 `components.json`, package manager, import alias를 우선 확인한다.

## 레이아웃 shell

- 기본 레이아웃은 shadcn `Sidebar` 중심의 운영형 admin shell이다.
- desktop navigation은 persistent `Sidebar`를 사용한다.
- desktop 기본 상태는 펼친 메뉴이며, 작업 공간이 필요할 때 접힘 icon rail을 지원한다.
- mobile navigation은 top bar의 hamburger trigger로 여는 shadcn `Sheet`를 사용한다.
- mobile에서도 desktop과 같은 menu tree를 렌더링한다.
- top bar는 `Breadcrumb`와 user menu를 기본으로 둔다.
- Command palette나 빠른 메뉴 검색은 v1에서 구현하지 않고 향후 확장 포인트로만 남긴다.
- page-level action은 top bar에 섞지 않고 content header 또는 action row에 둔다.
- 공통 content shell은 page header, optional actions, optional filter row, primary surface, pagination 또는 detail `Sheet`/`Dialog` 순서로 구성한다.
- 페이지별 업무 화면은 메뉴마다 달라질 수 있다. layout shell은 CRUD, approval queue, dashboard 같은 개별 화면의 구체 UI를 강제하지 않는다.
- URL 구조와 GitHub Pages base path는 `docs/agent/routing-standards.md`를 우선한다. 실제 어드민 앱은 `/` 기준이며, 앱 내부에 `/admin` route segment를 만들지 않는다.

## Sidebar 메뉴 모델

- 메뉴는 2단계 구조를 기본으로 한다: group과 item.
- group은 section label과 sort order를 갖고 item 목록을 포함한다.
- item은 최소한 `id`, `label`, `href`, `iconKey`, `sortOrder`, `hidden`, `disabled`를 지원한다.
- group의 하위 목록 이름은 shadcn/sidebar 구현과 store 설계에 맞춰 `items` 또는 `children` 중 하나로 통일한다.
- 문서와 type definition에서는 같은 하위 목록 이름을 반복 사용한다.
- `id`는 storage와 reorder 기준이므로 안정적인 문자열을 사용한다.
- label 변경, sort order 변경, hidden 처리로 `id`가 바뀌지 않아야 한다.
- `href`는 앱 내부 route만 지원한다. external link는 v1 범위에서 제외한다.
- `hidden` item은 Sidebar에 렌더링하지 않지만, 메뉴 관리 화면에서는 표시하고 다시 켤 수 있어야 한다.
- `disabled` item은 Sidebar에 표시하되 click navigation을 막고 disabled affordance를 제공한다.
- v1에서는 role/permission, dynamic badge count, external link, 3단계 이상 nesting을 만들지 않는다.

## Icon 정책

- storage에는 icon component를 저장하지 않는다.
- 메뉴 모델에는 문자열 `iconKey`만 저장한다.
- rendering 계층은 앱 내부 icon registry에서 `iconKey`를 실제 icon component로 해석한다.
- icon registry는 허용 목록으로 관리한다.
- 사용자가 임의 문자열로 새 icon을 주입할 수 없게 한다.
- shadcn component에 icon을 전달할 때는 shadcn skill 규칙을 따른다.
- 최종 component props에는 문자열이 아니라 registry가 반환한 icon object/component를 전달한다.
- shadcn `components.json`의 `iconLibrary`가 lucide가 아니면 해당 library를 우선한다.
- lucide는 명시 설정이 없을 때의 기본 후보로만 취급한다.

## 메뉴 관리 UX

- Sidebar 안에서 inline editing을 제공하지 않는다.
- 메뉴 변경은 별도 "메뉴 관리" 설정 화면에서 수행한다.
- 메뉴 관리 화면은 shadcn `Card`, `Field`, `FieldGroup`, `Button`, `Select`, `Switch`, `AlertDialog` 조합을 우선한다.
- 새 group/item 추가, label 변경, href 변경, icon 선택, hidden/disabled toggle, 삭제 또는 초기화를 명확한 action으로 제공한다.
- 파괴적이거나 되돌리기 어려운 action은 `AlertDialog`로 확인한다.
- 일반 field editing에는 불필요한 confirmation을 붙이지 않는다.
- 순서 변경은 Motion `Reorder` 기반 drag와 위/아래 이동 `Button`을 함께 제공한다.
- drag handle에는 명확한 accessible label을 제공한다.
- keyboard 사용자는 위/아래 button으로 drag와 같은 결과를 만들 수 있어야 한다.
- draft 변경은 실제 Sidebar에 즉시 반영하지 않는다.
- 편집 화면 안의 preview 또는 list에만 draft를 반영하고, 사용자가 "적용"을 실행하면 published menu로 반영한다.
- "초기화"는 browser storage 값을 제거하고 code-defined default menu로 복구한다.
- JSON import/export는 v1에서 제외한다.

## 상태와 저장소

- `zustand` store는 client-only state로 둔다.
- Server Component나 server module에서 store를 import하지 않는다.
- published menu는 `localStorage`에 저장한다. 예시 key는 `admin:menu:v1`이다.
- draft menu는 `sessionStorage` 또는 zustand 임시 상태에 저장한다. 예시 key는 `admin:menu-draft:v1`이다.
- Sidebar는 published menu만 읽는다.
- draft state를 Sidebar 전역 navigation에 직접 연결하지 않는다.
- hydration 전에는 code-defined default menu를 기준으로 렌더링한다.
- client mount 후 published menu를 로드해 동기화한다.
- `localStorage`와 `sessionStorage` 접근은 Client Component boundary 또는 client-only helper 내부에서만 수행한다.
- storage read 실패, parse 실패, schema mismatch가 있으면 default menu로 fallback하고 사용자에게 reset 가능한 상태로 보여준다.
- reset은 `admin:menu:v1`과 `admin:menu-draft:v1` 저장값을 제거하고 zustand state를 default menu로 되돌린다.

## 구현 메모

- default menu는 code에 상수로 둔다.
- browser storage를 유일한 source of truth로 만들지 않는다.
- menu schema에는 version을 포함하는 것을 권장한다.
- storage key도 `v1`처럼 version을 드러내 migration 여지를 남긴다.
- 메뉴 관리 화면에서 draft를 만들 때는 published menu를 복사해 시작한다.
- 적용 action은 draft를 검증한 뒤 published menu로 승격하고 `localStorage`에 저장한다.
- `href` 중복, 빈 label, 빈 href, 없는 `iconKey`, 순환 또는 3단계 이상 nesting은 저장 전에 막는다.
- menu state가 route 이동과 직접 충돌하지 않도록 navigation click과 edit action은 분리된 component boundary에 둔다.

## 검증 체크리스트

- Sidebar shell이 desktop, collapsed rail, mobile `Sheet`에서 같은 published menu를 렌더링하는지 확인한다.
- top bar에 `Breadcrumb`와 user menu가 있고, page action이 content header/action row에 있는지 확인한다.
- 메뉴 관리 화면이 shadcn form/composition 규칙을 따르는지 확인한다.
- Motion `Reorder`가 pointer 조작과 button 조작 양쪽에서 같은 순서 결과를 만드는지 확인한다.
- draft 변경이 적용 전 Sidebar에 반영되지 않는지 확인한다.
- reset이 `localStorage`와 `sessionStorage` 저장값을 제거하고 default menu로 복구하는지 확인한다.
- storage 접근이 client-only boundary 안에 있어 Next.js hydration mismatch를 만들지 않는지 확인한다.
