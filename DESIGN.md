# 디자인 정책

이 문서는 이 프로젝트의 화면이 어떤 인상과 밀도로 보여야 하는지 정의한다. 기술 구현 규칙은 `AGENTS.md`와 `docs/agent/*.md`를 따르고, 시각 언어와 화면 구성 판단은 이 문서를 우선 확인한다.

## 디자인 기준

- 기준 레퍼런스는 `VoltAgent/awesome-design-md`의 Linear 디자인 분석이다.
- 그대로 복제하지 않고, Linear의 정밀한 제품 UI 감각을 밝은 SaaS admin 화면에 맞게 변환한다.
- 보조 무드 레퍼런스는 `flex.team`의 사람 중심 HR SaaS 감각이다.
- `flex.team`의 로고, 문구, 사진, 레이아웃, 브랜드 자산은 복제하지 않는다.
- Linear는 운영 UI의 정밀도와 밀도를 담당하고, flex-inspired 무드는 사람 중심 신뢰감과 명확한 action 강조에만 사용한다.
- 목표 인상은 조용함, 정확함, 빠른 스캔, 낮은 장식성, 높은 반복 작업 효율이다.
- 마케팅 페이지처럼 보이는 hero, 장식용 gradient, 과장된 card grid, 큰 일러스트레이션은 만들지 않는다.
- 어드민 화면의 주인공은 실제 업무 데이터, table, filter, form, detail panel, navigation이다.

## Admin Mood

- 최종 인상은 "정밀한 운영 도구이지만 차갑지 않은 HR SaaS"다.
- 화면은 업무 중심이어야 하며, 사람 중심 온기는 copy, empty state, onboarding panel, docs preview, action affordance에서만 드러낸다.
- admin 첫 화면은 landing hero가 아니라 dashboard여야 한다.
- 첫 화면에는 sidebar, top bar, metric, task queue, table/list, insight panel, docs preview 같은 실제 운영 요소가 보여야 한다.
- 사진 hero나 고객 사례 carousel 대신 실제 제품 UI를 닮은 table, timeline, 조직/구성원 상태, 문서 미리보기 surface를 사용한다.
- 강한 브랜드 감각은 전체 배경이 아니라 작은 primary action, success status, key insight에만 제한한다.
- 문서 영역(`/docs`)은 제품 화면보다 표현력을 조금 더 허용하되, marketing page처럼 보이면 안 된다.

## 시각 원칙

- 기본 화면은 밝은 neutral canvas를 사용한다.
- hierarchy는 shadow보다 surface 차이, 1px hairline border, muted text, spacing으로 만든다.
- accent color는 하나만 지배적으로 사용한다. 기본 product primary는 정밀한 neutral/blue 계열을 유지하되, flex-inspired action green은 보조 accent로 제한한다.
- action green은 primary CTA, success status, "적용" 같은 긍정 action에만 사용한다.
- action green은 배경 전체, sidebar selection 전체, large section background로 쓰지 않는다.
- decorative background를 만들지 않는다. gradient orb, bokeh blob, spotlight card, noisy texture는 금지한다.
- border radius는 작게 유지한다. 일반 card와 panel은 `rounded-lg` 이하를 기본으로 하고, 반복 item card는 8px 안팎을 선호한다.
- 넓은 여백보다 정돈된 밀도를 우선한다. 정보 간격은 `gap-*`으로 제어하고 화면 단위 rhythm은 예측 가능해야 한다.
- 따뜻함은 beige/brown palette가 아니라 여백, 문장 톤, 밝은 neutral surface, 명확한 action contrast로 만든다.
- dark surface는 insight panel, footer-like docs block, data relationship preview처럼 의미가 있는 영역에만 사용한다.

## 색상과 토큰

- component markup에서는 semantic token만 사용한다: `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-primary-foreground`.
- raw color utility는 금지한다. 예: `bg-blue-500`, `text-slate-700`, `border-zinc-200`를 새로 넣지 않는다.
- 상태 색상은 shadcn `Badge` variant, semantic token, 혹은 theme variable을 통해 표현한다.
- flex-inspired green이 필요하면 raw `bg-green-*`가 아니라 semantic token을 먼저 정의한다. 예: `--action`, `--action-foreground`, `--success`, `--success-foreground`.
- action green 후보는 bright green 계열이지만, admin 제품에서는 눈부시지 않도록 token 단계에서 조정한다.
- dark insight surface가 필요하면 `--insight`, `--insight-foreground`, `--insight-muted` 같은 별도 token을 검토한다.
- product screenshot-style surface는 `bg-muted` 또는 별도 muted surface token을 사용하고, 이미지처럼 보이는 preview 영역은 border와 약한 shadow로 구분한다.
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
- 주요 문구는 짧고 단정하게 쓴다. 예: "오늘 처리", "승인 대기", "검토 필요", "적용".
- 설명 문장은 사람 중심으로 쓰되 감성 문구가 업무 정보를 밀어내면 안 된다.

