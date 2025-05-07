"use client";

import { ChevronDown as ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ChevronDownProps {
  isScrolledDown: boolean;
}

const ChevronDown: React.FC<ChevronDownProps> = ({ isScrolledDown }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Hide after scroll
    setIsVisible(!isScrolledDown);
  }, [isScrolledDown]);
  
  return (
    <div className="flex justify-center mb-16 transition-all duration-500"
      style={{ 
        transform: `translateY(${isVisible ? '0' : '30px'})`,
        opacity: isVisible ? 1 : 0
      }}
    >
      <div 
        className="relative"
        style={{
          animation: 'float-y 2s infinite ease-in-out'
        }}
      >
        <ChevronDownIcon
          className="h-10 w-10"
          style={{
            color: isScrolledDown ? 'rgba(255, 255, 255, 1)' : 'rgba(30, 30, 40, 1)',
            transition: 'color 0.8s ease-in-out'
          }}
        />
      </div>
    </div>
  );
};

export default ChevronDown; 