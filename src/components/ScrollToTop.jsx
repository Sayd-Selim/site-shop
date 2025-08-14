import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../utils/scrollUtils';

const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // Проверяем, есть ли state с категорией (переход с кнопки "Смотреть все")
    const hasCategoryState = state && state.category;
    
    // Если есть state с категорией, не сбрасываем скролл
    if (hasCategoryState) {
      return;
    }

    // В остальных случаях сбрасываем скролл
    const timeoutId = setTimeout(() => {
      scrollToTop({ easing: 'smooth' });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, state]);

  return null; // Этот компонент не рендерит ничего
};

export default ScrollToTop;
