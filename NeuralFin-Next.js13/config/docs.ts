import { DocsConfig } from "@/types/docs"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "News",
      href: "/docs/news",
    },
    {
      title: "Dashboard",
      href: "/docs/dashboard",
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
        {
          title: "Getting Started",
          href: "/docs/getting-started",
        },
      ],
    },
    {
      title: "Features",
      items: [
        {
          title: "Market Data",
          href: "/docs/market-data",
        },
        {
          title: "Portfolio Analysis",
          href: "/docs/portfolio-analysis",
        },
        {
          title: "Risk Management",
          href: "/docs/risk-management",
        },
        {
          title: "Integrations",
          href: "/docs/integrations",
        },
        {
          title: "API Reference",
          href: "/docs/api",
        },
      ],
    },
  ],
}
