import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const HeroSection = ({ stats, onConsultationClick }) => {
  const { isDarkMode } = useTheme();

  const scrollToBouquets = () => {
    const bouquetsSection = document.getElementById('popular-categories');
    if (bouquetsSection) {
      bouquetsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback - скролл вниз на определенное расстояние
      window.scrollBy({
        top: 800,
        behavior: 'smooth'
      });
    }
  };

  const handleConsultation = () => {
    if (onConsultationClick) {
      onConsultationClick();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Заголовок */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-handwritten-primary text-glow">
              Каталог <span className="text-pink-600 dark:text-pink-400">цветов</span>
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-handwritten-accent">
              Красивые букеты, комнатные растения и цветочные композиции для любого случая
            </p>
          </div>
          
          {/* Статистика */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {[
              { label: 'Видов цветов', value: stats.total, icon: '🌸', color: 'pink' },
              { label: 'Категорий букетов', value: stats.categories, icon: '💐', color: 'green' },
              { label: 'Средняя цена', value: `${stats.averagePrice}₽`, icon: '💰', color: 'yellow' },
              { label: 'Макс. скидка', value: `${stats.maxDiscount}%`, icon: '🌺', color: 'red' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-soft-dark transition-all duration-300"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className={`text-xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-1 font-handwritten-stats`}>{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-handwritten-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Кнопки действий */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <button 
              onClick={scrollToBouquets}
              className="flex items-center space-x-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white rounded-lg transition-colors shadow-sm hover:shadow-md font-handwritten-button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              <span className="font-medium">Смотреть букеты</span>
            </button>
            <button 
              onClick={handleConsultation}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors font-handwritten-button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">Консультация флориста</span>
            </button>
          </motion.div>

          {/* Преимущества */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-handwritten-feature text-xl">Бесплатная доставка от 3000₽</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
              <span className="font-handwritten-feature text-xl">Гарантия свежести</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="font-handwritten-feature text-xl">Доставка 24/7</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-wrap items-center justify-between text-xl text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <span className="font-handwritten-accent text-xl">Свежие цветы каждый день</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-handwritten-accent text-xl">Цветы в наличии</span>
            </div>
          </div>
        </motion.div>
      </div>
      
    </div>
  );
};

export default HeroSection; 