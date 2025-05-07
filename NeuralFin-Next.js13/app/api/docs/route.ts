import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CATEGORY_COLORS: { [key: string]: string } = {
  news: '#4ADE80', // emerald
  dashboard: '#60A5FA', // blue
  documentation: '#F472B6', // pink
  default: '#9CA3AF', // gray
};

export async function GET() {
  const nodes: any[] = [];
  const tempLinks: any[] = [];
  const processedFiles = new Set<string>();
  const nodeMap = new Map<string, any>();

  function processDirectory(dir: string, category: string) {
    try {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          processDirectory(filePath, file);
          continue;
        }

        if (!file.endsWith('.mdx')) continue;

        const relativePath = path.relative(path.join(process.cwd(), 'content/docs'), filePath);
        const fileId = relativePath.replace(/\.mdx$/, '');
        const displayId = fileId.replace(/\//g, '-');

        if (processedFiles.has(displayId)) continue;
        processedFiles.add(displayId);

        const content = fs.readFileSync(filePath, 'utf-8');
        const { data, content: markdownContent } = matter(content);

        // Create node
        const node = {
          id: displayId,
          name: data.title || path.basename(file, '.mdx'),
          val: 1,
          color: CATEGORY_COLORS[category] || CATEGORY_COLORS.default,
          category,
          description: data.description,
          path: fileId,
        };
        nodes.push(node);
        nodeMap.set(displayId, node);

        // Process frontmatter related links
        if (data.related && Array.isArray(data.related)) {
          data.related.forEach((related: { href: string }) => {
            if (related.href) {
              // Extract the path after /docs/
              const targetPath = related.href.replace(/^\/docs\//, '');
              const targetDisplayId = targetPath.replace(/\//g, '-');
              if (targetDisplayId !== displayId && nodeMap.has(targetDisplayId)) {
                console.log(`Creating link from ${displayId} to ${targetDisplayId} (frontmatter)`);
                tempLinks.push({
                  source: displayId,
                  target: targetDisplayId,
                });
              }
            }
          });
        }

        // Find internal markdown links
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let match;
        while ((match = linkRegex.exec(markdownContent)) !== null) {
          const [, , linkPath] = match;
          if (linkPath.startsWith('/docs/')) {
            // Extract the path after /docs/
            const targetPath = linkPath.replace(/^\/docs\//, '');
            const targetDisplayId = targetPath.replace(/\//g, '-');
            if (targetDisplayId !== displayId && nodeMap.has(targetDisplayId)) {
              console.log(`Creating link from ${displayId} to ${targetDisplayId} (markdown)`);
              tempLinks.push({
                source: displayId,
                target: targetDisplayId,
              });
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${dir}:`, error);
    }
  }

  try {
    // Process all files first to build the node set
    processDirectory(path.join(process.cwd(), 'content/docs'), 'default');

    // Remove duplicate links and ensure they reference existing nodes
    const uniqueLinks = Array.from(new Set(tempLinks.map(link => 
      JSON.stringify({ source: link.source, target: link.target })
    ))).map(link => {
      const { source, target } = JSON.parse(link);
      const sourceNode = nodeMap.get(source);
      const targetNode = nodeMap.get(target);
      if (sourceNode && targetNode) {
        return {
          source: sourceNode.id,
          target: targetNode.id
        };
      }
      return null;
    }).filter(Boolean);

    // Log debug information
    console.log('Processed nodes:', nodes.map(n => ({ id: n.id, name: n.name })));
    console.log('Valid links:', uniqueLinks.map(l => l && { 
      source: l.source, 
      target: l.target 
    }).filter(Boolean));

    return NextResponse.json({ 
      nodes, 
      links: uniqueLinks,
      debug: {
        nodeCount: nodes.length,
        validLinkCount: uniqueLinks.length,
        totalLinkCount: tempLinks.length,
        nodeIds: Array.from(nodeMap.keys())
      }
    });
  } catch (error) {
    console.error('Error processing MDX files:', error);
    return NextResponse.json({ 
      error: 'Failed to process MDX files',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 