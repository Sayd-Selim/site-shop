import { pluralize, pluralizeProduct, pluralizeFlower, pluralizeBouquet } from './pluralize';

// Тест для функции pluralize
console.log('=== Тест склонения слов ===');

// Тест товаров
console.log('Товары:');
console.log(`1 ${pluralizeProduct(1)}`); // 1 товар
console.log(`2 ${pluralizeProduct(2)}`); // 2 товара
console.log(`5 ${pluralizeProduct(5)}`); // 5 товаров
console.log(`11 ${pluralizeProduct(11)}`); // 11 товаров
console.log(`21 ${pluralizeProduct(21)}`); // 21 товар
console.log(`22 ${pluralizeProduct(22)}`); // 22 товара
console.log(`25 ${pluralizeProduct(25)}`); // 25 товаров

// Тест цветов
console.log('\nЦветы:');
console.log(`1 ${pluralizeFlower(1)}`); // 1 цветок
console.log(`2 ${pluralizeFlower(2)}`); // 2 цветка
console.log(`5 ${pluralizeFlower(5)}`); // 5 цветов
console.log(`11 ${pluralizeFlower(11)}`); // 11 цветов
console.log(`21 ${pluralizeFlower(21)}`); // 21 цветок
console.log(`22 ${pluralizeFlower(22)}`); // 22 цветка
console.log(`25 ${pluralizeFlower(25)}`); // 25 цветов

// Тест букетов
console.log('\nБукеты:');
console.log(`1 ${pluralizeBouquet(1)}`); // 1 букет
console.log(`2 ${pluralizeBouquet(2)}`); // 2 букета
console.log(`5 ${pluralizeBouquet(5)}`); // 5 букетов
console.log(`11 ${pluralizeBouquet(11)}`); // 11 букетов
console.log(`21 ${pluralizeBouquet(21)}`); // 21 букет
console.log(`22 ${pluralizeBouquet(22)}`); // 22 букета
console.log(`25 ${pluralizeBouquet(25)}`); // 25 букетов

// Тест общей функции
console.log('\nОбщая функция:');
console.log(`1 ${pluralize(1, ['отзыв', 'отзыва', 'отзывов'])}`); // 1 отзыв
console.log(`2 ${pluralize(2, ['отзыв', 'отзыва', 'отзывов'])}`); // 2 отзыва
console.log(`5 ${pluralize(5, ['отзыв', 'отзыва', 'отзывов'])}`); // 5 отзывов
