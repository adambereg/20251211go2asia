# Дизайн-система Go2Asia

> **Документация дизайн-системы экосистемы Go2Asia**

**Версия:** 1.0  
**Дата:** 2025-01-14  
**Статус:** Архивная версия для капсулы

---

## 📋 Содержание

1. [Обзор](#обзор)
2. [Дизайн-токены](#дизайн-токены)
3. [Типографика](#типографика)
4. [Цветовая палитра](#цветовая-палитра)
5. [Компоненты](#компоненты)
6. [Отступы и интервалы](#отступы-и-интервалы)
7. [Адаптивность](#адаптивность)

---

## 🎨 Обзор

Дизайн-система Go2Asia основана на прототипе Bolt.New и обеспечивает единообразие визуального стиля во всех модулях экосистемы.

### Основные принципы

1. **Консистентность** - единый стиль во всех модулях
2. **Адаптивность** - mobile-first подход
3. **Доступность** - соответствие WCAG стандартам
4. **Производительность** - оптимизация для PWA

### Источники

- **Дизайн-токены:** `packages/design-system/design-tokens.json`
- **Tailwind конфигурация:** `packages/design-system/tailwind.config.full.js`
- **Глобальные стили:** `packages/design-system/globals.css`
- **Референс компоненты:** `packages/design-system/ui-components/`

---

## 🎯 Дизайн-токены

### Расположение

Все дизайн-токены находятся в `packages/design-system/design-tokens.json`

### Структура токенов

```json
{
  "colors": {
    "primary": "#1677FF",
    "secondary": "#52C41A",
    ...
  },
  "typography": {
    "fontFamily": {
      "sans": ["Inter", "system-ui", "sans-serif"]
    },
    ...
  },
  "spacing": {
    ...
  },
  "shadows": {
    ...
  }
}
```

### Использование токенов

```typescript
// В компонентах используй значения из design-tokens.json
const primaryColor = "#1677FF"; // Из токенов

// Или через Tailwind классы
<div className="bg-sky-500 text-white">
```

---

## 📝 Типографика

### Шрифт

```css
font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI',
             system-ui, sans-serif;
```

### Размеры шрифтов

#### Заголовки

- **H1**: `text-3xl md:text-4xl lg:text-5xl`
  - Mobile: 30px
  - Tablet: 36px
  - Desktop: 48px
  - Line height: `leading-8` (32px)
  - Font weight: `font-bold` (700)
  - Использование: Главные заголовки страниц, Hero секции

- **H2**: `text-2xl md:text-3xl`
  - Mobile: 24px
  - Desktop: 30px
  - Line height: `leading-7` (28px)
  - Font weight: `font-bold` (700)
  - Использование: Заголовки секций, подразделы

- **H3**: `text-xl md:text-2xl`
  - Mobile: 20px
  - Desktop: 24px
  - Line height: `leading-6` (24px)
  - Font weight: `font-bold` (700)
  - Использование: Заголовки карточек, модулей

#### Текст

- **Body**: `text-base` (16px)
  - Line height: `leading-6` (24px)
  - Font weight: `font-normal` (400)
  - Использование: Основной текст, описания

- **Small**: `text-sm md:text-base`
  - Mobile: 14px
  - Desktop: 16px
  - Line height: `leading-5` (20px)
  - Использование: Подзаголовки, мета-информация

- **Tiny**: `text-xs md:text-sm`
  - Mobile: 12px
  - Desktop: 14px
  - Line height: `leading-4` (16px)
  - Использование: Бейджи, чипы, метки

- **Mono**: `text-sm font-mono`
  - Использование: Коды, даты, техническая информация

---

## 🎨 Цветовая палитра

### Основные цвета

- **Sky Blue**: `sky-500` до `sky-700` (градиенты для Hero секций)
- **Slate**: `slate-50` до `slate-900` (текст, фоны)
- **White**: `white` (текст на цветных фонах)

### Цвета модулей

| Модуль | Цвет | Градиент |
|--------|------|----------|
| Atlas | Sky | `from-sky-500 to-sky-600` |
| Pulse | Sky | `from-sky-500 to-sky-600` |
| Blog | Sky | `from-sky-500 to-sky-600` |
| Guru | Sky | `from-sky-500 to-sky-600` |
| Space | Sky | `from-sky-500 to-sky-600` |
| RF | Blue | `from-blue-500 to-blue-600` |
| Rielt | Emerald | `from-emerald-500 to-emerald-600` |
| Quest | Purple | `from-purple-500 to-purple-600` |
| Connect | Amber | `from-amber-500 to-amber-600` |

### Семантические цвета

- **Success**: `green-500` - успешные действия
- **Warning**: `yellow-500` - предупреждения
- **Error**: `red-500` - ошибки
- **Info**: `blue-500` - информационные сообщения

---

## 🧩 Компоненты

### TopAppBar

Верхняя панель навигации:

- Высота: `h-16` (64px)
- Фон: `bg-white`
- Тень: `shadow-sm`
- Padding: `px-4 sm:px-6 lg:px-8`

**Расположение:** `components/app-shell/TopAppBar.tsx`

### BottomNav

Нижняя навигация (мобильная):

- Высота: `h-16` (64px)
- Фон: `bg-white`
- Тень: `shadow-lg`
- Адаптивность: Скрывается на десктопе (`hidden md:flex`)

**Расположение:** `components/app-shell/BottomNav.tsx`

### ModuleTile

Плитка модуля экосистемы:

- Размеры иконки: `w-6 h-6 md:w-7 md:h-7`
- Заголовок: `text-xl md:text-2xl` (H3)
- Описание: `text-xs md:text-sm`
- Padding: `p-4 md:p-6`
- Border radius: `rounded-lg`

**Расположение:** `packages/design-system/ui-components/ModuleTile.tsx`

### FeatureCard

Карточка преимущества:

- Заголовок: `text-xl md:text-2xl` (H3)
- Описание: `text-sm md:text-base`
- Padding: `p-6`
- Border radius: `rounded-xl`
- Shadow: `shadow-md`

**Расположение:** `packages/design-system/ui-components/FeatureCard.tsx`

### Button

Кнопки:

- **Primary**: `bg-sky-500 hover:bg-sky-600 text-white`
- **Secondary**: `bg-slate-100 hover:bg-slate-200 text-slate-900`
- **Ghost**: `hover:bg-slate-100 text-slate-700`
- **Danger**: `bg-red-500 hover:bg-red-600 text-white`

**Расположение:** `packages/design-system/ui-components/Button.tsx`

### Card

Карточки:

- Padding: `p-4 md:p-6`
- Border radius: `rounded-lg`
- Background: `bg-white`
- Shadow: `shadow-sm`

**Расположение:** `packages/design-system/ui-components/Card.tsx`

### Badge

Бейджи:

- Размер: `text-xs md:text-sm`
- Padding: `px-2 py-1`
- Border radius: `rounded-full`
- Типы: `bg-sky-100 text-sky-700`, `bg-green-100 text-green-700`, и т.д.

**Расположение:** `packages/design-system/ui-components/Badge.tsx`

---

## 📏 Отступы и интервалы

### Секции

- Вертикальные отступы: `py-12` (48px) для основных секций
- Горизонтальные отступы: `px-4 sm:px-6 lg:px-8`
- Максимальная ширина контента: `max-w-7xl mx-auto`

### Элементы

- Отступы между элементами: `gap-3 md:gap-4` (12px mobile / 16px desktop)
- Отступы в карточках: `p-4 md:p-6` (16px mobile / 24px desktop)

### Grid модулей

- **Классы**: `grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4`
- **Mobile**: 2 колонки
- **Tablet+**: 3 колонки

---

## 📱 Адаптивность

### Breakpoints

- **Mobile**: < 640px (`sm:`)
- **Tablet**: 640px - 1024px (`md:`)
- **Desktop**: > 1024px (`lg:`)

### Mobile-first подход

Все стили начинаются с мобильной версии, затем добавляются адаптации:

```tsx
<div className="text-base md:text-lg lg:text-xl">
  Адаптивный текст
</div>
```

### Адаптивные компоненты

- **TopAppBar**: Полная версия на всех устройствах
- **BottomNav**: Только на мобильных (`md:hidden`)
- **SideDrawer**: Только на планшетах/десктопах (`hidden md:block`)

---

## 🎯 Использование в компонентах

### Импорт компонентов

```typescript
// Из дизайн-системы (packages/ui)
import { Button, Card, Badge } from '@go2asia/ui';

// Или из референса (packages/design-system/ui-components)
import { Button } from '../../design-system/ui-components/Button';
```

### Применение стилей

```tsx
// Используй Tailwind классы
<div className="bg-sky-500 text-white p-4 rounded-lg">
  Контент
</div>

// Или значения из токенов
const primaryColor = "#1677FF";
```

---

## 📚 Связанные документы

- [ui_structure.md](./ui_structure.md) - Структура UI
- [design-tokens.json](../../packages/design-system/design-tokens.json) - JSON с токенами
- [tailwind.config.full.js](../../packages/design-system/tailwind.config.full.js) - Конфигурация Tailwind

---

**Версия:** 1.0  
**Дата:** 2025-01-14  
**Статус:** Архивная версия для капсулы

