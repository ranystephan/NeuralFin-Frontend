"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"
import { TableOfContentsType, TableOfContentsItem } from "@/types/docs"

export type TocItem = {
  level: number
  text: string
  slug: string
}

interface DocsTocContextType {
  toc: TocItem[]
  setToc: (toc: TocItem[]) => void
  getTableOfContents: () => TableOfContentsType
}

// Convert TocItem[] to TableOfContentsType
function convertTocToTableOfContents(tocItems: TocItem[]): TableOfContentsType {
  // Group items by level to create a hierarchy
  const itemsByLevel = tocItems.reduce((acc: Record<number, TocItem[]>, item) => {
    if (!acc[item.level]) {
      acc[item.level] = [];
    }
    acc[item.level].push(item);
    return acc;
  }, {});

  // Build the items array with proper nesting
  const buildItems = (items: TocItem[]): TableOfContentsItem[] => {
    return items.map(item => ({
      title: item.text,
      url: `#${item.slug}`,
      items: []
    }));
  };

  // Get the top level items (usually h2)
  const minLevel = Math.min(...Object.keys(itemsByLevel).map(Number));
  const result: TableOfContentsType = {
    items: itemsByLevel[minLevel] ? buildItems(itemsByLevel[minLevel]) : []
  };

  return result;
}

const DocsTocContext = createContext<DocsTocContextType | undefined>(undefined)

export function DocsTocProvider({ children }: { children: ReactNode }) {
  const [toc, setToc] = useState<TocItem[]>([])

  const getTableOfContents = (): TableOfContentsType => {
    return convertTocToTableOfContents(toc);
  }

  return (
    <DocsTocContext.Provider value={{ toc, setToc, getTableOfContents }}>
      {children}
    </DocsTocContext.Provider>
  )
}

export function useDocsToc() {
  const context = useContext(DocsTocContext)
  if (!context) {
    throw new Error("useDocsToc must be used within a DocsTocProvider")
  }
  return context
} 