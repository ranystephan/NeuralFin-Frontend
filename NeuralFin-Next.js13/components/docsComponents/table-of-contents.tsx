"use client"

import * as React from "react"
import { ScrollArea } from "@/components/docsComponents/ui/scroll-area"
import { TableOfContents } from "@/components/docsComponents/toc"
import { TableOfContentsType } from "@/types/docs"

interface RawTocItem {
  level: number
  text: string
  slug: string
}

interface TableOfContentsProps {
  toc: RawTocItem[]
}

function transformToc(rawToc: RawTocItem[]): TableOfContentsType {
  return {
    items: rawToc.map(item => ({
      title: item.text,
      url: `#${item.slug}`,
    }))
  }
}

export function DocsTableOfContents({ toc }: TableOfContentsProps) {
  if (!toc || toc.length === 0) {
    return null
  }

  const transformedToc = transformToc(toc)

  return (
    <div className="hidden text-sm xl:block">
      <div className="sticky top-14 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
        <ScrollArea className="pb-10">
          <div className="sticky top-0 -mt-6 h-6 w-full" style={{ background: 'linear-gradient(to bottom, var(--bg-color), transparent)' }} />
          <TableOfContents toc={transformedToc} />
          <div className="sticky bottom-0 -mb-6 h-6 w-full" style={{ background: 'linear-gradient(to top, var(--bg-color), transparent)' }} />
        </ScrollArea>
      </div>
    </div>
  )
} 