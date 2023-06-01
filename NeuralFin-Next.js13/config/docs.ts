import { DocsConfig } from "types"

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
      ],
    },
    {
      title: "Documentation",
      items: [
        {
          title: "Introduction",
          href: "/docs/documentation",
        },
        {
          title: "Contentlayer",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Components",
          href: "/docs/documentation/components",
        },
        {
          title: "Code Blocks",
          href: "/docs/documentation/code-blocks",
        },
        {
          title: "Style Guide",
          href: "/docs/documentation/style-guide",
        },
        {
          title: "Search",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
    {
      title: "News",
      items: [
        {
          title: "Overview",
          href: "docs/news",
        },
        {
          title: "Market Cap",
          href: "/docs/news/market-cap",
        },
        {
          title: "Dividend Yiels",
          href: "/docs/news/yield",
        },
        {
          title: "Beta",
          href: "/docs/news/beta",
        },
        {
          title: "EPS",
          href: "/docs/news/eps",
        },
        {
          title: "PE Ratio",
          href: "/docs/news/pe-ratio",
        },
        {
          title: "EV to EBITDA",
          href: "/docs/news/ev-ebitda",
        },
        {
          title: "EV to Revenue",
          href: "/docs/news/ev-revenue",
        },
        {
          title: "Profit Margin",
          href: "/docs/news/profit-margin",
        },
      ],
    },
    {
      title: "Dashboard",
      items: [
        {
          title: "Overview",
          href: "/docs/dashboard",
        },
        {
          title: "Market Value and PnL",
          href: "/docs/dashboard/mv-pnl",
        },
        {
          title: "Portfolio Beta",
          href: "/docs/news/beta",
        },
        {
          title: "Value at Risk (VaR)",
          href: "/docs/dashboard/var",
        },
        {
          title: "Expected Shortfall (ES)",
          href: "/docs/dashboard/es",
        },
        {
          title: "Asset Allocation Chart",
          href: "/docs/dashboard/asset-allocation",
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
        },
        {
          title: "File Structure",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Tailwind CSS",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Typography",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
  ],
}
