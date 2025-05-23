import "./styles/docs.css"
import { Metadata, Viewport } from "next"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { DocsTocProvider } from "@/components/docsComponents/DocsTocContext"
import { DocsLayoutClient } from "@/components/docsComponents/DocsLayoutClient"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@ranystephan",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f0f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0C0E" },
  ],
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocsTocProvider>
      <div className={cn("relative min-h-screen flex flex-col", fontSans.variable)}>
        <DocsLayoutClient>{children}</DocsLayoutClient>
      </div>
    </DocsTocProvider>
  )
}
