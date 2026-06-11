import React from 'react';

interface TerminalProps {
  children: React.ReactNode;
  onAdminClick?: () => void;
}

export default function Terminal({ children, onAdminClick }: TerminalProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="crt-overlay" />
      <div className="w-full max-w-2xl bg-[#111] border border-green-900/50 rounded-lg shadow-2xl shadow-green-900/20 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-green-900/30">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-green-500 text-xs font-mono tracking-wider">
            AI_PULSE v2.0 \u2014 SURVEY TERMINAL
          </span>
          <button
            onClick={onAdminClick}
            className="text-green-900 hover:text-green-400 text-xs font-mono transition-colors"
          >
            [ADMIN]
          </button>
        </div>
        {/* Content */}
        <div className="p-6 min-h-[400px] text-green-400 font-mono text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
