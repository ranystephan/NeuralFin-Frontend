import fs from 'fs';
import path from 'path';
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

export function parseMarkdownFiles(directory: string): GraphData {
  const nodes: Node[] = [];
  const links: Link[] = [];
  const processedFiles = new Set<string>();

  function processFile(filePath: string) {
    if (processedFiles.has(filePath)) return;
    processedFiles.add(filePath);

    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: markdownContent } = matter(content);
    const fileName = path.basename(filePath, '.md');
    
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
      const linkedFilePath = path.join(directory, `${linkedFileName}.md`);
      
      // Add link
      links.push({
        source: fileName,
        target: linkedFileName
      });

      // Process linked file if it exists
      if (fs.existsSync(linkedFilePath)) {
        processFile(linkedFilePath);
      }
    }
  }

  // Process all markdown files in the directory
  const files = fs.readdirSync(directory);
  files.forEach(file => {
    if (file.endsWith('.md')) {
      processFile(path.join(directory, file));
    }
  });

  return { nodes, links };
} 