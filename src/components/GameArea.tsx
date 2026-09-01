import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ArrowRight, Menu, Bot, Target, Package, XSquare, Zap, BookOpen , HelpCircle, Moon, Sun} from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { levels } from '../data/levels';
import { clsx } from 'clsx';


const FormattedDescription = ({ text }: { text: string }) => {
  const parts = text.split(/(СЮЖЕТ:|ТЕОРИЯ:|ЗАДАЧА:|Пример:|Например:)/g);
  return (
    <>
      {parts.map((part, index) => {
        switch (part) {
          case 'СЮЖЕТ:':
            return <span key={index} className="text-fuchsia-400 font-bold bg-fuchsia-400/10 px-1.5 py-0.5 rounded mr-1">СЮЖЕТ:</span>;
          case 'ТЕОРИЯ:':
            return <span key={index} className="text-blue-400 font-bold bg-blue-400/10 px-1.5 py-0.5 rounded mr-1">ТЕОРИЯ:</span>;
          case 'ЗАДАЧА:':
            return <span key={index} className="text-emerald-400 font-bold bg-emerald-400/10 px-1.5 py-0.5 rounded mr-1">ЗАДАЧА:</span>;
          case 'Пример:':
          case 'Например:':
            return <span key={index} className="text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded mr-1">{part}</span>;
          default:
            return <span key={index}>{part}</span>;
        }
      })}
    </>
  );
};

