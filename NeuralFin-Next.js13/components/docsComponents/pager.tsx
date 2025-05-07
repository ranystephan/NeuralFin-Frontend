"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Doc } from "contentlayer/generated"
import { NavItem, NavItemWithChildren, SidebarNavItem } from "types/nav"

import { docsConfig } from "@/config/docs"
import { Icons } from "@/components/docsComponents/icons"

interface DocsPagerProps {
  doc: Doc
}

export function DocsPager({ doc }: DocsPagerProps) {
  const pager = getPagerForDoc(doc)

  if (!pager) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href={pager.prev.href ?? "#"}
            className={cn(
              "flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium",
              "transition-colors hover:bg-accent hover:text-accent-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>{pager.prev.title}</span>
          </Link>
        </motion.div>
      )}
      {pager?.next && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href={pager.next.href ?? "#"}
            className={cn(
              "flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium",
              "transition-colors hover:bg-accent hover:text-accent-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
          >
            <span>{pager.next.title}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>
      )}
    </div>
  )
}

export function getPagerForDoc(doc: Doc) {
  const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav as SidebarNavItem[]), null]
  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === link?.href
  )
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null
  return {
    prev,
    next,
  }
}

export function flatten(links: SidebarNavItem[]): NavItem[] {
  return links
    .reduce<NavItem[]>((flat, link) => {
      return flat.concat(link.items?.length ? flatten(link.items) : link)
    }, [])
    .filter((link) => !link?.disabled)
}
