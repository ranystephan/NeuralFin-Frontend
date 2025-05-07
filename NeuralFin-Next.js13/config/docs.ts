import { DocsConfig } from "@/types/docs"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "News",
      href: "/news",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
        {
          title: "Installation",
          href: "/docs/installation",
        },
        {
          title: "Quick Start",
          href: "/docs/quick-start",
        },
      ],
    },
    {
      title: "Features",
      items: [
        {
          title: "News Analysis",
          href: "/docs/news",
        },
        {
          title: "Dashboard",
          href: "/docs/dashboard",
        },
        {
          title: "API Reference",
          href: "/docs/api",
        },
      ],
    },
  ],
}
