"use client"

import * as React from "react"

export function StyleSwitcher() {
  React.useEffect(() => {
    document.body.removeAttribute("data-section")

    if (typeof window !== "undefined") {
      // Get the current path
      const pathname = window.location.pathname
      // Extract the last segment of the path
      const segments = pathname.split('/').filter(Boolean)
      const lastSegment = segments.at(-1)
      
      if (lastSegment) {
        document.body.setAttribute("data-section", lastSegment)
      }
    }
  }, [])
  
  // Re-run the effect when the URL changes
  React.useEffect(() => {
    const handleRouteChange = () => {
      document.body.removeAttribute("data-section")
      
      const pathname = window.location.pathname
      const segments = pathname.split('/').filter(Boolean)
      const lastSegment = segments.at(-1)
      
      if (lastSegment) {
        document.body.setAttribute("data-section", lastSegment)
      }
    }
    
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  return null
}
