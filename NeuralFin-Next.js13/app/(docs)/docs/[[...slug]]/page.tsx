import { allDocs } from "contentlayer/generated"
import { Metadata } from "next"
import Link from "next/link"
import { TocSetter } from "@/components/docsComponents/toc-setter"
import { DocsPager } from "@/components/docsComponents/pager"
import { ChevronRight, ArrowRight, Search as SearchIcon, Info, BookOpen, Terminal, Code, Link2, ExternalLink, Shield, Users, Database, LayoutGrid, UploadCloud, History, FileText, DollarSign, HelpCircle } from "lucide-react"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { docsConfig } from "@/config/docs"
import { Search } from "@/components/docsComponents/search"
import DocClientWrapper from "./client-wrapper"

import "@/styles/mdx.css"

// Add a reusable CodeExample component for the documentation
const CodeExample = ({ language = "jsx", code, description }: { language?: string, code: string, description?: string }) => {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-white/10 bg-popover/20 backdrop-blur-sm">
      {description && (
        <div className="px-4 py-3 bg-popover/40 border-b border-white/10">
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

// Add a Callout component for highlighting important information
const Callout = ({ type = "info", title, children }: { type?: "info" | "warning" | "tip", title?: string, children: React.ReactNode }) => {
  const icons = {
    info: <Info className="h-5 w-5 text-blue-400" />,
    warning: <Info className="h-5 w-5 text-amber-400" />,
    tip: <Info className="h-5 w-5 text-green-400" />
  };
  
  const styles = {
    info: "bg-blue-500/10 border-blue-500/20",
    warning: "bg-amber-500/10 border-amber-500/20",
    tip: "bg-green-500/10 border-green-500/20"
  };
  
  return (
    <div className={`my-6 p-4 rounded-lg border ${styles[type]}`}>
      <div className="flex gap-3 items-start">
        <div className="flex-shrink-0 pt-1">
          {icons[type]}
        </div>
        <div>
          {title && <h4 className="font-medium mb-1">{title}</h4>}
          <div className="text-sm text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add a Features grid component
const FeaturesGrid = ({ features }: { features: { icon: React.ReactNode, title: string, description: string }[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      {features.map((feature, index) => (
        <div key={index} className="p-4 rounded-lg border border-white/10 bg-popover/20 backdrop-blur-sm transition-all duration-300 hover:bg-popover/30 hover:border-white/20">
          <div className="flex gap-3">
            <div className="flex-shrink-0 p-2 bg-indigo-500/20 rounded-md">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-medium">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const categories = [
  {
    icon: <BookOpen className="h-5 w-5" />, // Getting Started
    title: "Getting Started",
    description: "Setup, authentication, and your first prediction.",
    count: 3,
    href: "/docs/getting-started"
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "API Reference",
    description: "All endpoints, parameters, and response formats.",
    count: 12,
    href: "/docs/api"
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Portfolio Analysis",
    description: "Analyze and optimize your investment portfolios.",
    count: 5,
    href: "/docs/portfolio-analysis"
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Risk Management",
    description: "Measure and manage financial risk.",
    count: 4,
    href: "/docs/risk-management"
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Market Data",
    description: "Access real-time and historical market data.",
    count: 6,
    href: "/docs/market-data"
  },
  {
    icon: <LayoutGrid className="h-5 w-5" />,
    title: "Integrations",
    description: "Connect NeuralFin to Excel, Google Sheets, and more.",
    count: 3,
    href: "/docs/integrations"
  }
];

const featuredCards = [
  {
    icon: <Users className="h-8 w-8 text-indigo-400" />,
    title: "Community Forum",
    description: "Get help, share strategies, and connect with other users.",
    href: "/community"
  },
  {
    icon: <History className="h-8 w-8 text-purple-400" />,
    title: "Changelog",
    description: "See what's new and improved in NeuralFin.",
    href: "/changelog"
  },
  {
    icon: <Terminal className="h-8 w-8 text-teal-400" />,
    title: "API Playground",
    description: "Try out the API live.",
    href: "/playground"
  },
  {
    icon: <BookOpen className="h-8 w-8 text-blue-400" />,
    title: "Tutorials",
    description: "Step-by-step guides for common financial workflows.",
    href: "/tutorials"
  }
];

const popularArticles = [
  {
    title: "How to Predict Stock Prices",
    summary: "A step-by-step guide to using NeuralFin's prediction API.",
    href: "/docs/how-to-predict-stock-prices"
  },
  {
    title: "Integrating with Excel",
    summary: "Bring NeuralFin's power to your spreadsheets.",
    href: "/docs/integrating-with-excel"
  },
  {
    title: "Risk Metrics Explained",
    summary: "Understand VaR, CVaR, and other risk measures.",
    href: "/docs/risk-metrics-explained"
  }
];

const quickLinks = [
  {
    icon: <FileText className="h-5 w-5" />,
    label: "API Reference",
    href: "/docs/api"
  },
  {
    icon: <Terminal className="h-5 w-5" />,
    label: "SDK Downloads",
    href: "/docs/sdk"
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    label: "Pricing",
    href: "/pricing"
  },
  {
    icon: <HelpCircle className="h-5 w-5" />,
    label: "Contact Support",
    href: "/support"
  }
];

const HeroBackground = () => (
  <div className="absolute inset-0 rounded-3xl overflow-hidden">
    <div className="w-full h-full bg-gray-900/80 backdrop-blur-2xl" />
    {/* Animated color hues */}
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="absolute w-2/3 h-2/3 left-[-10%] top-[-20%] rounded-full bg-indigo-500/30 blur-3xl animate-pulse-slow" />
      <div className="absolute w-1/2 h-1/2 right-[-10%] bottom-[-10%] rounded-full bg-teal-400/20 blur-2xl animate-pulse-slower" />
      <div className="absolute w-1/3 h-1/3 left-[40%] top-[60%] rounded-full bg-purple-500/20 blur-2xl animate-pulse-slower" />
    </div>
  </div>
);

const LandingPage: React.FC = () => {
  return (
    <div className="py-10 space-y-16">
      {/* Hero Section */}
      <div className="relative mx-auto max-w-5xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden min-h-[260px] flex flex-col items-center justify-center">
        <HeroBackground />
        <div className="relative z-10 flex flex-col items-center justify-center py-14 px-4 sm:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white/95 drop-shadow-lg tracking-tight text-center">
            Hey there, how can we help you?
          </h1>
          <div className="w-full max-w-xl mx-auto mt-2">
            <Search />
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <Link
            key={cat.title}
            href={cat.href}
            className="rounded-2xl bg-white/[0.025] border border-white/10 p-7 flex flex-col gap-2 hover:bg-white/[0.05] transition-all duration-200 group backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center rounded-full bg-white/10 p-3">
                {cat.icon}
              </span>
              <span className="font-semibold text-lg text-white/90">{cat.title}</span>
            </div>
            <p className="text-sm text-white/80 mb-2 flex-1">{cat.description}</p>
            <span className="text-xs text-white/60 mt-auto">{cat.count} articles</span>
          </Link>
        ))}
      </div>

      {/* Featured Section */}
      <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
        {featuredCards.map((card, idx) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-2xl bg-white/[0.025] border border-white/10 p-6 flex flex-col items-center gap-3 hover:bg-white/[0.05] transition-all duration-200 group backdrop-blur-2xl text-center"
          >
            <div>{card.icon}</div>
            <div className="font-semibold text-lg text-white/90">{card.title}</div>
            <div className="text-sm text-white/80 mb-2">{card.description}</div>
          </Link>
        ))}
      </div>

      {/* Popular Articles */}
      <div className="mx-auto max-w-4xl mt-12">
        <h2 className="text-xl font-bold mb-6 text-white/90">Popular Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularArticles.map((article) => (
            <Link
              key={article.title}
              href={article.href}
              className="rounded-2xl bg-white/[0.025] border border-white/10 p-6 flex flex-col gap-2 hover:bg-white/[0.05] transition-all duration-200 group backdrop-blur-2xl"
            >
              <div className="font-semibold text-base text-white/90 mb-1">{article.title}</div>
              <div className="text-sm text-white/80 mb-2 flex-1">{article.summary}</div>
              <span className="text-xs text-indigo-300 mt-auto">Read more &rarr;</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mx-auto max-w-4xl mt-12 flex flex-wrap gap-4 justify-center">
        {quickLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.025] border border-white/10 px-5 py-2.5 text-white/90 font-medium hover:bg-white/[0.08] transition-all duration-200 backdrop-blur-2xl"
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

async function getDocFromParams(params: { slug?: string[] }) {
  const slug = params?.slug?.join("/") || ""
  const doc = allDocs.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    return null
  }

  return doc
}

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] }
}): Promise<Metadata> {
  // If we're on the root docs route, return landing page metadata
  if (!params.slug || params.slug.length === 0) {
    return {
      title: "NeuralFin Documentation",
      description: "Documentation and guides for using NeuralFin's financial services and APIs."
    }
  }

  const doc = await getDocFromParams(params)

  if (!doc) {
    return {}
  }

  return {
    title: doc.title,
    description: doc.description,
  }
}

export default async function DocPage({
  params,
}: {
  params: { slug?: string[] }
}) {
  // Always show landing page for root docs route
  if (!params.slug || params.slug.length === 0) {
    return <LandingPage />
  }

  const doc = await getDocFromParams(params)

  if (!doc) {
    return <LandingPage />
  }

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocClientWrapper doc={doc} />
        <hr className="my-4 md:my-6" />
        <DocsPager doc={doc} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <TocSetter doc={doc} />
        </div>
      </div>
    </main>
  )
} 