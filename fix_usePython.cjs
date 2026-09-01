const fs = require('fs');
let content = fs.readFileSync('src/hooks/usePython.ts', 'utf8');

const regex = /const { targetPosition } = useGameStore\.getState\(\);\n    const currentLevel = levels\[currentLevelIndex\];\n    let passed = true;/;
content = content.replace(regex, "const { targetPosition } = useGameStore.getState();\n    let passed = true;");

fs.writeFileSync('src/hooks/usePython.ts', content);
