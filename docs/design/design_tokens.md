# Design Tokens — система визуальных переменных Go2Asia

Design Tokens — единый источник истины для цветов, размеров, типографики и отступов во всех модулях Go2Asia.

---

# 1. Цвета (colors)

## Brand
- `--color-brand-primary: #2ecc71;`
- `--color-brand-secondary: #27ae60;`

## Neutral
- `--color-neutral-900: #1a1a1a;`
- `--color-neutral-700: #333333;`
- `--color-neutral-500: #666666;`
- `--color-neutral-300: #cccccc;`
- `--color-neutral-100: #f5f5f5;`
- `--color-white: #ffffff;`

## Status
- `--color-success: #2ecc71;`
- `--color-warning: #f1c40f;`
- `--color-error: #e74c3c;`
- `--color-info: #3498db;`

---

# 2. Типографика (font tokens)

```
--font-family-base: "Inter", sans-serif;

--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-md: 16px;
--font-size-lg: 20px;
--font-size-xl: 24px;
--font-size-2xl: 32px;
```

---

# 3. Радиусы (radii)

```
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-xl: 32px;
```

---

# 4. Тени (shadows)

```
--shadow-sm: 0 2px 6px rgba(0,0,0,0.06);
--shadow-md: 0 4px 12px rgba(0,0,0,0.08);
--shadow-lg: 0 8px 20px rgba(0,0,0,0.12);
```

---

# 5. Отступы (spacing)

```
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
```

---

# 6. Grid & Layout tokens

```
--container-width: 1200px;
--card-gap: 16px;
--grid-gap: 24px;
```

---

# 7. Использование токенов

- Использовать **только токены**, не произвольные значения.
- Для AI-агентов: если нужен новый токен → предложить в PR.

---

# 8. Связанные документы

- `ui_kit.md`
- `components/*`
- `layouts/*`
