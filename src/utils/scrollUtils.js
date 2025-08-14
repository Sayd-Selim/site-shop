// Утилиты для управления скроллом

/**
 * Плавная прокрутка к началу страницы
 * @param {Object} options - Опции прокрутки
 * @param {number} options.duration - Длительность анимации в мс (по умолчанию 500)
 * @param {string} options.easing - Тип анимации ('smooth', 'easeInOut', 'custom')
 */
export const scrollToTop = (options = {}) => {
  const { duration = 500, easing = 'smooth' } = options;

  if (easing === 'smooth') {
    // Используем нативный smooth scroll
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  } else if (easing === 'custom') {
    // Кастомная анимация с requestAnimationFrame
    const startTime = performance.now();
    const startScroll = window.pageYOffset || document.documentElement.scrollTop;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Функция плавности (easeInOut)
      const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const easedProgress = easeInOut(progress);

      const currentScroll = startScroll * (1 - easedProgress);
      window.scrollTo(0, currentScroll);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  } else {
    // Мгновенная прокрутка
    window.scrollTo(0, 0);
  }
};

/**
 * Прокрутка к элементу
 * @param {HTMLElement|string} element - Элемент или селектор
 * @param {Object} options - Опции прокрутки
 */
export const scrollToElement = (element, options = {}) => {
  const { offset = 0, duration = 500 } = options;
  
  const targetElement = typeof element === 'string' 
    ? document.querySelector(element) 
    : element;

  if (targetElement) {
    const targetPosition = targetElement.offsetTop - offset;
    
    window.scrollTo({
      top: targetPosition,
      left: 0,
      behavior: 'smooth'
    });
  }
};

/**
 * Проверка, находится ли элемент в области видимости
 * @param {HTMLElement} element - Элемент для проверки
 * @param {number} threshold - Порог видимости (0-1)
 * @returns {boolean}
 */
export const isElementInViewport = (element, threshold = 0.1) => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const elementHeight = rect.height;
  
  return visibleHeight / elementHeight >= threshold;
};

/**
 * Получение текущей позиции скролла
 * @returns {number}
 */
export const getScrollPosition = () => {
  return window.pageYOffset || document.documentElement.scrollTop;
};

/**
 * Проверка, находится ли страница в начале
 * @returns {boolean}
 */
export const isAtTop = () => {
  return getScrollPosition() === 0;
};
