export interface DocTopic {
  id: string;
  title: string;
  content: string;
}

export const docs: DocTopic[] = [
  {
    "id": "api",
    "title": "0. API Дрона (Справочник)",
    "content": "# API Управления Дроном\n\n**Важно:** Это встроенные команды симулятора. Используйте их для управления дроном.\n\n## Базовое передвижение\n```python\nmove_up(steps=1)    # Вверх (Север)\nmove_down(steps=1)  # Вниз (Юг)\nmove_left(steps=1)  # Влево (Запад)\nmove_right(steps=1) # Вправо (Восток)\n```\n*Примечание:* параметр steps по умолчанию равен 1.\n\n## Сенсоры и Координаты\n```python\nDRONE_X, DRONE_Y    # Текущие координаты дрона (целые числа)\nTARGET_X, TARGET_Y  # Координаты текущей цели (целые числа)\n\nis_path_clear()     # Возвращает True, если путь перед дроном свободен\n```\n\n## Взаимодействие\n```python\npick_up()           # Подобрать объект на текущей клетке\ndrop()              # Бросить объект\n```"
  },
  {
    "id": "vars",
    "title": "1. Переменные и Типы",
    "content": "# Переменные и Типы данных\n\nПеременные создаются простым присваиванием.\n\n```python\nname = \"Alpha\"     # str (Строка)\nversion = 2.0      # float (Дробное число)\nmodules = 5        # int (Целое число)\nis_active = True   # bool (Логический тип: True / False)\n```\n\n## Проверка типа\nИспользуйте встроенную функцию `type()`, чтобы узнать тип переменной:\n```python\nprint(type(modules)) # Выведет: <class 'int'>\n```"
  },
  {
    "id": "strings",
    "title": "2. Строки и F-строки",
    "content": "# Строки (str)\n\nСтроки можно писать в одинарных `''` или двойных `\"\"` кавычках.\n\n## F-строки (Форматирование)\n**Важно:** F-строки — это самый современный и мощный способ вставлять переменные в текст. Просто добавьте букву `f` перед кавычками и используйте фигурные скобки `{}`.\n\n```python\ndrone_id = 77\nstatus = \"ONLINE\"\n\n# Подстановка переменных\nmessage = f\"Дрон #{drone_id} статус: {status}\"\nprint(message) # Выведет: Дрон #77 статус: ONLINE\n\n# Вычисления прямо в строке!\nprint(f\"Заряд: {50 + 25}%\") # Выведет: Заряд: 75%\n```\n\n## Полезные методы строк\n```python\ntext = \"  hello world  \"\nprint(text.upper())   # \"  HELLO WORLD  \"\nprint(text.strip())   # \"hello world\" (удаляет пробелы по краям)\nprint(text.replace(\"hello\", \"hi\")) # Замена подстроки\nprint(len(text))      # Узнать длину строки\n\n# Метод join() объединяет список строк через разделитель\nwords = [\"Один\", \"Два\", \"Три\"]\nprint(\"-\".join(words)) # \"Один-Два-Три\"\n```"
  },
  {
    "id": "math",
    "title": "3. Математика",
    "content": "# Математические операторы\n\nВ Python встроены мощные арифметические операции.\n\n## Базовые операции\n```python\na = 10\nb = 3\n\nprint(a + b)  # 13 (Сложение)\nprint(a - b)  # 7  (Вычитание)\nprint(a * b)  # 30 (Умножение)\nprint(a / b)  # 3.333... (Деление, всегда возвращает float)\n```\n\n## Продвинутые операции\n**Важно:** Эти операторы часто используются в алгоритмах позиционирования и шифрования.\n```python\nprint(a // b) # 3  (Целочисленное деление - отбрасывает остаток)\nprint(a % b)  # 1  (Остаток от деления)\nprint(a ** b) # 1000 (Возведение в степень)\n```"
  },
  {
    "id": "conditions",
    "title": "4. Условия (if/elif/else)",
    "content": "# Условия\n\nПозволяют программе принимать решения в зависимости от ситуации.\n\n## Синтаксис\n*Примечание:* Отступы (4 пробела) критически важны в Python. Они определяют блоки кода.\n```python\nenergy = 45\n\nif energy > 80:\n    print(\"Заряд в норме\")\nelif energy > 20:\n    print(\"Требуется подзарядка\")\nelse:\n    print(\"КРИТИЧЕСКИЙ УРОВЕНЬ!\")\n```\n\n## Логические операторы\nИспользуются для объединения условий: `and` (И), `or` (ИЛИ), `not` (НЕ).\n```python\nif is_path_clear() and energy > 10:\n    move_up()\n    \nif not is_path_clear():\n    print(\"Обнаружено препятствие!\")\n```"
  },
  {
    "id": "loops",
    "title": "5. Циклы",
    "content": "# Циклы (for / while)\n\nИспользуются для многократного повторения блоков кода.\n\n## Цикл for\nИдеален, когда известно количество повторений или для перебора коллекций.\n```python\n# range(5) генерирует числа: 0, 1, 2, 3, 4\nfor i in range(5):\n    move_right()\n    \n# Перебор элементов списка\nfruits = [\"apple\", \"banana\"]\nfor f in fruits:\n    print(f)\n```\n\n## Цикл while\nВыполняется, ПОКА условие истинно (`True`).\n```python\nwhile DRONE_X != TARGET_X:\n    move_right()\n```\n\n## Управление циклом\n*Примечание:* оператор `break` выходит из цикла полностью, а `continue` пропускает только текущую итерацию.\n```python\nfor i in range(10):\n    if i == 3:\n        continue # Пропустит число 3\n    if i == 5:\n        break    # Остановит весь цикл на 5\n    print(i)\n```"
  },
  {
    "id": "lists",
    "title": "6. Списки (List)",
    "content": "# Списки\n\nУпорядоченные изменяемые коллекции данных.\n\n## Создание и Индексы\nИндексация начинается с `0`. Отрицательные индексы читают список с конца.\n```python\ncoords = [10, 20, 30, 40]\nprint(coords[0])  # 10\nprint(coords[-1]) # 40 (последний элемент)\n```\n\n## Срезы (Slices)\n**Важно:** Срезы позволяют извлекать часть списка по формуле `[start:stop:step]`.\n```python\nprint(coords[1:3])  # [20, 30] (с 1 по 2 включительно)\nprint(coords[::-1]) # [40, 30, 20, 10] (быстрый разворот списка)\n```\n\n## Основные методы\n```python\ncoords.append(50)    # Добавить в конец\ncoords.insert(0, 5)  # Вставить число 5 на позицию 0\nlast = coords.pop()  # Удалить и вернуть последний элемент\ncoords.sort()        # Отсортировать по возрастанию\n```"
  },
  {
    "id": "dicts",
    "title": "7. Словари (Dict)",
    "content": "# Словари\n\nКоллекции пар \"ключ-значение\". Оптимизированы для невероятно быстрого поиска данных.\n\n## Создание и доступ\n```python\ndrone_config = {\n    \"model\": \"T-800\",\n    \"speed\": 150,\n    \"weapons\": [\"laser\", \"plasma\"]\n}\n\nprint(drone_config[\"model\"]) # \"T-800\"\n# Безопасный доступ (не вызовет ошибку, если ключа нет):\nprint(drone_config.get(\"shield\", \"Not Found\")) \n```\n\n## Добавление и изменение\n```python\ndrone_config[\"speed\"] = 200     # Обновление существующего ключа\ndrone_config[\"color\"] = \"black\" # Добавление нового ключа\n```\n\n## Перебор словаря\n*Примечание:* Метод `.items()` возвращает сразу и ключ, и значение.\n```python\nfor key, value in drone_config.items():\n    print(f\"{key} -> {value}\")\n```"
  },
  {
    "id": "tuples_sets",
    "title": "8. Кортежи и Множества",
    "content": "# Кортежи (Tuple)\nНеизменяемые списки. Занимают меньше памяти и работают быстрее обычных списков.\n```python\npoint = (15, 20)\n# point[0] = 10  <-- ОШИБКА! Кортежи нельзя изменять\n\n# Распаковка кортежа\nx, y = point\nprint(x) # 15\n```\n\n# Множества (Set)\nНеупорядоченные коллекции УНИКАЛЬНЫХ элементов. Полезны для удаления дубликатов и проверки вхождения.\n```python\nids = {1, 2, 2, 3, 3, 3}\nprint(ids) # Выведет только уникальные: {1, 2, 3}\n\nids.add(4)\nids.remove(2)\n\n# Проверка наличия (работает мгновенно даже в огромных множествах!)\nif 3 in ids:\n    print(\"Найдено!\")\n```"
  },
  {
    "id": "functions",
    "title": "9. Функции",
    "content": "# Функции (def)\n\nИменованные блоки переиспользуемого кода.\n\n## Базовый синтаксис\n```python\ndef calculate_distance(x1, x2):\n    return abs(x1 - x2)\n\ndist = calculate_distance(10, 5)\n```\n\n## Аргументы по умолчанию\n```python\ndef power_on(mode=\"STANDBY\"):\n    print(f\"Starting in {mode} mode\")\n\npower_on()         # Starting in STANDBY mode\npower_on(\"ATTACK\") # Starting in ATTACK mode\n```\n\n## Динамическое количество аргументов (*args, **kwargs)\n**Важно:** `*args` собирает позиционные аргументы в кортеж, а `**kwargs` собирает именованные аргументы в словарь.\n```python\ndef sum_all(*numbers):\n    return sum(numbers)\n\nprint(sum_all(1, 2, 3, 4, 5)) # 15\n```"
  },
  {
    "id": "comprehensions",
    "title": "10. List Comprehensions",
    "content": "# Генераторы коллекций\n\n**Важно:** Изящный \"Pythonic\"-способ создания списков, словарей и множеств в одну строчку кода.\n\n## Списки\nФормат: `[выражение for элемент in коллекция if условие]`\n\n```python\n# Обычный способ (долго):\nsquares = []\nfor x in range(5):\n    squares.append(x**2)\n\n# Через List Comprehension (Короче и быстрее!):\nsquares = [x**2 for x in range(5)]\nprint(squares) # [0, 1, 4, 9, 16]\n\n# С фильтрацией (только четные числа):\nevens = [x for x in range(10) if x % 2 == 0]\n```\n\n## Словари\n```python\n# {число: его_квадрат}\nsquares_dict = {x: x**2 for x in range(3)}\n# Результат: {0: 0, 1: 1, 2: 4}\n```"
  },
  {
    "id": "errors",
    "title": "11. Обработка ошибок",
    "content": "# Исключения (try/except)\n\nЗащищают вашу программу от экстренного падения при возникновении ошибок (например, деление на ноль или отсутствие файла).\n\n## Базовый синтаксис\n```python\ntry:\n    # Код, который потенциально может сломаться\n    result = 10 / 0\nexcept ZeroDivisionError:\n    # Что делать, если ошибка произошла\n    print(\"Ошибка: Нельзя делить на ноль!\")\nexcept Exception as e:\n    # Перехват любых других неизвестных ошибок\n    print(f\"Неизвестная ошибка: {e}\")\nfinally:\n    # Этот блок выполняется ВСЕГДА, даже если была ошибка\n    print(\"Операция завершена.\")\n```\n\n## Вызов собственных ошибок (raise)\n*Примечание:* Полезно для валидации данных внутри функций.\n```python\ndef set_speed(speed):\n    if speed < 0:\n        raise ValueError(\"Скорость не может быть отрицательной!\")\n    print(f\"Скорость установлена на {speed}\")\n```"
  },
  {
    "id": "oop",
    "title": "12. ООП (Классы)",
    "content": "# Объектно-Ориентированное Программирование\n\nКлассы — это чертежи, а Объекты — конкретные экземпляры, созданные по этим чертежам.\n\n## Создание класса\nМетод `__init__` вызывается автоматически при создании объекта. Параметр `self` ссылается на сам объект и используется для хранения его свойств.\n\n```python\nclass Drone:\n    # Конструктор\n    def __init__(self, name, max_speed):\n        self.name = name       # Свойство объекта\n        self.speed = max_speed\n        self.is_flying = False\n        \n    # Метод класса\n    def take_off(self):\n        self.is_flying = True\n        print(f\"{self.name} успешно взлетел!\")\n        \n    def status(self):\n        return f\"Дрон {self.name} (Скорость: {self.speed})\"\n```\n\n## Использование\n```python\n# Создаем объекты (экземпляры)\ndrone1 = Drone(\"Scout-X\", 120)\ndrone2 = Drone(\"Heavy-M\", 50)\n\n# Управляем ими\ndrone1.take_off()\nprint(drone2.status())\n```"
  },
  {
    "id": "imports",
    "title": "13. Модули (import)",
    "content": "# Модули и Библиотеки\n\nPython имеет огромную стандартную библиотеку. Чтобы воспользоваться её возможностями, модули нужно импортировать.\n\n## Импорт целого модуля\nИспользуйте `import`, чтобы загрузить модуль целиком. Обращение к функциям происходит через точку.\n```python\nimport math\n\nprint(math.pi)        # 3.141592653589793\nprint(math.sqrt(16))  # 4.0 (Квадратный корень)\nprint(math.floor(5.9))# 5 (Округление вниз)\n```\n\n## Импорт конкретных функций\nЕсли не хочется писать имя модуля каждый раз, можно импортировать конкретную функцию.\n```python\nfrom random import randint, choice\n\nprint(randint(1, 10)) # Случайное число от 1 до 10\n\ncolors = [\"red\", \"green\", \"blue\"]\nprint(choice(colors)) # Случайный элемент из списка\n```\n\n## Псевдонимы (as)\nПозволяют сократить длинные названия модулей.\n```python\nimport datetime as dt\n\nnow = dt.datetime.now()\nprint(f\"Текущее время: {now}\")\n```"
  },
  {
    "id": "type_hinting",
    "title": "14. Type Hinting (Типы)",
    "content": "# Аннотации типов (Type Hinting)\n\nВ современном Python принято указывать типы переменных. Это не влияет на саму работу кода, но ОЧЕНЬ помогает в поиске ошибок и автодополнении кода.\n\n## Базовые типы\n```python\nname: str = \"Alpha\"\nage: int = 5\nis_ready: bool = True\nenergy: float = 99.9\n```\n\n## Типизация функций\nВы можете указать, какие типы данных функция должна принимать (в скобках) и какой тип она возвращает (через `->`).\n```python\ndef calculate_route(start: int, end: int) -> int:\n    return abs(start - end)\n    \ndef process_data(data: list) -> bool:\n    if not data:\n        return False\n    # ... обработка данных ...\n    return True\n```\n\n**Важно:** Python не остановит программу, если вы передадите `str` вместо `int`, но редакторы кода подсветят это как ошибку."
  },
  {
    "id": "lambda",
    "title": "15. Лямбда и Функции ВГФ",
    "content": "# Лямбда-функции (Анонимные)\n\nЭто короткие функции, которые можно написать в одну строку. Их часто используют там, где функция нужна только один раз.\n\n## Синтаксис\nФормат: `lambda аргументы: результат`\n```python\n# Обычная функция\ndef square(x):\n    return x * x\n\n# То же самое через lambda\nsq = lambda x: x * x\nprint(sq(5)) # 25\n```\n\n## Использование в map() и filter()\nФункции Высшего Порядка (ВГФ) принимают другие функции как аргументы.\n```python\nnumbers = [1, 2, 3, 4, 5]\n\n# map() применяет функцию ко всем элементам\ndoubled = list(map(lambda x: x * 2, numbers))\nprint(doubled) # [2, 4, 6, 8, 10]\n\n# filter() оставляет только те элементы, где функция вернула True\nevens = list(filter(lambda x: x % 2 == 0, numbers))\nprint(evens) # [2, 4]\n```"
  },
  {
    "id": "generators",
    "title": "16. Итераторы и yield",
    "content": "# Итераторы и Генераторы\n\nГенераторы — это специальные функции, которые возвращают значения *по одному*, а не все сразу. Это невероятно экономит память при работе с большими объемами данных.\n\n## Ключевое слово yield\nВместо `return`, генератор использует `yield`. Он \"приостанавливает\" функцию, отдавая значение, и продолжает с того же места при следующем вызове.\n\n```python\ndef countdown(num):\n    print(\"Запуск таймера...\")\n    while num > 0:\n        yield num\n        num -= 1\n\n# Использование\ntimer = countdown(3)\nprint(next(timer)) # 3\nprint(next(timer)) # 2\nprint(next(timer)) # 1\n# Следующий вызов next(timer) выдаст ошибку StopIteration\n```\n\n## Использование в цикле\nЦиклы `for` умеют работать с генераторами автоматически, обрабатывая их до конца.\n```python\nfor i in countdown(3):\n    print(i)\n# Вывод:\n# Запуск таймера...\n# 3\n# 2\n# 1\n```"
  },
  {
    "id": "context_managers",
    "title": "17. Файлы и with",
    "content": "# Контекстные менеджеры (with)\n\nПри работе с файлами или сетевыми подключениями очень важно их закрывать. Конструкция `with` делает это автоматически, даже если в коде произошла ошибка.\n\n## Чтение и запись файлов\n```python\n# Буква 'w' означает режим записи (Write)\n# Буква 'r' - чтение (Read)\n# Буква 'a' - добавление в конец (Append)\n\n# Запись в файл (файл будет создан, если его нет)\nwith open(\"drone_log.txt\", \"w\") as file:\n    file.write(\"Система инициализирована.\\n\")\n    file.write(\"Дрон готов к полету.\")\n\n# В этом месте файл УЖЕ автоматически закрыт!\n\n# Чтение из файла\nwith open(\"drone_log.txt\", \"r\") as file:\n    content = file.read()\n    print(content)\n```\n\n*Примечание:* В нашем симуляторе прямого доступа к файловой системе ОС нет, но в реальном Python `with open()` — это единственный правильный способ работать с файлами."
  },
  {
    "id": "decorators",
    "title": "18. Декораторы (@)",
    "content": "# Декораторы\n\nДекораторы позволяют \"обернуть\" функцию другой функцией, чтобы изменить или дополнить её поведение, не меняя её исходный код.\n\n## Как это работает\nФункция принимает другую функцию в качестве аргумента, создает функцию-обертку (`wrapper`) и возвращает её.\n\n```python\n# 1. Создаем декоратор\ndef log_action(func):\n    def wrapper(*args, **kwargs):\n        print(f\"[ЛОГ] Запуск функции: {func.__name__}\")\n        result = func(*args, **kwargs)\n        print(f\"[ЛОГ] Функция {func.__name__} завершена\")\n        return result\n    return wrapper\n\n# 2. Применяем его с помощью символа @\n@log_action\ndef scan_area(radius):\n    print(f\"Сканирование в радиусе {radius}м...\")\n    return True\n\n# 3. Вызываем функцию\nscan_area(50)\n\n# Вывод:\n# [ЛОГ] Запуск функции: scan_area\n# Сканирование в радиусе 50м...\n# [ЛОГ] Функция scan_area завершена\n```"
  },
  {
    "id": "dunder",
    "title": "19. Магические методы",
    "content": "# Dunder методы (ООП)\n\nDunder (Double UNDERscore) методы — это методы, начинающиеся и заканчивающиеся двойным подчеркиванием. Они позволяют переопределить стандартное поведение объектов Python.\n\n## Самые частые dunder-методы\n* `__init__(self)`: Вызывается при создании объекта\n* `__str__(self)`: Вызывается при `print(obj)` (строковое представление)\n* `__len__(self)`: Вызывается при `len(obj)`\n* `__add__(self, other)`: Вызывается при `obj1 + obj2`\n\n## Пример\n```python\nclass Inventory:\n    def __init__(self):\n        self.items = []\n        \n    def add(self, item):\n        self.items.append(item)\n        \n    # Учим объект реагировать на len()\n    def __len__(self):\n        return len(self.items)\n        \n    # Учим объект красиво выводиться на экран\n    def __str__(self):\n        return f\"Инвентарь ({len(self)} предметов): {', '.join(self.items)}\"\n\npack = Inventory()\npack.add(\"Лазер\")\npack.add(\"Батарея\")\n\nprint(len(pack)) # 2 (благодаря __len__)\nprint(pack)      # Инвентарь (2 предметов): Лазер, Батарея (благодаря __str__)\n```"
  }
];
