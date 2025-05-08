"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { NavItem, SidebarNavItem } from "types/nav"
import { docsConfig } from "@/config/docs"

// Empty placeholder component for production
export function DocsPager(props: any) {
  // In production mode, don't render anything
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  // This is a placeholder that will never be reached in production
  return (
    <div className="flex items-center justify-between">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href="#prev"
          className={cn(
            "flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium",
            "transition-colors hover:bg-accent hover:text-accent-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href="#next"
          className={cn(
            "flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium",
            "transition-colors hover:bg-accent hover:text-accent-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  )
}

export function flatten(links: SidebarNavItem[]): NavItem[] {
  return links
    .reduce<NavItem[]>((flat, link) => {
      return flat.concat(link.items?.length ? flatten(link.items) : link)
    }, [])
    .filter((link) => !link?.disabled)
}
