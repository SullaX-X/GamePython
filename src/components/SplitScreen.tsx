import { GameArea } from './GameArea';
import { MacOSConsole } from './MacOSConsole';
import { LevelSelector } from './LevelSelector';

export function SplitScreen() {
  return (
    <div className="h-screen w-screen bg-slate-950 p-0 m-0 flex overflow-hidden font-sans text-slate-50 relative">
      <div className="w-full h-full flex flex-col lg:flex-row border border-slate-700">
        <div className="w-full lg:flex-[1.2] flex flex-col h-[50vh] lg:h-full overflow-y-auto">
          <GameArea />
        </div>
        <div className="w-full lg:flex-1 flex flex-col p-[20px] bg-slate-950 h-[50vh] lg:h-full">
          <MacOSConsole />
        </div>
      </div>
      <LevelSelector />
    </div>
  );
}
