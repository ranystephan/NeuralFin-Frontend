'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { parseMarkdownFiles } from '@/utils/markdownParser';

// Dynamically import the KnowledgeGraph component to avoid SSR issues
const KnowledgeGraph = dynamic(() => import('@/components/KnowledgeGraph'), {
  ssr: false
});

const KnowledgePage = () => {
  const [graphData, setGraphData] = useState<{ nodes: any[]; links: any[] }>({ nodes: [], links: [] });

  useEffect(() => {
    async function loadGraphData() {
      try {
        // In a real application, you would fetch this data from an API
        const response = await fetch('/api/docs');
        const files = await response.json();
        const data = await parseMarkdownFiles(files);
        setGraphData(data);
      } catch (error) {
        console.error('Error loading graph data:', error);
        setGraphData({ nodes: [], links: [] });
      }
    }

    loadGraphData();
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Knowledge Graph</h1>
          <p className="text-lg text-white/60">
            Explore the interconnected concepts and ideas in our documentation.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-2xl backdrop-blur-md border border-white/10 p-6">
          <KnowledgeGraph nodes={graphData.nodes} links={graphData.links} />
        </div>
      </div>
    </div>
  );
};

export default KnowledgePage; 