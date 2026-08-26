/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { SplitScreen } from './components/SplitScreen';
import { useGameStore } from './store/gameStore';
import { levels } from './data/levels';

export default function App() {
  const { currentLevelIndex, code, setCode } = useGameStore();

  // Ensure code matches the persisted level on first load if it's somehow out of sync
  useEffect(() => {
    if (!code || code.trim() === '') {
      setCode(levels[currentLevelIndex].initialCode);
    }
  }, []);

  return <SplitScreen />;
}
