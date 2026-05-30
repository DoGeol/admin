import type { Metadata } from "next"
import type { ReactNode } from "react"

import { DocsShell } from "./_components/docs-shell"

export const metadata: Metadata = {
  title: {
    default: "문서",
    template: "%s | Admin",
  },
  description: "어드민 디자인 시스템과 컴포넌트 문서",
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <DocsShell>{children}</DocsShell>
}
