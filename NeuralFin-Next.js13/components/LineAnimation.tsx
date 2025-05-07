import { useEffect, useRef, useState } from 'react';

interface LineAnimationProps {
  scrollContainer: HTMLElement | null;
}

const LineAnimation: React.FC<LineAnimationProps> = ({ scrollContainer }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (scrollContainer && svgRef.current) {
      const updateAnimation = () => {
        const scrollFraction = scrollContainer.scrollTop / (scrollContainer.scrollHeight - scrollContainer.clientHeight);
        setScrollProgress(Math.min(1, Math.max(0, scrollFraction)));
      };

      scrollContainer.addEventListener('scroll', updateAnimation);
      return () => scrollContainer.removeEventListener('scroll', updateAnimation);
    }
  }, [scrollContainer]);

  return (
    <div className="w-full h-[600px] relative overflow-hidden">
      {/* Background radial gradient that changes with scroll */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)`,
          opacity: scrollProgress
        }}
      />
      
      {/* SVG container */}
      <svg 
        ref={svgRef} 
        viewBox="0 0 1000 600" 
        className="w-full h-full"
        style={{
          opacity: 0.9,
        }}
      >
        <defs>
          {/* Gradient definitions */}
          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
          </linearGradient>
          
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4D4D" />
            <stop offset="100%" stopColor="#FF8A3D" />
          </linearGradient>
          
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
          </linearGradient>
        </defs>
        
        {/* Glass Panel 1 - Left side */}
        <g 
          style={{ 
            transform: `translateY(${100 - scrollProgress * 150}px)`,
            opacity: 0.2 + scrollProgress * 0.8,
            transition: 'transform 0.5s ease-out'
          }}
        >
          <rect
            x="100"
            y="150"
            width="300"
            height="180"
            rx="20"
            fill="url(#glassGradient)"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="0.5"
            style={{
              transform: `rotate(${-5 + scrollProgress * -10}deg) scale(${0.8 + scrollProgress * 0.3})`,
              transformOrigin: "250px 240px",
              filter: "blur(1px)"
            }}
          />
        </g>
        
        {/* Glass Panel 2 - Right side */}
        <g 
          style={{ 
            transform: `translateY(${scrollProgress * -100}px)`,
            opacity: 0.2 + scrollProgress * 0.8,
            transition: 'transform 0.5s ease-out' 
          }}
        >
          <rect
            x="600"
            y="230"
            width="280"
            height="160"
            rx="20"
            fill="url(#glassGradient)"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="0.5"
            style={{
              transform: `rotate(${5 + scrollProgress * 10}deg) scale(${0.8 + scrollProgress * 0.3})`,
              transformOrigin: "740px 310px",
              filter: "blur(1px)"
            }}
          />
        </g>
        
        {/* Horizontal line with accent colors */}
        <line 
          x1="50" 
          y1="300" 
          x2="950" 
          y2="300" 
          stroke="url(#accentGradient)" 
          strokeWidth="2"
          strokeDasharray="5,5"
          style={{
            opacity: 0.3 + scrollProgress * 0.7,
            strokeDashoffset: 1000 - scrollProgress * 1000
          }}
        />
        
        {/* Accent circle that moves along the line */}
        <circle 
          cx={50 + scrollProgress * 900} 
          cy="300" 
          r={5 + scrollProgress * 8} 
          fill="url(#accentGradient)" 
          style={{ 
            filter: `blur(${scrollProgress * 2}px)`,
            opacity: 0.7 + scrollProgress * 0.3
          }}
        />
        
        {/* Line path that appears as you scroll */}
        <path
          d={`M100,${400 - scrollProgress * 200} C${250 + scrollProgress * 50},${300 - scrollProgress * 100} ${750 - scrollProgress * 150},${300 + scrollProgress * 100} ${900},${200 + scrollProgress * 100}`}
          stroke="url(#lineGradient)"
          strokeWidth="1.5"
          fill="none"
          style={{
            opacity: scrollProgress * 0.9,
            strokeDasharray: 1500,
            strokeDashoffset: 1500 - scrollProgress * 1500
          }}
        />
        
        {/* Scanning line effect */}
        <line 
          x1="0" 
          y1={300 - scrollProgress * 200} 
          x2="1000" 
          y2={300 - scrollProgress * 200} 
          stroke="rgba(255, 255, 255, 0.5)" 
          strokeWidth="1" 
          strokeDasharray="10,10"
          style={{
            opacity: scrollProgress
          }}
        />
        
        {/* Particles along the path */}
        {Array.from({ length: 10 }).map((_, i) => {
          const position = scrollProgress * 100 + i * 10;
          return (
            <circle 
              key={`particle-${i}`}
              cx={100 + (position % 800)} 
              cy={300 - Math.sin(position * 0.05) * 50} 
              r={1 + (i % 3)} 
              fill="white"
              style={{
                opacity: scrollProgress * (0.5 + (i % 5) * 0.1)
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default LineAnimation;
