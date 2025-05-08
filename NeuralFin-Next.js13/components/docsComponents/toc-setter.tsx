"use client"

// Production-safe TOC component without contentlayer dependency
export function TocSetter() {
  if (process.env.NODE_ENV === 'production') {
    return null
  }
  
  return (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <div className="text-sm">
        <div className="text-muted-foreground">
          Table of contents disabled in production mode
        </div>
      </div>
    </div>
  )
} 