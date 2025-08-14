# Система склонения слов

Этот документ описывает систему правильного склонения слов в зависимости от числа в приложении.

## Обзор

Система склонения автоматически выбирает правильную форму слова в зависимости от количества:
- 1 товар
- 2 товара  
- 5 товаров
- 11 товаров
- 21 товар
- 22 товара
- 25 товаров

## Основные функции

### 1. pluralize (общая функция)
**Файл:** `src/utils/pluralize.js`

Универсальная функция для склонения любых слов.

```jsx
import { pluralize } from '../utils/pluralize';

// Склонение слова "отзыв"
pluralize(1, ['отзыв', 'отзыва', 'отзывов']); // "отзыв"
pluralize(2, ['отзыв', 'отзыва', 'отзывов']); // "отзыва"
pluralize(5, ['отзыв', 'отзыва', 'отзывов']); // "отзывов"
```

### 2. pluralizeProduct (товары)
**Файл:** `src/utils/pluralize.js`

Специальная функция для склонения слова "товар".

```jsx
import { pluralizeProduct } from '../utils/pluralize';

pluralizeProduct(1);  // "товар"
pluralizeProduct(2);  // "товара"
pluralizeProduct(5);  // "товаров"
pluralizeProduct(11); // "товаров"
pluralizeProduct(21); // "товар"
pluralizeProduct(22); // "товара"
pluralizeProduct(25); // "товаров"
```

### 3. pluralizeFlower (цветы)
**Файл:** `src/utils/pluralize.js`

Специальная функция для склонения слова "цветок".

```jsx
import { pluralizeFlower } from '../utils/pluralize';

pluralizeFlower(1);  // "цветок"
pluralizeFlower(2);  // "цветка"
pluralizeFlower(5);  // "цветов"
```

### 4. pluralizeBouquet (букеты)
**Файл:** `src/utils/pluralize.js`

Специальная функция для склонения слова "букет".

```jsx
import { pluralizeBouquet } from '../utils/pluralize';

pluralizeBouquet(1);  // "букет"
pluralizeBouquet(2);  // "букета"
pluralizeBouquet(5);  // "букетов"
```

### 5. Другие функции
- `pluralizeReview(count)` - склонение "отзыв"
- `pluralizeOrder(count)` - склонение "заказ"
- `pluralizeCustomer(count)` - склонение "покупатель"

## Использование в компонентах

### В PopularCategories
```jsx
import { pluralizeProduct } from '../utils/pluralize';

<span className="text-sm font-medium text-gray-500">
  {category.count} {pluralizeProduct(category.count)}
</span>
```

### В Products
```jsx
import { pluralizeFlower } from '../utils/pluralize';

<div className="text-gray-600 font-handwritten-accent text-xl">
  Найдено {pluralizeFlower(filteredProducts.length)}: {filteredProducts.length}
</div>
```

### В Cart
```jsx
import { pluralizeProduct } from '../utils/pluralize';

<p className="text-gray-600 dark:text-gray-400 mt-2">
  {cartItems.length} {pluralizeProduct(cartItems.length)} на сумму {getCartTotal().toLocaleString()} ₽
</p>
```

## Алгоритм склонения

Система использует русские правила склонения:

1. **Единственное число (1, 21, 31, 41...):** первая форма
2. **Множественное число (2-4, 22-24, 32-34...):** вторая форма  
3. **Множественное число (5-20, 25-30, 35-40...):** третья форма

### Исключения
- Числа 11-14 всегда используют третью форму
- Числа, заканчивающиеся на 1 (кроме 11) используют первую форму
- Числа, заканчивающиеся на 2-4 (кроме 12-14) используют вторую форму
- Остальные числа используют третью форму

## Примеры использования

### В интерфейсе
- "156 товаров" вместо "156 товар"
- "Найдено 3 цветка" вместо "Найдено 3 цветок"
- "2 букета в корзине" вместо "2 букет в корзине"

### В уведомлениях
- "Товар добавлен в корзину" (1 товар)
- "2 товара добавлены в корзину" (2 товара)
- "5 товаров добавлено в корзину" (5 товаров)

## Тестирование

Для проверки работы склонения можно использовать тестовый файл:
```jsx
import './utils/pluralize.test.js';
```

Тест выводит в консоль примеры склонения для разных чисел.

## Добавление новых слов

Для добавления нового слова создайте функцию:

```jsx
export const pluralizeNewWord = (count) => {
  return pluralize(count, ['форма1', 'форма2', 'форма3']);
};
```

Где:
- `форма1` - единственное число (1, 21, 31...)
- `форма2` - множественное число (2-4, 22-24...)
- `форма3` - множественное число (5-20, 25-30...)

## Совместимость

Система работает с:
- React компонентами
- TypeScript (если используется)
- Любыми числовыми значениями
- Интернационализацией (i18n)

## Производительность

- Функции оптимизированы для быстрого выполнения
- Минимальное потребление памяти
- Кэширование не требуется (простая математическая операция)
