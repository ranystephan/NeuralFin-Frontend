import React from "react"

export function Code({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  // Extract language from className (format: language-*)
  const language = className?.split("-")[1]
  
  return (
    <code
      className={className}
      {...props}
    />
  )
} 