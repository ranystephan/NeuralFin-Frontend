import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    // Get the absolute path to the content directory
    const contentDirectory = path.join(process.cwd(), 'content');
    
    // Read all files in the content directory
    const files = await fs.readdir(contentDirectory);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    const nodes = [];
    const links = [];
    const processedFiles = new Set();

    for (const file of markdownFiles) {
      const filePath = path.join(contentDirectory, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const fileName = path.basename(file, '.md');

      if (!processedFiles.has(fileName)) {
        processedFiles.add(fileName);

        // Add node for current file
        nodes.push({
          id: fileName,
          name: fileName,
          val: 1
        });

        // Find all wiki-style links [[link]]
        const linkRegex = /\[\[([^\]]+)\]\]/g;
        let match;
        
        while ((match = linkRegex.exec(content)) !== null) {
          const linkedFileName = match[1].toLowerCase();
          links.push({
            source: fileName,
            target: linkedFileName
          });
        }
      }
    }

    return NextResponse.json({ nodes, links });
  } catch (error) {
    console.error('Error reading markdown files:', error);
    return NextResponse.json(
      { error: 'Failed to read markdown files' },
      { status: 500 }
    );
  }
} 