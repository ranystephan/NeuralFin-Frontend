"use client";

import React, { useEffect, useContext, useState, useRef } from "react";
import { useTheme } from "next-themes";
import "@/styles/globals.css";
import { AuthContext } from "@/contexts/AuthContext";
import { ChevronDown, ArrowRight, Sparkles, Zap, LineChart, ArrowUpRight, BarChart3, Brain, Cpu, Activity, TrendingUp, ArrowDownRight, MessageSquare, FileText, PieChart, Send, Lock } from "lucide-react";
import Link from "next/link";
import { parseMDXFiles } from "@/utils/mdxParser";
import type { GraphData } from "@/utils/mdxParser";
import dynamic from 'next/dynamic';
import path from 'path';

// Components
import GlassHeader from "@/components/GlassHeader";
import InteractiveBackground from "@/components/InteractiveBackground";

const KnowledgeGraph = dynamic(() => import('@/components/KnowledgeGraph'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-xl bg-gradient-to-br from-emerald-500/5 to-blue-500/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  ),
});

const Page: React.FC = () => {
  const { auth, updateAuth } = useContext(AuthContext);
  const { theme, setTheme } = useTheme();
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Market themes
  const [visualTheme, setVisualTheme] = useState({
    primaryColor: "#4ADE80", // Use our green accent color by default
    accentColor: "#0092FF", // OP-1 blue
    tertiaryColor: "#22C55E", // Darker green
    backgroundColor: "#0A0C0E",
    isDarkMode: true, // Default to dark mode
    textColor: "#FFFFFF"
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentDemo, setCurrentDemo] = useState(0);
  const [chatInput, setChatInput] = useState("");
  const [showCTA, setShowCTA] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "AI",
      message: "Hello! I'm your AI trading assistant. How can I help you today?"
    },
    {
      sender: "You",
      message: "How can I improve my portfolio's performance?"
    },
    {
      sender: "AI",
      message: "Based on your current allocation, consider increasing exposure to emerging markets and adding defensive stocks for better risk management."
    }
  ]);

  const demos = [
    {
      title: "News Analysis",
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
      description: "AI-powered news analysis"
    },
    {
      title: "Portfolio Insights",
      icon: <PieChart className="w-5 h-5 text-blue-400" />,
      description: "Smart portfolio analysis"
    },
    {
      title: "AI Assistant",
      icon: <MessageSquare className="w-5 h-5 text-purple-400" />,
      description: "Chat with your portfolio"
    }
  ];

  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });

  // Toggle dark/light mode using next-themes
  const toggleTheme = () => {
    const newTheme = theme === 'dark' || theme === 'dark-theme' ? 'light' : 'dark';
    setTheme(newTheme);
    
    setVisualTheme(prev => {
      const isDarkMode = newTheme === 'dark';
      
      if (isDarkMode) {
        return {
          ...prev,
          isDarkMode: true,
          primaryColor: "#4ADE80", // Brighter green for dark mode
          tertiaryColor: "#22C55E", // Dark mode tertiary
          backgroundColor: '#0A0C0E',
          textColor: '#FFFFFF',
        };
      } else {
        return {
          ...prev,
          isDarkMode: false,
          primaryColor: "#22C55E", // Darker green for light mode
          tertiaryColor: "#15803D", // Light mode tertiary 
          backgroundColor: '#f0f0f0',
          textColor: '#111111',
        };
      }
    });
  };

  // Update visualTheme when theme changes
  useEffect(() => {
    if (theme === 'light' || theme === 'light-theme') {
      setVisualTheme(prev => ({
        ...prev,
        isDarkMode: false,
        primaryColor: "#22C55E", // Darker green for light mode
        tertiaryColor: "#15803D", // Light mode tertiary 
        backgroundColor: '#f0f0f0',
        textColor: '#111111',
      }));
    } else {
      setVisualTheme(prev => ({
        ...prev,
        isDarkMode: true,
        primaryColor: "#4ADE80", // Brighter green for dark mode
        tertiaryColor: "#22C55E", // Dark mode tertiary
        backgroundColor: '#0A0C0E',
        textColor: '#FFFFFF',
      }));
    }
  }, [theme]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const isDev = process.env.NODE_ENV === 'development';
        const apiUrl = isDev 
          ? `http://localhost:8000/api/user`
          : `https://api.neuralfin.xyz/api/user`;
          
        console.log(`Using API endpoint: ${apiUrl}`);
        
        const response = await fetch(apiUrl, {
          credentials: "include",
          signal: abortController.signal,
          mode: 'cors',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const content = await response.json();

        updateAuth({
          isAuthenticated: true,
          user: { id: content.id, name: content.name, email: content.email },
        });
        console.log("Logged in");
      } catch (err) {
        if (err instanceof Error) {
          console.log(`Auth error: ${err.message}`);
        } else {
          console.log("Authentication error", err);
        }

        updateAuth({ isAuthenticated: false, user: null });
        console.log("Not logged in!!");
      }
    })();
    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        const scrollHeight = scrollContainerRef.current.scrollHeight;
        const clientHeight = scrollContainerRef.current.clientHeight;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(progress);
        setIsScrolledDown(scrollTop > 50);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Simulate neural network processing
  useEffect(() => {
    const interval = setInterval(() => {
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadGraphData = async () => {
      try {
        const data = await parseMDXFiles();
        setGraphData(data);
      } catch (error) {
        console.error("Error loading graph data:", error);
      }
    };

    loadGraphData();
  }, []);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      // Add user message
      setChatMessages(prev => [...prev, { sender: "You", message: chatInput }]);
      setMessageCount(prev => prev + 1);
      
      // Add AI response after a short delay
      setTimeout(() => {
        let aiResponse;
        if (messageCount === 0) {
          aiResponse = "I can provide more detailed recommendations once you create an account. Would you like to explore our premium features?";
        } else {
          aiResponse = "I see you are still here! I caught your attention, you should create an account and find out all my features!";
        }
        
        setChatMessages(prev => [...prev, {
          sender: "AI",
          message: aiResponse
        }]);
        setShowCTA(true);
      }, 1000);
      
      setChatInput("");
    }
  };

  return (
    <div className="min-h-screen" ref={scrollContainerRef}>
      <InteractiveBackground isScrolledDown={isScrolledDown} scrollProgress={scrollProgress} />
      <GlassHeader isScrolledDown={isScrolledDown} isAuthenticated={auth.isAuthenticated} userName={auth.user?.name} />
      
      <div className="relative z-10 pt-20">
        {/* Hero section */}
        <div className="min-h-screen flex items-center justify-center relative pt-20 pb-10">
          <div className="container mx-auto max-w-7xl px-6 relative">
            {/* Mathematical grid background */}
            <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-[0.03] pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-full border-r border-white/10" />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
                
                <div className="relative">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8">
                    <Brain className="w-4 h-4 mr-2 text-emerald-400" />
                    <span className="text-sm font-medium tracking-wide">Neural Network Trading</span>
                  </div>
                  
                  <h1 className="text-8xl font-bold mb-8 tracking-tight leading-none font-display heading-xl">
                    <span className={visualTheme.isDarkMode ? "text-white" : "text-black"}>neural</span>
                    <span style={{ color: visualTheme.primaryColor }}>fin</span>
                  </h1>
                  
                  <p className={`text-2xl mb-12 tracking-tight opacity-80 modern-text body-text max-w-xl ${visualTheme.isDarkMode ? "text-white/80" : "text-black/80"}`}>
                    Where artificial intelligence meets financial markets. Advanced algorithms for sophisticated trading strategies.
                  </p>
                  
                  <div className="flex flex-wrap gap-6">
                    <button className="group py-4 px-8 rounded-md tracking-wide modern-button flex items-center bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-500/20"
                    >
                      <span className="text-black font-medium">Start Trading</span>
                      <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    
                    <button className="py-4 px-8 rounded-md border border-white/10 tracking-wide modern-button backdrop-blur-md hover:bg-white/5 transition-all duration-300">
                      <span className="font-medium">Documentation</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right side - Interactive visualization */}
              <div className="relative h-[600px] hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-2xl backdrop-blur-md border border-white/10 overflow-hidden">
                  {/* Decorative grid */}
                  <div className="absolute inset-0 grid grid-cols-8 gap-4 opacity-[0.03]">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="h-full border-r border-white/10" />
                    ))}
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-xl animate-pulse" />
                  <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-xl animate-pulse delay-1000" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Brain className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm font-medium">NeuralFin Demo</span>
                      </div>
                      <div className="text-sm text-white/60">Model v0.0.1</div>
                    </div>
                    
                    <div className="flex-1 flex items-start justify-center pt-2">
                      <div className="w-full max-w-md">
                        {/* Demo Cards */}
                        <div className="relative h-[400px]">
                          {/* News Analysis Demo */}
                          <div className={`absolute inset-0 transition-opacity duration-500 ${currentDemo === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            <div className="h-full space-y-4">
                              <div className="p-4 rounded-lg bg-white/5 border border-white/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
                                <div className="relative">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-white/60">Input: News Article</span>
                                    <FileText className="w-4 h-4 text-emerald-400" />
                                  </div>
                                  <div className="text-sm text-white/80 line-clamp-2">
                                    "Apple Inc. reported record-breaking Q4 earnings, with iPhone sales up 15% year-over-year. The company's services segment grew 25%, while Mac sales increased by 12%. The tech giant also announced a new AI initiative that could revolutionize their product line."
                                  </div>
                                  <div className="mt-2 flex items-center text-xs text-white/60">
                                    <span>Source: Financial Times</span>
                                    <span className="mx-2">•</span>
                                    <span>2 hours ago</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="p-4 rounded-lg bg-white/5 border border-white/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
                                <div className="relative">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-white/60">Output: Analysis</span>
                                    <TrendingUp className="w-4 h-4 text-blue-400" />
                                  </div>
                                  <div className="space-y-3">
                                    <div className="p-2 rounded-md bg-white/5">
                                      <div className="text-xs text-white/60 mb-1">Summary</div>
                                      <div className="text-sm text-white/80">
                                        Apple reports strong Q4 performance with significant growth across all major product lines and a promising new AI initiative.
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="text-sm">
                                        <span className="text-emerald-400">AAPL</span>
                                        <span className="text-white/60 ml-2">+2.3% predicted</span>
                                      </div>
                                      <div className="px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-400 text-xs">
                                        High Confidence
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                      <div className="p-2 rounded-md bg-white/5 text-center">
                                        <div className="text-emerald-400 text-sm">↑15%</div>
                                        <div className="text-xs text-white/60">Revenue</div>
                                      </div>
                                      <div className="p-2 rounded-md bg-white/5 text-center">
                                        <div className="text-emerald-400 text-sm">↑25%</div>
                                        <div className="text-xs text-white/60">Services</div>
                                      </div>
                                      <div className="p-2 rounded-md bg-white/5 text-center">
                                        <div className="text-emerald-400 text-sm">↑12%</div>
                                        <div className="text-xs text-white/60">Mac Sales</div>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between text-xs">
                                        <span className="text-white/60">Impact Timeline</span>
                                        <span className="text-emerald-400">1-2 weeks</span>
                                      </div>
                                      <div className="flex items-center justify-between text-xs">
                                        <span className="text-white/60">Market Sentiment</span>
                                        <span className="text-emerald-400">Positive</span>
                                      </div>
                                      <div className="flex items-center justify-between text-xs">
                                        <span className="text-white/60">Key Catalyst</span>
                                        <span className="text-emerald-400">AI Initiative</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Portfolio Analysis Demo */}
                          <div className={`absolute inset-0 transition-opacity duration-500 ${currentDemo === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            <div className="h-full space-y-4">
                              <div className="p-4 rounded-lg bg-white/5 border border-white/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
                                <div className="relative">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-white/60">Portfolio Analysis</span>
                                    <PieChart className="w-4 h-4 text-blue-400" />
                                  </div>
                                  <div className="space-y-3">
                                    {/* Portfolio Allocation Chart */}
                                    <div className="h-24 relative">
                                      <div className="absolute inset-0 flex items-end space-x-1">
                                        <div className="flex-1 bg-emerald-400/20 rounded-t-sm" style={{ height: '45%' }}>
                                          <div className="text-xs text-emerald-400 text-center mt-1">45%</div>
                                        </div>
                                        <div className="flex-1 bg-blue-400/20 rounded-t-sm" style={{ height: '30%' }}>
                                          <div className="text-xs text-blue-400 text-center mt-1">30%</div>
                                        </div>
                                        <div className="flex-1 bg-purple-400/20 rounded-t-sm" style={{ height: '25%' }}>
                                          <div className="text-xs text-purple-400 text-center mt-1">25%</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-xs">
                                      <div className="text-center">
                                        <div className="text-emerald-400">Tech</div>
                                        <div className="text-white/60">45%</div>
                                      </div>
                                      <div className="text-center">
                                        <div className="text-blue-400">Finance</div>
                                        <div className="text-white/60">30%</div>
                                      </div>
                                      <div className="text-center">
                                        <div className="text-purple-400">Healthcare</div>
                                        <div className="text-white/60">25%</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="p-4 rounded-lg bg-white/5 border border-white/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
                                <div className="relative">
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm text-white/60">Performance Metrics</span>
                                      <div className="px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-400 text-xs">
                                        +12.4% YTD
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                      <div className="p-2 rounded-md bg-white/5">
                                        <div className="text-white/60">Total Value</div>
                                        <div className="text-white/80">$1.24M</div>
                                      </div>
                                      <div className="p-2 rounded-md bg-white/5">
                                        <div className="text-white/60">Risk Score</div>
                                        <div className="text-emerald-400">Low</div>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                      <div className="p-2 rounded-md bg-white/5">
                                        <div className="text-white/60">Beta</div>
                                        <div className="text-white/80">0.85</div>
                                      </div>
                                      <div className="p-2 rounded-md bg-white/5">
                                        <div className="text-white/60">Sharpe</div>
                                        <div className="text-white/80">1.8</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* AI Assistant Demo */}
                          <div className={`absolute inset-0 transition-opacity duration-500 ${currentDemo === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            <div className="h-full space-y-4">
                              <div className="p-4 rounded-lg bg-white/5 border border-white/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
                                <div className="relative">
                                  <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-white/60">AI Assistant</span>
                                    <MessageSquare className="w-4 h-4 text-purple-400" />
                                  </div>
                                  <div className="space-y-4">
                                    {/* Chat messages */}
                                    <div className="space-y-3 h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                                      {chatMessages.map((msg, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs text-white/80">{msg.sender}</span>
                                          </div>
                                          <div className="flex-1">
                                            <div className={`text-sm text-white/80 rounded-2xl rounded-tl-none px-4 py-2 ${
                                              msg.sender === "You" ? "bg-blue-500/10" : "bg-white/5"
                                            }`}>
                                              {msg.message}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                      {showCTA && (
                                        <div className="flex items-start space-x-3">
                                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs text-white/80">AI</span>
                                          </div>
                                          <div className="flex-1">
                                            <div className="text-sm text-white/80 bg-white/5 rounded-2xl rounded-tl-none px-4 py-2">
                                              To explore all features and get personalized insights, create an account!
                                            </div>
                                            <div className="flex items-center text-xs text-white/60 mt-2 ml-2">
                                              <Lock className="w-3 h-3 mr-1" />
                                              <span>
                                                <Link href="/register" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                                                  Sign up
                                                </Link>
                                                {" "}to unlock full access
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    {/* Chat input */}
                                    <form onSubmit={handleChatSubmit} className="flex items-center space-x-2 sticky bottom-0 bg-black/20 backdrop-blur-sm p-2 rounded-xl mt-4">
                                      <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Ask me anything..."
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/80 placeholder-white/40 focus:outline-none focus:border-white/20"
                                      />
                                      <button
                                        type="submit"
                                        className="w-8 h-8 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors flex items-center justify-center"
                                      >
                                        <Send className="w-4 h-4" />
                                      </button>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {demos.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentDemo(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                              currentDemo === index ? 'bg-emerald-400' : 'bg-white/20'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-white/60">
                        {demos[currentDemo].title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Demo Section */}
              <div className="lg:hidden mt-8">
                <div className="bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-2xl backdrop-blur-md border border-white/10 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Brain className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm font-medium">NeuralFin Demo</span>
                      </div>
                      <div className="text-sm text-white/60">Model v0.0.1</div>
                    </div>

                    {/* Mobile Demo Content */}
                    <div className="space-y-4">
                      {/* News Analysis Demo */}
                      {currentDemo === 0 && (
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-white/60">Input: News Article</span>
                              <FileText className="w-4 h-4 text-emerald-400" />
                            </div>
                            <div className="text-sm text-white/80">
                              "Apple Inc. reported record-breaking Q4 earnings, with iPhone sales up 15% year-over-year. The company's services segment grew 25%, while Mac sales increased by 12%. The tech giant also announced a new AI initiative that could revolutionize their product line."
                            </div>
                            <div className="mt-2 flex items-center text-xs text-white/60">
                              <span>Source: Financial Times</span>
                              <span className="mx-2">•</span>
                              <span>2 hours ago</span>
                            </div>
                          </div>

                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-white/60">Output: Analysis</span>
                              <TrendingUp className="w-4 h-4 text-blue-400" />
                            </div>
                            <div className="space-y-3">
                              <div className="p-2 rounded-md bg-white/5">
                                <div className="text-xs text-white/60 mb-1">Summary</div>
                                <div className="text-sm text-white/80">
                                  Apple reports strong Q4 performance with significant growth across all major product lines and a promising new AI initiative.
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="p-2 rounded-md bg-white/5 text-center">
                                  <div className="text-emerald-400 text-sm">↑15%</div>
                                  <div className="text-xs text-white/60">Revenue</div>
                                </div>
                                <div className="p-2 rounded-md bg-white/5 text-center">
                                  <div className="text-emerald-400 text-sm">↑25%</div>
                                  <div className="text-xs text-white/60">Services</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Portfolio Analysis Demo */}
                      {currentDemo === 1 && (
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-white/60">Portfolio Analysis</span>
                              <PieChart className="w-4 h-4 text-blue-400" />
                            </div>
                            <div className="space-y-3">
                              <div className="h-24 relative">
                                <div className="absolute inset-0 flex items-end space-x-1">
                                  <div className="flex-1 bg-emerald-400/20 rounded-t-sm" style={{ height: '45%' }}>
                                    <div className="text-xs text-emerald-400 text-center mt-1">45%</div>
                                  </div>
                                  <div className="flex-1 bg-blue-400/20 rounded-t-sm" style={{ height: '30%' }}>
                                    <div className="text-xs text-blue-400 text-center mt-1">30%</div>
                                  </div>
                                  <div className="flex-1 bg-purple-400/20 rounded-t-sm" style={{ height: '25%' }}>
                                    <div className="text-xs text-purple-400 text-center mt-1">25%</div>
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                <div className="text-center">
                                  <div className="text-emerald-400">Tech</div>
                                  <div className="text-white/60">45%</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-blue-400">Finance</div>
                                  <div className="text-white/60">30%</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-purple-400">Healthcare</div>
                                  <div className="text-white/60">25%</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-white/60">Performance Metrics</span>
                                <div className="px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-400 text-xs">
                                  +12.4% YTD
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="p-2 rounded-md bg-white/5">
                                  <div className="text-white/60">Total Value</div>
                                  <div className="text-white/80">$1.24M</div>
                                </div>
                                <div className="p-2 rounded-md bg-white/5">
                                  <div className="text-white/60">Risk Score</div>
                                  <div className="text-emerald-400">Low</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* AI Assistant Demo */}
                      {currentDemo === 2 && (
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-sm text-white/60">AI Assistant</span>
                              <MessageSquare className="w-4 h-4 text-purple-400" />
                            </div>
                            <div className="space-y-4">
                              <div className="space-y-3 h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                                {chatMessages.map((msg, index) => (
                                  <div key={index} className="flex items-start space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                      <span className="text-xs text-white/80">{msg.sender}</span>
                                    </div>
                                    <div className="flex-1">
                                      <div className={`text-sm text-white/80 rounded-2xl rounded-tl-none px-4 py-2 ${
                                        msg.sender === "You" ? "bg-blue-500/10" : "bg-white/5"
                                      }`}>
                                        {msg.message}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                {showCTA && (
                                  <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                      <span className="text-xs text-white/80">AI</span>
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-sm text-white/80 bg-white/5 rounded-2xl rounded-tl-none px-4 py-2">
                                        To explore all features and get personalized insights, create an account!
                                      </div>
                                      <div className="flex items-center text-xs text-white/60 mt-2 ml-2">
                                        <Lock className="w-3 h-3 mr-1" />
                                        <span>
                                          <Link href="/register" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                                            Sign up
                                          </Link>
                                          {" "}to unlock full access
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <form onSubmit={handleChatSubmit} className="flex items-center space-x-2 sticky bottom-0 bg-black/20 backdrop-blur-sm p-2 rounded-xl mt-4">
                                <input
                                  type="text"
                                  value={chatInput}
                                  onChange={(e) => setChatInput(e.target.value)}
                                  placeholder="Ask me anything..."
                                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/80 placeholder-white/40 focus:outline-none focus:border-white/20"
                                />
                                <button
                                  type="submit"
                                  className="w-8 h-8 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors flex items-center justify-center"
                                >
                                  <Send className="w-4 h-4" />
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Mobile Demo Navigation */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                      <div className="flex space-x-2">
                        {demos.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentDemo(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                              currentDemo === index ? 'bg-emerald-400' : 'bg-white/20'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-white/60">
                        {demos[currentDemo].title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in-up">
              <div className="text-sm text-white/40 mb-2 font-medium tracking-wide">Scroll to explore</div>
              <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-scroll-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* Knowledge Graph */}
        <div className="container mx-auto max-w-7xl px-6 py-24">
          <div className="bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-2xl backdrop-blur-md border border-white/10 p-6">
            <KnowledgeGraph nodes={graphData.nodes} links={graphData.links} />
          </div>
        </div>

        {/* Add custom scrollbar styles */}
        <style jsx global>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .custom-scrollbar::-webkit-scrollbar {
            display: none;
          }

          /* Hide scrollbar for IE, Edge and Firefox */
          .custom-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }

          /* Hide all scrollbars globally */
          * {
            scrollbar-width: none;  /* Firefox */
            -ms-overflow-style: none;  /* IE and Edge */
          }

          *::-webkit-scrollbar {
            display: none;  /* Chrome, Safari and Opera */
          }

          /* Scroll indicator animations */
          @keyframes scroll-bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(12px);
            }
          }

          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translate(-50%, 20px);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, 0);
            }
          }

          .animate-scroll-bounce {
            animation: scroll-bounce 2s ease-in-out infinite;
          }

          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Page;
