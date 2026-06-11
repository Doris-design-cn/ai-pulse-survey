import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NameInputProps {
  onSubmit: (name: string) => void;
}

export default function NameInput({ onSubmit }: NameInputProps) {
  const [name, setName] = useState('');
  const [displayText, setDisplayText] = useState('');
  const prompt = '> \u8bf7\u8f93\u5165\u4f60\u7684\u540d\u5b57\u4ee5\u5f00\u59cb\u8c03\u67e5\uff1a';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= prompt.length) {
        setDisplayText(prompt.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 text-green-500/70 text-xs">
        ╔══════════════════════════════════════╗
        <br />
        ║&nbsp;&nbsp;欢迎来到 AI PULSE 调查终端&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;║
        <br />
        ║&nbsp;&nbsp;您的回答将帮助我们了解AI趋势&nbsp;&nbsp;║
        <br />
        ╚══════════════════════════════════════╝
      </div>

      <div className="mb-2 text-green-400">
        <span>{displayText}</span>
        {displayText.length < prompt.length && (
          <span className="cursor-blink">█</span>
        )}
      </div>

      {displayText.length >= prompt.length && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
          <span className="text-green-600">$</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            placeholder="输入名字..."
            className="flex-1 bg-transparent border-none outline-none text-green-300 placeholder-green-900 caret-green-400"
          />
          <button
            type="submit"
            className="px-3 py-1 border border-green-700 text-green-400 hover:bg-green-900/30 transition-colors text-xs"
          >
            [ENTER]
          </button>
        </motion.form>
      )}
    </motion.div>
  );
}
