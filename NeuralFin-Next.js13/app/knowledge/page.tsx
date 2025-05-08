'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the KnowledgeGraph component to avoid SSR issues
const KnowledgeGraph = dynamic(() => import('@/components/KnowledgeGraph'), {
  ssr: false
});

interface GraphData {
  nodes: Array<{
    id: string;
    name: string;
    val: number;
  }>;
  links: Array<{
    source: string;
    target: string;
  }>;
}

const KnowledgePage = () => {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGraphData() {
      try {
        const response = await fetch('/api/markdown');
        if (!response.ok) {
          throw new Error('Failed to fetch graph data');
        }
        const data = await response.json();
        setGraphData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching graph data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGraphData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-red-400">Error</h2>
            <p className="text-white/60">{error}</p>
          </div>
        </div>
      </div>
    );
  }

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
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/20"></div>
            </div>
          ) : (
            <KnowledgeGraph nodes={graphData.nodes} links={graphData.links} />
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgePage; 