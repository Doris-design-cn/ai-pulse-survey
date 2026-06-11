import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SurveyQuestion } from '../data/questions';

interface QuestionProps {
  question: SurveyQuestion;
  questionIndex: number;
  onAnswer: (value: string) => void;
}

export default function Question({ question, questionIndex, onAnswer }: QuestionProps) {
  const [displayText, setDisplayText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const fullText = `[Q${questionIndex + 1}] ${question.title}`;

  useEffect(() => {
    setDisplayText('');
    setShowOptions(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
        setShowOptions(true);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [question.id]);

  return (
    <div>
      <div className="mb-4 text-green-300 text-base">
        <span>{displayText}</span>
        {!showOptions && <span className="cursor-blink">█</span>}
      </div>

      {showOptions && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          {question.options.map((option, idx) => (
            <button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              className="w-full text-left px-4 py-2 border border-green-900/50 hover:border-green-500 hover:bg-green-900/20 transition-all duration-200 text-green-400 hover:text-green-300 group"
            >
              <span className="text-green-700 group-hover:text-green-400 mr-2">
                [{String.fromCharCode(65 + idx)}]
              </span>
              {option.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
