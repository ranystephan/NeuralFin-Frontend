import React, { useCallback, useState, useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Node {
  id: string;
  displayId: string;
  name: string;
  val: number;
  color?: string;
  category: string;
  description?: string;
  x?: number;
  y?: number;
  path: string;
}

interface Link {
  source: string;
  target: string;
}

interface KnowledgeGraphProps {
  nodes: Node[];
  links: Link[];
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ nodes, links }) => {
  const { theme } = useTheme();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const graphRef = useRef<any>();
  const minimapRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize node positions in a circular layout
  const initializeNodePositions = useCallback(() => {
    const radius = 150; // Reduced radius for better fit
    nodes.forEach((node, i) => {
      const angle = (i * 2 * Math.PI) / nodes.length;
      node.x = radius * Math.cos(angle);
      node.y = radius * Math.sin(angle);
    });
  }, [nodes]);

  // Center the graph on initial load and freeze it
  useEffect(() => {
    initializeNodePositions();
    if (graphRef.current && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      
      // Calculate the zoom level needed to fit the graph
      const graphSize = 300; // diameter of the graph
      const zoomX = containerWidth / graphSize;
      const zoomY = containerHeight / graphSize;
      const zoom = Math.min(zoomX, zoomY) * 0.8; // 0.8 to add some padding

      setTimeout(() => {
        graphRef.current.zoom(zoom);
        graphRef.current.centerAt(0, 0, 1000);
        // Freeze the graph after initial layout
        graphRef.current.d3Force('charge', null);
        graphRef.current.d3Force('link', null);
        graphRef.current.d3Force('center', null);
      }, 100);
    }
  }, [initializeNodePositions]);

  // Initialize minimap with fixed zoom and position
  useEffect(() => {
    if (minimapRef.current) {
      minimapRef.current.zoom(0.5);
      minimapRef.current.centerAt(0, 0, 0);
    }
  }, []);

  const handleNodeClick = useCallback((node: Node) => {
    setSelectedNode(node);
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 1000);
      graphRef.current.zoom(1.5, 1000);
    }
  }, []);

  const handleNodeHover = useCallback((node: Node | null) => {
    setHoveredNode(node);
  }, []);

  const handleMinimapClick = useCallback((node: Node) => {
    if (graphRef.current && typeof node.x === 'number' && typeof node.y === 'number') {
      graphRef.current.centerAt(node.x, node.y, 1000);
      graphRef.current.zoom(1.5, 1000);
    }
    setSelectedNode(node);
  }, []);

  const getDocumentUrl = (node: Node) => {
    return `/docs/${node.path}`;
  };

  return (
    <div className="flex w-full h-full gap-6 p-6">
      {/* Left Side - Graph */}
      <div className="w-2/3 h-[600px]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 mb-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
            <div>
              <h2 className="text-lg font-semibold text-white/90">Knowledge Graph</h2>
              <p className="text-sm text-white/60">Interactive visualization of connected concepts</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                {nodes.length} nodes
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                {links.length} connections
              </span>
            </div>
          </div>

          {/* Graph Container */}
          <div ref={containerRef} className="relative flex-1 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500/5 to-blue-500/5 backdrop-blur-md border border-white/10">
            {/* Main Graph */}
            <ForceGraph2D
              ref={graphRef}
              graphData={{ nodes, links }}
              nodeColor={(node: any) => node.color || (theme === 'dark' ? '#4ADE80' : '#22C55E')}
              nodeRelSize={10}
              linkWidth={1}
              linkColor={() => theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}
              nodeLabel={(node: any) => node.name}
              onNodeClick={handleNodeClick}
              onNodeHover={handleNodeHover}
              cooldownTicks={0}
              d3AlphaDecay={0}
              d3VelocityDecay={0}
              warmupTicks={0}
              minZoom={0.2}
              maxZoom={8}
              linkSource="source"
              linkTarget="target"
              width={containerRef.current?.clientWidth}
              height={containerRef.current?.clientHeight}
              nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D) => {
                // Draw node circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
                ctx.fillStyle = node.color || (theme === 'dark' ? '#4ADE80' : '#22C55E');
                ctx.fill();
              }}
            />

            {/* Minimap */}
            <div className="absolute bottom-4 right-4 w-40 h-40 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden">
              <ForceGraph2D
                ref={minimapRef}
                graphData={{ nodes, links }}
                nodeColor={(node: any) => node.color || (theme === 'dark' ? '#4ADE80' : '#22C55E')}
                nodeRelSize={4}
                linkWidth={1}
                linkColor={() => theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
                onNodeClick={handleMinimapClick}
                cooldownTicks={0}
                d3AlphaDecay={0}
                d3VelocityDecay={0}
                warmupTicks={0}
                minZoom={0.5}
                maxZoom={0.5}
                width={160}
                height={160}
                nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D) => {
                  ctx.beginPath();
                  ctx.arc(node.x, node.y, 3, 0, 2 * Math.PI, false);
                  ctx.fillStyle = node.color || (theme === 'dark' ? '#4ADE80' : '#22C55E');
                  ctx.fill();
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Info Panel */}
      <div className="w-1/3 h-[600px]">
        <div className="h-full p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
          <h3 className="text-lg font-semibold mb-4 text-white/90">About the Knowledge Graph</h3>
          
          {/* Selected Node Info */}
          <AnimatePresence>
            {selectedNode ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mb-6"
              >
                <h4 className="text-xl font-semibold mb-2">{selectedNode.name}</h4>
                {selectedNode.description && (
                  <p className="text-sm text-white/60 mb-4">{selectedNode.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                    {selectedNode.category}
                  </span>
                  <Link
                    href={getDocumentUrl(selectedNode)}
                    className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                  >
                    View Document
                  </Link>
                </div>
              </motion.div>
            ) : hoveredNode ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mb-6"
              >
                <h4 className="text-xl font-semibold mb-2">{hoveredNode.name}</h4>
                <p className="text-sm text-white/60">
                  Click to explore details
                </p>
              </motion.div>
            ) : (
              <div className="text-sm text-white/60 space-y-4">
                <p>
                  This knowledge graph visualizes the connections between different concepts in our documentation.
                  Each node represents a document, and the links show how they are related.
                </p>
                <p>
                  <span className="font-medium text-white/80">How to use:</span>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Hover over nodes to see their names</li>
                    <li>Click on a node to view its details</li>
                    <li>Use the minimap to navigate the graph</li>
                    <li>Zoom and pan to explore connections</li>
                  </ul>
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph; 