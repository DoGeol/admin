# 디자인 정책

이 문서는 이 프로젝트의 화면이 어떤 인상과 밀도로 보여야 하는지 정의한다. 기술 구현 규칙은 `AGENTS.md`와 `docs/agent/*.md`를 따르고, 시각 언어와 화면 구성 판단은 이 문서를 우선 확인한다.

## 디자인 기준

- 기준 레퍼런스는 `VoltAgent/awesome-design-md`의 Linear 디자인 분석이다.
- 그대로 복제하지 않고, Linear의 정밀한 제품 UI 감각을 밝은 SaaS admin 화면에 맞게 변환한다.
- 목표 인상은 조용함, 정확함, 빠른 스캔, 낮은 장식성, 높은 반복 작업 효율이다.
- 마케팅 페이지처럼 보이는 hero, 장식용 gradient, 과장된 card grid, 큰 일러스트레이션은 만들지 않는다.
- 어드민 화면의 주인공은 실제 업무 데이터, table, filter, form, detail panel, navigation이다.

## 시각 원칙

- 기본 화면은 밝은 neutral canvas를 사용한다.
- hierarchy는 shadow보다 surface 차이, 1px hairline border, muted text, spacing으로 만든다.
- accent color는 하나만 사용한다. 기본 후보는 Linear의 lavender-blue 감각을 반영한 primary token이며, raw color utility로 직접 쓰지 않는다.
- decorative background를 만들지 않는다. gradient orb, bokeh blob, spotlight card, noisy texture는 금지한다.
- border radius는 작게 유지한다. 일반 card와 panel은 `rounded-lg` 이하를 기본으로 하고, 반복 item card는 8px 안팎을 선호한다.
- 넓은 여백보다 정돈된 밀도를 우선한다. 정보 간격은 `gap-*`으로 제어하고 화면 단위 rhythm은 예측 가능해야 한다.

## 색상과 토큰

- component markup에서는 semantic token만 사용한다: `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-primary-foreground`.
- raw color utility는 금지한다. 예: `bg-blue-500`, `text-slate-700`, `border-zinc-200`를 새로 넣지 않는다.
- 상태 색상은 shadcn `Badge` variant, semantic token, 혹은 theme variable을 통해 표현한다.
- focus ring은 primary 계열 token으로 통일한다.
- destructive action은 shadcn destructive token을 사용하고, 일반 강조색으로 쓰지 않는다.
- dark mode는 나중에 지원할 수 있지만 v1 admin 화면은 밝은 운영형 화면을 기준으로 설계한다.

## 타이포그래피

- 기본 sans-serif는 `pretendard` 패키지의 `Pretendard Variable` 가변 다이나믹 서브셋이다.
- 문서, 주석, 사용자에게 보이는 텍스트는 한글을 기본으로 한다. 한글로 쓰기 어려운 기술 고유명사, API 이름, 패키지 이름, 명령어, 파일 경로는 원문을 유지한다.
- 화면 제목은 크고 장식적인 display type보다 업무 맥락을 빠르게 읽을 수 있는 크기를 우선한다.
- admin 내부 heading은 20-28px 범위를 기본으로 하고, true landing hero가 아닌 곳에서 hero-scale type을 쓰지 않는다.
- letter spacing은 0을 기본으로 유지한다. Linear 레퍼런스의 negative tracking은 그대로 가져오지 않는다.
- table, form, sidebar, toolbar 내부 글자는 container에 맞는 작은 크기를 사용한다.

## 레이아웃

- 기본 shell은 shadcn `Sidebar` 중심이다.
- desktop은 persistent sidebar와 접힘 rail을 지원한다.
- mobile은 top bar hamburger trigger와 shadcn `Sheet` navigation을 사용한다.
- top bar는 `Breadcrumb`와 user menu 중심으로 구성한다. 빠른 검색 command palette는 v1에서 구현하지 않는다.
- page action은 top bar가 아니라 content header나 action row에 둔다.
- 공통 page 구조는 다음 순서를 따른다: page header, optional action row, optional filter row, primary surface, pagination 또는 detail panel.
- table/list 화면은 detail `Sheet`를 우선해 원래 목록 맥락을 보존한다.
- 복잡한 다중 section form은 별도 page로 분리한다.

## 컴포넌트 스타일

- shadcn/ui 컴포넌트를 먼저 사용한다. custom markup은 shadcn에 없는 구조일 때만 만든다.
- card는 dashboard metric, repeated item, framed tool, data surface에만 사용한다.
- card 안에 card를 중첩하지 않는다.
- `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` 구조를 지킨다.
- form은 `Field`, `FieldGroup`, `FieldSet` 계열을 우선한다.
- status는 `Badge`, loading은 `Skeleton` 또는 `Spinner`, empty state는 `Empty`, divider는 `Separator`를 사용한다.
- table은 loading, empty, error, selected-row, pagination, sort, filter 상태를 함께 설계한다.
- icon button은 familiar icon을 사용하고, 의미가 모호하면 label이나 tooltip을 제공한다.

## Motion

- Motion은 작업 이해를 돕는 곳에만 사용한다.
- enter/exit, layout transition, detail Sheet 내부 전환, row reorder, filter 결과 전환에는 Motion을 우선 검토한다.
- 단순 hover color, focus ring, opacity transition은 CSS/Tailwind로 충분하다.
- 같은 요소에 shadcn/Radix animation과 Motion animation을 동시에 소유시키지 않는다.
- reduced motion을 반드시 존중한다.
- animation duration은 빠르게 유지하고, 장식용 반복 animation은 만들지 않는다.

## 금지 사항

- landing page composition을 admin 첫 화면으로 만들지 않는다.
- oversized hero, marketing CTA band, split hero card, decorative gradient를 만들지 않는다.
- raw color utility를 component markup에 새로 넣지 않는다.
- 한 화면을 한 가지 색 계열만으로 채우지 않는다.
- sidebar와 menu editor의 상태를 섞지 않는다.
- 사용자가 편집 중인 draft menu를 published navigation에 즉시 반영하지 않는다.
- browser storage 접근을 Server Component나 server module에서 하지 않는다.

## 참고

- `VoltAgent/awesome-design-md`: https://github.com/VoltAgent/awesome-design-md
- Linear 디자인 분석: https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/linear.app/DESIGN.md
