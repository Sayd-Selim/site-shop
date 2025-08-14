/**
 * Утилиты для работы с изображениями
 */

/**
 * Получить изображение из папки Mono по индексу
 * @param {number} index - индекс изображения (начиная с 1)
 * @returns {string} - путь к изображению
 */
export const getMonoImage = (index = 1) => {
  return process.env.PUBLIC_URL + `/images/Mono/${index}.jpg`;
};

/**
 * Получить изображение из папки Marriage по индексу
 * @param {number} index - индекс изображения (начиная с 1)
 * @returns {string} - путь к изображению
 */
export const getMarriageImage = (index = 1) => {
  return process.env.PUBLIC_URL + `/images/marriage/${index}.jpg`;
};

/**
 * Получить изображение из папки Mix по индексу
 * @param {number} index - индекс изображения (начиная с 1)
 * @returns {string} - путь к изображению
 */
export const getMixImage = (index = 1) => {
  return process.env.PUBLIC_URL + `/images/Mix/${index}.jpg`;
};

/**
 * Получить случайное изображение из папки Mono
 * @param {number} maxIndex - максимальный индекс изображения
 * @returns {string} - путь к случайному изображению
 */
export const getRandomMonoImage = (maxIndex = 1) => {
  const randomIndex = Math.floor(Math.random() * maxIndex) + 1;
  return getMonoImage(randomIndex);
};

/**
 * Получить изображение по категории и индексу
 * @param {string} category - категория товара
 * @param {number} index - индекс изображения
 * @returns {string} - путь к изображению
 */
export const getImageByCategory = (category, index = 1) => {
  switch (category) {
    case 'Моно букет':
      return getMonoImage(index);
    case 'Свадебный букет':
      return getMarriageImage(index);
    case 'Букет MIX':
      return getMixImage(index);
    default:
      // Для других категорий используем заглушку или внешние изображения
      return `https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop&crop=center`;
  }
};

/**
 * Проверить, существует ли изображение
 * @param {string} imagePath - путь к изображению
 * @returns {Promise<boolean>} - существует ли изображение
 */
export const checkImageExists = (imagePath) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imagePath;
  });
};

/**
 * Получить список доступных изображений для категории
 * @param {string} category - категория товара
 * @returns {Array<string>} - массив путей к изображениям
 */
export const getAvailableImages = async (category) => {
  const images = [];
  let index = 1;
  
  while (index <= 10) { // Проверяем до 10 изображений
    const imagePath = getImageByCategory(category, index);
    const exists = await checkImageExists(imagePath);
    
    if (exists) {
      images.push(imagePath);
    } else {
      break; // Прерываем, если изображение не найдено
    }
    
    index++;
  }
  
  return images;
};
