"use client"

import React from "react"
import { useDocsToc } from "./DocsTocContext"

interface TocSetterProps {
  doc: any // Using any temporarily for flexibility with the contentlayer doc type
}

export function TocSetter({ doc }: TocSetterProps) {
  const { setToc } = useDocsToc()
  
  // Memoize headings extraction to avoid infinite update loop
  const toc = React.useMemo(() => {
    if (!doc) return [];
    const headings = doc.headings || 
      (doc.structuredData?.tableOfContents?.map((item: { level: string, content: string, slug: string }) => ({
        level: parseInt(item.level.replace('h', '')),
        text: item.content,
        slug: item.slug
      }))) || [];
    return headings;
  }, [doc]);
  
  React.useEffect(() => {
    setToc(toc)
  }, [toc, setToc])
  
  return null
} 