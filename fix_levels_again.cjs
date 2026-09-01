const fs = require('fs');
let content = fs.readFileSync('src/data/levels.ts', 'utf8');

// I will just remove the trailing newLevels that I accidentally appended, and put them where they belong.
// Actually, it's easier to just strip them out and insert them correctly.

// Delete from `  {\n    id: 100,` to the end of the file.
const badStart = content.indexOf('  {\n    id: 100,');
if (badStart !== -1) {
  content = content.substring(0, badStart);
}

// Ensure the `];` that was at the end of `gameLevels` is removed before appending new levels, then add it back.
// The array was actually `export const levels = [ ... ]` at the top? No, it was `export const levels: Level[] = [`
// Then `}];` closed the levels array. 
// Then `export const chapterTitles...`
// Let's just find `export const chapterTitles`
const chapterIndex = content.indexOf('export const chapterTitles');
if (chapterIndex !== -1) {
   // The array ends before this.
   const arrayEnd = content.lastIndexOf('  }', chapterIndex);
   // We want to insert the new levels right after `  }` and before `];`
   // Oh wait, the array ends with `  }\n];`
   
   const newLevels = `,
  {
    id: 100,
    chapter: 10,
    title: "ПРЕПЯТСТВИЯ",
    description: "СЮЖЕТ: На пути к цели обнаружены энергобарьеры. Дрон не может пройти сквозь них.\\n\\nТЕОРИЯ: Красные блоки — это препятствия. Твой код не должен пытаться пройти через них, иначе дрон остановится.\\n\\nЗАДАЧА: Проложи маршрут в обход красного препятствия к оранжевой цели.",
    initialCode: "# Проложи маршрут в обход\\nmove_down()\\n",
    startPosition: { x: 0, y: 0 },
    targetPosition: { x: 2, y: 2 },
    obstacles: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    character: { name: "ОПЕРАТОР", role: "Навигация", colorClass: "text-blue-400" }
  },
  {
    id: 101,
    chapter: 10,
    title: "ПОГРУЗКА",
    description: "СЮЖЕТ: Мы нашли синий модуль памяти! Нужно его подобрать и доставить на базу.\\n\\nТЕОРИЯ: Используй команду grab(), когда находишься на клетке с модулем. Синяя метка появится у дрона. Чтобы выгрузить, используй drop() на целевой клетке.\\n\\nЗАДАЧА: Дойти до модуля, взять его (grab), дойти до цели, сбросить (drop). Цель засчитается, если дрон на цели, и предмет у него, либо он его сбросил на цели (достаточно дойти с ним).",
    initialCode: "# Доберись до модуля, возьми и принеси на базу\\n",
    startPosition: { x: 0, y: 0 },
    targetPosition: { x: 4, y: 0 },
    pickables: [{ x: 2, y: 0 }],
    character: { name: "АРХИТЕКТОР", role: "Системный ИИ", colorClass: "text-amber-500" }
  }
`;

   content = content.substring(0, arrayEnd + 3) + newLevels + content.substring(arrayEnd + 3);
}

fs.writeFileSync('src/data/levels.ts', content);
