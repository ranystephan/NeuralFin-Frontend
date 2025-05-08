import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the content directory
const contentDirectory = path.join(process.cwd(), 'content');

// Define default frontmatter
const defaultFrontmatter = {
  title: 'Documentation',
  description: 'NeuralFin documentation'
};

// Get all MDX files from a directory
export async function getMdxFiles(dir: string) {
  try {
    const contentDir = path.join(contentDirectory, dir);
    if (!fs.existsSync(contentDir)) return [];
    
    return fs.readdirSync(contentDir)
      .filter(file => file.endsWith('.mdx'));
  } catch (error) {
    console.error('Error getting MDX files:', error);
    return [];
  }
}

// Get content and metadata for a single MDX file
export async function getMdxContent(dir: string, slug: string) {
  try {
    const filePath = path.join(contentDirectory, dir, `${slug}.mdx`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return {
        frontmatter: defaultFrontmatter,
        content: `# ${defaultFrontmatter.title}\n\nThe requested documentation page could not be found.`,
        slug
      };
    }
    
    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Extract frontmatter and content
    const { data, content } = matter(fileContent);
    
    return {
      frontmatter: {
        ...defaultFrontmatter,
        ...data
      },
      content,
      slug
    };
  } catch (error) {
    console.error('Error getting MDX content:', error);
    return {
      frontmatter: defaultFrontmatter,
      content: `# ${defaultFrontmatter.title}\n\nThere was an error loading this documentation page.`,
      slug
    };
  }
}

// Get all content from directory
export async function getAllMdxContent(dir: string) {
  try {
    const files = await getMdxFiles(dir);
    
    const content = await Promise.all(
      files.map(async (file) => {
        const slug = file.replace(/\.mdx$/, '');
        const content = await getMdxContent(dir, slug);
        return content;
      })
    );
    
    return content;
  } catch (error) {
    console.error('Error getting all MDX content:', error);
    return [];
  }
} 