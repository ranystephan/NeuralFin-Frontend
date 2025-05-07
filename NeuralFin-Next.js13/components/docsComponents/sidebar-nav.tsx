"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { SidebarNavItem } from "@/types/docs"
import { ChevronRight } from "lucide-react"

interface SidebarNavProps {
  items: {
    title: string
    items: SidebarNavItem[]
  }[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()

  return items.length ? (
    <div className="w-full py-6 px-4">
      {items.map((category, index) => (
        <div key={index} className="mb-6">
          <div className="flex w-full items-center pt-4 pb-2 px-3 border-b border-white/5">
            <span className="font-semibold text-foreground/90 text-xs uppercase tracking-widest">
              {category.title}
            </span>
          </div>
          {category.items?.length && 
            <div className="mt-3 space-y-1">
              {category.items.map((item: SidebarNavItem, itemIndex: number) => (
                <Link
                  key={itemIndex}
                  href={item.href || "#"}
                  className={cn("group flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium border border-transparent",
                    item.disabled && "cursor-not-allowed opacity-60",
                    pathname === item.href ? 
                      "bg-popover/70 text-foreground border-white/5 shadow-sm" : 
                      "text-muted-foreground hover:text-foreground hover:bg-popover/20 transition-all duration-200")}
                  aria-current={pathname === item.href ? "page" : undefined}
                  style={{
                    transitionDelay: `${itemIndex * 25}ms`
                  }}
                >
                  <span className="mr-2 inline-block h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-4 w-4 text-indigo-400" />
                  </span>
                  {item.title}
                </Link>
              ))}
            </div>
          }
        </div>
      ))}
    </div>
  ) : null
}
