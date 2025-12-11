# Go2Asia Design Tokens - Полное руководство для Cursor

Этот документ содержит **полный набор дизайн-токенов** для точного воспроизведения дизайна Go2Asia PWA. Все файлы готовы к использованию.

---

## 📦 Структура файлов

```
/
├── DESIGN_SYSTEM.md              # Подробная документация дизайн-системы
├── tailwind.config.full.js       # Полная конфигурация Tailwind
├── design-tokens.json            # JSON с токенами
├── src/
│   └── globals.css               # Глобальные стили и utility классы
└── packages/
    └── ui/                       # UI компоненты
        ├── README.md             # Документация компонентов
        ├── index.ts              # Экспорт всех компонентов
        ├── Button.tsx
        ├── Card.tsx
        ├── GradientCard.tsx
        ├── Badge.tsx
        ├── Avatar.tsx
        ├── ModuleTile.tsx
        ├── FeatureCard.tsx
        ├── CarouselItem.tsx
        ├── UserSummary.tsx
        ├── TopAppBar.tsx
        └── BottomNav.tsx
```

---

## 🎨 1. Tailwind Config (`tailwind.config.full.js`)

### Что включено:

#### **Colors**
- **brand**: Основной Sky Blue (`#0EA5E9`)
  - hover, light, lighter варианты
- **module**: Градиенты для каждого модуля
  - atlas, pulse, blog, guru, space (sky)
  - rielt (emerald)
  - quest (purple)
  - rf (blue)
  - connect (amber)
  - partner (orange)
- **system**: success, warning, error, info
- **feature**: 6 цветовых схем для feature cards
  - community (blue), teams (purple), rf (emerald)
  - referral (amber), rewards (indigo), quests (rose)

#### **Typography**
- **fontFamily**: Inter + system fonts
- **fontSize**: Responsive размеры
  - h1-h4 (mobile/tablet/desktop)
  - large, base, small (mobile/desktop)
- **fontWeight**: regular (400), medium (500), semibold (600), bold (700)
- **lineHeight**: heading (1.2), body (1.5), relaxed (1.75)

#### **Spacing**
- Custom spacing: 18, 88, 128
- Container padding по breakpoints

#### **Border Radius**
- sm (8px), md (12px), lg (16px), xl (24px), full

#### **Shadows**
- card, card-hover, lift, xl-hover

#### **Transitions**
- duration: 200ms (default), 250ms, 350ms
- timing: cubic-bezier(0.4, 0, 0.2, 1)

#### **Z-Index**
- appbar (50), modal (50), dropdown (40), overlay (30)

#### **Breakpoints**
- sm (640px), md (768px), lg (1024px), xl (1280px)

#### **Opacity**
- 15, 25, 35, 85, 95

#### **Stroke Width**
- 2.5 (для активных иконок)

### Использование:

```bash
# Заменить текущий tailwind.config.js на tailwind.config.full.js
mv tailwind.config.full.js tailwind.config.js
```

---

## 🎭 2. Global Styles (`src/globals.css`)

### Что включено:

#### **@layer base**
- Глобальный antialiasing
- Стили для body
- Заголовки h1-h6 (responsive)
- Параграфы с правильными цветами
- Ссылки
- Сброс стилей для button, input

