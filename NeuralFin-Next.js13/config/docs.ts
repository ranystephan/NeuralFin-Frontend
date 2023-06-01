

import { MainNavItem, SidebarNavItem } from "types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

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
    {
      title: "GitHub",
      href: "https://github.com/shadcn/ui",
      external: true,
    },
    {
      title: "Twitter",
      href: "https://twitter.com/shadcn",
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],

        },
      ],
    },
    {
      title: "Documentation",
      items: [
        {
          title: "Introduction",
          href: "/docs/documentation",
          items: [],

        },
        {
          title: "Contentlayer",
          href: "/docs/in-progress",
          disabled: true,
          items: [],

        },
        {
          title: "Components",
          href: "/docs/documentation/components",
          items: [],
        },
        {
          title: "Code Blocks",
          href: "/docs/documentation/code-blocks",
          items: [],
        },
        {
          title: "Style Guide",
          href: "/docs/documentation/style-guide",
          items: [],
        },
        {
          title: "Search",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
      ],
    },
    {
      title: "News",
      items: [
        {
          title: "Overview",
          href: "docs/news",
          items: [],

        },
        {
          title: "Market Cap",
          href: "/docs/news/market-cap",
          items: [],

        },
        {
          title: "Dividend Yiels",
          href: "/docs/news/yield",
          items: [],
        },
        {
          title: "Beta",
          href: "/docs/news/beta",
          items: [],
        },
        {
          title: "EPS",
          href: "/docs/news/eps",
          items: [],
        },
        {
          title: "PE Ratio",
          href: "/docs/news/pe-ratio",
          items: [],
        },
        {
          title: "EV to EBITDA",
          href: "/docs/news/ev-ebitda",
          items: [],
        },
        {
          title: "EV to Revenue",
          href: "/docs/news/ev-revenue",
          items: [],
        },
        {
          title: "Profit Margin",
          href: "/docs/news/profit-margin",
          items: [],
        },
      ],
    },
    {
      title: "Dashboard",
      items: [
        {
          title: "Overview",
          href: "/docs/dashboard",
          items: [],

        },
        {
          title: "Market Value and PnL",
          href: "/docs/dashboard/mv-pnl",
          items: [],
        },
        {
          title: "Portfolio Beta",
          href: "/docs/news/beta",
          items: [],
        },
        {
          title: "Value at Risk (VaR)",
          href: "/docs/dashboard/var",
          items: [],
        },
        {
          title: "Expected Shortfall (ES)",
          href: "/docs/dashboard/es",
          items: [],
        },
        {
          title: "Asset Allocation Chart",
          href: "/docs/dashboard/asset-allocation",
          items: [],
        },
      ],
    },
    {
      title: "Info Page",
      items: [
        {
          title: "Introduction",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
        {
          title: "File Structure",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
        {
          title: "Tailwind CSS",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
        {
          title: "Typography",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
      ],
    },
  ],
}
