export interface Position {
  x: number;
  y: number;
}

export interface Character {
  name: string;
  role: string;
  colorClass: string;
}

export interface Level {
  id: number;
  chapter: number;
  title: string;
  description: string;
  initialCode: string;
  docLink?: string;
  startPosition?: Position;
  targetPosition?: Position;
  obstacles?: Position[];
  teleports?: { from: Position; to: Position }[];
  expectedStdout?: string;
  character: Character;
}

export const chapterTitles: Record<number, string> = {
  "1": "ВВЕДЕНИЕ И ДВИЖЕНИЕ",
  "2": "ТИПЫ ДАННЫХ И МАТЕМАТИКА",
  "3": "СТРОКИ И ТЕКСТ",
  "4": "УСЛОВИЯ И СЕНСОРЫ",
  "5": "ЦИКЛЫ",
  "6": "СПИСКИ И КОРТЕЖИ",
  "7": "СЛОВАРИ И МНОЖЕСТВА",
  "8": "ФУНКЦИИ И АБСТРАКЦИИ",
  "9": "ООП И ПРОДВИНУТЫЕ КОНЦЕПЦИИ",
  "10": "ГЛУБОКИЙ PYTHON"
};

export const levels: Level[] = [
  {
    "id": 1,
    "chapter": 1,
    "docLink": "api",
    "title": "ПРОТОКОЛ ДВИЖЕНИЯ",
    "description": "СЮЖЕТ: Дрон-ремонтник был поврежден и забыл базовые команды навигации.\n\nТЕОРИЯ: Открой «Базу Знаний» (кнопка сверху) и прочитай раздел «0. API Дрона». Там описаны функции move_right() и move_down().\n\nЗАДАЧА: Перемести дрона вправо на 1 клетку, чтобы достичь целевой платформы.",
    "initialCode": "# Допиши команду движения вправо\n",
    "startPosition": {
      "x": 1,
      "y": 1
    },
    "targetPosition": {
      "x": 2,
      "y": 1
    },
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 2,
    "chapter": 1,
    "docLink": "api",
    "title": "ВЕРТИКАЛЬНАЯ ТЯГА",
    "description": "СЮЖЕТ: Дрон умеет двигаться не только по горизонтали.\n\nТЕОРИЯ: В API дрона есть move_down() и move_up().\n\nЗАДАЧА: Перемести дрона на 2 клетки вниз.",
    "initialCode": "# Двигайся вниз на 2 клетки\n",
    "startPosition": {
      "x": 2,
      "y": 1
    },
    "targetPosition": {
      "x": 2,
      "y": 3
    },
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 3,
    "chapter": 1,
    "docLink": "api",
    "title": "ДИАГОНАЛЬНЫЙ МАРШРУТ",
    "description": "СЮЖЕТ: Цель находится по диагонали. Дрон не может летать по диагонали напрямую, нужно строить маршрут лесенкой.\n\nЗАДАЧА: Двигайся вправо, затем вниз, затем снова вправо, чтобы добраться до цели.",
    "initialCode": "move_right()\n# Допиши маршрут до цели (3, 3)\n",
    "startPosition": {
      "x": 1,
      "y": 1
    },
    "targetPosition": {
      "x": 3,
      "y": 3
    },
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 4,
    "chapter": 1,
    "docLink": "api",
    "title": "ДЛИННЫЙ ПУТЬ",
    "description": "СЮЖЕТ: Цель далеко. Не пиши move_right() пять раз, передай аргумент steps!\n\nТЕОРИЯ: Функция move_right(steps) принимает количество шагов. Например: move_right(3).\n\nЗАДАЧА: Дойди до цели за 2 строчки кода.",
    "initialCode": "# Используй аргументы (steps) для быстрого движения\n",
    "startPosition": {
      "x": 1,
      "y": 1
    },
    "targetPosition": {
      "x": 6,
      "y": 5
    },
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 5,
    "chapter": 1,
    "docLink": "api",
    "title": "[ИГРА] ЛАБИРИНТ БАЗЫ",
    "description": "СЮЖЕТ: Сектор заблокирован обломками. Тебе нужно построить точный маршрут в обход стен.\n\nЗАДАЧА: Доберись до оранжевой платформы, не задев красные преграды. Комбинируй направления и аргументы шагов.",
    "initialCode": "# Построй сложный маршрут\nmove_down(2)\n",
    "startPosition": {
      "x": 1,
      "y": 1
    },
    "targetPosition": {
      "x": 6,
      "y": 6
    },
    "obstacles": [
      {
        "x": 1,
        "y": 3
      },
      {
        "x": 2,
        "y": 3
      },
      {
        "x": 3,
        "y": 3
      },
      {
        "x": 3,
        "y": 2
      },
      {
        "x": 3,
        "y": 1
      },
      {
        "x": 5,
        "y": 6
      },
      {
        "x": 5,
        "y": 5
      },
      {
        "x": 5,
        "y": 4
      }
    ],
    "character": {
      "name": "СИСТЕМА",
      "role": "Контроль доступа",
      "colorClass": "text-red-500"
    }
  },
  {
    "id": 6,
    "chapter": 2,
    "docLink": "vars",
    "title": "ИНИЦИАЛИЗАЦИЯ ПАМЯТИ",
    "description": "СЮЖЕТ: Сенсоры отключены. Нужно записать калибровочные данные в оперативную память терминала.\n\nТЕОРИЯ: Изучи раздел «1. Переменные и Типы» в Базе Знаний.\n\nЗАДАЧА: Создай переменную `modules` и присвой ей целое число `5`. Выведи её с помощью `print(modules)`.",
    "initialCode": "# Создай переменную modules и выведи её\n",
    "expectedStdout": "5\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 7,
    "chapter": 2,
    "docLink": "vars",
    "title": "ПЕРЕЗАПИСЬ ДАННЫХ",
    "description": "СЮЖЕТ: Значения переменных можно менять в процессе работы.\n\nЗАДАЧА: Переменная status равна 'OFFLINE'. Измени её значение на 'ONLINE' и выведи на экран.",
    "initialCode": "status = 'OFFLINE'\n# Измени статус и выведи\n",
    "expectedStdout": "ONLINE\n",
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 8,
    "chapter": 2,
    "docLink": "math",
    "title": "СИЛА ТОКА",
    "description": "СЮЖЕТ: Чтобы включить генератор, нужно рассчитать требуемую мощность.\n\nТЕОРИЯ: Раздел «3. Математика». Используй оператор умножения `*`.\n\nЗАДАЧА: Вычисли напряжение (220) умноженное на силу тока (15) и выведи результат.",
    "initialCode": "voltage = 220\ncurrent = 15\n# Выведи мощность (voltage * current)\n",
    "expectedStdout": "3300\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 9,
    "chapter": 2,
    "docLink": "math",
    "title": "ОСТАТОЧНАЯ ЭНЕРГИЯ",
    "description": "СЮЖЕТ: Энергоблок работает нестабильно. Нужно рассчитать остаток.\n\nТЕОРИЯ: Раздел «3. Математика». Оператор `%` возвращает остаток от деления.\n\nЗАДАЧА: Выведи остаток от деления числа `100` на `3`.",
    "initialCode": "# Выведи остаток от деления 100 на 3\n",
    "expectedStdout": "1\n",
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 10,
    "chapter": 2,
    "docLink": "math",
    "title": "[ИГРА] РАСЧЕТ ТРАЕКТОРИИ",
    "description": "СЮЖЕТ: Радар сбоит! Дрон не знает расстояние до цели. Но у него есть координаты.\n\nТЕОРИЯ: Используй переменные `TARGET_X`, `TARGET_Y`, `DRONE_X`, `DRONE_Y` и математику.\n\nЗАДАЧА: Рассчитай точное расстояние по X (TARGET_X - DRONE_X) и Y. Используй результат в функциях move_right() и move_down(), чтобы дойти до цели.",
    "initialCode": "dist_x = TARGET_X - DRONE_X\ndist_y = TARGET_Y - DRONE_Y\n\n# Двигайся вправо на dist_x и вниз на dist_y\n",
    "startPosition": {
      "x": 0,
      "y": 0
    },
    "targetPosition": {
      "x": 7,
      "y": 7
    },
    "character": {
      "name": "СИСТЕМА",
      "role": "Вычислительный модуль",
      "colorClass": "text-red-500"
    }
  },
  {
    "id": 11,
    "chapter": 3,
    "docLink": "strings",
    "title": "ПЕРЕХВАТ СИГНАЛА",
    "description": "СЮЖЕТ: Радары поймали текстовое сообщение, но оно искажено.\n\nТЕОРИЯ: Раздел «2. Строки». У строк есть метод `.upper()` для перевода в верхний регистр.\n\nЗАДАЧА: Переведи строку `signal` в верхний регистр и выведи её.",
    "initialCode": "signal = 'sos_base_42'\n# Выведи signal.upper()\n",
    "expectedStdout": "SOS_BASE_42\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 12,
    "chapter": 3,
    "docLink": "strings",
    "title": "ФОРМАТИРОВАНИЕ F-СТРОК",
    "description": "СЮЖЕТ: Дрон должен отправить красивый отчет на базу.\n\nТЕОРИЯ: Раздел «2. Строки». F-строки (f\"текст {переменная}\") — идеальны для этого.\n\nЗАДАЧА: Выведи строку в формате: `Дрон #77 активен` используя переменные.",
    "initialCode": "drone_id = 77\nstatus = 'активен'\n# Напиши F-строку\n",
    "expectedStdout": "Дрон #77 активен\n",
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 13,
    "chapter": 3,
    "docLink": "strings",
    "title": "ОЧИСТКА ДАННЫХ",
    "description": "СЮЖЕТ: В эфире много шума (пробелов). Надо очистить сообщение.\n\nТЕОРИЯ: Метод `.strip()` удаляет лишние пробелы по краям строки.\n\nЗАДАЧА: Очисти строку `raw_data` и выведи её длину (используя встроенную функцию `len()`).",
    "initialCode": "raw_data = '   system_ok   '\n# Выведи длину очищенной строки (без пробелов по краям)\n",
    "expectedStdout": "9\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 14,
    "chapter": 3,
    "docLink": "strings",
    "title": "СБОРКА ПАКЕТОВ",
    "description": "СЮЖЕТ: Данные пришли в виде списка фрагментов. Нужно склеить их в одну строку.\n\nТЕОРИЯ: Строковый метод \`\"разделитель\".join(список)\` объединяет элементы списка в строку.\n\nЗАДАЧА: Склей список \`packets\` в одну строку, используя дефис \`\"-\"\` как разделитель, и выведи результат.",
    "initialCode": "packets = [\"SYS\", \"OK\", \"42\"]\n# Используй \"-\".join()\n",
    "expectedStdout": "SYS-OK-42\n",
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 15,
    "chapter": 3,
    "docLink": "strings",
    "title": "[ИГРА] ДЕШИФРАТОР ЛОГОВ",
    "description": "СЮЖЕТ: Мы перехватили лог вражеского дрона. Нужно собрать из него точный пароль, используя методы строк и f-строки.\n\nЗАДАЧА: Выведи пароль в виде `PASS: A-B-C`, где A, B, C — это переменные (очищенные и в верхнем регистре).",
    "initialCode": "a = ' alfa '\nb = 'beta'\nc = '  gamma'\n\n# Очисти от пробелов, сделай большими буквами и собери в F-строку\n",
    "expectedStdout": "PASS: ALFA-BETA-GAMMA\n",
    "character": {
      "name": "СИСТЕМА",
      "role": "Безопасность",
      "colorClass": "text-red-500"
    }
  },
  {
    "id": 16,
    "chapter": 4,
    "docLink": "conditions",
    "title": "ПРОВЕРКА ЗАРЯДА",
    "description": "СЮЖЕТ: Перед полетом нужно проверить энергию.\n\nТЕОРИЯ: Раздел «4. Условия». Блок `if` выполняет код, если условие верно.\n\nЗАДАЧА: Если `energy` больше 50, выведи `OK`.",
    "initialCode": "energy = 80\n# Напиши условие\n",
    "expectedStdout": "OK\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 17,
    "chapter": 4,
    "docLink": "conditions",
    "title": "ВЕТВЛЕНИЕ (IF/ELSE)",
    "description": "СЮЖЕТ: А если заряда мало? Нужен запасной план.\n\nТЕОРИЯ: Блок `else` срабатывает, если условие в `if` оказалось ложным.\n\nЗАДАЧА: Если `energy > 50`, выведи `OK`, иначе выведи `LOW`.",
    "initialCode": "energy = 30\n# Допиши условие\n",
    "expectedStdout": "LOW\n",
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 18,
    "chapter": 4,
    "docLink": "conditions",
    "title": "СЛОЖНЫЕ РЕШЕНИЯ (ELIF)",
    "description": "СЮЖЕТ: У нас три состояния: норма, средний, низкий.\n\nТЕОРИЯ: Используй `elif` (else if) для множественных проверок.\n\nЗАДАЧА: Если уровень больше 80 -> 'HIGH', если больше 40 -> 'MID', иначе -> 'LOW'. Выведи результат.",
    "initialCode": "level = 60\n# Напиши цепочку if - elif - else\n",
    "expectedStdout": "MID\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 19,
    "chapter": 4,
    "docLink": "conditions",
    "title": "СЕНСОР ПУТИ",
    "description": "СЮЖЕТ: На пути дрона могут быть обломки. Нужно научить его проверять радар.\n\nТЕОРИЯ: Функция `is_path_clear()` проверяет путь ПЕРЕД дроном (сверху).\n\nЗАДАЧА: Если путь свободен (is_path_clear), двигайся вверх. Иначе — вправо.",
    "initialCode": "if is_path_clear():\n    move_up()\nelse:\n    # Допиши движение вправо\n    pass\n",
    "startPosition": {
      "x": 3,
      "y": 5
    },
    "targetPosition": {
      "x": 4,
      "y": 5
    },
    "obstacles": [
      {
        "x": 3,
        "y": 4
      }
    ],
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 20,
    "chapter": 4,
    "docLink": "conditions",
    "title": "[ИГРА] УМНЫЙ ОБХОД",
    "description": "СЮЖЕТ: Радар фиксирует аномалию. Мы не знаем, открыт ли проход прямо сейчас.\n\nЗАДАЧА: Напиши логику. Если прямо (вверх) свободно — иди вверх 2 шага. Если нет — иди вправо 1 шаг, вверх 2 шага, влево 1 шаг.",
    "initialCode": "# Проверь путь вверх и построй логику обхода\n",
    "startPosition": {
      "x": 3,
      "y": 5
    },
    "targetPosition": {
      "x": 3,
      "y": 3
    },
    "obstacles": [
      {
        "x": 3,
        "y": 4
      }
    ],
    "character": {
      "name": "СИСТЕМА",
      "role": "Автопилот",
      "colorClass": "text-red-500"
    }
  },
  {
    "id": 21,
    "chapter": 5,
    "docLink": "loops",
    "title": "РУТИННАЯ РАБОТА (FOR)",
    "description": "СЮЖЕТ: Нужно проехать 5 клеток. Писать 5 раз move_down() глупо. Использовать аргумент нельзя по условиям безопасности.\n\nТЕОРИЯ: Раздел «5. Циклы». Цикл `for i in range(N)` повторяет код N раз.\n\nЗАДАЧА: Напиши цикл for, чтобы сдвинуться вниз 4 раза.",
    "initialCode": "for i in range(4):\n    move_down()\n",
    "startPosition": {
      "x": 2,
      "y": 1
    },
    "targetPosition": {
      "x": 2,
      "y": 5
    },
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 22,
    "chapter": 5,
    "docLink": "loops",
    "title": "ПОИСК ЦЕЛИ (WHILE)",
    "description": "СЮЖЕТ: Мы не знаем точное расстояние до цели. Нужно ехать, ПОКА не доедем.\n\nТЕОРИЯ: Цикл `while` работает, пока условие `True`.\n\nЗАДАЧА: Используя while, двигайся вправо, пока `DRONE_X < TARGET_X`.",
    "initialCode": "while DRONE_X < TARGET_X:\n    move_right()\n",
    "startPosition": {
      "x": 1,
      "y": 3
    },
    "targetPosition": {
      "x": 6,
      "y": 3
    },
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 23,
    "chapter": 5,
    "docLink": "loops",
    "title": "АВАРИЙНЫЙ ВЫХОД (BREAK)",
    "description": "СЮЖЕТ: Иногда цикл нужно прервать досрочно.\n\nТЕОРИЯ: Ключевое слово `break` мгновенно останавливает цикл.\n\nЗАДАЧА: Дан цикл до 10. Если `i == 5`, сделай `break`. Выведи все `i` внутри цикла.",
    "initialCode": "for i in range(10):\n    # если i равно 5 -> break\n    print(i)\n",
    "expectedStdout": "0\n1\n2\n3\n4\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 24,
    "chapter": 5,
    "docLink": "loops",
    "title": "ПРОПУСК ШАГА (CONTINUE)",
    "description": "СЮЖЕТ: В логах есть битые сектора. Их нужно пропустить.\n\nТЕОРИЯ: `continue` пропускает текущий круг цикла и переходит к следующему.\n\nЗАДАЧА: Выведи числа от 0 до 4, но пропусти число 2 с помощью `continue`.",
    "initialCode": "for i in range(5):\n    # если i == 2 -> continue\n    print(i)\n",
    "expectedStdout": "0\n1\n3\n4\n",
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 25,
    "chapter": 5,
    "docLink": "loops",
    "title": "[ИГРА] АВТОПИЛОТ v2",
    "description": "СЮЖЕТ: Создай универсальный автопилот, который сам дойдет до цели по диагонали из любой точки сетки.\n\nЗАДАЧА: Напиши цикл while, который будет двигаться вправо (если DRONE_X < TARGET_X) и вниз (если DRONE_Y < TARGET_Y) внутри одного цикла.",
    "initialCode": "while DRONE_X < TARGET_X or DRONE_Y < TARGET_Y:\n    if DRONE_X < TARGET_X:\n        move_right()\n    # Допиши условие для Y\n",
    "startPosition": {
      "x": 1,
      "y": 1
    },
    "targetPosition": {
      "x": 7,
      "y": 6
    },
    "character": {
      "name": "СИСТЕМА",
      "role": "Патруль",
      "colorClass": "text-red-500"
    }
  },
  {
    "id": 26,
    "chapter": 6,
    "docLink": "lists",
    "title": "БАЗА СПИСКОВ",
    "description": "СЮЖЕТ: Память дрона хранит координаты в виде списка.\n\nТЕОРИЯ: Раздел «6. Списки». Индексы начинаются с нуля.\n\nЗАДАЧА: Выведи первый (индекс 0) и последний (индекс -1) элементы списка.",
    "initialCode": "sectors = [42, 10, 55, 99]\n# Выведи нулевой и минус первый элементы\n",
    "expectedStdout": "42\n99\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 27,
    "chapter": 6,
    "docLink": "lists",
    "title": "ИЗМЕНЕНИЕ ДАННЫХ",
    "description": "СЮЖЕТ: Координата устарела, надо записать новую прямо в список.\n\nТЕОРИЯ: Списки изменяемы. Можно просто написать `lst[0] = 5`.\n\nЗАДАЧА: Измени второй элемент списка (индекс 1) на число 0. Затем выведи весь список.",
    "initialCode": "data = [10, 50, 30]\n# Замени 50 на 0 и выведи data\n",
    "expectedStdout": "[10, 0, 30]\n",
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 28,
    "chapter": 6,
    "docLink": "lists",
    "title": "МЕТОДЫ СПИСКОВ",
    "description": "СЮЖЕТ: В лог нужно добавить новую запись.\n\nТЕОРИЯ: Используй метод `.append(значение)` для добавления в конец списка.\n\nЗАДАЧА: Добавь слово 'DONE' в конец списка `logs` и выведи список.",
    "initialCode": "logs = ['START', 'PROCESS']\n# Добавь 'DONE' и выведи\n",
    "expectedStdout": "['START', 'PROCESS', 'DONE']\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 29,
    "chapter": 6,
    "docLink": "tuples_sets",
    "title": "КОРТЕЖИ (TUPLE)",
    "description": "СЮЖЕТ: Некоторые данные системы нельзя изменять (например, секретные ключи). Для этого есть Кортежи.\n\nТЕОРИЯ: Раздел «8. Кортежи и Множества». Кортеж создается круглыми скобками `()`.\n\nЗАДАЧА: Распакуй кортеж `point` в две переменные `x` и `y`. Выведи их сумму.",
    "initialCode": "point = (10, 20)\n# Распакуй в x, y и выведи x + y\n",
    "expectedStdout": "30\n",
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 30,
    "chapter": 6,
    "docLink": "lists",
    "title": "[ИГРА] СОРТИРОВКА ИНВЕНТАРЯ",
    "description": "СЮЖЕТ: Ящик с инструментами рассыпан. Нужно быстро его отсортировать и выкинуть последний сломанный элемент.\n\nЗАДАЧА: Отсортируй список `tools` по возрастанию (метод `.sort()`), удали последний элемент (метод `.pop()`) и выведи результат.",
    "initialCode": "tools = [99, 12, 45, 8, 3]\n# Отсортируй, удали последний и выведи\n",
    "expectedStdout": "[3, 8, 12, 45]\n",
    "character": {
      "name": "СИСТЕМА",
      "role": "Инвентаризация",
      "colorClass": "text-red-500"
    }
  },
  {
    "id": 31,
    "chapter": 7,
    "docLink": "dicts",
    "title": "СЛОВАРИ (DICT)",
    "description": "СЮЖЕТ: Настройки хранятся в формате ключ-значение.\n\nТЕОРИЯ: Раздел «7. Словари». Доступ к значению идет по ключу в квадратных скобках.\n\nЗАДАЧА: Выведи значение ключа 'speed' из словаря `config`.",
    "initialCode": "config = {'model': 'T-100', 'speed': 500}\n# Выведи скорость\n",
    "expectedStdout": "500\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 32,
    "chapter": 7,
    "docLink": "dicts",
    "title": "БЕЗОПАСНЫЙ ДОСТУП",
    "description": "СЮЖЕТ: Если ключа в словаре нет, программа упадет с ошибкой KeyError. Нужно использовать безопасный метод.\n\nТЕОРИЯ: Метод `.get(ключ, дефолт)` вернет дефолтное значение, если ключа нет.\n\nЗАДАЧА: Попробуй достать ключ 'shield' через `get()`. Если его нет, верни 'OFF'. Выведи результат.",
    "initialCode": "config = {'model': 'T-100'}\n# Используй get('shield', 'OFF')\n",
    "expectedStdout": "OFF\n",
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 33,
    "chapter": 7,
    "docLink": "dicts",
    "title": "ИЗМЕНЕНИЕ СЛОВАРЯ",
    "description": "СЮЖЕТ: В полете нужно перенастроить броню.\n\nЗАДАЧА: Добавь в словарь `config` новый ключ 'armor' со значением 100. Затем выведи весь словарь.",
    "initialCode": "config = {'speed': 500}\n# Добавь armor = 100\n",
    "expectedStdout": "{'speed': 500, 'armor': 100}\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 34,
    "chapter": 7,
    "docLink": "tuples_sets",
    "title": "МНОЖЕСТВА (SET)",
    "description": "СЮЖЕТ: Перехвачены радиосигналы, в них куча дубликатов.\n\nТЕОРИЯ: Раздел «8. Кортежи и Множества». Множество (`set()`) удаляет дубликаты.\n\nЗАДАЧА: Преврати список `signals` в множество и выведи его.",
    "initialCode": "signals = [1, 2, 2, 3, 3, 3]\n# Сделай set(signals) и выведи\n",
    "expectedStdout": "{1, 2, 3}\n",
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 35,
    "chapter": 7,
    "docLink": "dicts",
    "title": "[ИГРА] КОНФИГУРАТОР ЯДРА",
    "description": "СЮЖЕТ: Система перезагружается. Нужно пересобрать конфиг из двух разных словарей.\n\nТЕОРИЯ: Метод словаря `.update(другой_словарь)` сливает два словаря вместе.\n\nЗАДАЧА: Обнови словарь `base` значениями из словаря `patch`. Выведи итоговый словарь.",
    "initialCode": "base = {'v': 1, 'mode': 'safe'}\npatch = {'mode': 'attack', 'power': 99}\n# Обнови base и выведи его\n",
    "expectedStdout": "{'v': 1, 'mode': 'attack', 'power': 99}\n",
    "character": {
      "name": "СИСТЕМА",
      "role": "Ядро",
      "colorClass": "text-red-500"
    }
  },
  {
    "id": 36,
    "chapter": 8,
    "docLink": "functions",
    "title": "ОСНОВЫ ФУНКЦИЙ",
    "description": "СЮЖЕТ: Повторяющийся код лучше выносить в функции.\n\nТЕОРИЯ: Раздел «9. Функции». Используй ключевое слово `def`.\n\nЗАДАЧА: Напиши функцию `say_hello()`, которая внутри выводит `\"Hello!\"`. Затем вызови её.",
    "initialCode": "# Напиши def say_hello():\n",
    "expectedStdout": "Hello!\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 37,
    "chapter": 8,
    "docLink": "functions",
    "title": "ВОЗВРАТ ЗНАЧЕНИЙ (RETURN)",
    "description": "СЮЖЕТ: Функция должна не просто печатать на экран, а возвращать данные в программу.\n\nЗАДАЧА: Напиши функцию `get_square(n)`, которая возвращает (через `return`) квадрат числа n. Выведи результат вызова `get_square(5)`.",
    "initialCode": "# def get_square(n):\n",
    "expectedStdout": "25\n",
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 38,
    "chapter": 8,
    "docLink": "functions",
    "title": "АРГУМЕНТЫ ПО УМОЛЧАНИЮ",
    "description": "СЮЖЕТ: Если параметр не передан, функция должна использовать безопасный режим.\n\nЗАДАЧА: Напиши функцию `scan(mode=\"safe\")`, которая выводит текст `\"Scan: \" + mode`. Вызови её дважды: без аргументов и с аргументом `\"deep\"`.",
    "initialCode": "# Напиши функцию с дефолтным аргументом\n",
    "expectedStdout": "Scan: safe\nScan: deep\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 39,
    "chapter": 8,
    "docLink": "functions",
    "title": "ДИНАМИКА (*ARGS)",
    "description": "СЮЖЕТ: Дрон может принять любое количество модулей. Как их все собрать?\n\nТЕОРИЯ: Звездочка `*args` собирает все переданные аргументы в кортеж.\n\nЗАДАЧА: Напиши функцию `sum_all(*args)`, которая возвращает сумму всех переданных чисел (используй встроенную функцию `sum(args)`). Выведи результат вызова `sum_all(1, 2, 3, 4)`.",
    "initialCode": "# Напиши sum_all с *args\n",
    "expectedStdout": "10\n",
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 40,
    "chapter": 8,
    "docLink": "functions",
    "title": "[ИГРА] СОБСТВЕННОЕ API",
    "description": "СЮЖЕТ: Нам нужен макрос для прыжков по диагонали.\n\nЗАДАЧА: Напиши функцию `jump(steps)`, которая внутри себя вызывает `move_right(steps)` и `move_down(steps)`. Затем вызови `jump(3)` чтобы дойти до цели.",
    "initialCode": "def jump(steps):\n    # напиши тело\n    pass\n\n# Вызови jump(3)\n",
    "startPosition": {
      "x": 1,
      "y": 1
    },
    "targetPosition": {
      "x": 4,
      "y": 4
    },
    "character": {
      "name": "СИСТЕМА",
      "role": "Логика",
      "colorClass": "text-red-500"
    }
  },
  {
    "id": 41,
    "chapter": 9,
    "docLink": "comprehensions",
    "title": "ГЕНЕРАТОРЫ КОЛЛЕКЦИЙ",
    "description": "СЮЖЕТ: Процессор не справляется с долгими циклами. Нужны генераторы списков.\n\nТЕОРИЯ: Раздел «10. List Comprehensions».\n\nЗАДАЧА: В одну строку создай список квадратов чисел от 0 до 4: `[x**2 for x in range(5)]`. Выведи его.",
    "initialCode": "# Сделай List Comprehension\n",
    "expectedStdout": "[0, 1, 4, 9, 16]\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 42,
    "chapter": 9,
    "docLink": "errors",
    "title": "ОБРАБОТКА ОШИБОК",
    "description": "СЮЖЕТ: База данных иногда сбоит. Нужно защитить код от падения.\n\nТЕОРИЯ: Раздел «11. Обработка ошибок». Используй `try ... except Exception:`.\n\nЗАДАЧА: Оберни `10 / 0` в блок `try`. В `except ZeroDivisionError:` выведи `\"Crash prevented\"`.",
    "initialCode": "try:\n    # 10 / 0\n    pass\nexcept ZeroDivisionError:\n    pass\n",
    "expectedStdout": "Crash prevented\n",
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 43,
    "chapter": 9,
    "docLink": "imports",
    "title": "ИМПОРТ МОДУЛЕЙ",
    "description": "СЮЖЕТ: Нужны внешние библиотеки.\n\nТЕОРИЯ: Раздел «13. Модули (import)».\n\nЗАДАЧА: Напиши `import math`. Выведи квадратный корень из 144 через `math.sqrt(144)`.",
    "initialCode": "# import math\n",
    "expectedStdout": "12.0\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 44,
    "chapter": 9,
    "docLink": "type_hinting",
    "title": "АННОТАЦИИ ТИПОВ",
    "description": "СЮЖЕТ: Взрослый код требует типизации.\n\nТЕОРИЯ: Раздел «14. Type Hinting».\n\nЗАДАЧА: Добавь аннотацию `name: str` для аргумента и `-> str` для возвращаемого значения функции. Сама логика возвращает `\"Hi \" + name`. Вызови её с аргументом 'AI' и выведи.",
    "initialCode": "def greet(name):\n    return \"Hi \" + name\n\n# Выведи greet('AI')\n",
    "expectedStdout": "Hi AI\n",
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 45,
    "chapter": 9,
    "docLink": "oop",
    "title": "[ИГРА] ОСНОВЫ ООП",
    "description": "СЮЖЕТ: Создай программный чертеж дрона!\n\nТЕОРИЯ: Раздел «12. ООП (Классы)».\n\nЗАДАЧА: Напиши класс `Drone` с методом `__init__(self, name)`. Он сохраняет `self.name`. Создай объект `d = Drone(\"T-800\")` и выведи `d.name`.",
    "initialCode": "class Drone:\n    # Напиши __init__\n    pass\n\n# Создай экземпляр и выведи имя\n",
    "expectedStdout": "T-800\n",
    "character": {
      "name": "СИСТЕМА",
      "role": "Ядро",
      "colorClass": "text-red-500"
    }
  },
  {
    "id": 46,
    "chapter": 10,
    "docLink": "lambda",
    "title": "ЛЯМБДА И MAP",
    "description": "СЮЖЕТ: Анонимные функции для быстрой обработки.\n\nТЕОРИЯ: Раздел «15. Лямбда». Лямбда — это `lambda аргументы: выражение`.\n\nЗАДАЧА: Дан список `[1, 2, 3]`. Используй `list(map(lambda x: x*10, список))` и выведи результат.",
    "initialCode": "nums = [1, 2, 3]\n# Примени lambda через map и выведи\n",
    "expectedStdout": "[10, 20, 30]\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 47,
    "chapter": 10,
    "docLink": "generators",
    "title": "ЛЕНИВЫЙ ИТЕРАТОР (YIELD)",
    "description": "СЮЖЕТ: Функция должна не просто вернуть всё сразу, а выдавать по одному элементу, экономя память.\n\nТЕОРИЯ: Раздел «16. Итераторы и yield».\n\nЗАДАЧА: Функция countdown(3) возвращает генератор. Сделай цикл `for i in countdown(3):` и выведи i.",
    "initialCode": "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n# Сделай цикл for и выведи значения\n",
    "expectedStdout": "3\n2\n1\n",
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 48,
    "chapter": 10,
    "docLink": "decorators",
    "title": "ДЕКОРАТОРЫ (@)",
    "description": "СЮЖЕТ: Оборачиваем функции в логировщик.\n\nТЕОРИЯ: Раздел «18. Декораторы».\n\nЗАДАЧА: Поставь `@logger` перед функцией `run()`. Запусти `run()`.",
    "initialCode": "def logger(func):\n    def wrapper():\n        print(\"LOG\")\n        return func()\n    return wrapper\n\ndef run():\n    print(\"RUN\")\n# Вызови run()\n",
    "expectedStdout": "LOG\nRUN\n",
    "character": {
      "name": "ОПЕРАТОР",
      "role": "Навигация",
      "colorClass": "text-blue-400"
    }
  },
  {
    "id": 49,
    "chapter": 10,
    "docLink": "dunder",
    "title": "МАГИЯ ООП (DUNDER)",
    "description": "СЮЖЕТ: Научи объекты складываться знаком `+`.\n\nТЕОРИЯ: Раздел «19. Магические методы». Метод `__add__`.\n\nЗАДАЧА: Реализуй метод `__add__(self, other)` внутри класса Box, который возвращает сумму их `val`. Раскомментируй принт.",
    "initialCode": "class Box:\n    def __init__(self, val):\n        self.val = val\n    # def __add__(self, other):\n\nb1 = Box(10)\nb2 = Box(5)\n# print(b1 + b2)\n",
    "expectedStdout": "15\n",
    "character": {
      "name": "АРХИТЕКТОР",
      "role": "Системный ИИ",
      "colorClass": "text-amber-500"
    }
  },
  {
    "id": 50,
    "chapter": 10,
    "docLink": "api",
    "title": "[ИГРА] ФИНАЛЬНЫЙ ПЕРЕЗАПУСК",
    "description": "СЮЖЕТ: ЯДРО СИСТЕМЫ ВОССТАНОВЛЕНО. ПОСЛЕДНЯЯ МИССИЯ.\n\nТЕОРИЯ: Примени всё, что знаешь. Автоматизируй путь через телепорты и преграды.\n\nЗАДАЧА: Дойди до телепорта (1, 6), он перекинет тебя на (6, 6). Затем иди вверх к цели (6, 0). Используй циклы!",
    "initialCode": "# Используй while, чтобы дойти до телепорта, а затем до цели\n",
    "startPosition": {
      "x": 1,
      "y": 1
    },
    "targetPosition": {
      "x": 6,
      "y": 0
    },
    "obstacles": [
      {
        "x": 3,
        "y": 0
      },
      {
        "x": 3,
        "y": 1
      },
      {
        "x": 3,
        "y": 2
      },
      {
        "x": 3,
        "y": 3
      },
      {
        "x": 3,
        "y": 4
      },
      {
        "x": 3,
        "y": 5
      },
      {
        "x": 3,
        "y": 6
      },
      {
        "x": 3,
        "y": 7
      }
    ],
    "teleports": [
      {
        "from": {
          "x": 1,
          "y": 6
        },
        "to": {
          "x": 6,
          "y": 6
        }
      }
    ],
    "character": {
      "name": "СИСТЕМА",
      "role": "Финальный Босс",
      "colorClass": "text-fuchsia-500"
    }
  }
];