#### **@layer components**
- **Buttons**: `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-icon`
- **Button sizes**: `.btn-sm`, `.btn-md`, `.btn-lg`, `.btn-xl`
- **Cards**: `.card-base`, `.card-gradient`, `.card-gradient-{module}`
- **Badges**: `.badge-lock`, `.badge-pro`, `.badge-rf`, `.badge-rf-full`
- **Module Tile**: `.module-tile`, `.module-icon`, `.module-title`, `.module-description`
- **Sections**: `.section-title`, `.section-subtitle`, `.section-spacing`
- **Hero**: `.hero-container`, `.hero-circle-top`, `.hero-circle-bottom`
- **Dashboard**: `.dashboard-container`, `.dashboard-avatar`, `.dashboard-stat-card`
- **Carousel**: `.carousel-container`, `.carousel-item`, `.carousel-item-image`
- **Feature Cards**: `.feature-card`, `.feature-card-{type}`
- **CTA**: `.cta-container`
- **App Bar**: `.app-bar`, `.app-bar-container`, `.app-bar-content`
- **Bottom Nav**: `.bottom-nav`, `.bottom-nav-content`, `.bottom-nav-item`
- **Modal**: `.modal-overlay`, `.modal-content`, `.modal-header`, `.modal-title`

#### **@layer utilities**
- `.text-balance`
- `.scrollbar-hide`
- `.scroll-smooth`
- `.gradient-text-sky`
- `.safe-{top|bottom|left|right}` (для PWA)

### Использование:

```tsx
// Использование utility классов
<div className="card-base">
  <h2 className="section-title">Заголовок</h2>
  <p className="section-subtitle">Подзаголовок</p>
</div>

// Или комбинировать с Tailwind
<button className="btn-primary btn-lg">
  Кнопка
</button>
```

---

## 📋 3. Design Tokens (`design-tokens.json`)

### Структура:

```json
{
  "colors": { ... },
  "typography": { ... },
  "spacing": { ... },
  "borderRadius": { ... },
  "shadows": { ... },
  "transitions": { ... },
  "zIndex": { ... },
  "breakpoints": { ... },
  "layout": { ... },
  "buttons": { ... },
  "icons": { ... },
  "backdropBlur": { ... },
  "opacity": { ... }
}
```

### Использование:

```typescript
import tokens from './design-tokens.json';

// Пример использования в JS
const primaryColor = tokens.colors.brand.primary;
const h1MobileSize = tokens.typography.fontSize.h1.mobile;
```

---

## 🧩 4. UI Components (`packages/ui/`)

### Доступные компоненты:

1. **Button** - Кнопки с вариантами и размерами
2. **Card** - Базовые карточки
3. **GradientCard** - Карточки с градиентами модулей
4. **Badge** - Бейджи (lock, pro, rf)
5. **Avatar** - Аватары с инициалами
6. **ModuleTile** - Плитки модулей
7. **FeatureCard** - Карточки "Зачем вступать"
8. **CarouselItem** - Элементы карусели
9. **UserSummary** - Dashboard пользователя
10. **TopAppBar** - Верхняя панель
11. **BottomNav** - Нижняя навигация

### Использование:

```tsx
import {
  Button,
  Card,
  ModuleTile,
  UserSummary,
  TopAppBar,
  BottomNav
} from './packages/ui';

// Пример использования
<TopAppBar
  onMenuClick={() => {}}
  onHomeClick={() => {}}
  user={{ initials: 'АП', name: 'Анна', email: 'anna@example.com' }}
/>

<ModuleTile
  module="atlas"
  icon={Globe}
  title="Atlas Asia"
  description="Энциклопедия мест"
  onClick={() => {}}
/>
```

Полная документация в `packages/ui/README.md`

---

## 🚀 Быстрый старт для Cursor

### Шаг 1: Замена конфигурации Tailwind

```bash
mv tailwind.config.full.js tailwind.config.js
```

### Шаг 2: Обновление глобальных стилей

```bash
# src/globals.css уже содержит все необходимое
# Убедитесь, что файл импортирован в main.tsx или index.tsx
```

### Шаг 3: Использование компонентов

```tsx
// Импорт компонентов
import { TopAppBar, BottomNav, ModuleTile } from './packages/ui';
import { Globe } from 'lucide-react';

// Использование
function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopAppBar
        onMenuClick={() => {}}
        onHomeClick={() => {}}
        onAuthClick={() => {}}
      />

      <main className="pb-20 pt-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <ModuleTile
            module="atlas"
            icon={Globe}
            title="Atlas Asia"
            description="Энциклопедия мест"
            onClick={() => {}}
          />
        </div>
      </main>

      <BottomNav
        activeModule="home"
        onModuleChange={(module) => {}}
      />
    </div>
  );
}
```

