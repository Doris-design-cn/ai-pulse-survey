import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { subscribeToResponses, SurveyResponse } from '../utils/storage';
import { questions } from '../data/questions';

export default function Statistics() {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToResponses((data) => {
      setResponses(data);
    });
    return () => unsubscribe();
  }, []);

  const getStats = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return [];

    const counts: Record<string, number> = {};
    question.options.forEach((o) => (counts[o.value] = 0));

    responses.forEach((r) => {
      const answer = r.answers[questionId];
      if (answer && counts[answer] !== undefined) {
        counts[answer]++;
      }
    });

    const total = responses.length || 1;
    return question.options.map((o) => ({
      label: o.label,
      count: counts[o.value],
      percentage: Math.round((counts[o.value] / total) * 100),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-green-500 text-xs mb-4">
        ═══ 实时统计面板 ═══ 共 {responses.length} 份回答
      </div>

      {questions.map((q) => (
        <div key={q.id} className="mb-4">
          <div className="text-green-300 text-xs mb-2 truncate">{q.title}</div>
          <div className="space-y-1">
            {getStats(q.id).map((stat) => {
              const barLen = Math.round(stat.percentage / 5);
              const bar = '\u2593'.repeat(barLen) + '\u2591'.repeat(20 - barLen);
              return (
                <div key={stat.label} className="text-xs flex items-center gap-2">
                  <span className="text-green-700 w-32 truncate">{stat.label}</span>
                  <span className="text-green-500">{bar}</span>
                  <span className="text-green-600 w-16 text-right">
                    {stat.count}票 {stat.percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
