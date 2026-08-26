import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { RotateCcw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { usePython } from '../hooks/usePython';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function MacOSConsole() {
  const { code, setCode, output, error, isRunning, isAnimating, isSuccess, resetLevel } = useGameStore();
  const { runCode } = usePython();

  const isExecuting = isRunning || isAnimating;

  return (
    <div className="flex flex-col flex-1 gap-4 lg:gap-[20px] h-full">
      <div className="flex flex-col flex-1 bg-black rounded-[10px] overflow-hidden border border-slate-700 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] relative">
        {/* Mac OS Header */}
        <div className="flex items-center px-[10px] sm:px-[15px] py-[8px] sm:py-[10px] bg-[#27272a] border-b border-[#3f3f46] justify-between">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="text-xs font-mono text-[#a1a1aa]">
            main.py — python3.11
          </div>
          <div className="flex space-x-2">
            <button
              onClick={resetLevel}
              disabled={isExecuting}
              className={cn("text-[#a1a1aa] transition-colors hover:text-white", isExecuting && "opacity-50 cursor-not-allowed")}
              title="Сбросить код"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-[1.5] overflow-auto bg-[#09090b] text-sm font-mono text-[#e2e8f0]">
          <CodeMirror
            value={code}
            height="100%"
            theme="dark"
            extensions={[python()]}
            onChange={(value) => setCode(value)}
            className="h-full [&_.cm-gutters]:bg-[#09090b] [&_.cm-gutters]:border-none [&_.cm-gutters]:text-[#3f3f46] [&_.cm-activeLineGutter]:bg-transparent [&_.cm-activeLineGutter]:text-slate-300 [&_.cm-activeLine]:bg-white/5"
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: true,
              foldGutter: false,
            }}
          />
        </div>

        {/* Terminal Output */}
        <div className="flex-1 bg-slate-950 border-t border-slate-700 p-[10px] sm:p-[15px] font-mono text-[12px] sm:text-[13px] text-[#a1a1aa] overflow-y-auto">
          <div className="text-slate-500 mb-2">$ python3 main.py</div>
          {output && (
            <pre className={cn("whitespace-pre-wrap", isSuccess ? "text-green-500" : "text-[#e2e8f0]")}>
              {output}
            </pre>
          )}
          {error && (
            <pre className="whitespace-pre-wrap text-red-500">
              {error}
            </pre>
          )}
          {!output && !error && (
            <div className="text-slate-600">Ожидание выполнения кода...</div>
          )}
          {(output || error) && (
            <div className="mt-[10px] text-white">
              &gt;&gt;&gt; <span className="animate-pulse">_</span>
            </div>
          )}
        </div>

        {/* Run Button positioned over the container */}
        <button
          onClick={runCode}
          disabled={isExecuting}
          className={cn(
            "absolute bottom-4 sm:bottom-5 right-4 sm:right-5 flex items-center px-4 py-2 sm:px-[28px] sm:py-[14px] rounded-lg font-extrabold text-[12px] sm:text-[14px] transition-all border-none outline-none z-10",
            isExecuting
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-green-500 text-black hover:bg-green-400 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          )}
        >
          {isExecuting ? (
            <span className="flex items-center">
              <div className="w-4 h-4 mr-2 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ВЫПОЛНЕНИЕ...
            </span>
          ) : (
            <>
              ▶ RUN CODE
            </>
          )}
        </button>
      </div>

      {/* Status bar */}
      <div className="py-2 px-5 bg-slate-900 border-t border-slate-800 flex justify-between text-[11px] text-slate-500 font-mono items-center">
        <div>Pyodide v0.27.2 | Worker ID: #8821</div>
        <div className="text-green-500 font-bold">● WORKER_READY</div>
      </div>
    </div>
  );
}
