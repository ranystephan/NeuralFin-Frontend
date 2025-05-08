import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';

interface MDXContentProps {
  code: string;
}

export async function MDXContent({ code }: MDXContentProps) {
  const mdxSource = await serialize(code, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    },
  });

  return (
    <div className="mdx-content">
      <MDXRemote {...mdxSource} />
    </div>
  );
} 