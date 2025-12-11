# Space Asia — Data Model

## 1. User
- id
- username
- avatar_url
- role: traveler | expat | pro | business
- level
- xp
- points_balance
- g2a_balance
- nft_ids[]
- referral_code
- referred_by?
- created_at

---

## 2. Post
- id
- author_id
- type: text | photo | gallery | poll | repost | guide | event | place | quest_progress
- text
- media_urls[]
- poll_options[]
- poll_results[]
- referenced_entity_id? (place/event/quest/article)
- created_at
- updated_at
- visibility: public | friends | private
- tags[]

---

## 3. FeedItem
Материал, который появляется в персональной ленте.

- id
- post_id
- reason: my_post | liked | friend_post | system_recommend | quest_completed | voucher_purchase
- created_at

---

## 4. Reaction
- id  
- post_id  
- user_id  
- type: like | love | wow | angry | info  
- created_at

---

## 5. Comment
- id
- post_id
- user_id
- text
- media?
- created_at

---

## 6. Achievement
- id
- user_id
- type
- points_reward
- achieved_at

Примеры:
- “Первый пост”
- “Взял 10 квестов”
- “100 лайков на посте”

---

## 7. NFT
- id
- owner_id
- title
- description
- icon_url
- rarity: common | rare | epic | legendary
- earned_at

---

## 8. Referral
- id
- inviter_id
- friend_id
- points_reward_user
- points_reward_friend
- created_at

---

## 9. Notification
- id
- user_id
- type: like | comment | follow | reward | quest_complete | voucher | system
- text
- entity_id?
- created_at

---

## 10. Voucher (интеграция RF)
- id
- user_id
- partner_id
- points_spent
- expires_at
- is_used

---

## 11. QuestProgress (интеграция Quest Asia)
- id
- user_id
- quest_id
- completed_steps
- status
