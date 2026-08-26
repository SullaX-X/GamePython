import re

with open('src/data/levels.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We want to remove the specific levels with ids 25, 26, 27, 28.
# Actually, it's safer to parse it by removing the objects that match exactly these.
# Let's just find the start and end of these specific objects.

to_remove = [
    r'  \{\s*id: 25, chapter: 7, title: "Словари дешифровки",.*?character: Operator\s*\},',
    r'  \{\s*id: 26, chapter: 7, title: "Перебор словаря",\s*description: `СЮЖЕТ: Выведи все доступные статусы на экран терминала.*?character: Architect\s*\},',
    r'  \{\s*id: 27, chapter: 8, title: "Подпрограммы",.*?character: Operator\s*\},',
    r'  \{\s*id: 28, chapter: 9, title: "ООП Ядро",.*?character: Architect\s*\},'
]

for pattern in to_remove:
    content = re.sub(pattern, '', content, flags=re.DOTALL)

# Now, renumber all `id: X,` sequentially
count = 1
def repl(match):
    global count
    res = f"id: {count},"
    count += 1
    return res

content = re.sub(r'id:\s*\d+,', repl, content)

with open('src/data/levels.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Renumbered {count - 1} levels.")
