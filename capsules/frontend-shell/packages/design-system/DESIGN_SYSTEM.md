# UI/UX Style Guide Go2Asia

## Обзор

Дизайн-система Go2Asia основана на прототипе Bolt.New и обеспечивает единообразие визуального стиля и типографики во всех модулях экосистемы.

## Типографика

### Размеры шрифтов (соответствуют прототипу Bolt.New)

#### Заголовки
- **H1**: `text-3xl md:text-4xl lg:text-5xl` (30px mobile / 36px tablet / 48px desktop)
  - Line height: `leading-8` (32px)
  - Font weight: `font-bold` (700)
  - Margin bottom: `mb-3 md:mb-4`
  - Использование: Главные заголовки страниц, Hero секции

- **H2**: `text-2xl md:text-3xl` (24px mobile / 30px desktop)
  - Line height: `leading-7` (28px)
  - Font weight: `font-bold` (700)
  - Использование: Заголовки секций, подразделы

- **H3**: `text-xl md:text-2xl` (20px mobile / 24px desktop)
  - Line height: `leading-6` (24px)
  - Font weight: `font-bold` (700)
  - Использование: Заголовки карточек, модулей, элементов списка

#### Текст
- **Body**: `text-base` (16px)
  - Line height: `leading-6` (24px)
  - Font weight: `font-normal` (400)
  - Использование: Основной текст, описания

- **Small**: `text-sm md:text-base` (14px mobile / 16px desktop)
  - Line height: `leading-5` (20px)
  - Font weight: `font-normal` (400)
  - Использование: Подзаголовки секций, мета-информация

- **Tiny**: `text-xs md:text-sm` (12px mobile / 14px desktop)
  - Line height: `leading-4` (16px)
  - Font weight: `font-normal` (400)
  - Использование: Бейджи, чипы, мелкие метки

- **Mono**: `text-sm font-mono`
  - Использование: Коды, даты, техническая информация

### Шрифт

```css
font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI',
             system-ui, sans-serif;
```

## Цветовая палитра

### Основные цвета
- **Sky Blue**: `sky-500` до `sky-700` (градиенты для Hero секций)
- **Slate**: `slate-50` до `slate-900` (текст, фоны)
- **White**: `white` (текст на цветных фонах)

### Цвета модулей
- **Atlas/Pulse/Blog/Guru/Space/RF**: `sky-500` до `sky-600`
- **Rielt.Market**: `emerald-500` до `emerald-600`
- **Quest**: `purple-500` до `purple-600`
- **Connect**: `amber-500` до `amber-600`

## Компоненты

### TopAppBar
- Высота: `h-16` (64px)
- Фон: `bg-white`
- Тень: `shadow-sm`

### ModuleTile
- Размеры иконки: `w-6 h-6 md:w-7 md:h-7` (24px mobile / 28px desktop)
- Заголовок: `text-xl md:text-2xl` (H3)
- Описание: `text-xs md:text-sm`

### FeatureCard
- Заголовок: `text-xl md:text-2xl` (H3)
- Описание: `text-sm md:text-base`

### UserSummary
- Заголовок имени: `text-2xl md:text-3xl` (H1)
- Все тексты: `text-white` на градиентном фоне

## Отступы и интервалы

### Секции
- Вертикальные отступы: `py-12` (48px) для основных секций
- Горизонтальные отступы: `px-4 sm:px-6 lg:px-8`
- Максимальная ширина контента: `max-w-7xl mx-auto`

### Элементы
- Отступы между элементами: `gap-3 md:gap-4` (12px mobile / 16px desktop)
- Отступы в карточках: `p-4 md:p-6` (16px mobile / 24px desktop)

### Grid модулей экосистемы
- **Классы**: `grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4`
- **Mobile**: 2 колонки (9 модулей = 5 рядов)
- **Tablet/Desktop**: 3 колонки (9 модулей = 3 ряда)
- **Использование**: Секция "Модули экосистемы" на стартовой странице

## Радиусы скругления

