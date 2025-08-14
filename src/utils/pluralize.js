/**
 * Утилита для правильного склонения слов в зависимости от числа
 * @param {number} count - количество
 * @param {Array} forms - массив форм слова [одна, несколько, много]
 * @returns {string} - правильная форма слова
 */
export const pluralize = (count, forms) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const index = (count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5];
  return forms[index];
};

/**
 * Склонение слова "товар"
 * @param {number} count - количество товаров
 * @returns {string} - правильная форма слова "товар"
 */
export const pluralizeProduct = (count) => {
  return pluralize(count, ['товар', 'товара', 'товаров']);
};

/**
 * Склонение слова "цветок"
 * @param {number} count - количество цветов
 * @returns {string} - правильная форма слова "цветок"
 */
export const pluralizeFlower = (count) => {
  return pluralize(count, ['цветок', 'цветка', 'цветов']);
};

/**
 * Склонение слова "букет"
 * @param {number} count - количество букетов
 * @returns {string} - правильная форма слова "букет"
 */
export const pluralizeBouquet = (count) => {
  return pluralize(count, ['букет', 'букета', 'букетов']);
};

/**
 * Склонение слова "отзыв"
 * @param {number} count - количество отзывов
 * @returns {string} - правильная форма слова "отзыв"
 */
export const pluralizeReview = (count) => {
  return pluralize(count, ['отзыв', 'отзыва', 'отзывов']);
};

/**
 * Склонение слова "заказ"
 * @param {number} count - количество заказов
 * @returns {string} - правильная форма слова "заказ"
 */
export const pluralizeOrder = (count) => {
  return pluralize(count, ['заказ', 'заказа', 'заказов']);
};

/**
 * Склонение слова "покупатель"
 * @param {number} count - количество покупателей
 * @returns {string} - правильная форма слова "покупатель"
 */
export const pluralizeCustomer = (count) => {
  return pluralize(count, ['покупатель', 'покупателя', 'покупателей']);
};
