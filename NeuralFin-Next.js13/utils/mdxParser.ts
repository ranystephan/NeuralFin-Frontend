import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Node {
  id: string;
  displayId: string;
  name: string;
  val: number;
  color?: string;
  category: string;
  description?: string;
  path: string;
}

export interface Link {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

const CATEGORY_COLORS: { [key: string]: string } = {
  news: '#4ADE80', // emerald
  dashboard: '#60A5FA', // blue
  documentation: '#F472B6', // pink
  default: '#9CA3AF', // gray
};

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response;
      }
      console.warn(`Attempt ${i + 1} failed, status: ${response.status}`);
    } catch (error) {
      console.warn(`Attempt ${i + 1} failed with error:`, error);
    }
    // Wait before retrying, with exponential backoff
    if (i < retries - 1) {
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
  throw new Error(`Failed to fetch after ${retries} attempts`);
}

export async function parseMDXFiles(): Promise<GraphData> {
  try {
    const isDev = process.env.NODE_ENV === 'development';
    const response = await fetchWithRetry(`/api/docs`);
    
    const data = await response.json();
    
    if ('error' in data) {
      console.error('API Error:', data.error, data.details);
      return { nodes: [], links: [] };
    }

    // Validate the data structure
    if (!Array.isArray(data.nodes) || !Array.isArray(data.links)) {
      console.error('Invalid data structure received:', data);
      return { nodes: [], links: [] };
    }

    // Map the nodes to include displayId
    const nodes = data.nodes.map((node: any) => ({
      ...node,
      displayId: node.id
    }));

    return {
      nodes,
      links: data.links
    };
  } catch (error) {
    console.error('Error fetching graph data:', error);
    return { nodes: [], links: [] };
  }
} 