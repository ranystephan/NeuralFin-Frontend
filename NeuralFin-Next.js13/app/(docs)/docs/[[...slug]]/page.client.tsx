"use client"

import { useEffect, useState } from 'react'
import { ArrowRight, BookOpen, Check, CheckCircle, ExternalLink, FileText, Info } from 'lucide-react'
import Link from 'next/link'
import { Mdx } from '@/components/docsComponents/mdx-components'
import { Doc } from 'contentlayer/generated'

// Callout component for the actual doc pages
export const DocCallout = ({ type = "info", title, children }: { type?: "info" | "tip" | "warning", title: string, children: React.ReactNode }) => {
  const styles = {
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      icon: <Info className="h-5 w-5 text-blue-400" />
    },
    tip: {
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      icon: <CheckCircle className="h-5 w-5 text-green-400" />
    },
    warning: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      icon: <Info className="h-5 w-5 text-amber-400" />
    }
  };

  return (
    <div className={`my-6 p-4 rounded-lg border ${styles[type].border} ${styles[type].bg}`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-1">
          {styles[type].icon}
        </div>
        <div>
          <h4 className="font-medium text-base">{title}</h4>
          <div className="mt-1 text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Step-by-step component for tutorials
export const Steps = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="steps ml-4 border-l border-indigo-500/30 pl-8 [counter-reset:step] my-8">
      {children}
    </div>
  );
};

export const Step = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="step relative mb-6 pb-2 [counter-increment:step]">
      <div className="absolute -left-10 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-500 border border-indigo-500/30">
        <Check className="h-3 w-3" />
      </div>
      {children}
    </div>
  );
};

// Pre-requisites component
export const Prerequisites = ({ items }: { items: string[] }) => {
  return (
    <div className="my-6 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4">
      <div className="flex items-center gap-2 font-medium mb-2">
        <FileText className="h-5 w-5 text-indigo-400" />
        <h4>Prerequisites</h4>
      </div>
      <ul className="space-y-1 text-muted-foreground">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <Check className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Related links component
export const RelatedLinks = ({ links }: { links: { title: string, href: string, description: string }[] }) => {
  return (
    <div className="my-8 border-t border-border pt-6">
      <h3 className="mb-4 text-lg font-medium">Related Documentation</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className="group rounded-lg border border-border bg-popover/50 p-4 transition-colors hover:border-indigo-500/30 hover:bg-popover"
          >
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium">{link.title}</h4>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-indigo-500 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
            </div>
            <p className="text-sm text-muted-foreground">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

// DocPageHeader component
export const DocPageHeader = ({ title, description }: { title: string, description?: string }) => {
  return (
    <div className="mb-8 border-b border-border pb-6">
      <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

// DocPage wrapper with enhanced content experience
interface DocPageProps {
  doc: Doc;
}

export function DocPageContent({ doc }: DocPageProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Enhance code blocks with copy button or other features
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(block => {
      // Add enhancements to code blocks here if needed
      block.classList.add('relative', 'backdrop-blur-sm');
    });
  }, []);
  
  if (!doc) return null;
  
  return (
    <div className="doc-content w-full max-w-3xl mx-auto">
      <DocPageHeader 
        title={doc.title} 
        description={doc.description} 
      />
      
      {/* Add a documentation last updated notice */}
      <div className="flex items-center mb-8 text-sm text-muted-foreground">
        <BookOpen className="mr-2 h-4 w-4" />
        Last updated: {new Date().toLocaleDateString()}
      </div>
      
      {isMounted ? (
        <Mdx code={doc.body.code} />
      ) : (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2.5"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2.5"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      )}
      
      <div className="mt-16 border-t border-border pt-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Was this page helpful?</p>
            <div className="flex space-x-2 mt-2">
              <button className="text-sm px-3 py-1 rounded-md border border-border bg-background hover:bg-accent transition-colors">
                Yes
              </button>
              <button className="text-sm px-3 py-1 rounded-md border border-border bg-background hover:bg-accent transition-colors">
                No
              </button>
            </div>
          </div>
          
          <Link 
            href="https://github.com/your-org/your-repo/issues/new" 
            className="text-sm flex items-center text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-1 h-3 w-3" />
            Edit on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}

// Default export for Next.js
export default function DocPageClient({ doc }: DocPageProps) {
  return <DocPageContent doc={doc} />;
} 