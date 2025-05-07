"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site" 
import { cn } from "@/lib/utils" // cn = classnames
import { buttonVariants } from "@/components/docsComponents/ui/button"
import { CommandMenu } from "@/components/docsComponents/command-menu"
import { Icons } from "@/components/docsComponents/icons"
import { MainNav } from "@/components/docsComponents/main-nav"
import { MobileNav } from "@/components/docsComponents/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur px-2">
      <div className="flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
