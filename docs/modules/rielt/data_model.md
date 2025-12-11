# Rielt.Market Asia — Data Model

## 1. Основные сущности

### User
- id (UUID)
- role: renter | landlord | agent | pro | admin
- verification_status
- contacts (phone, email, Telegram, WhatsApp)

### Property
- id
- owner_id
- type: apartment | condo | house | room | villa
- status: active | hidden | archived
- country_id
- city_id
- district_id
- address
- coordinates (lat, lng)
- price_month
- currency
- deposit_amount
- min_contract_months
- is_verified
- amenities: [wifi, kitchen, balcony, pool, gym, washing_machine, etc]
- photos: [Media]

### Media
- id
- url
- width
- height
- order_index

### Listing
(конкретное объявление для объекта)
- id
- property_id
- title
- description
- price
- published_at
- available_from
- boost_level: none | basic | premium
- views_count
- likes_count

### Favorites
- id
- user_id
- property_id

### BookingRequest
- id
- user_id
- property_id
- message
- requested_from
- requested_to
- status: new | viewed | rejected | approved

### Verification
- id
- property_id
- verification_type: documents | photos | video_call | agent_visit
- status
- reviewer_id
- notes

### District (импорт из Atlas Asia)
- id
- name
- description
- city_id

## 2. ER-диаграмма (словесно)
- User 1—N Property  
- Property 1—N Listing  
- Property 1—N BookingRequest  
- User N—N Property (Favorites)  
- Property 1—N Media  
- Property 1—1 Verification  
- District 1—N Property  

