# Go2Asia UI Components (Архив прототипов)

> ⚠️ **ВНИМАНИЕ**: Это READ-ONLY архив прототипов компонентов.
> 
> **Рабочие компоненты находятся в `packages/ui/`**
> 
> **НЕ редактируйте файлы в этой директории!**

---

Библиотека переиспользуемых UI компонентов для экосистемы Go2Asia, построенная на основе Design System.

**Использование:**
- Используйте компоненты из `packages/ui`: `import { Button } from '@go2asia/ui'`
- Эта директория служит только для референса и документации

## 📦 Установка

```bash
# Из локального пакета
import { Button, Card, ModuleTile } from './packages/ui';
```

## 🎨 Компоненты

### Button
Кнопка с поддержкой вариантов и размеров.

```tsx
import { Button } from './packages/ui';
import { ArrowRight } from 'lucide-react';

<Button variant="primary" size="lg" icon={ArrowRight}>
  Зарегистрироваться
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost'
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `icon`: LucideIcon (опционально)
- `iconPosition`: 'left' | 'right'

---

### Card
Базовая карточка с hover эффектами.

```tsx
import { Card } from './packages/ui';

<Card hover={true}>
  <h3>Заголовок</h3>
  <p>Контент карточки</p>
</Card>
```

**Props:**
- `hover`: boolean (по умолчанию true)

---

### GradientCard
Карточка с градиентом для модулей.

```tsx
import { GradientCard } from './packages/ui';

<GradientCard module="atlas">
  <h3>Atlas Asia</h3>
  <p>Энциклопедия мест</p>
</GradientCard>
```

**Props:**
- `module`: 'atlas' | 'pulse' | 'blog' | 'guru' | 'space' | 'rielt' | 'quest' | 'rf' | 'connect' | 'partner'
- `hover`: boolean

---

### Badge
Бейджи для различных состояний.

```tsx
import { Badge } from './packages/ui';

<Badge type="lock" />
<Badge type="pro" />
<Badge type="rf" />
<Badge type="rf-full" />
```

**Props:**
- `type`: 'lock' | 'pro' | 'rf' | 'rf-full'

---

### Avatar
Аватар с инициалами пользователя.

```tsx
import { Avatar } from './packages/ui';

<Avatar size="md" initials="АП" />
```

**Props:**
- `size`: 'sm' | 'md' | 'lg'
- `initials`: string

---

### ModuleTile
Плитка модуля для главной страницы.

```tsx
import { ModuleTile } from './packages/ui';
import { Globe } from 'lucide-react';

<ModuleTile
  module="atlas"
  icon={Globe}
  title="Atlas Asia"
  description="Энциклопедия мест"
  locked={false}
  isPro={false}
  onClick={() => {}}
/>
```

**Props:**
- `module`: ModuleType
- `icon`: LucideIcon
- `title`: string
- `description`: string
- `locked`: boolean
- `isPro`: boolean
- `onClick`: () => void

---

### FeatureCard
Карточка для секции "Зачем вступать в экосистему".

```tsx
import { FeatureCard } from './packages/ui';
import { Users } from 'lucide-react';

<FeatureCard
  type="community"
  icon={Users}
  title="Живое сообщество"
  description="Знакомьтесь с людьми..."
  cta="Перейти в Space Asia"
  onClick={() => {}}
/>
```

**Props:**
- `type`: 'community' | 'teams' | 'rf' | 'referral' | 'rewards' | 'quests'
- `icon`: LucideIcon
- `title`: string
- `description`: string
- `cta`: string
- `onClick`: () => void

---

### CarouselItem
Элемент карусели (популярное/события).

```tsx
import { CarouselItem } from './packages/ui';

<CarouselItem
  image="https://..."
  title="Бангкок"
  subtitle="Таиланд"
  type="Страна"
  onClick={() => {}}
/>
```

**Props:**
- `image`: string
- `title`: string
- `subtitle`: string
- `type`: string (опционально)
- `onClick`: () => void

---

### UserSummary
Блок с информацией о пользователе (dashboard).

```tsx
import { UserSummary } from './packages/ui';

<UserSummary
  name="Анна Петрова"
  initials="АП"
  location="Сейчас: Пхукет, Таиланд"
  level={12}
  progress={75}
  pointsToNextLevel={120}
  stats={{
    points: 3450,
    nfts: 5,
    teamMembers: 7,
    vouchers: 2
  }}
  isPro={false}
/>
```

**Props:**
- `name`: string
- `initials`: string
- `location`: string
- `level`: number
- `progress`: number (0-100)
- `pointsToNextLevel`: number
- `stats`: { points, nfts, teamMembers, vouchers }
- `isPro`: boolean

---

### TopAppBar
Верхняя панель приложения.

```tsx
import { TopAppBar } from './packages/ui';

<TopAppBar
  onMenuClick={() => {}}
  onHomeClick={() => {}}
  onSearchClick={() => {}}
  user={{ initials: 'АП', name: 'Анна', email: 'anna@example.com' }}
  onProfileClick={() => {}}
/>
```

**Props:**
- `onMenuClick`: () => void
- `onHomeClick`: () => void
- `onSearchClick`: () => void (опционально)
- `user`: { initials, name, email } (опционально)
- `onAuthClick`: () => void (если нет user)
- `onProfileClick`: () => void (если есть user)

---

### BottomNav
Нижняя навигация (mobile).

```tsx
import { BottomNav } from './packages/ui';

<BottomNav
  activeModule="home"
  onModuleChange={(module) => {}}
/>
```

**Props:**
- `activeModule`: 'home' | 'atlas' | 'pulse' | 'blog' | 'space'
- `onModuleChange`: (module) => void

---

## 🎨 Стилизация

Все компоненты используют Tailwind CSS классы из Design System. Для кастомизации используйте:

1. **className prop**: Все компоненты принимают `className` для дополнительной стилизации
2. **Tailwind utilities**: Используйте utility классы из `globals.css`
3. **Design tokens**: Обращайтесь к `design-tokens.json` для значений

## 📱 Responsive Design

Все компоненты адаптивны и следуют mobile-first подходу:

- Mobile: `< 768px` (базовые стили)
- Tablet: `≥ 768px` (префикс `md:`)
- Desktop: `≥ 1024px` (префикс `lg:`)

## 🔧 Разработка

### Добавление нового компонента

1. Создайте файл `ComponentName.tsx` в `packages/ui/`
2. Следуйте структуре существующих компонентов
3. Используйте TypeScript для типизации props
4. Используйте классы из Design System
5. Добавьте экспорт в `index.ts`
6. Обновите README

### Пример структуры компонента

```tsx
import React from 'react';

export interface ComponentNameProps {
  // типизация props
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // деструктуризация props
}) => {
  return (
    // JSX с Tailwind классами
  );
};
```

## 📚 Связанные файлы

- **Design System**: `/DESIGN_SYSTEM.md`
- **Tailwind Config**: `/tailwind.config.full.js`
- **Global Styles**: `/src/globals.css`
- **Design Tokens**: `/design-tokens.json`
