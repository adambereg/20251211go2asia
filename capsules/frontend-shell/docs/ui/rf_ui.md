# Russian Friendly - UI Документация

> **Документация UI модуля Russian Friendly - каталог партнёров**

**Версия:** 1.0  
**Дата:** 2025-01-14

---

## 📋 Обзор

Russian Friendly - модуль каталога партнёров с ваучерами и отзывами.

**Роут:** `/rf`  
**Тип:** Публичный + Защищённый модуль

---

## 🏪 Структура страниц

### Публичные страницы

#### Каталог партнёров

**Роут:** `/rf`  
**Файл:** `app/(public)/rf/page.tsx`

**Содержимое:**
- Список партнёров
- Фильтры (категория, город, рейтинг)
- Поиск
- Секции (кафе, рестораны, коворкинги и т.д.)

#### Страница партнёра

**Роут:** `/rf/[id]`  
**Файл:** `app/(public)/rf/[id]/page.tsx`

**Содержимое:**
- Информация о партнёре
- Галерея
- Отзывы
- Ваучеры
- Карта

#### Ваучеры**

**Роут:** `/rf/vouchers`  
**Файл:** `app/(public)/rf/vouchers/page.tsx`

**Содержимое:**
- Каталог ваучеров
- Фильтры
- Активные ваучеры

### Защищённые страницы

#### Merchant (Партнёр)

**Роут:** `/rf/merchant`  
**Файл:** `app/(authenticated)/rf/merchant/page.tsx`

**Страницы:**
- Дашборд (`/rf/merchant`)
- Профиль (`/rf/merchant/profile`)
- Статистика (`/rf/merchant/stats`)
- Отзывы (`/rf/merchant/reviews`)
- Ваучеры (`/rf/merchant/vouchers`)
- Настройки (`/rf/merchant/settings`)

#### PRO (PRO пользователь)

**Роут:** `/rf/pro`  
**Файл:** `app/(authenticated)/rf/pro/page.tsx`

**Страницы:**
- Дашборд (`/rf/pro`)
- Онбординг (`/rf/pro/onboarding`)
- Партнёры (`/rf/pro/partners`)
- Награды (`/rf/pro/rewards`)
- Верификации (`/rf/pro/verifications`)

---

## 🧩 Компоненты

### Расположение

`components/rf/`

### Основные компоненты

#### Каталог

- **CatalogView** - Представление каталога
- **PartnerCard** - Карточка партнёра
- **PartnerGrid** - Сетка партнёров
- **FilterChips** - Фильтры
- **SearchHeader** - Поисковая строка
- **SectionsBlock** - Блок секций

#### Детали партнёра

- **PartnerDetailView** - Детали партнёра
- **PartnerGallery** - Галерея
- **PartnerReviews** - Отзывы
- **PartnerVouchers** - Ваучеры
- **PartnerMap** - Карта

#### Merchant

- **MerchantDashboard** - Дашборд партнёра
- **MerchantStats** - Статистика
- **MerchantReviews** - Управление отзывами
- **MerchantVouchers** - Управление ваучерами

#### PRO

- **PRODashboard** - Дашборд PRO
- **PROOnboarding** - Онбординг
- **PROPartners** - Партнёры
- **PRORewards** - Награды
- **PROVerifications** - Верификации

### Типы данных

```typescript
type PartnerCategory = 'cafe' | 'restaurant' | 'coworking' | 'market' | 'service' | 'housing' | 'shop' | 'other';
type VoucherType = 'discount_percent' | 'discount_fixed' | 'gift' | 'combo';
type AverageCheck = '$' | '$$' | '$$$';

interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  description: string;
  address: {
    street: string;
    city: string;
    country: string;
    coordinates: Coordinates;
  };
  rating: number;
  reviewsCount: number;
  averageCheck: AverageCheck;
  vouchers: Voucher[];
}
```

---

## 🎨 Стилизация

- **Градиент Hero:** `from-blue-500 to-blue-600`
- **Основной цвет:** `blue-500`

---

## 🔗 Связанные документы

- [ui_structure.md](./ui_structure.md)
- [design_system.md](./design_system.md)

---

**Версия:** 1.0

