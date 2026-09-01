import { useState, useEffect } from 'react';
import { Joyride as JoyrideComponent, Step, TooltipRenderProps, STATUS, CallBackProps } from 'react-joyride';
import { Terminal, Map, BookOpen, Bot, CheckCircle2, ChevronRight, ChevronLeft, Zap, Play } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { clsx } from 'clsx';
import { motion } from 'motion/react';

// Custom icons and colors for each step based on our theme
const stepMeta: Record<number, { icon: JSX.Element; color: string; bgGradient: string }> = {
  0: {
    icon: <Bot size={40} className="text-green-400" />,
    color: "border-green-500/50 shadow-[0_0_40px_rgba(34,197,94,0.15)]",
    bgGradient: "from-green-500/20 to-transparent"
  },
  1: {
    icon: <Map size={40} className="text-blue-400" />,
    color: "border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.15)]",
    bgGradient: "from-blue-500/20 to-transparent"
  },
  2: {
    icon: <Zap size={40} className="text-fuchsia-400" />,
    color: "border-fuchsia-500/50 shadow-[0_0_40px_rgba(232,121,249,0.15)]",
    bgGradient: "from-fuchsia-500/20 to-transparent"
  },
  3: {
    icon: <BookOpen size={40} className="text-purple-400" />,
    color: "border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.15)]",
    bgGradient: "from-purple-500/20 to-transparent"
  },
  4: {
    icon: <Terminal size={40} className="text-amber-400" />,
    color: "border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.15)]",
    bgGradient: "from-amber-500/20 to-transparent"
  },
  5: {
    icon: <Play size={40} className="text-emerald-400" />,
    color: "border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.15)]",
    bgGradient: "from-emerald-500/20 to-transparent"
  },
};

const CustomTooltip = (props: TooltipRenderProps) => {
  const {
    continuous,
    index,
    isLastStep,
    step,
    backProps,
    primaryProps,
    tooltipProps,
    size
  } = props;

  const meta = stepMeta[index] || stepMeta[0];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      {...tooltipProps} 
      className={clsx(
        "w-full max-w-[400px] bg-white dark:bg-slate-900 border-slate-200 dark:border-transparent border-2 rounded-2xl p-5 flex flex-col relative overflow-hidden",
        meta.color
      )}
    >
      {/* Background gradient */}
      <div className={clsx("absolute inset-0 bg-gradient-to-b opacity-40 pointer-events-none rounded-2xl", meta.bgGradient)} />
      
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-slate-100 dark:bg-slate-950 p-3 rounded-full shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] shrink-0">
            {meta.icon}
          </div>
          {step.title && (
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {step.title}
            </h2>
          )}
        </div>
        <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          {step.content}
        </div>
      </div>

      {/* Footer controls */}
      <div className="relative z-10 mt-auto pt-4 border-t border-slate-200 dark:border-slate-700/50 flex items-center justify-between">
        <div className="text-slate-400 dark:text-slate-500 font-mono text-xs font-bold tracking-widest flex items-center gap-1.5">
          {Array.from({ length: size }).map((_, i) => (
            <div 
              key={i} 
              className={clsx(
                "w-1.5 h-1.5 rounded-full transition-all duration-300", 
                i === index ? "w-4 bg-slate-900 dark:bg-white" : "bg-slate-300 dark:bg-slate-600"
              )} 
            />
          ))}
        </div>
        <div className="flex gap-2">
          {index > 0 && (
            <button 
              {...backProps}
              className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <button 
            {...primaryProps}
            className={clsx(
              "flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-white transition-all shadow-lg active:scale-95 text-sm",
              isLastStep 
                ? "bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20" 
                : "bg-blue-500 hover:bg-blue-400 shadow-blue-500/20"
            )}
          >
            {isLastStep ? "НАЧАТЬ" : "ДАЛЕЕ"}
            {!isLastStep && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export function Onboarding() {
  const { hasSeenOnboarding, completeOnboarding, onboardingKey, theme } = useGameStore();
  const [run, setRun] = useState(false);

  useEffect(() => {
    // Small delay to ensure all DOM elements are mounted before starting tour
    if (!hasSeenOnboarding) {
      setRun(false);
      const timer = setTimeout(() => setRun(true), 500);
      return () => clearTimeout(timer);
    } else {
      setRun(false);
    }
  }, [hasSeenOnboarding, onboardingKey]);

  const steps: Step[] = [
    {
      target: 'body',
      placement: 'center',
      title: 'ДОБРО ПОЖАЛОВАТЬ',
      content: 'Ты — Оператор. Твоя задача — восстановить систему дронов-ремонтников, программируя их на Python. Пройди этот короткий инструктаж, чтобы узнать интерфейс базы.',
      disableBeacon: true,
    },
    {
      target: '#tour-mission',
      title: 'ПАНЕЛЬ ЗАДАЧИ',
      content: 'Здесь отображается сюжетное сообщение, полезная теория для текущего уровня и конкретная задача, которую нужно решить.',
      placement: 'right',
      disableBeacon: true,
    },
    {
      target: '#tour-visualizer',
      title: 'ВИЗУАЛИЗАТОР ПРОСТРАНСТВА',
      content: 'Это сетка радара (8x8). Зеленая точка — твой дрон, а оранжевая цель — место, куда нужно попасть или объект для взаимодействия.',
      placement: 'right',
      disableBeacon: true,
    },
    {
      target: '#tour-docs-btn',
      title: 'БАЗА ЗНАНИЙ',
      content: 'Забыл команду или синтаксис? В любой момент открывай Базу Знаний. В ней собрана вся необходимая теория по Python.',
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '#tour-editor',
      title: 'РЕДАКТОР КОДА',
      content: 'Твой рабочий терминал. Здесь ты пишешь настоящий код на Python. Доступные команды для дрона всегда указаны в описании миссии слева.',
      placement: 'left',
      disableBeacon: true,
    },
    {
      target: '#tour-run-btn',
      title: 'ЗАПУСК ПРОГРАММЫ',
      content: 'Когда код написан, жми эту кнопку. Дрон начнет выполнять твои команды по очереди. Если ошибся — исправь код и запусти снова. Удачи!',
      placement: 'top',
      disableBeacon: true,
    }
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status) || action === "close") {
      setRun(false);
      setTimeout(() => {
        completeOnboarding();
      }, 400); // give Joyride time to clean up overlays
    }
  };

  

  return (
    <JoyrideComponent
      key={onboardingKey}
      steps={steps}
      run={run}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      disableScrolling
      callback={handleJoyrideCallback}
      tooltipComponent={CustomTooltip}
      floaterProps={{
        disableAnimation: true // We use Framer Motion inside our custom tooltip
      }}
      options={{
        zIndex: 10000,
        overlayColor: 'rgba(0, 0, 0, 0.85)',
        arrowColor: theme === 'dark' ? '#0f172a' : '#ffffff',
        primaryColor: theme === 'dark' ? '#ffffff' : '#0f172a',
      }}
      styles={{
        beacon: {
          filter: theme === 'dark' ? 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))' : 'none',
        },
        beaconInner: {
          backgroundColor: theme === 'dark' ? '#ffffff' : '#0f172a',
          boxShadow: theme === 'dark' ? '0 0 10px rgba(255, 255, 255, 0.9)' : 'none',
        },
        beaconOuter: {
          borderColor: theme === 'dark' ? '#ffffff' : '#0f172a',
          backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.35)' : 'rgba(15, 23, 42, 0.2)',
          boxShadow: theme === 'dark' ? '0 0 14px rgba(255, 255, 255, 0.6)' : 'none',
        },
      }}
    />
  );
}
