import { useRef, useCallback, useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { levels } from '../data/levels';

export function usePython() {
  const workerRef = useRef<Worker | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const commandsRef = useRef<string[]>([]);
  
  const { 
    code, 
    currentLevelIndex, 
    setOutput, 
    setError, 
    setIsRunning, 
    setIsSuccess,
    setIsAnimating,
    setDronePosition,
    dronePosition,
    inventory,
    gridPickables,
    setInventory,
    setGridPickables,
    targetPosition
  } = useGameStore();

  const initWorker = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
    }
    workerRef.current = new Worker(new URL('../workers/pythonWorker.ts', import.meta.url));
  }, []);

  useEffect(() => {
    initWorker();
    return () => {
      workerRef.current?.terminate();
    };
  }, [initWorker]);

  const playAnimationQueue = useCallback(async (commands: string[], actualOutput: string) => {
    setIsAnimating(true);
    let currentX = useGameStore.getState().dronePosition.x;
    let currentY = useGameStore.getState().dronePosition.y;
    let currentInventory = useGameStore.getState().inventory;
    let currentGridPickables = [...useGameStore.getState().gridPickables];
    const currentLevel = levels[currentLevelIndex];
    const obstacles = currentLevel.obstacles || [];

    
    for (const cmd of commands) {
      await new Promise(r => setTimeout(r, 400));
      let nextX = currentX;
      let nextY = currentY;
      
      if (cmd === 'MOVE_UP' && currentY > 0) nextY -= 1;
      else if (cmd === 'MOVE_DOWN' && currentY < 7) nextY += 1;
      else if (cmd === 'MOVE_LEFT' && currentX > 0) nextX -= 1;
      else if (cmd === 'MOVE_RIGHT' && currentX < 7) nextX += 1;
      
      if (cmd === 'GRAB') {
        const itemIndex = currentGridPickables.findIndex(p => p.x === currentX && p.y === currentY);
        if (itemIndex !== -1) {
          currentGridPickables.splice(itemIndex, 1);
          currentInventory += 1;
          useGameStore.getState().setGridPickables(currentGridPickables);
          useGameStore.getState().setInventory(currentInventory);
        }
      } else if (cmd === 'DROP') {
        if (currentInventory > 0) {
          currentInventory -= 1;
          currentGridPickables.push({x: currentX, y: currentY});
          useGameStore.getState().setGridPickables(currentGridPickables);
          useGameStore.getState().setInventory(currentInventory);
        }
      }
      
            // Check for obstacles
      if (!obstacles.some(obs => obs.x === nextX && obs.y === nextY)) {
        currentX = nextX;
        currentY = nextY;
      }
      
      const teleports = currentLevel.teleports || [];
      const teleport = teleports.find(t => t.from.x === currentX && t.from.y === currentY);
      if (teleport) {
        currentX = teleport.to.x;
        currentY = teleport.to.y;
      }
      
      setDronePosition(currentX, currentY);
    }

    await new Promise(r => setTimeout(r, 400)); // wait a bit after moving

    const { targetPosition } = useGameStore.getState();
    let passed = true;

    if (currentLevel.expectedStdout !== undefined) {
      if (actualOutput !== currentLevel.expectedStdout) {
        passed = false;
        setError(`Ожидался вывод:\n${currentLevel.expectedStdout}\nПолучено:\n${actualOutput}`);
      }
    }

    if (passed) {
      if (currentX === targetPosition.x && currentY === targetPosition.y) {
        if (currentLevel.pickables && currentLevel.pickables.length > 0) {
          const totalItems = currentInventory + currentGridPickables.filter(p => p.x === targetPosition.x && p.y === targetPosition.y).length;
          if (totalItems >= currentLevel.pickables.length) {
            setIsSuccess(true);
          } else {
            setError("Цель достигнута, но груз не доставлен! Используй grab().");
          }
        } else {
          setIsSuccess(true);
        }
      } else if (commands.length > 0 || currentLevel.startPosition) {
        setError("Цель не достигнута. Проверьте координаты.");
      } else {
        // Fallback for levels with no movement involved
        setIsSuccess(true);
      }
    }

    setIsAnimating(false);
  }, [currentLevelIndex, setDronePosition, setError, setIsAnimating, setIsSuccess]);

  const runCode = useCallback(() => {
    if (!workerRef.current) return;

    setIsRunning(true);
    setOutput('');
    setError(null);
    setIsSuccess(false);
    commandsRef.current = [];

    const id = Date.now().toString();

    const handleMessage = (event: MessageEvent) => {
      if (event.data.id === id) {
        if (event.data.type === 'COMMAND') {
          commandsRef.current.push(event.data.action);
          return; // Continue waiting for worker to finish
        }

        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        if (event.data.type === 'success') {
          const actualOutput = event.data.stdout;
          setOutput(actualOutput);
          // Only start animations after Python worker finished calculating everything
          playAnimationQueue(commandsRef.current, actualOutput);
        } else if (event.data.type === 'error' || event.data.type === 'validation_error') {
          setError(event.data.error);
        }
        
        setIsRunning(false);
        workerRef.current?.removeEventListener('message', handleMessage);
      }
    };

    workerRef.current.addEventListener('message', handleMessage);

    // Timeout mechanism (5 seconds)
    timeoutRef.current = window.setTimeout(() => {
      workerRef.current?.terminate();
      initWorker(); // recreate worker
      setError("TimeoutError: Время выполнения превысило 5 секунд. Возможно, бесконечный цикл.");
      setIsRunning(false);
    }, 5000);

    // Reset drone position to start before running code
    setDronePosition(levels[currentLevelIndex].startPosition?.x ?? 0, levels[currentLevelIndex].startPosition?.y ?? 0);
    setInventory(0);
    setGridPickables(levels[currentLevelIndex].pickables ? [...levels[currentLevelIndex].pickables] : []);
    
    workerRef.current.postMessage({ 
      id, 
      code, 
      testCode: levels[currentLevelIndex].testCode,
      env: {
        droneX: levels[currentLevelIndex].startPosition?.x ?? 0,
        droneY: levels[currentLevelIndex].startPosition?.y ?? 0,
        targetX: levels[currentLevelIndex].targetPosition?.x ?? 7,
        targetY: levels[currentLevelIndex].targetPosition?.y ?? 7,
        obstacles: levels[currentLevelIndex].obstacles || [],
        teleports: levels[currentLevelIndex].teleports || [],
      }
    });
  }, [code, currentLevelIndex, initWorker, setError, setIsRunning, setIsSuccess, setOutput, playAnimationQueue, setDronePosition]);

  return { runCode };
}
