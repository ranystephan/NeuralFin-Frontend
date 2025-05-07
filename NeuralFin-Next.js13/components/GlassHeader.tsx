"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, User, LogIn } from 'lucide-react';

interface GlassHeaderProps {
  isScrolledDown: boolean;
  isAuthenticated: boolean;
  userName?: string;
}

const GlassHeader: React.FC<GlassHeaderProps> = ({ 
  isScrolledDown, 
  isAuthenticated, 
  userName 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Detect scroll for sticky header behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled ? 'rgba(10, 12, 14, 0.8)' : 'transparent',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none'
      }}
    >
      <div className="  container mx-auto px-6 py-4 flex items-center justify-between backdrop-blur-md ">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="block relative z-10 group">
            <div className="flex items-center">
              <div className="mr-2 relative overflow-hidden">
                <div 
                  className="w-8 h-8 rounded-lg transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
                    boxShadow: '0 4px 10px rgba(34, 197, 94, 0.3)'
                  }}
                />
              </div>
              <span 
                className="text-xl font-bold transition-all duration-300 relative"
                style={{
                  background: 'linear-gradient(to right, #4ADE80, #22C55E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 100%',
                  animation: 'gradientShift 3s infinite linear'
                }}
              >
                neuralfin
              </span>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {['How It Works', 'Programs', 'Pricing', 'Support'].map((item, index) => (
            <Link 
              key={index} 
              href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative py-2 text-sm font-medium transition-colors duration-200 group"
            >
              <span className="relative z-10 group-hover:text-opacity-100 text-white/80 group-hover:text-white"
                style={{
                  transition: 'color 0.3s ease',
                }}
              >
                {item}
              </span>
              {/* Animated underline effect */}
              <span 
                className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                style={{
                  background: 'linear-gradient(to right, #4ADE80, #22C55E)',
                }}
              />
            </Link>
          ))}
        </nav>
        
        {/* Authentication */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div 
              className="flex items-center py-1 pl-3 pr-3 rounded-full bg-black/30 border border-white/10 backdrop-blur-md"
            >
              <div className="flex items-center">
                <div 
                  className="w-7 h-7 rounded-full flex items-center justify-center mr-2"
                  style={{
                    background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
                  }}
                >
                  <User size={14} color="white" />
                </div>
                <span className="text-sm font-medium text-white/90">
                  {userName || 'User'}
                </span>
              </div>
              <ChevronDown size={16} className="ml-1 text-white/60" />
            </div>
          ) : (
            <>
              <Link 
                href="/login"
                className="py-2 px-4 text-sm font-medium rounded-full transition-all duration-200 text-white/90 hover:text-white"
              >
                Login / Register
              </Link>
              <Link 
                href="/register"
                className="py-2 px-4 rounded-full relative overflow-hidden group bg-green-500 hover:bg-green-600 transition-all"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 w-full h-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    transform: 'translateX(-100%)',
                    animation: 'shine 3s infinite'
                  }}
                />
                <span className="relative z-10 text-sm font-medium text-white">Start a challenge</span>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-black/30 text-white"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 transform ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'rgba(10, 12, 14, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <nav className="flex flex-col space-y-4">
            {['How It Works', 'Programs', 'Pricing', 'Support'].map((item, index) => (
              <Link 
                key={index} 
                href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="py-3 px-4 text-white/80 hover:text-white border-b border-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            
            {/* Authentication for mobile */}
            {isAuthenticated ? (
              <div className="flex items-center py-3 px-4 border-t border-white/10 mt-2">
                <div 
                  className="w-7 h-7 rounded-full flex items-center justify-center mr-3"
                  style={{
                    background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
                  }}
                >
                  <User size={14} color="white" />
                </div>
                <span className="text-sm font-medium text-white/90">
                  {userName || 'User'}
                </span>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/10 mt-2">
                <Link 
                  href="/login" 
                  className="py-3 px-4 text-white/80 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <LogIn size={18} className="mr-2" />
                    <span>Login / Register</span>
                  </div>
                </Link>
                <Link 
                  href="/register" 
                  className="py-3 px-4 bg-green-500 hover:bg-green-600 transition-all rounded-md text-white text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start a challenge
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
      
      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          20% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </header>
  );
};

export default GlassHeader; 