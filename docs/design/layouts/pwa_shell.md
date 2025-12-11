# Layout: PWA Shell — основной каркас приложения Go2Asia

PWA Shell — единая оболочка, в которой "живут" все микрофронтенды (Atlas, Pulse, Blog, Rielt, RF, Quest и др.).

---

# 1. Структура Shell

## Mobile:
- Header (поиск + логотип)
- Bottom Navigation (5 иконок)
- Content
- Floating Actions (по необходимости)

## Desktop:
- Left Sidebar Navigation
- Top Header
- Content (двухколоночный или трёх)
- Right Utility Panel (опционально)

---

# 2. Навигация

Разделы:
1. Guru Nearby
2. Atlas
3. Pulse Events
4. Blog
5. Profile

Иконки — Lucide.

Bottom Navigation фиксирован внизу экрана.

---

# 3. State management

- Shell хранит:
  - авторизацию,
  - язык,
  - базовые настройки пользователя.

- Модули не должны дублировать это состояние.

---

# 4. Переходы между модулями

- мгновенные,
- без перезагрузки,
- в стиле PWA.

---

# 5. Связанные документы

- `module_layouts.md`
- `ui_kit.md`
