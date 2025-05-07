import matter from 'gray-matter';

interface Node {
  id: string;
  name: string;
  val: number;
  color?: string;
}

interface Link {
  source: string;
  target: string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

export async function parseMarkdownContent(content: string, fileName: string): Promise<GraphData> {
  const nodes: Node[] = [];
  const links: Link[] = [];

  const { data, content: markdownContent } = matter(content);
  
  // Add node for current file
  nodes.push({
    id: fileName,
    name: data.title || fileName,
    val: 1,
    color: data.color
  });

  // Find all wiki-style links [[link]]
  const linkRegex = /\[\[([^\]]+)\]\]/g;
  let match;
  
  while ((match = linkRegex.exec(markdownContent)) !== null) {
    const linkedFileName = match[1].toLowerCase();
    
    // Add link
    links.push({
      source: fileName,
      target: linkedFileName
    });
  }

  return { nodes, links };
}

export async function parseMarkdownFiles(files: { name: string; content: string }[]): Promise<GraphData> {
  const allNodes: Node[] = [];
  const allLinks: Link[] = [];

  for (const file of files) {
    const { nodes, links } = await parseMarkdownContent(file.content, file.name);
    allNodes.push(...nodes);
    allLinks.push(...links);
  }

  return { nodes: allNodes, links: allLinks };
} 