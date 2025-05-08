"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import { components } from "@/components/docsComponents/mdx-components";
import { Doc } from "contentlayer/generated";
import { Suspense, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface DocClientWrapperProps {
  doc: Doc;
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="p-4 border border-red-200 rounded bg-red-50 dark:bg-red-900/20 dark:border-red-900/30">
      <h3 className="text-lg font-semibold mb-2 text-red-800 dark:text-red-200">
        Error loading content
      </h3>
      <p className="text-red-700 dark:text-red-300">
        {error.message}
      </p>
    </div>
  );
}

function MDXContent({ doc }: { doc: Doc }) {
  try {
    const MDXContent = useMDXComponent(doc.body.code);
    return <MDXContent components={components} />;
  } catch (error) {
    console.error("Error rendering MDX content:", error);
    return <ErrorFallback error={error instanceof Error ? error : new Error("Unknown error rendering MDX content")} />;
  }
}

export default function DocClientWrapper({ doc }: DocClientWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return (
      <div className="prose prose-invert max-w-none animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2.5"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2.5"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="prose prose-invert max-w-none">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2.5"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2.5"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        }>
          <MDXContent doc={doc} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
} 