- **xs**: `rounded` (4px) — инпуты, мелкие элементы
- **sm**: `rounded-lg` (8px) — кнопки, мелкие карточки
- **md**: `rounded-xl` (12px) — карточки модулей
- **lg**: `rounded-2xl` (16px) — крупные карточки, секции

## Изображения в карточках

### Правило единообразия изображений

**Изображения в карточках НЕ должны иметь собственных рамок (border-radius).**

- ✅ **Правильно**: Изображение без `rounded-t-lg` или `rounded-t-xl`, скругление применяется только к контейнеру Card
- ❌ **Неправильно**: Изображение с `rounded-t-lg` или `rounded-t-xl` внутри Card

**Применение:**
- Все изображения в карточках статей (Blog Asia)
- Все изображения в карточках стран, городов, мест, гайдов, тем (Atlas Asia)
- Все изображения в карточках событий (Pulse Asia)
- Все изображения в других модулях экосистемы

**Пример правильной реализации:**

```tsx
<Card hover className="h-full overflow-hidden p-0 !border-0">
  <div className="relative w-full h-48 overflow-hidden">
    <img
      src={imageUrl}
      alt={title}
      className="w-full h-full object-cover"
    />
  </div>
  <CardContent className="p-5">
    {/* контент */}
  </CardContent>
</Card>
```

**Важно:**
- `overflow-hidden` — обрезает содержимое по скругленным углам Card
- `p-0` — убирает padding у Card, чтобы изображение было на первом уровне
- `!border-0` — **обязательно с `!` (important)** убирает border у Card, чтобы переопределить `border-2` из базовых стилей компонента
- Padding применяется только к `CardContent`, где находится текст

**Примечание:** Использование `!border-0` (с `!important`) необходимо, так как Card компонент имеет `border-2 border-slate-200` в базовых стилях, и обычный `border-0` может не переопределить их из-за порядка классов.

**Обоснование:**
- Единообразие визуального стиля во всех модулях
- Изображения естественно вписываются в карточку без визуальных разрывов
- Скругление применяется на уровне Card компонента (`rounded-xl`), что обеспечивает целостность дизайна

## Тени

- **sm**: `shadow-sm` — TopAppBar
- **md**: `shadow-md` — карточки по умолчанию
- **lg**: `shadow-lg` — карточки при hover
- **xl**: `shadow-xl` — модальные окна

## Адаптивность

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

### Responsive паттерны
- Мобильные: меньшие размеры шрифтов, вертикальная компоновка
- Планшеты и десктопы: увеличенные размеры шрифтов, горизонтальная компоновка

## Применение

### Правила использования типографики

1. **Заголовки страниц**: H1 + `text-slate-900` (или `text-white` на цветном фоне)
2. **Подзаголовки секций**: H2 + `text-slate-900`
3. **Карточки**: H3 для title + `text-base` для excerpt
4. **Мета-информация**: `text-sm` + `text-slate-500`
5. **Бейджи и чипы**: `text-xs` + `font-medium`

### Правила использования цветов

1. **Текст на цветных фонах**: всегда `text-white`
2. **Текст на белом фоне**: `text-slate-900` для заголовков, `text-slate-600` для текста
3. **Градиенты**: использовать для Hero секций и модульных карточек

## История изменений

### Версия 1.2 (Ноябрь 2025)
- **Критическое изменение**: Убран `border-2 border-slate-200` из базовых стилей Card компонента (`packages/ui/src/components/Card/Card.tsx`)
- Card теперь по умолчанию без border для единообразия изображений
- Border можно добавить через className: `border-2 border-slate-200` там, где нужен
- Добавлено глобальное правило в `globals.css` для карточек с изображениями
- Все карточки с изображениями теперь без рамок во всех модулях

### Версия 1.1 (Ноябрь 2025)
- Добавлено правило единообразия изображений в карточках
- Убраны рамки (`rounded-t-lg`) у изображений в Blog Asia и Atlas Asia
- Изображения теперь используют скругление только на уровне Card компонента

### Версия 1.0 (Ноябрь 2025)
- Приведение типографики в соответствие с прототипом Bolt.New
- Уменьшение размеров заголовков H1, H2, H3
- Обновление размеров текста для лучшей читаемости
- Фиксация правил использования в Style Guide