## 레이아웃

- 기본 shell은 shadcn `Sidebar` 중심이다.
- desktop은 persistent sidebar와 접힘 rail을 지원한다.
- mobile은 top bar hamburger trigger와 shadcn `Sheet` navigation을 사용한다.
- top bar는 `Breadcrumb`와 user menu 중심으로 구성한다. 빠른 검색 command palette는 v1에서 구현하지 않는다.
- page action은 top bar가 아니라 content header나 action row에 둔다.
- 공통 page 구조는 다음 순서를 따른다: page header, optional action row, optional filter row, primary surface, pagination 또는 detail panel.
- table/list 화면은 detail `Sheet`를 우선해 원래 목록 맥락을 보존한다.
- 복잡한 다중 section form은 별도 page로 분리한다.
- dashboard 첫 화면은 다음 흐름을 우선 검토한다: sidebar, top bar, page header, metric row, task queue, table 또는 list surface, dark insight panel, docs 또는 설정 preview.
- dark insight panel은 데이터 관계, 위험 신호, 자동화 제안처럼 해석이 필요한 정보에만 사용한다.
- docs preview는 실제 제품 navigation과 분리하되, admin home에서 작은 보조 panel로 연결할 수 있다.
- 제품 UI screenshot처럼 보이는 preview surface는 실제 screenshot을 넣기보다 table/list/form 조합으로 재현한다.

## 컴포넌트 스타일

- shadcn/ui 컴포넌트를 먼저 사용한다. custom markup은 shadcn에 없는 구조일 때만 만든다.
- card는 dashboard metric, repeated item, framed tool, data surface에만 사용한다.
- card 안에 card를 중첩하지 않는다.
- `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` 구조를 지킨다.
- form은 `Field`, `FieldGroup`, `FieldSet` 계열을 우선한다.
- status는 `Badge`, loading은 `Skeleton` 또는 `Spinner`, empty state는 `Empty`, divider는 `Separator`를 사용한다.
- table은 loading, empty, error, selected-row, pagination, sort, filter 상태를 함께 설계한다.
- icon button은 familiar icon을 사용하고, 의미가 모호하면 label이나 tooltip을 제공한다.
- primary action button은 선명해야 하지만 화면 전체에서 하나만 가장 강해야 한다.
- action green button은 "적용", "저장", "도입 문의" 같은 긍정 action에만 사용하고, 일반 navigation button에는 쓰지 않는다.
- segmented tab과 filter chip은 flex-inspired feature tab처럼 단정하게 만들되, admin에서는 32-40px 높이와 작은 radius를 유지한다.
- metric card는 숫자, label, trend, status를 한눈에 읽게 구성한다.
- task queue item은 사람/조직/문서 같은 HR 맥락을 담되, decorative illustration 없이 text와 icon, status로 표현한다.

## Flex-Inspired 적용 예시

- Admin home: "어드민 작업 현황" 아래 metric row, 작업 큐, 최근 활동 table, dark insight panel, 문서 preview panel을 배치한다.
- Sidebar: neutral background와 1px border를 유지하고, 선택 상태는 과한 green fill보다 subtle surface와 text contrast를 우선한다.
- Primary action: "적용" 또는 "저장" 같은 단일 CTA에 action green token을 사용한다.
- Status: "정상", "완료", "적용됨" 같은 긍정 상태에 success token을 사용한다.
- Docs: `/docs/foundation`에는 token, typography, Motion 규칙을 product surface처럼 보여주는 preview block을 둘 수 있다.
- Empty state: "아직 검토할 항목이 없습니다"처럼 차분한 문장과 작은 action을 제공한다.
- Insight: dark panel 안에 관계형 data motif, 작은 chart, alert summary를 넣을 수 있지만 장식용 배경으로 사용하지 않는다.

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
- `flex.team`의 로고, 이름, 사진, 실제 문구, 제품 screenshot을 프로젝트 UI에 복제하지 않는다.
- generated mockup의 분위기는 참고하되, 이미지 자체를 UI 자산처럼 삽입하지 않는다.
- raw color utility를 component markup에 새로 넣지 않는다.
- action green을 여러 버튼, 배경, badge에 동시에 남발하지 않는다.
- 한 화면을 한 가지 색 계열만으로 채우지 않는다.
- sidebar와 menu editor의 상태를 섞지 않는다.
- 사용자가 편집 중인 draft menu를 published navigation에 즉시 반영하지 않는다.
- browser storage 접근을 Server Component나 server module에서 하지 않는다.

## 참고

- `VoltAgent/awesome-design-md`: https://github.com/VoltAgent/awesome-design-md
- Linear 디자인 분석: https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/linear.app/DESIGN.md
- flex.team: https://flex.team/
