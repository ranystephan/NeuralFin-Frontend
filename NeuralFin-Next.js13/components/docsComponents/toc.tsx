"use client"

import { useEffect, useMemo, useState } from "react"
import { TableOfContentsType, TableOfContentsItem } from "@/types/docs"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface TocProps {
  toc: TableOfContentsType
}

export function TableOfContents({ toc }: TocProps) {
  const itemIds = useMemo(
    () => 
      toc.items
        ? toc.items
          .flatMap((item: TableOfContentsItem) => [
            item.url,
            item.items?.map((item: TableOfContentsItem) => item.url)
          ])
          .flat()
          .filter(Boolean)
          .map((id: string | undefined) => id?.split("#")[1])
        : [],
    [toc]
  )
  const [activeHeading, setActiveHeading] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    itemIds?.forEach((id: string | undefined) => {
      if (!id) return
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id: string | undefined) => {
        if (!id) return
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  if (!toc?.items?.length) {
    return null
  }

  return (
    <div className="pt-6 px-4">
      <p className="font-semibold text-xs uppercase tracking-widest mb-6 text-foreground/90 border-b border-white/5 pb-3">On This Page</p>
      <Tree activeItem={activeHeading} items={toc.items} />
    </div>
  )
}

interface TreeProps {
  activeItem?: string
  items: TableOfContentsItem[] | undefined
  level?: number
}

function Tree({ activeItem, items, level = 1 }: TreeProps) {
  return items?.length ? (
    <ul className={cn("m-0 list-none space-y-1", { "pl-4 mt-1 pt-1": level !== 1 })}>
      {items.map((item: TableOfContentsItem, index: number) => {
        return (
          <li key={index} className={cn("mt-0 pt-2")}>
            <a
              href={item.url}
              className={cn("inline-block no-underline text-sm group relative transition-all duration-200 flex items-center rounded-md px-3 py-2 hover:bg-popover/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-background",
                item.url === `#${activeItem}` ? 
                  "font-medium text-foreground bg-popover/70 shadow-sm border border-white/5" : 
                  "text-muted-foreground border border-transparent"
              )}
              style={{
                transitionDelay: `${index * 15}ms`
              }}
            >
              <ChevronRight className={cn("mr-2 h-3 w-3 text-indigo-400", item.url === `#${activeItem}` ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity")} />
              {item.title}
            </a>
            {item.items?.length ? (
              <div className="overflow-hidden transition-all duration-200">
                <Tree activeItem={activeItem} items={item.items} level={level + 1} />
              </div>
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
