import { Metadata } from "next"
import { serialize } from 'next-mdx-remote/serialize';
import Link from "next/link"
import { ChevronRight, BookOpen, Shield, Users, Database, LayoutGrid, FileText, ChevronLeft } from "lucide-react"
import { getMdxContent, getAllMdxContent } from "@/lib/mdx"
import DocClientWrapper from "./client-wrapper"

// This file provides a fallback for production where contentlayer is disabled
// In development, contentlayer would be used

export const metadata: Metadata = {
  title: "Documentation",
  description: "NeuralFin documentation",
}

// Define categories for the docs landing page
const categories = [
  {
    icon: <BookOpen className="h-5 w-5" />,
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

// Landing page component
function LandingPage() {
  return (
    <div className="container py-10 space-y-16">
      {/* Hero Section */}
      <div className="relative mx-auto max-w-5xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden min-h-[260px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-full h-full bg-gray-900/80 backdrop-blur-2xl" />
          {/* Animated color hues */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="absolute w-2/3 h-2/3 left-[-10%] top-[-20%] rounded-full bg-indigo-500/30 blur-3xl animate-pulse-slow" />
            <div className="absolute w-1/2 h-1/2 right-[-10%] bottom-[-10%] rounded-full bg-teal-400/20 blur-2xl animate-pulse-slower" />
            <div className="absolute w-1/3 h-1/3 left-[40%] top-[60%] rounded-full bg-purple-500/20 blur-2xl animate-pulse-slower" />
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center py-14 px-4 sm:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white/95 drop-shadow-lg tracking-tight text-center">
            NeuralFin Documentation
          </h1>
          <p className="text-lg text-white/80 text-center max-w-2xl mb-6">
            Comprehensive guides, API references, and examples to help you build with NeuralFin
          </p>
        </div>
      </div>

      {/* Category Grid */}
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold mb-6">Browse Documentation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="rounded-xl bg-white/[0.025] border border-white/10 p-6 hover:bg-white/[0.05] transition-all duration-200 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center rounded-full bg-white/10 p-2">
                  {category.icon}
                </span>
                <span className="font-semibold text-lg">{category.title}</span>
              </div>
              <p className="text-sm text-white/60 mb-2 flex-1">{category.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-white/40">{category.count} articles</span>
                <div className="flex items-center gap-1 text-sm text-primary">
                  View docs <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Quick Links */}
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
        <div className="flex flex-wrap gap-4">
          <Link 
            href="/docs/api"
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.025] border border-white/10 px-5 py-2.5 hover:bg-white/[0.05] transition-all"
          >
            <FileText className="h-4 w-4" />
            API Reference
          </Link>
          <Link 
            href="/docs/portfolio-analysis"
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.025] border border-white/10 px-5 py-2.5 hover:bg-white/[0.05] transition-all"
          >
            <Users className="h-4 w-4" />
            Portfolio Analysis
          </Link>
          <Link 
            href="/docs/risk-management"
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.025] border border-white/10 px-5 py-2.5 hover:bg-white/[0.05] transition-all"
          >
            <Shield className="h-4 w-4" />
            Risk Management
          </Link>
        </div>
      </div>
    </div>
  )
}

export default async function DocPage({
  params,
}: {
  params: { slug?: string[] }
}) {
  // If no slug, show the landing page
  if (!params.slug || params.slug.length === 0) {
    return <LandingPage />
  }

  // Get the document based on slug
  const slug = params.slug.join("/");
  const doc = await getMdxContent("docs", slug);
  
  // Serialize the MDX content
  const mdxSource = await serialize(doc.content);
  
  // Dynamically update the metadata based on the document
  metadata.title = doc.frontmatter.title || "Documentation";
  metadata.description = doc.frontmatter.description || "NeuralFin documentation";
  
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{doc.frontmatter.title}</h1>
          {doc.frontmatter.description && (
            <p className="text-xl text-muted-foreground">{doc.frontmatter.description}</p>
          )}
        </div>
        
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8 shadow-md">
          <DocClientWrapper 
            source={mdxSource} 
            doc={{
              title: doc.frontmatter.title,
              description: doc.frontmatter.description,
              frontmatter: doc.frontmatter
            }}
          />
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex justify-between items-center">
            <Link 
              href="/docs" 
              className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Back to Documentation
            </Link>
            
            <div className="flex gap-4">
              <Link
                href={`https://github.com/yourusername/documentation/edit/main/content/docs/${slug}.mdx`}
                target="_blank"
                className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                Edit this page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate static params for all docs
export async function generateStaticParams() {
  const docs = await getAllMdxContent("docs");
  
  return docs.map((doc) => ({
    slug: doc.slug.split("/"),
  }));
} 