---

## 📐 Точные размеры из Design System

### Layout
- **TopAppBar**: 64px (h-16)
- **BottomNav**: 64px (h-16)
- **Container**: max-w-7xl (1280px)
- **Main padding**: pt-16 (64px), pb-20 (80px)

### Spacing
- **Section margin**: mb-8 md:mb-12 (32px → 48px)
- **Header margin**: mb-4 md:mb-6 (16px → 24px)
- **Element margin**: mb-2 md:mb-3 (8px → 12px)
- **Gap small**: gap-2 (8px)
- **Gap medium**: gap-3 md:gap-4 (12px → 16px)
- **Gap large**: gap-4 md:gap-6 (16px → 24px)

### Typography
- **H1**: 30px → 36px → 48px
- **H2**: 24px → 30px
- **H3**: 20px → 24px
- **H4**: 18px → 20px
- **Body**: 14px → 16px

### Border Radius
- **Cards**: rounded-xl (12px)
- **Large blocks**: rounded-2xl (16px)
- **Buttons**: rounded-lg (8px)

### Shadows
```css
card: 0 1px 2px rgba(15, 23, 42, 0.05)
lift: 0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)
xl-hover: 0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04)
```

---

## 🎨 Цветовая палитра

### Primary
- **Sky-600**: `#0EA5E9` (brand)
- **Sky-700**: `#0284C7` (hover)

### Text
- **Slate-900**: `#0F172A` (primary)
- **Slate-600**: `#475569` (secondary)
- **Slate-400**: `#94A3B8` (tertiary)

### Borders
- **Slate-200**: `#E2E8F0`
- **Sky-300**: `#7DD3FC` (hover)

### Backgrounds
- **Slate-50**: `#F8FAFC`
- **White**: `#FFFFFF`

### Module Gradients
- **Atlas/Pulse/Blog/Guru/Space**: `from-sky-500 to-sky-600`
- **Rielt**: `from-emerald-500 to-emerald-600`
- **Quest**: `from-purple-500 to-purple-600`
- **RF**: `from-blue-500 to-blue-600`
- **Connect**: `from-amber-500 to-amber-600`
- **Partner**: `from-orange-500 to-orange-600`

---

## ✅ Чеклист для Cursor

- [ ] Заменить `tailwind.config.js` на `tailwind.config.full.js`
- [ ] Использовать `src/globals.css` для глобальных стилей
- [ ] Импортировать компоненты из `packages/ui/`
- [ ] Следовать responsive паттернам (mobile-first)
- [ ] Использовать точные размеры из токенов
- [ ] Применять gradient классы для модулей
- [ ] Добавлять hover эффекты (-translate-y)
- [ ] Использовать backdrop-blur для прозрачности
- [ ] Следовать spacing system (mb-8 md:mb-12)
- [ ] Применять правильные border-radius (xl, 2xl)

---

## 📚 Дополнительные ресурсы

- **DESIGN_SYSTEM.md** - Полная документация дизайн-системы с примерами
- **packages/ui/README.md** - Документация UI компонентов
- **design-tokens.json** - JSON токены для программного использования

---

## 🎯 Итог

Все файлы готовы к использованию. Для точного воспроизведения дизайна Go2Asia:

1. Используйте `tailwind.config.full.js` как основу
2. Импортируйте `src/globals.css` для utility классов
3. Используйте компоненты из `packages/ui/`
4. Следуйте размерам и spacing из токенов
5. Применяйте mobile-first responsive подход

**Все стили, размеры, цвета и компоненты полностью соответствуют DESIGN_SYSTEM.md и готовы к копированию в Cursor.**
