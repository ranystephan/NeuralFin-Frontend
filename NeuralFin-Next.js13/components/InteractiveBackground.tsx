"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';

interface InteractiveBackgroundProps {
  isScrolledDown: boolean;
  scrollProgress: number;
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ isScrolledDown, scrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles: Particle[] = useRef([]).current;
  const animationRef = useRef<number>();
  
  // Particle properties
  interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    life: number;
    maxLife: number;
  }
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Initialize particles and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.2,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.1,
        life: 0,
        maxLife: Math.random() * 100 + 100
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life++;
        
        // Restart particle if it goes off screen or exceeds lifespan
        if (
          particle.x < 0 || 
          particle.x > canvas.width || 
          particle.y < 0 || 
          particle.y > canvas.height ||
          particle.life > particle.maxLife
        ) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = 0;
          particle.maxLife = Math.random() * 100 + 100;
        }
        
        // Draw the particle
        const fadePercent = 1 - (particle.life / particle.maxLife);
        const currentOpacity = particle.opacity * fadePercent;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80, 255, 120, ${currentOpacity})`;
        ctx.fill();
      });
      
      // Connect particles that are close to each other
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(80, 255, 120, ${0.05 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.2;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [particles]);
  
  // Colors based on scroll position (always dark with green accents)
  const colors = useMemo(() => {
    return {
      backgroundStart: 'rgb(10, 12, 14)',
      backgroundEnd: 'rgb(5, 6, 7)',
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Dark background with subtle gradient */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          background: `radial-gradient(ellipse at center, ${colors.backgroundStart}, ${colors.backgroundEnd})`,
          transition: 'background 0.7s ease-in-out',
        }}
      />
      
      {/* Green accents - glowing elements */}
      <div className="absolute left-1/4 top-1/4 w-64 h-64 opacity-10 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(80, 255, 120, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      
      <div className="absolute right-1/3 bottom-1/3 w-96 h-96 opacity-8 transform translate-x-1/2 translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(80, 255, 120, 0.10) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      
      {/* Particle canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 w-full h-full opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(80, 255, 120, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(80, 255, 120, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

export default React.memo(InteractiveBackground); 