export function GameArea() {
  const { currentLevelIndex, isSuccess, nextLevel, toggleLevelMenu, dronePosition, targetPosition, theme, toggleTheme } = useGameStore();
  const currentLevel = levels[currentLevelIndex];
  const gridArray = Array.from({ length: 64 }); // 8x8
  
  const { inventory, gridPickables } = useGameStore();
  const droneIndex = dronePosition.y * 8 + dronePosition.x;
  const targetIndex = targetPosition.y * 8 + targetPosition.x;
  const obstacles = currentLevel.obstacles || [];
  const teleports = currentLevel.teleports || [];

  const hasVisualizer = currentLevel.startPosition !== undefined;

  const successContent = (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <motion.div 
          key="success"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className={clsx(
            "z-20 flex flex-col items-center justify-center",
            hasVisualizer 
              ? "absolute inset-0 bg-black/60 backdrop-blur-sm" 
              : "w-full bg-slate-900/40 border border-slate-800 rounded-2xl mt-auto p-8 shrink-0 min-h-[250px] shadow-xl"
          )}
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
  );

  return (
    <div className="flex flex-col h-max min-h-full bg-[radial-gradient(circle_at_0%_0%,#f8fafc_0%,#e2e8f0_100%)] dark:bg-[radial-gradient(circle_at_0%_0%,#1e293b_0%,#020617_100%)] w-full p-4 sm:p-6 lg:p-10 relative">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="font-mono text-green-500 text-sm uppercase tracking-widest hidden sm:block">
          ГЛАВА {currentLevel.chapter} • Ур. {currentLevelIndex + 1}/{levels.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => useGameStore.getState().startOnboarding()}
            className="flex items-center gap-2 text-fuchsia-600 dark:text-fuchsia-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700 px-3 sm:px-4 py-2 rounded-lg font-mono text-sm uppercase border border-slate-300 dark:border-slate-700 shrink-0"
            title="Обучение"
          >
            <HelpCircle size={16} />
            <span className="hidden sm:inline">Обучение</span>
            <span className="sm:hidden">Об.</span>
          </button>
          <button
            id="tour-docs-btn"
            onClick={useGameStore.getState().toggleDocsMenu}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700 px-3 sm:px-4 py-2 rounded-lg font-mono text-sm uppercase border border-slate-300 dark:border-slate-700 shrink-0"
          >
            <BookOpen size={16} />
            <span className="hidden sm:inline">База Знаний</span>
            <span className="sm:hidden">БЗ</span>
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700 w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-700 shrink-0"
            title="Переключить тему"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={toggleLevelMenu}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700 px-3 sm:px-4 py-2 rounded-lg font-mono text-sm uppercase border border-slate-300 dark:border-slate-700 shrink-0"
          >
            <Menu size={16} />
            <span className="hidden sm:inline">Уровни</span>
            <span className="sm:hidden">Ур.</span>
          </button>
        </div>
      </div>

      <h1 className="text-2xl sm:text-[32px] font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent leading-tight shrink-0">
        {currentLevel.title}
      </h1>

      {/* Dialogue / Description */}
      <div id="tour-mission" className="bg-slate-900/80 border border-slate-300 dark:border-slate-700/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 text-slate-300 leading-relaxed text-sm sm:text-base relative overflow-hidden shadow-lg shrink-0">
        <div className={clsx("absolute top-0 left-0 w-1 h-full bg-current", currentLevel.character.colorClass)}></div>
        <div className="text-xs font-bold uppercase tracking-wider mb-3 text-slate-500 font-mono">
          ВХОДЯЩЕЕ СООБЩЕНИЕ: <span className={currentLevel.character.colorClass}>{currentLevel.character.name}</span> <span className="opacity-50">({currentLevel.character.role})</span>
        </div>
        <div className="text-slate-300 font-medium whitespace-pre-wrap leading-relaxed space-y-4">
          <FormattedDescription text={currentLevel.description} />
        </div>
        {currentLevel.docLink && (
          <div className="mt-4 pt-4 border-t border-slate-300 dark:border-slate-700/50 flex justify-end">
            <button 
              onClick={() => useGameStore.getState().openDocs(currentLevel.docLink)}
              className="flex items-center gap-2 text-blue-400 hover:text-white transition-colors bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-lg font-mono text-xs sm:text-sm uppercase border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
            >
              <BookOpen size={16} />
              <span>Открыть теорию по теме</span>
            </button>
          </div>
        )}
      </div>

      {/* Visualizer */}
      {hasVisualizer ? (
        <div id="tour-visualizer" className="flex-1 shrink-0 bg-slate-200 dark:bg-black rounded-2xl border-[3px] sm:border-4 border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] p-4 sm:p-6 min-h-[420px] sm:min-h-[540px]">
          
          {successContent}

          {/* Grid Pattern */}
          <div className="w-full max-w-[320px] sm:max-w-[400px] aspect-square grid grid-cols-8 grid-rows-8 gap-[1px] sm:gap-[2px] p-1.5 sm:p-2 bg-slate-300/50 dark:bg-slate-900/50 rounded-xl border border-slate-400 dark:border-slate-800 relative z-10 mx-auto">
            {gridArray.map((_, i) => {
              const x = i % 8;
              const y = Math.floor(i / 8);
              const isDrone = i === droneIndex;
              const isTarget = i === targetIndex;
              const isObstacle = obstacles.some(obs => obs.x === x && obs.y === y);
              const isTeleportFrom = teleports.some(t => t.from.x === x && t.from.y === y);
              const isTeleportTo = teleports.some(t => t.to.x === x && t.to.y === y);
              const isPickable = gridPickables.some(p => p.x === x && p.y === y);
              
              return (
                <div 
                  key={i} 
                  className={clsx(
                    "rounded-[2px] flex items-center justify-center relative transition-all duration-300",
                    isDrone ? "bg-green-500/20 dark:bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)] z-10" : "bg-slate-100 dark:bg-[#0c111c]",
                    isTarget && !isDrone && !isPickable ? "border-2 border-dashed border-amber-500/50 rounded-lg" : "",
                    isObstacle ? "bg-red-200 dark:bg-red-950 border border-red-400 dark:border-red-800" : ""
                  )}
                >
                  {isTarget && !isDrone && !isPickable && (
                    <Target size={24} className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] opacity-80" />
                  )}
                                    {isDrone && (
                    <motion.div
                      layoutId="drone"
                      className="absolute inset-0 flex items-center justify-center text-green-400 z-20"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <Bot size={24} className="sm:w-8 sm:h-8 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                      {inventory > 0 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full border-2 border-slate-900 shadow-[0_0_8px_rgba(59,130,246,1)]" />
                      )}
                    </motion.div>
                  )}
                  {isPickable && (
                    <Package size={20} className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] opacity-90" />
                  )}
                                  {isObstacle && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 flex items-center justify-center text-red-500">
                    <XSquare size={16} className="sm:w-5 sm:h-5 opacity-80" />
                  </motion.div>
                )}
                {isTeleportFrom && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 flex items-center justify-center text-fuchsia-400">
                    <Zap size={16} className="sm:w-5 sm:h-5 animate-pulse drop-shadow-[0_0_8px_rgba(232,121,249,0.8)]" />
                  </motion.div>
                )}
                {isTeleportTo && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 flex items-center justify-center text-fuchsia-400">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-fuchsia-400 animate-ping opacity-50" />
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
      ) : (
        successContent
      )}
      {/* Spacer for bottom padding when scrolling */}
      <div className="h-4 sm:h-10 shrink-0 w-full" />
    </div>
  );
}
