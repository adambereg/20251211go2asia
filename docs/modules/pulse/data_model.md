# Pulse Asia — Data Model  
**Версия 1.0**

Документ описывает **UI-модель данных** модуля **Pulse Asia**, включающего календарь событий, списки мероприятий, детальные страницы событий и кросс-интеграции с другими модулями Go2Asia.

Цель: дать Cursor и другим агентам полную формальную структуру сущностей, их связей и проекций.

---

# 1. Основная сущность: `Event`

```ts
Event {
  id: string;
  slug: string;

  title: string;
  subtitle?: string;
  description: string;

  status: "draft" | "scheduled" | "published" | "cancelled" | "past";

  // Время
  start_at: string;   // ISO
  end_at: string;     // ISO
  timezone: string;   // Asia/Bangkok

  // Формат и локация
  format: "offline" | "online" | "hybrid";
  location: EventLocation;

  // Категории
  categories: EventCategory[];
  tags: string[];

  // Метки качества
  is_editorial: boolean;
  is_community: boolean;
  is_featured: boolean;
  is_verified: boolean;

  // Организатор
  organizer: EventOrganizer;

  // Билеты
  tickets: TicketTier[];
  min_price?: number;
  max_price?: number;
  currency?: string;

  // Связи с экосистемой
  atlas_country_id?: string;
  atlas_city_id?: string;
  atlas_place_id?: string;
  rf_partner_id?: string;
  quest_id?: string;
  voucher_ids?: string[];

  // Медиа
  cover_image: ImageAsset;
  gallery?: ImageAsset[];

  // Статистика
  stats: EventStats;

  // Служебное
  language: string;
  created_at: string;
  updated_at: string;
}
```

---

# 2. `EventLocation`

```ts
EventLocation {
  type: "place" | "city" | "mixed" | "online";

  atlas_country_id?: string;
  atlas_city_id?: string;
  atlas_place_id?: string;

  label: string;
  address_line?: string;
  lat?: number;
  lng?: number;
  map_provider?: "osm" | "google" | "other";

  online_url?: string;
  platform?: string;
}
```

---

# 3. Категории (`EventCategory`)

```ts
EventCategory {
  id: string;
  slug: string;
  name: string;
  icon?: string;
  color_token?: string;
  is_primary: boolean;
}
```

### Базовые категории (MVP)

- Еда  
- Музыка  
- Культура  
- Спорт  
- IT  
- Сообщество  
- Детям  
- Ночная жизнь  
- Бизнес  
- Фестивали  

---

# 4. Организатор (`EventOrganizer`)

```ts
EventOrganizer {
  id: string;
  type: "user" | "business_partner" | "editorial";

  display_name: string;
  avatar_url?: string;

  space_profile_id?: string;
  rf_partner_id?: string;

  website_url?: string;

  social_links?: {
    type: "instagram" | "facebook" | "telegram" | "site" | "other";
    url: string;
  }[];

  contact_reaction_target?: {
    target_type: string;
    target_id: string;
  };
}
```

---

# 5. Билеты (`TicketTier`)

```ts
TicketTier {
  id: string;
  name: string;
  description?: string;

  price?: number;
  currency?: string;

  is_free: boolean;
  is_donation: boolean;

  capacity_total?: number;
  capacity_reserved?: number;

  sales_url?: string;
  sales_status: "available" | "few_left" | "sold_out" | "closed";
}
```

---

# 6. Медиа и статистика

### ImageAsset

```ts
ImageAsset {
  url: string;
  alt: string;
  focus?: { x: number; y: number };
}
```

### EventStats

```ts
EventStats {
  views: number;
  reactions: {
    likes: number;
    bookmarks: number;
    reposts: number;
    short_reviews: number;
  };
  rsvp_count: number;
}
```

---

# 7. Пользовательское состояние (`UserEventState`)

```ts
UserEventState {
  event_id: string;
  user_id: string;

  rsvp_status: "none" | "interested" | "going" | "maybe";
  is_bookmarked: boolean;

  notifications_enabled: boolean;

  last_seen_at?: string;
}
```

---

# 8. Проекции данных

## 8.1. `CalendarCellEvent`

```ts
CalendarCellEvent {
  id: string;
  title: string;
  start_time: string;
  category_slug: string;
  is_featured: boolean;
}
```

---

## 8.2. `EventListItem`

```ts
EventListItem {
  id: string;
  slug: string;
  title: string;

  date_label: string;
  location_label: string;

  main_category: EventCategory;
  tags: string[];

  cover_image: ImageAsset;

  is_verified: boolean;
  is_editorial: boolean;
  is_featured: boolean;

  price_label: string;

  rsvp_badge?: string;

  user_state?: {
    rsvp_status: "none" | "interested" | "going" | "maybe";
    is_bookmarked: boolean;
  };
}
```

---

# 9. Фильтры и поиск

```ts
PulseFilters {
  date_mode: "month" | "week" | "day" | "range";
  date_from?: string;
  date_to?: string;

  country_id?: string;
  city_id?: string;
  place_id?: string;

  categories?: string[];
  tags?: string[];

  format?: "offline" | "online" | "hybrid";
  price_type?: "all" | "free" | "paid";
  only_verified?: boolean;
  only_editorial?: boolean;
  with_kids?: boolean;

  search_query?: string;
}
```

---
