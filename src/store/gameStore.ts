import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { levels } from '../data/levels';

interface GameState {
  currentLevelIndex: number;
  maxUnlockedLevel: number;
  isLevelMenuOpen: boolean;
  code: string;
  output: string;
  isSuccess: boolean;
  isRunning: boolean;
  isAnimating: boolean;
  error: string | null;
  dronePosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
  setCode: (code: string) => void;
  setOutput: (output: string) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  setIsRunning: (isRunning: boolean) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  setError: (error: string | null) => void;
  setDronePosition: (x: number, y: number) => void;
  setTargetPosition: (x: number, y: number) => void;
  nextLevel: () => void;
  resetLevel: () => void;
  goToLevel: (index: number) => void;
  toggleLevelMenu: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      currentLevelIndex: 0,
      maxUnlockedLevel: 0,
      isLevelMenuOpen: false,
      code: levels[0].initialCode,
      output: '',
      isSuccess: false,
      isRunning: false,
      isAnimating: false,
      error: null,
      dronePosition: { x: levels[0].startPosition?.x ?? 0, y: levels[0].startPosition?.y ?? 0 },
      targetPosition: { x: levels[0].targetPosition?.x ?? 7, y: levels[0].targetPosition?.y ?? 7 },

      setCode: (code) => set({ code }),
      setOutput: (output) => set({ output }),
      setIsSuccess: (isSuccess) => {
        set({ isSuccess });
        if (isSuccess) {
          const { currentLevelIndex, maxUnlockedLevel } = get();
          if (currentLevelIndex >= maxUnlockedLevel && currentLevelIndex < levels.length - 1) {
            set({ maxUnlockedLevel: currentLevelIndex + 1 });
          }
        }
      },
      setIsRunning: (isRunning) => set({ isRunning }),
      setIsAnimating: (isAnimating) => set({ isAnimating }),
      setError: (error) => set({ error }),
      setDronePosition: (x, y) => set({ dronePosition: { x, y } }),
      setTargetPosition: (x, y) => set({ targetPosition: { x, y } }),

      nextLevel: () => {
        const { currentLevelIndex } = get();
        if (currentLevelIndex < levels.length - 1) {
          const nextIndex = currentLevelIndex + 1;
          set({
            currentLevelIndex: nextIndex,
            code: levels[nextIndex].initialCode,
            output: '',
            isSuccess: false,
            error: null,
            dronePosition: { x: levels[nextIndex].startPosition?.x ?? 0, y: levels[nextIndex].startPosition?.y ?? 0 },
            targetPosition: { x: levels[nextIndex].targetPosition?.x ?? 7, y: levels[nextIndex].targetPosition?.y ?? 7 },
          });
        }
      },

      resetLevel: () => {
        const { currentLevelIndex } = get();
        set({
          code: levels[currentLevelIndex].initialCode,
          output: '',
          isSuccess: false,
          error: null,
          dronePosition: { x: levels[currentLevelIndex].startPosition?.x ?? 0, y: levels[currentLevelIndex].startPosition?.y ?? 0 },
          targetPosition: { x: levels[currentLevelIndex].targetPosition?.x ?? 7, y: levels[currentLevelIndex].targetPosition?.y ?? 7 },
        });
      },

      goToLevel: (index: number) => {
         if (index >= 0 && index < levels.length) {
            set((state) => ({
              currentLevelIndex: index,
              maxUnlockedLevel: Math.max(state.maxUnlockedLevel, index),
              code: levels[index].initialCode,
              output: '',
              isSuccess: false,
              error: null,
              isLevelMenuOpen: false,
              dronePosition: { x: levels[index].startPosition?.x ?? 0, y: levels[index].startPosition?.y ?? 0 },
              targetPosition: { x: levels[index].targetPosition?.x ?? 7, y: levels[index].targetPosition?.y ?? 7 },
            }));
         }
      },

      toggleLevelMenu: () => {
         set((state) => ({ isLevelMenuOpen: !state.isLevelMenuOpen }));
      }
    }),
    {
      name: 'python-game-storage',
      partialize: (state) => ({ 
        currentLevelIndex: state.currentLevelIndex,
        maxUnlockedLevel: state.maxUnlockedLevel,
        code: state.code
      }),
    }
  )
);
