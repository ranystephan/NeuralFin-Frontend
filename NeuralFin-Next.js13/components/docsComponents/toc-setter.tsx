"use client"

import { useMemo, useEffect } from "react"
import { useDocsToc } from "./DocsTocContext"

interface TocSetterProps {
  doc: any // Using any temporarily for flexibility with the contentlayer doc type
}

export function TocSetter({ doc }: TocSetterProps) {
  const { setToc } = useDocsToc()
  
  // Memoize headings extraction to avoid infinite update loop
  const toc = useMemo(() => {
    try {
      if (!doc) return [];
      
      // Extract headings from doc - handle different possible structures
      const headings = doc.headings || 
        (doc.structuredData?.tableOfContents?.map((item: { level: string, content: string, slug: string }) => ({
          level: parseInt(item.level.replace('h', '')),
          text: item.content,
          slug: item.slug
        }))) || [];
        
      return headings;
    } catch (error) {
      console.error("Error extracting TOC:", error);
      return [];
    }
  }, [doc]);
  
  useEffect(() => {
    if (setToc && Array.isArray(toc)) {
      setToc(toc);
    }
  }, [toc, setToc]);
  
  return null;
} 