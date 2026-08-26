import { GameArea } from './GameArea';
import { MacOSConsole } from './MacOSConsole';
import { LevelSelector } from './LevelSelector';

export function SplitScreen() {
  return (
    <div className="min-h-screen w-full bg-slate-950 p-0 m-0 flex lg:h-screen lg:overflow-hidden font-sans text-slate-50 relative">
      <div className="w-full flex flex-col lg:flex-row flex-1">
        <div className="w-full lg:flex-[1.2] flex flex-col lg:h-full lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-slate-700">
          <GameArea />
        </div>
        <div className="w-full lg:flex-1 flex flex-col p-4 sm:p-6 lg:p-[20px] bg-slate-950 h-[80vh] lg:h-full">
          <MacOSConsole />
        </div>
      </div>
      <LevelSelector />
    </div>
  );
}
