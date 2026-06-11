import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Terminal from './components/Terminal';
import NameInput from './components/NameInput';
import ProgressBar from './components/ProgressBar';
import Question from './components/Question';
import Statistics from './components/Statistics';
import { questions } from './data/questions';
import { submitSurvey, getAllResponses } from './utils/storage';
import { exportToCSV } from './utils/export';
import { ADMIN_PASSWORD } from './firebase.config';

type AppState = 'name' | 'survey' | 'complete' | 'stats';

export default function App() {
  const [state, setState] = useState<AppState>('name');
  const [name, setName] = useState('');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const handleNameSubmit = (n: string) => {
    setName(n);
    setState('survey');
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQ].id]: value };
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Submit to Firebase
      submitSurvey({
        name,
        answers: newAnswers,
        timestamp: Date.now(),
      }).catch(console.error);
      setState('complete');
    }
  };

  const handleAdminClick = () => {
    setShowModal(true);
    setPassword('');
    setAuthError('');
  };

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setShowModal(false);
      setState('stats');
    } else {
      setAuthError('ACCESS DENIED - \u5bc6\u7801\u9519\u8bef');
    }
  };

  const handleExport = async () => {
    const responses = await getAllResponses();
    exportToCSV(responses);
  };

  return (
    <Terminal onAdminClick={handleAdminClick}>
      <AnimatePresence mode="wait">
        {state === 'name' && (
          <motion.div key="name" exit={{ opacity: 0 }}>
            <NameInput onSubmit={handleNameSubmit} />
          </motion.div>
        )}

        {state === 'survey' && (
          <motion.div key="survey" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-green-600 text-xs mb-2">
              用户: {name} | 会话已建立
            </div>
            <ProgressBar current={currentQ + 1} total={questions.length} />
            <Question
              question={questions[currentQ]}
              questionIndex={currentQ}
              onAnswer={handleAnswer}
            />
          </motion.div>
        )}

        {state === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="text-green-400 text-lg mb-4 text-glow">
              ✓ 调查完成
            </div>
            <div className="text-green-600 text-sm mb-6">
              感谢 {name} 的参与！你的回答已成功提交。
            </div>
            <div className="text-green-700 text-xs mb-4">
              ──────────────────────────────
            </div>
            <button
              onClick={() => setState('stats')}
              className="px-4 py-2 border border-green-700 text-green-400 hover:bg-green-900/30 transition-colors text-xs"
            >
              [查看实时统计]
            </button>
          </motion.div>
        )}

        {state === 'stats' && (
          <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setState('name')}
                className="text-green-700 hover:text-green-400 text-xs transition-colors"
              >
                {'<'} 返回
              </button>
              <button
                onClick={handleExport}
                className="px-3 py-1 border border-green-700 text-green-400 hover:bg-green-900/30 transition-colors text-xs"
              >
                [导出CSV]
              </button>
            </div>
            <Statistics />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Password Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#111] border border-green-700 p-6 rounded max-w-sm w-full mx-4"
          >
            <div className="text-green-500 text-xs mb-4">
              ╔═══ ADMIN ACCESS ═══╗
            </div>
            <form onSubmit={handleAdminAuth}>
              <div className="mb-3">
                <span className="text-green-600 text-xs">PASSWORD: </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  className="bg-transparent border-b border-green-700 outline-none text-green-300 text-sm w-full mt-1 px-1 py-0.5"
                />
              </div>
              {authError && (
                <div className="text-red-500 text-xs mb-2">{authError}</div>
              )}
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 text-green-700 hover:text-green-400 text-xs transition-colors"
                >
                  [CANCEL]
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 border border-green-700 text-green-400 hover:bg-green-900/30 text-xs transition-colors"
                >
                  [LOGIN]
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </Terminal>
  );
}
