"use client"
import React from "react"
import { useDocsToc } from "@/components/docsComponents/DocsTocContext"

export function TocSetter({ toc }: { toc: any }) {
  const { setToc } = useDocsToc()
  React.useEffect(() => {
    setToc(toc)
  }, [JSON.stringify(toc)])
  return null
} 