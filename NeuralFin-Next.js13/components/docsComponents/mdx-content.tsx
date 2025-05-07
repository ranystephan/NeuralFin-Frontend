"use client"

import { Mdx } from "./mdx-components"

interface MdxContentProps {
  code: string
}

export function MdxContent({ code }: MdxContentProps) {
  return (
    <div
      className="prose prose-slate dark:prose-invert lg:prose-lg xl:prose-xl max-w-none"
      style={{
        '--tw-prose-body': 'var(--text-color)',
        '--tw-prose-headings': 'var(--text-color)',
        '--tw-prose-links': 'var(--primary-color)',
        '--tw-prose-bold': 'var(--text-color)',
        '--tw-prose-counters': 'var(--text-color)',
        '--tw-prose-bullets': 'var(--text-color)',
        '--tw-prose-hr': 'var(--text-color)',
        '--tw-prose-quotes': 'var(--text-color)',
        '--tw-prose-quote-borders': 'var(--text-color)',
        '--tw-prose-captions': 'var(--text-color)',
        '--tw-prose-code': 'var(--text-color)',
        '--tw-prose-pre-code': 'var(--text-color)',
        '--tw-prose-pre-bg': 'var(--bg-color)',
        '--tw-prose-th-borders': 'var(--text-color)',
        '--tw-prose-td-borders': 'var(--text-color)',
      } as React.CSSProperties}
    >
      <Mdx code={code} />
    </div>
  )
} 