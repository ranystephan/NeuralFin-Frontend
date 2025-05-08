"use client"

import { SidebarNav } from "@/components/docsComponents/sidebar-nav"
import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { Toaster } from "@/components/docsComponents/ui/toaster"
import { Analytics } from "@/components/docsComponents/analytics"
import Link from "next/link"
import { useDocsToc } from "@/components/docsComponents/DocsTocContext"
import { Search } from "@/components/docsComponents/search"
import { MobileNav } from "@/components/docsComponents/mobile-nav"
import { TableOfContents } from "@/components/docsComponents/toc"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { TableOfContentsType } from "@/types/docs"

// Common glass styling for all containers
const glassStyles = "bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300 shadow-lg"

export function DocsLayoutClient({ children }: { children: React.ReactNode }) {
  const { setTheme, theme } = useTheme()
  const { toc, getTableOfContents } = useDocsToc()
  const pathname = usePathname() || ''
  const isLanding = pathname === '/docs'

  return (
    <div className="min-h-screen bg-black bg-fixed px-2 sm:px-4 bg-[url('/grid-pattern.svg')] bg-repeat bg-[length:50px_50px]">
      <div className="flex-1 relative z-10">
        <header className="sticky top-6 z-50 mx-auto transition-all duration-300">
          <div className={`container flex h-16 items-center ${glassStyles}`}>
            <MobileNav />
            <div className="mr-4 hidden md:flex">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="hidden font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 sm:inline-block tracking-tight text-lg">
                  {siteConfig.name}
                </span>
              </Link>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link
                  href="/docs"
                  className="transition-colors hover:text-indigo-300 text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-indigo-400 after:transition-all hover:after:w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-background rounded px-2 py-1"
                >
                  Documentation
                </Link>
                <Link
                  href="/news"
                  className="transition-colors hover:text-purple-300 text-foreground/70 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-400 after:transition-all hover:after:w-full focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-background rounded px-2 py-1"
                >
                  News
                </Link>
                <Link
                  href="/dashboard"
                  className="transition-colors hover:text-purple-300 text-foreground/70 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-400 after:transition-all hover:after:w-full focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-background rounded px-2 py-1"
                >
                  Dashboard
                </Link>
              </nav>
            </div>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div className="w-full flex-1 md:w-auto md:flex-none">
                <Search />
              </div>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/10 hover:bg-white/[0.1] hover:border-indigo-400/30 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-background"
              >
                {theme === "dark" ? (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">Toggle theme</span>
              </button>
            </div>
          </div>
        </header>
        <div
          className={cn(
            isLanding ? "w-full px-4 py-10 md:px-6" : "container py-10 px-4",
            "flex-1",
            !isLanding && "md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]"
          )}
        >
          {!isLanding && (
            <aside className="sticky top-28 mx-2 md:mx-6 h-[calc(100vh-9rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500/20 scrollbar-track-transparent">
              <div className={`p-4 h-full ${glassStyles}`}>
                <SidebarNav items={docsConfig.sidebarNav} />
              </div>
            </aside>
          )}
          <main className="relative py-4 px-2 md:px-4">
            {isLanding ? (
              <div className="w-full">{children}</div>
            ) : (
              <div className={`mx-auto w-full max-w-4xl p-6 md:p-8 ${glassStyles}`}>
                {children}
              </div>
            )}
          </main>
          {!isLanding && toc && toc.length > 0 && (
            <aside className="sticky top-28 mx-2 md:mx-6 h-[calc(100vh-9rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500/20 scrollbar-track-transparent">
              <div className={`p-4 h-full ${glassStyles}`}>
                <TableOfContents toc={getTableOfContents()} />
              </div>
            </aside>
          )}
        </div>
        <Toaster />
        <Analytics />
      </div>
    </div>
  )
} 