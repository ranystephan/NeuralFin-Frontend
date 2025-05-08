"use client"

// Production-safe version of MDX content renderer
// Original implementation used next-contentlayer/hooks

import React from "react"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import Link from "next/link"
import { Callout } from "@/components/docsComponents/callout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/innerDashComponents/tabs" 
import { Code } from "./code"

// MDX components mapping
const components = {
  h1: (props: any) => <h1 className="mt-10 scroll-m-20 text-4xl font-bold tracking-tight" {...props} />,
  h2: (props: any) => <h2 className="mt-8 scroll-m-20 text-3xl font-semibold tracking-tight" {...props} />,
  h3: (props: any) => <h3 className="mt-6 scroll-m-20 text-2xl font-semibold tracking-tight" {...props} />,
  h4: (props: any) => <h4 className="mt-4 scroll-m-20 text-xl font-semibold tracking-tight" {...props} />,
  p: (props: any) => <p className="leading-7 mb-4" {...props} />,
  a: (props: any) => <Link className="font-medium text-primary hover:underline" {...props} />,
  ul: (props: any) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
  ol: (props: any) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
  li: (props: any) => <li {...props} />,
  blockquote: (props: any) => <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />,
  img: (props: any) => <img className="rounded-md" {...props} />,
  hr: () => <hr className="my-4 md:my-8" />,
  table: (props: any) => <div className="my-6 w-full overflow-y-auto"><table className="w-full" {...props} /></div>,
  tr: (props: any) => <tr {...props} />,
  th: (props: any) => <th className="border px-4 py-2 text-left font-bold" {...props} />,
  td: (props: any) => <td className="border px-4 py-2 text-left" {...props} />,
  code: Code,
  Callout,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
}

interface MDXContentProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

export default function MDXContent({ source }: MDXContentProps) {
  // In production, check if we have valid source
  if (!source) {
    return (
      <div className="p-4 border border-white/10 rounded bg-white/5">
        <h3 className="text-lg font-semibold mb-2">
          Documentation content not available
        </h3>
        <p className="text-muted-foreground">
          Unable to load the requested content.
        </p>
      </div>
    );
  }

  return (
    <div className="mdx prose prose-invert max-w-none">
      <MDXRemote 
        {...source} 
        components={components} 
      />
    </div>
  );
} 