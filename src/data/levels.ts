export interface Level {
  id: number;
  chapter: number;
  title: string;
  description: string;
  initialCode: string;
  expectedStdout?: string;
  startPosition?: { x: number, y: number };
  targetPosition?: { x: number, y: number };
  character: { name: string; role: string; colorClass: string };
}

const Architect = { name: "АРХИТЕКТОР", role: "Системный ИИ", colorClass: "text-amber-500" };
const Operator = { name: "ОПЕРАТОР", role: "Навигация", colorClass: "text-blue-400" };

export const gameLevels: Level[] = [
  {
    id: 1, chapter: 1, title: "Инициализация",
    description: `СЮЖЕТ: Системы дрона в спящем режиме. Оператор, нам нужно подать питание на модули связи.\n\nТЕОРИЯ: Функция print() в Python используется для вывода информации. Текст (строки) всегда заключается в кавычки.\nПример: print("Hello")\n\nЗАДАЧА: Выведи на экран текст "System Online".`,
    initialCode: "# Запусти систему\n",
    expectedStdout: "System Online\n",
    character: Architect
  },
  {
    id: 2, chapter: 1, title: "Сырые данные",
    description: `СЮЖЕТ: База запрашивает пакет целых чисел для калибровки.\n\nТЕОРИЯ: Целочисленные данные (int) пишутся без кавычек. С ними можно производить вычисления: + (сложение), - (вычитание), * (умножение), / (деление).\nПример: print(10 + 5)\n\nЗАДАЧА: Выведи результат умножения 256 на 4.`,
    initialCode: "# Выведи результат 256 * 4\n",
    expectedStdout: "1024\n",
    character: Operator
  },
  {
    id: 3, chapter: 1, title: "Тонкая настройка",
    description: `СЮЖЕТ: Двигатели требуют точных, нецелых значений для балансировки.\n\nТЕОРИЯ: Дробные числа (float) в Python пишутся через точку, а не через запятую.\nПример: print(2.5)\n\nЗАДАЧА: Выведи точное число Пи с двумя знаками после запятой: 3.14.`,
    initialCode: "# Выведи 3.14\n",
    expectedStdout: "3.14\n",
    character: Architect
  },
  {
    id: 4, chapter: 1, title: "Ошибка синтаксиса",
    description: `СЮЖЕТ: Внимание! В модуле статуса обнаружен баг предыдущего оператора.\n\nТЕОРИЯ: Если забыть кавычки у текста, Python попытается найти такую переменную и упадет с ошибкой NameError. Текст всегда должен быть в кавычках!\n\nЗАДАЧА: Исправь сломанный код так, чтобы он корректно выводил "Status: Normal".`,
    initialCode: "print(Status: Normal)\n",
    expectedStdout: "Status: Normal\n",
    character: Architect
  },
  {
    id: 5, chapter: 2, title: "Создание ячейки",
    description: `СЮЖЕТ: Нам нужно выделить память для хранения позывного дрона.\n\nТЕОРИЯ: Переменная — это ячейка памяти с именем, куда мы сохраняем данные. Создается знаком =. Имя пишется без кавычек.\nПример: name = "Rex"\n\nЗАДАЧА: Создай переменную drone_name и присвой ей значение "Alpha". На следующей строке выведи её через print().`,
    initialCode: "# Создай переменную drone_name\n\n# Выведи её\n",
    expectedStdout: "Alpha\n",
    character: Architect
  },
  {
    id: 6, chapter: 2, title: "Перезапись памяти",
    description: `СЮЖЕТ: Дрон получил урон! Данные о броне устарели, нужно срочно обновить реестр.\n\nТЕОРИЯ: Значение переменной можно изменить в любой момент. Программа запомнит только последнее присвоенное значение.\n\nЗАДАЧА: Переменная armor равна 50. На следующей строке перезапиши её значение на 0. Затем выведи armor.`,
    initialCode: "armor = 50\n# Измени armor на 0\n\n# Выведи armor\n",
    expectedStdout: "0\n",
    character: Operator
  },
  {
    id: 7, chapter: 2, title: "Динамический расчет",
    description: `СЮЖЕТ: В бою заряд батареи постоянно меняется. Рассчитай остаток после маневра.\n\nТЕОРИЯ: Переменную можно обновлять на основе её же предыдущего значения. Или проводить вычисления прямо при сохранении.\nПример: energy = energy - 10\n\nЗАДАЧА: Дана переменная health = 100. Отними от неё 15, сохрани новый результат обратно в health и выведи его.`,
    initialCode: "health = 100\n# Обнови health\n\n# Выведи health\n",
    expectedStdout: "85\n",
    character: Operator
  },
  {
    id: 8, chapter: 2, title: "Форматирование",
    description: `СЮЖЕТ: База запрашивает читаемый статус-рапорт, а не просто голые цифры.\n\nТЕОРИЯ: F-строки (форматированные строки) позволяют вставлять переменные прямо внутрь текста. Добавь f перед кавычками, а переменную возьми в фигурные скобки {}.\nПример: print(f"Имя: {name}")\n\nЗАДАЧА: Есть переменная val = 100. Используя f-строку, выведи текст "Health: 100".`,
    initialCode: "val = 100\n# Используй f-строку\n",
    expectedStdout: "Health: 100\n",
    character: Architect
  },
  {
    id: 9, chapter: 3, title: "Первый шаг",
    description: `СЮЖЕТ: Доступ к физическим приводам получен. Попробуем сдвинуться с места.\n\nТЕОРИЯ: Чтобы робот двигался, нужно вызывать встроенные функции API: move_up(), move_down(), move_left(), move_right(). Функция вызывается с круглыми скобками!\n\nЗАДАЧА: Вызови функцию move_right(), а затем move_down(), чтобы достичь оранжевой цели на радаре.`,
    initialCode: "# Двигайся вправо, затем вниз\n",
    startPosition: { x: 0, y: 0 },
    targetPosition: { x: 1, y: 1 },
    character: Architect
  },
  {
    id: 10, chapter: 3, title: "Обход препятствий",
    description: `СЮЖЕТ: Прямой путь заблокирован радиационным полем. Нам нужно проложить маршрут в обход.\n\nТЕОРИЯ: Вызывай функции движения последовательно строка за строкой. Дрон будет выполнять их по очереди.\n\nЗАДАЧА: Доберись до цели (x:2, y:2). Сделай два шага вправо, а затем два шага вниз.`,
    initialCode: "# Проложи маршрут в обход\n",
    startPosition: { x: 0, y: 0 },
    targetPosition: { x: 2, y: 2 },
    character: Operator
  },
  {
    id: 11, chapter: 4, title: "Правда или Ложь",
    description: `СЮЖЕТ: Переходим к логическим ядрам. Проверим базовые булевы константы.\n\nТЕОРИЯ: Булев тип (bool) в Python имеет только два значения: True (Истина) и False (Ложь). Пишутся обязательно с большой буквы и без кавычек.\n\nЗАДАЧА: Выведи значение True.`,
    initialCode: "# Выведи True\n",
    expectedStdout: "True\n",
    character: Architect
  },
  {
    id: 12, chapter: 4, title: "Сравнение данных",
    description: `СЮЖЕТ: Датчики фиксируют перегрев! Нужно программно сравнить показатели.\n\nТЕОРИЯ: Операторы сравнения: > (больше), < (меньше), == (равно), != (не равно). Если сравнение верно, оно возвращает True, иначе False.\nПример: print(10 > 5)\n\nЗАДАЧА: Дана переменная temp = 120. Выведи результат сравнения temp > 100.`,
    initialCode: "temp = 120\n# Сравни temp с числом 100\n",
    expectedStdout: "True\n",
    character: Operator
  },
  {
    id: 13, chapter: 4, title: "Базовое условие",
    description: `СЮЖЕТ: Дрон должен уметь принимать решения на основе сенсоров!\n\nТЕОРИЯ: Конструкция if (если) выполняет блок кода, только если условие истинно (True). После условия обязательно ставится двоеточие :, а код внутри должен иметь отступ в 4 пробела.\nПример:\nif a > 0:\n    print("Больше")\n\nЗАДАЧА: Дано charge = 50. Напиши условие: если charge > 0, выведи текст "Online".`,
    initialCode: "charge = 50\n# Напиши if\n",
    expectedStdout: "Online\n",
    character: Architect
  },
  {
    id: 14, chapter: 4, title: "Альтернатива",
    description: `СЮЖЕТ: Если энергии мало, дрон должен подать сигнал. Иначе — работаем штатно.\n\nТЕОРИЯ: Блок else (иначе) работает, если условие if оказалось ложным. Он тоже требует двоеточия и отступа.\n\nЗАДАЧА: Дано battery = 15. Если battery < 20, выведи "Low". Иначе выведи "High".`,
    initialCode: "battery = 15\n# Напиши if и else\n",
    expectedStdout: "Low\n",
    character: Operator
  },
  {
    id: 15, chapter: 4, title: "Множественный выбор",
    description: `СЮЖЕТ: Нам нужно распределить энергию в зависимости от уровня угрозы.\n\nТЕОРИЯ: Когда нужно проверить несколько условий подряд, используется elif (else if).\n\nЗАДАЧА: У нас есть mode = 2. \nЕсли mode == 1, выведи "Engine". \nИначе если (elif) mode == 2, выведи "Shields". \nИначе выведи "Sleep".`,
    initialCode: "mode = 2\n# Напиши цепочку if - elif - else\n",
    expectedStdout: "Shields\n",
    character: Architect
  },
  {
    id: 16, chapter: 4, title: "Сложная логика",
    description: `СЮЖЕТ: Двигатели запустятся, только если есть и топливо, и щиты!\n\nТЕОРИЯ: Логические операторы and (И), or (ИЛИ), not (НЕ) позволяют объединять условия.\nПример: if a > 0 and b > 0:\n\nЗАДАЧА: Даны fuel = True и shields = True. Напиши условие: если fuel И shields истины, выведи "Ready".`,
    initialCode: "fuel = True\nshields = True\n# Напиши условие с and\n",
    expectedStdout: "Ready\n",
    character: Operator
  },
  {
    id: 17, chapter: 4, title: "Анализ пути",
    description: `СЮЖЕТ: Впереди неизвестность. Дрон может использовать радар is_path_clear().\n\nТЕОРИЯ: Мы можем вызывать функции внутри условий! Функция is_path_clear() вернет True, если прямо по курсу нет препятствий.\n\nЗАДАЧА: Используй if is_path_clear():. Если путь свободен, сделай шаг вправо move_right(). Иначе сделай шаг вниз move_down() и затем шаг вправо move_right().\n(Система специально скажет, что путь заблокирован!)`,
    initialCode: "# Напиши if / else с вызовом функций\n",
    startPosition: { x: 0, y: 0 },
    targetPosition: { x: 1, y: 1 },
    character: Architect
  },
  {
    id: 18, chapter: 5, title: "Сила цикла for",
    description: `СЮЖЕТ: Писать 100 раз move_right() — неэффективно. Время автоматизации!\n\nТЕОРИЯ: Цикл for позволяет повторять код заданное количество раз. Функция range(N) заставит код выполниться ровно N раз.\nПример:\nfor i in range(3):\n    print(i)\n\nЗАДАЧА: Запусти цикл на 3 итерации. Внутри цикла выведи переменную i (она будет равна 0, 1, 2).`,
    initialCode: "# Используй цикл for\n",
    expectedStdout: "0\n1\n2\n",
    character: Architect
  },
  {
    id: 19, chapter: 5, title: "Цикл while",
    description: `СЮЖЕТ: Мы не знаем, сколько шагов нужно, но знаем, что двигаться нужно, пока есть топливо.\n\nТЕОРИЯ: Цикл while (пока) повторяет код до тех пор, пока его условие истинно.\nПример:\nwhile x > 0:\n    x = x - 1\n\nЗАДАЧА: Дано fuel = 3. Напиши цикл, который выполняется пока fuel > 0. Внутри выведи fuel и уменьши его на 1.`,
    initialCode: "fuel = 3\n# Напиши цикл while\n",
    expectedStdout: "3\n2\n1\n",
    character: Operator
  },
  {
    id: 20, chapter: 5, title: "Прерывание",
    description: `СЮЖЕТ: Аварийная остановка! Радары засекли аномалию.\n\nТЕОРИЯ: Команда break позволяет досрочно выйти из цикла, даже если он еще не закончен. Команда continue пропускает текущий шаг и переходит к следующему.\n\nЗАДАЧА: Перебери range(5) через for. Если i == 3, сделай break. Иначе выведи i.`,
    initialCode: "# Используй for, if и break\n",
    expectedStdout: "0\n1\n2\n",
    character: Architect
  },
  {
    id: 21, chapter: 5, title: "Квадратный патруль",
    description: `СЮЖЕТ: Нужно облететь квадратный сектор для полного сканирования.\n\nТЕОРИЯ: Циклы идеально подходят для повторяющихся движений роботов.\n\nЗАДАЧА: Используй цикл for i in range(2):, внутри которого дрон будет делать move_right() и move_down(). Доберись до цели!`,
    initialCode: "# Напиши цикл для движения по диагонали\n",
    startPosition: { x: 1, y: 1 },
    targetPosition: { x: 3, y: 3 },
    character: Operator
  },
  {
    id: 22, chapter: 6, title: "Массивы памяти",
    description: `СЮЖЕТ: У дрона несколько орудий. Нужно сохранить их в единую базу.\n\nТЕОРИЯ: Массив (Список / List) позволяет хранить несколько элементов. Создается с помощью квадратных скобок []. Доступ к элементам идет по индексу (счет с нуля!).\nПример: weapons = ["Laser", "EMP"]\n\nЗАДАЧА: Создай список tools = ["Laser", "Scanner"]. Выведи его первый элемент (индекс 0).`,
    initialCode: "# Создай список и выведи первый элемент\n",
    expectedStdout: "Laser\n",
    character: Architect
  },
  {
    id: 23, chapter: 6, title: "Добавление в базу",
    description: `СЮЖЕТ: Нашли новый модуль! Обновим реестр и удалим старье.\n\nТЕОРИЯ: Метод .append(item) добавляет элемент в конец списка. Метод .remove(item) ищет и удаляет элемент по его значению.\n\nЗАДАЧА: Дан список weapons = ["EMP"]. Добавь "Plasma" через .append(), затем удали "Plasma" через .remove(), и выведи список.`,
    initialCode: "weapons = [\"EMP\"]\n# Добавь, удали, выведи\n",
    expectedStdout: "['EMP']\n",
    character: Operator
  },
  {
    id: 24, chapter: 6, title: "Кортежи",
    description: `СЮЖЕТ: Некоторые данные системы (например, координаты базы) не должны изменяться никогда.\n\nТЕОРИЯ: Кортеж (Tuple) — это неизменяемый список. Создается круглыми скобками (). Ты не можешь сделать .append() или изменить элемент по индексу. Это гарантирует безопасность важных данных.\n\nЗАДАЧА: Создай кортеж coords = (1, 2) и выведи его.`,
    initialCode: "# Создай и выведи кортеж\n",
    expectedStdout: "(1, 2)\n",
    character: Architect
  },




  {
    id: 25, chapter: 7, title: "Создание словаря",
    description: `СЮЖЕТ: Оператор, нам нужно структурировать параметры дрона. Списки для этого не годятся.\n\nТЕОРИЯ: Словари хранят данные в парах "ключ: значение". Создаются так: dict = {"key": "value"}.\n\nЗАДАЧА: Создать словарь drone_stats с ключами "speed" (100) и "armor" (50), вывести его.`,
    initialCode: "# Создай словарь drone_stats\n\n# Выведи словарь\n",
    expectedStdout: "{'speed': 100, 'armor': 50}\n",
    character: Architect
  },
  {
    id: 26, chapter: 7, title: "Чтение данных",
    description: `СЮЖЕТ: База запрашивает только скорость дрона.\n\nТЕОРИЯ: Данные из словаря можно получить, обратившись по ключу: dict["key"].\n\nЗАДАЧА: Получить значение по ключу "speed" из словаря и вывести его.`,
    initialCode: "drone_stats = {\"speed\": 100, \"armor\": 50}\n# Выведи скорость\n",
    expectedStdout: "100\n",
    character: Operator
  },
  {
    id: 27, chapter: 7, title: "Добавление модулей",
    description: `СЮЖЕТ: Мы подобрали лазер. Нужно добавить его в конфигурацию.\n\nТЕОРИЯ: Новый элемент добавляется простым присваиванием: dict["new_key"] = value.\n\nЗАДАЧА: Добавить в словарь drone_stats ключ "weapon" со значением "laser". Вывести словарь.`,
    initialCode: "drone_stats = {\"speed\": 100, \"armor\": 50}\n# Добавь оружие\n\n# Выведи словарь\n",
    expectedStdout: "{'speed': 100, 'armor': 50, 'weapon': 'laser'}\n",
    character: Architect
  },
  {
    id: 28, chapter: 7, title: "Изменение данных",
    description: `СЮЖЕТ: Мы получили урон. Броня пробита!\n\nТЕОРИЯ: Значение по существующему ключу можно перезаписать так же, как и добавить: dict["key"] = new_value.\n\nЗАДАЧА: Уменьшить значение "armor" на 20 (чтобы стало 30). Вывести словарь.`,
    initialCode: "drone_stats = {\"speed\": 100, \"armor\": 50}\n# Уменьши броню\n\n# Выведи словарь\n",
    expectedStdout: "{'speed': 100, 'armor': 30}\n",
    character: Operator
  },
  {
    id: 29, chapter: 7, title: "Перебор словаря",
    description: `СЮЖЕТ: Требуется полный дамп параметров на экран.\n\nТЕОРИЯ: Метод .items() возвращает и ключ, и значение: for key, val in dict.items():\n\nЗАДАЧА: Перебрать словарь и вывести ключи и значения через f-строку print(f"{key}: {val}").`,
    initialCode: "drone_stats = {\"speed\": 100, \"armor\": 50}\n# Напиши цикл for\n",
    expectedStdout: "speed: 100\narmor: 50\n",
    character: Architect
  },
  {
    id: 30, chapter: 8, title: "Первая подпрограмма",
    description: `СЮЖЕТ: Пора объединять частые команды в подпрограммы.\n\nТЕОРИЯ: Функция (def name():) группирует код. Чтобы он выполнился, функцию нужно вызвать: name().\n\nЗАДАЧА: Создать функцию diagnostics(), которая выводит "System OK", и вызвать её.`,
    initialCode: "# Создай функцию diagnostics\n\n# Вызови функцию\n",
    expectedStdout: "System OK\n",
    character: Architect
  },
  {
    id: 31, chapter: 8, title: "Аргументы",
    description: `СЮЖЕТ: Системе наведения нужны координаты цели.\n\nТЕОРИЯ: Функция может принимать данные (аргументы): def heal(amount):\n\nЗАДАЧА: Создать функцию set_target(x, y), которая выводит f-строку "Target locked at {x}, {y}". Вызвать её с аргументами 5 и 7.`,
    initialCode: "# Создай функцию set_target(x, y)\n\n# Вызови с аргументами 5 и 7\n",
    expectedStdout: "Target locked at 5, 7\n",
    character: Operator
  },
  {
    id: 32, chapter: 8, title: "Возврат значений (return)",
    description: `СЮЖЕТ: Анализатор урона должен не просто печатать числа, но и возвращать их в систему.\n\nТЕОРИЯ: Команда return возвращает результат из функции, чтобы его можно было сохранить или использовать.\n\nЗАДАЧА: Написать функцию calculate_damage(base, multiplier), которая возвращает их произведение. Вывести результат работы функции с аргументами 10 и 3.`,
    initialCode: "# Создай функцию calculate_damage\n\n# Выведи результат вызова\n",
    expectedStdout: "30\n",
    character: Architect
  },
  {
    id: 33, chapter: 8, title: "Автоматизация маршрута",
    description: `СЮЖЕТ: Оператор просит создать паттерн патрулирования.\n\nТЕОРИЯ: Внутри создаваемых функций можно вызывать системные API дрона (например, move_right()).\n\nЗАДАЧА: Создать функцию step_forward(), внутри которой вызывается move_right(). Затем вызвать эту функцию 3 раза подряд (без цикла, просто 3 вызова).`,
    initialCode: "# Создай функцию step_forward\n\n# Вызови её 3 раза\n",
    startPosition: { x: 0, y: 0 },
    targetPosition: { x: 3, y: 0 },
    character: Operator
  },
  {
    id: 34, chapter: 8, title: "Умный патруль",
    description: `СЮЖЕТ: Включаем автопилот для обхода сектора.\n\nТЕОРИЯ: Функции отлично комбинируются с циклами.\n\nЗАДАЧА: Создать функцию patrol(), которая делает move_right(), затем move_down(). Вызвать функцию patrol() внутри цикла for i in range(3).`,
    initialCode: "# Создай функцию patrol\n\n# Запусти её в цикле 3 раза\n",
    startPosition: { x: 1, y: 1 },
    targetPosition: { x: 4, y: 4 },
    character: Architect
  },
  {
    id: 35, chapter: 9, title: "Чертежи системы",
    description: `СЮЖЕТ: Пришло время выйти на новый уровень. Мы будем строить чертежи для роботов.\n\nТЕОРИЯ: Класс (class) — это чертеж или шаблон. Объекты создаются по этому чертежу. Если создать пустой класс, внутри него пишется слово pass.\nПример:\nclass Bot:\n    pass\n\nЗАДАЧА: Создать пустой класс Drone (используй pass) и создать его экземпляр в переменной my_drone. Вывести "Drone Created".`,
    initialCode: "# Создай класс Drone\n\n# Создай экземпляр и выведи текст\n",
    expectedStdout: "Drone Created\n",
    character: Architect
  },
  {
    id: 36, chapter: 9, title: "Конструктор (Инициализация)",
    description: `СЮЖЕТ: Пустой дрон бесполезен. Дадим ему начальные характеристики!\n\nТЕОРИЯ: Метод __init__ вызывается при создании объекта. Параметр self указывает на сам создаваемый объект.\nПример:\nclass Bot:\n    def __init__(self, name):\n        self.name = name\n\nЗАДАЧА: Создать класс Drone с __init__(self, name). Присвоить self.name = name. Создать дрона с именем "Alpha" и вывести его name.`,
    initialCode: "# Создай класс с конструктором\n\n# Создай объект и выведи имя\n",
    expectedStdout: "Alpha\n",
    character: Operator
  },
  {
    id: 37, chapter: 9, title: "Внутренние модули",
    description: `СЮЖЕТ: Дрон должен уметь сам сообщать о своем статусе.\n\nТЕОРИЯ: Методы — это функции внутри класса. Первым параметром в них всегда идет self, чтобы метод мог получить доступ к свойствам объекта.\nПример:\n    def status(self):\n        print(self.name)\n\nЗАДАЧА: Добавить метод status(self), который выводит f-строку "Drone {self.name} is ready". Вызвать метод у созданного экземпляра.`,
    initialCode: "class Drone:\n    def __init__(self, name):\n        self.name = name\n    # Добавь метод status\n\n# Создай объект и вызови метод\n",
    expectedStdout: "Drone Alpha is ready\n",
    character: Architect
  },
  {
    id: 38, chapter: 9, title: "Наследование протоколов",
    description: `СЮЖЕТ: Базовый дрон хорош, но нам нужна боевая модификация, основанная на его чертежах!\n\nТЕОРИЯ: Наследование позволяет новому классу перенять всё от базового и добавить своё.\nПример:\nclass CombatDrone(Drone):\n\nЗАДАЧА: Создать базовый класс Drone, затем дочерний CombatDrone(Drone), у которого есть метод attack(), выводящий "Pew pew!". Создать экземпляр CombatDrone и вызвать метод attack().`,
    initialCode: "class Drone:\n    pass\n\n# Создай CombatDrone и метод attack\n\n# Создай экземпляр и атакуй\n",
    expectedStdout: "Pew pew!\n",
    character: Operator
  },
  {
    id: 39, chapter: 9, title: "Финальное испытание",
    description: `СЮЖЕТ: АРХИТЕКТОР передает тебе полный контроль над системой навигации. Примени все свои знания.\n\nТЕОРИЯ: Внутри методов класса можно использовать циклы for и вызывать системные функции API вроде move_up().\n\nЗАДАЧА: Написать класс Navigator. У него должен быть метод reach_target(self), который использует цикл for и функцию API move_up(), чтобы переместить дрона на 4 клетки вверх. Создать экземпляр и вызвать этот метод.`,
    initialCode: "# Напиши класс Navigator\n\n# Создай экземпляр и вызови reach_target\n",
    startPosition: { x: 3, y: 7 },
    targetPosition: { x: 3, y: 3 },
    character: Architect
  }
];

export const chapterTitles: Record<number, string> = {
  1: "БАЗОВЫЕ ПРОТОКОЛЫ",
  2: "РАСПРЕДЕЛЕНИЕ ПАМЯТИ",
  3: "СИСТЕМА НАВИГАЦИИ",
  4: "ЛОГИЧЕСКИЕ ЯДРА",
  5: "АВТОМАТИЗАЦИЯ",
  6: "МАССИВЫ ПАМЯТИ",
  7: "СЛОВАРИ ДЕШИФРОВКИ",
  8: "ПОДПРОГРАММЫ",
  9: "ОБЪЕКТНО-ОРИЕНТИРОВАННОЕ ЯДРО (ООП)"
};

export const levels = gameLevels;
