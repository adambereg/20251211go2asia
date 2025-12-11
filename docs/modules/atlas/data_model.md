# Atlas Asia — Data Model
Версия 1.0

Этот документ описывает **модель данных на уровне модуля Atlas Asia** — то, какие сущности и поля ожидает фронтенд Atlas от backend-сервисов (прежде всего `atlas_service`, а также связанных RF, Quest, Pulse, Rielt, Reactions, Space).

> Важно:  
> - Истиной по структуре данных является `docs/backend/atlas_service/data_model.md`.  
> - Данный документ описывает **view-модели и UI-представления**, которые опираются на backend-модели, но могут их упрощать/агрегировать.

---

## 1. Общие принципы

1. Atlas — это **трёхуровневая модель локаций**:
   - `Country` → `City` → `Place`.
2. Идентификаторы стабильны:
   - `country_id`, `city_id`, `place_id`.
3. Atlas не хранит пользователей, событий, жилья — только агрегирует ссылки.
4. Текстовые поля приходят в Markdown/HTML.

---

## 2. Базовые сущности Atlas

### 2.1. Country

```
type Country = {
  id: string;
  slug: string;
  name: string;
  name_en?: string;
  region: string;
  short_description: string;
  hero_image_url?: string;
  gallery?: ImageAsset[];
  is_active: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
};
```

### 2.2. CountryContentSections

```
type CountryContentSections = {
  country_id: string;
  overview?: RichContent;
  history?: RichContent;
  geography?: RichContent;
  culture?: RichContent;
  living?: RichContent;
  visas?: RichContent;
  business?: RichContent;
};
```

---

### 2.3. City

```
type City = {
  id: string;
  country_id: string;
  slug: string;
  name: string;
  name_en?: string;
  short_description: string;
  hero_image_url?: string;
  latitude?: number;
  longitude?: number;
  is_active: boolean;
  priority: number;
  has_quests?: boolean;
  has_rf_partners?: boolean;
  has_rentals?: boolean;
  created_at: string;
  updated_at: string;
};
```

---

### 2.4. CityContent

```
type CityContent = {
  city_id: string;
  overview?: RichContent;
  districts?: CityDistrict[];
  lifestyle?: RichContent;
  walks_and_adventures_block?: WalksAndAdventuresBlock;
};
```

#### CityDistrict

```
type CityDistrict = {
  id: string;
  name: string;
  description: string;
  is_center?: boolean;
  tags?: string[];
};
```

---

### 2.5. Place

```
type Place = {
  id: string;
  city_id: string;
  country_id: string;
  slug: string;
  name: string;
  type: PlaceType;
  categories: string[];
  tags?: string[];
  short_description: string;
  description?: RichContent;
  address?: string;
  latitude?: number;
  longitude?: number;
  hero_image_url?: string;
  gallery?: ImageAsset[];
  rf_partner_id?: string;
  has_rf_children?: boolean;
  has_events?: boolean;
  has_quests?: boolean;
  has_rentals_nearby?: boolean;
  rating_summary?: RatingSummary;
  reactions_counters?: ReactionsCounters;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
```

---

### 2.6. RatingSummary, ReactionsCounters

```
type RatingSummary = {
  average_rating: number;
  ratings_count: number;
};

type ReactionsCounters = {
  likes_count?: number;
  short_reviews_count?: number;
  bookmarks_count?: number;
};
```

---

## 3. View-модели для UI

### CountryPageModel

```
type CountryPageModel = {
  country: Country;
  content: CountryContentSections;
  cities: CityListItem[];
};
```

### CityPageModel

```
type CityPageModel = {
  city: City;
  content: CityContent;
  featured_places: PlaceCardModel[];
  other_places?: PlaceCardModel[];
  rf_partners_block?: RFPartnersBlock;
  events_block?: EventsBlockSummary;
  rentals_block?: RentalsBlockSummary;
  walks_and_adventures_block?: WalksAndAdventuresBlock;
};
```

### PlacePageModel

```
type PlacePageModel = {
  place: Place;
  description: RichContent | null;
  rf_venue_block?: RFVenueDetailsBlock;
  events_block?: EventsBlockSummary;
  quests_block?: QuestsAtPlaceBlock;
  rentals_block?: RentalsBlockSummary;
  rating_summary?: RatingSummary;
  reactions_counters?: ReactionsCounters;
  top_short_reviews?: ShortReviewPreview[];
};
```

---

## 4. Фильтрация

```
type PlacesFilter = {
  city_id: string;
  types?: PlaceType[];
  categories?: string[];
  tags?: string[];
  has_rf_only?: boolean;
  has_quests_only?: boolean;
  has_events_only?: boolean;
};
```

---

## 5. Интеграции

- RF → rf_partner_id  
- Quest → place_id в чекпоинтах  
- Pulse → place_id в событиях  
- Rielt → city_id → district  
- Space → posts упоминают place_id  

---

## 6. Ограничения и будущее расширение

- MVP: фиксированные типы мест, вручную управляемые списки.  
- Будущее: AI-маршруты, персональные рекомендации.  

---

## 7. Резюме

Atlas Data Model создаёт географическое ядро экосистемы: страны → города → места.
