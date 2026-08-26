import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ArrowRight, Menu, Bot, Target } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { levels } from '../data/levels';
import { clsx } from 'clsx';

export function GameArea() {
  const { currentLevelIndex, isSuccess, nextLevel, toggleLevelMenu, dronePosition, targetPosition } = useGameStore();
  const currentLevel = levels[currentLevelIndex];
  const gridArray = Array.from({ length: 64 }); // 8x8

  const droneIndex = dronePosition.y * 8 + dronePosition.x;
  const targetIndex = targetPosition.y * 8 + targetPosition.x;

  return (
    <div className="flex flex-col h-full bg-[radial-gradient(circle_at_0%_0%,#1e293b_0%,#020617_100%)] flex-1 p-8 lg:p-10 relative border-r border-slate-700">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono text-green-500 text-sm uppercase tracking-widest">
          ГЛАВА {currentLevel.chapter} • Ур. {currentLevelIndex + 1}/{levels.length}
        </div>
        <button
          onClick={toggleLevelMenu}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-700 px-4 py-2 rounded-lg font-mono text-sm uppercase border border-slate-700"
        >
          <Menu size={16} />
          <span>Уровни</span>
        </button>
      </div>

      <h1 className="text-[32px] font-extrabold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
        {currentLevel.title}
      </h1>

      {/* Dialogue / Description */}
      <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-6 mb-8 text-slate-300 leading-relaxed text-base relative overflow-hidden shadow-lg">
        <div className={clsx("absolute top-0 left-0 w-1 h-full bg-current", currentLevel.character.colorClass)}></div>
        <div className="text-xs font-bold uppercase tracking-wider mb-3 text-slate-500 font-mono">
          ВХОДЯЩЕЕ СООБЩЕНИЕ: <span className={currentLevel.character.colorClass}>{currentLevel.character.name}</span> <span className="opacity-50">({currentLevel.character.role})</span>
        </div>
        <div className="text-slate-300 font-medium whitespace-pre-wrap">
          {currentLevel.description}
        </div>
      </div>

      {/* Visualizer */}
      <div className="flex-1 bg-black rounded-2xl border-4 border-slate-800 flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] p-6">
        
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div 
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4 shadow-inner text-green-500">
                <Trophy size={40} />
              </div>
              <h3 className="text-2xl font-bold text-green-500 mb-2">Задача выполнена!</h3>
              
              {currentLevelIndex < levels.length - 1 ? (
                <button
                  onClick={nextLevel}
                  className="mt-6 flex items-center px-8 py-4 bg-green-500 text-black rounded-xl font-bold text-lg hover:bg-green-400 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                >
                  СЛЕДУЮЩИЙ УРОВЕНЬ
                  <ArrowRight className="ml-2" size={24} />
                </button>
              ) : (
                <div className="mt-6 px-8 py-4 text-xl font-bold text-black bg-green-500 rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                  СИСТЕМА ПОЛНОСТЬЮ ВОССТАНОВЛЕНА 🎉
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Grid Pattern */}
        <div className="w-full max-w-[400px] aspect-square grid grid-cols-8 grid-rows-8 gap-[2px] p-2 bg-slate-900/50 rounded-xl border border-slate-800 relative z-10 mx-auto">
          {gridArray.map((_, i) => {
            const isDrone = i === droneIndex;
            const isTarget = i === targetIndex;
            
            return (
              <div 
                key={i} 
                className={clsx(
                  "rounded-[2px] flex items-center justify-center relative transition-all duration-300",
                  isDrone ? "bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)] z-10" : "bg-[#0c111c]",
                  isTarget && !isDrone ? "border-2 border-dashed border-amber-500/50 rounded-lg" : ""
                )}
              >
                {isTarget && !isDrone && (
                  <Target size={24} className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] opacity-80" />
                )}
                {isDrone && (
                  <motion.div
                    layoutId="drone"
                    className="absolute inset-0 flex items-center justify-center"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Bot size={32} className="text-green-400 drop-shadow-[0_0_12px_rgba(74,222,128,1)] z-20" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 text-slate-600 font-mono text-sm uppercase tracking-widest text-center">
          Визуализатор пространства (8x8)
        </div>
      </div>
    </div>
  );
}
