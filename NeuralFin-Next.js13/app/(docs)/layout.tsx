import "./styles/docs.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/docsComponents/ui/toaster"
import { Analytics } from "@/components/docsComponents/analytics"
import { SiteFooter } from "@/components/docsComponents/site-footer"
import { SiteHeader } from "@/components/docsComponents/site-header"
import { StyleSwitcher } from "@/components/docsComponents/style-switcher"
import { TailwindIndicator } from "@/components/docsComponents/tailwind-indicator"
import { ThemeProvider } from "@/components/docsComponents/theme-provider"

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
      name: "shadcn",
      url: "https://shadcn.com",
    },
  ],
  creator: "shadcn",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
    creator: "@shadcn",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-[#000000] z-10 font-sans antialiased overflow-auto",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col bg-[#110618]">
              <SiteHeader />
              <div className="flex-1">{children}</div>
              {/* <SiteFooter /> */}
            </div>
            {/* <TailwindIndicator /> */}
          </ThemeProvider>
          <StyleSwitcher />
          <Analytics />
          <Toaster />
          
        </body>
      </html>
    </>
  )
}
