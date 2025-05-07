"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

export function Breadcrumbs() {
  const pathname = usePathname() || ""
  const segments = pathname.split("/").filter(Boolean)
  if (segments[0] !== "docs") {
    return null
  }

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const name = segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    return { name, href }
  })

  return (
    <nav className="flex text-sm text-muted-foreground space-x-2 mb-4">
      <Link href="/docs" className="hover:text-foreground">
        Docs
      </Link>
      {crumbs.slice(1).map((crumb, idx) => (
        <React.Fragment key={idx}>
          <span>/</span>
          <Link href={crumb.href} className="hover:text-foreground">
            {crumb.name}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  )
} 