import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, CheckCircle2 } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { levels, chapterTitles } from '../data/levels';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function LevelSelector() {
  const { isLevelMenuOpen, toggleLevelMenu, currentLevelIndex, maxUnlockedLevel, goToLevel } = useGameStore();

  // Group levels by chapter
  const chapters = levels.reduce((acc, level, idx) => {
    const chapter = level.chapter;
    if (!acc[chapter]) {
      const titleName = chapterTitles[chapter] ? `: ${chapterTitles[chapter]}` : '';
      acc[chapter] = { title: `ГЛАВА ${chapter}${titleName}`, levels: [] };
    }
    acc[chapter].levels.push({ ...level, globalIndex: idx });
    return acc;
  }, {} as Record<number, { title: string, levels: any[] }>);

  return (
    <AnimatePresence>
      {isLevelMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950 shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Выбор уровня</h2>
                <p className="text-slate-400 font-mono text-sm">Прогресс системы: {Math.round((maxUnlockedLevel / (levels.length - 1)) * 100)}%</p>
              </div>
              <button onClick={toggleLevelMenu} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-8 custom-scrollbar">
              {Object.entries(chapters).map(([chapterId, chapterData]) => (
                <div key={chapterId} className="space-y-4">
                  <h3 className="text-sm font-mono font-bold text-slate-500 border-b border-slate-800 pb-2 uppercase tracking-widest">
                    {chapterData.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {chapterData.levels.map((level) => {
                      const idx = level.globalIndex;
                      const isUnlocked = true; // Unlocked for testing/access
                      const isCompleted = idx <= maxUnlockedLevel && idx !== levels.length - 1; // Optional visual indicator
                      const isActive = idx === currentLevelIndex;

                      return (
                        <button
                          key={level.id}
                          onClick={() => goToLevel(idx)}
                          className={twMerge(
                            clsx(
                              "flex items-center justify-between p-4 rounded-xl border text-left transition-all relative overflow-hidden group",
                              isUnlocked ? "hover:border-green-500/50 hover:bg-slate-800 cursor-pointer" : "opacity-50 cursor-not-allowed",
                              isActive ? "border-green-500 bg-green-500/10" : "border-slate-800 bg-slate-900/50"
                            )
                          )}
                        >
                          <div className="flex flex-col gap-1 pr-4">
                            <span className={clsx("text-sm font-bold", isUnlocked ? "text-white" : "text-slate-400")}>
                              {idx + 1}. {level.title}
                            </span>
                          </div>
                          <div className="shrink-0 relative flex items-center justify-center">
                            {!isUnlocked && <Lock size={18} className="text-slate-600" />}
                            {isUnlocked && idx < maxUnlockedLevel && !isActive && <CheckCircle2 size={18} className="text-green-500" />}
                            {isActive && (
                               <div className="relative flex items-center justify-center">
                                 <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,1)] animate-pulse"></div>
                               </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
