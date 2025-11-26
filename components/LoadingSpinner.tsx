"use client";

import React from 'react';

export default function LoadingSpinner({ size = "lg", text = "Loading..." }) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40"
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Main Spinner Container */}
      <div className={`${sizeClasses[size as keyof typeof sizeClasses]} relative`}>
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-green-200 border-t-green-500 border-r-green-500 animate-spin" style={{ animationDuration: '1.5s' }}></div>
        
        {/* Second rotating ring (opposite direction) */}
        <div className="absolute inset-2 rounded-full border-4 border-emerald-200 border-b-emerald-500 border-l-emerald-500 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
        
        {/* Third ring with gradient */}
        <div className="absolute inset-4 rounded-full border-3 border-transparent border-t-teal-400 border-r-teal-400 animate-spin" style={{ animationDuration: '2.5s' }}></div>
        
        {/* Center pulsing circle */}
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center shadow-inner">
          <div className="w-2/3 h-2/3 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 animate-pulse-strong shadow-lg"></div>
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <div className="text-center space-y-2">
          <p className="text-gray-700 font-semibold text-lg animate-bounce" style={{ animationDelay: '0s' }}>
            {text}
          </p>
          <div className="flex gap-1 justify-center">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes thriftmap-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes thriftmap-pulse-in {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-spin {
          animation: thriftmap-spin linear infinite;
        }

        .animate-pulse-strong {
          animation: pulse-strong 2s ease-in-out infinite;
        }

        @keyframes pulse-strong {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(0.95);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-bounce {
          animation: bounce 0.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
