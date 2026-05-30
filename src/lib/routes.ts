export const appRoutes = {
  home: "/",
  menuSettings: "/settings/menu",
  docsHome: "/docs",
  docsComponents: "/docs/components",
  docsButton: "/docs/components/button",
  docsPatterns: "/docs/patterns",
  docsFoundation: "/docs/foundation",
} as const

export type AppRoute = (typeof appRoutes)[keyof typeof appRoutes]
