"use client"

import { useMDXComponent } from "next-contentlayer/hooks"
import { components } from "./mdx-components"
import React from "react"

interface MDXContentProps {
  code: string
}

export default function MDXContent({ code }: MDXContentProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2.5"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2.5"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  try {
    const Component = useMDXComponent(code);
    return <Component components={components} />;
  } catch (error) {
    console.error("Error rendering MDX content:", error);
    return (
      <div className="p-4 border border-red-200 rounded bg-red-50 dark:bg-red-900/20 dark:border-red-900/30">
        <h3 className="text-lg font-semibold mb-2 text-red-800 dark:text-red-200">
          Error loading content
        </h3>
        <p className="text-red-700 dark:text-red-300">
          There was an error rendering this content. Please try refreshing the page.
        </p>
      </div>
    );
  }
} 