import React from 'react'

export default function Loading() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        <div className="animate-pulse">
          <div className="h-12 bg-white/5 rounded-md w-3/4 mb-8"></div>
          <div className="h-6 bg-white/5 rounded-md w-1/2 mb-6"></div>
          
          <div className="space-y-4 mt-10">
            <div className="h-4 bg-white/5 rounded-md w-full"></div>
            <div className="h-4 bg-white/5 rounded-md w-full"></div>
            <div className="h-4 bg-white/5 rounded-md w-3/4"></div>
            <div className="h-4 bg-white/5 rounded-md w-1/2"></div>
          </div>
          
          <div className="space-y-4 mt-10">
            <div className="h-8 bg-white/5 rounded-md w-1/3 mb-4"></div>
            <div className="h-4 bg-white/5 rounded-md w-full"></div>
            <div className="h-4 bg-white/5 rounded-md w-full"></div>
            <div className="h-4 bg-white/5 rounded-md w-4/5"></div>
          </div>
        </div>
      </div>
    </div>
  )
} 