import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { pluralizeProduct } from '../utils/pluralize';
import { useTheme } from '../context/ThemeContext';

const CategoryGrid = ({ categories, onCategorySelect, selectedCategory }) => {
  const { isDarkMode } = useTheme();

  // Иконки для категорий
  const categoryIcons = {
    'Свадебный букет': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        {/* Свадебный букет с лентой */}
        <path d="M12 2l-3 6 3 6 3-6-3-6z" fill="currentColor" opacity="0.8"/>
        <path d="M6 8l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.6"/>
        <path d="M18 8l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.6"/>
        <path d="M12 14l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.7"/>
        <path d="M10 22h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 24h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Лента */}
        <path d="M9 26l3-2 3 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    'Моно букет': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        {/* Однотипный букет */}
        <path d="M12 2l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.8"/>
        <path d="M8 8l-1 2 1 2 1-2-1-2z" fill="currentColor" opacity="0.6"/>
        <path d="M16 8l-1 2 1 2 1-2-1-2z" fill="currentColor" opacity="0.6"/>
        <path d="M12 12l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.7"/>
        <path d="M10 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 22h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Букет MIX': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        {/* Разнообразный букет */}
        <path d="M12 2l-3 6 3 6 3-6-3-6z" fill="currentColor" opacity="0.8"/>
        <path d="M6 8l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.6"/>
        <path d="M18 8l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.6"/>
        <path d="M12 14l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.7"/>
        <path d="M8 18l-1 2 1 2 1-2-1-2z" fill="currentColor" opacity="0.5"/>
        <path d="M16 18l-1 2 1 2 1-2-1-2z" fill="currentColor" opacity="0.5"/>
        <path d="M10 22h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 24h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Комнатные растения': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        {/* Растение в горшке */}
        <path d="M12 4l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.7"/>
        <path d="M8 8l-1 2 1 2 1-2-1-2z" fill="currentColor" opacity="0.5"/>
        <path d="M16 8l-1 2 1 2 1-2-1-2z" fill="currentColor" opacity="0.5"/>
        <path d="M12 12l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.6"/>
        <path d="M10 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Подарочные наборы': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        {/* Подарочный набор */}
        <path d="M12 2l-4 8 4 8 4-8-4-8z" fill="currentColor" opacity="0.8"/>
        <path d="M8 10l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.6"/>
        <path d="M16 10l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.6"/>
        <path d="M12 18l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.7"/>
        <path d="M10 26h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Розы': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        {/* Роза с лепестками */}
        <path d="M12 4l-3 6 3 6 3-6-3-6z" fill="currentColor" opacity="0.8"/>
        <path d="M9 10l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.6"/>
        <path d="M15 10l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.6"/>
        <path d="M12 18l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.7"/>
        <path d="M10 26h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 28h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Тюльпаны': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        {/* Тюльпан */}
        <path d="M12 2l-2 8 2 8 2-8-2-8z" fill="currentColor" opacity="0.8"/>
        <path d="M8 10l-1 4 1 4 1-4-1-4z" fill="currentColor" opacity="0.6"/>
        <path d="M16 10l-1 4 1 4 1-4-1-4z" fill="currentColor" opacity="0.6"/>
        <path d="M12 18l-1 4 1 4 1-4-1-4z" fill="currentColor" opacity="0.7"/>
        <path d="M10 26h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Пионы': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        {/* Пион */}
        <path d="M12 2l-4 8 4 8 4-8-4-8z" fill="currentColor" opacity="0.8"/>
        <path d="M8 10l-3 6 3 6 3-6-3-6z" fill="currentColor" opacity="0.6"/>
        <path d="M16 10l-3 6 3 6 3-6-3-6z" fill="currentColor" opacity="0.6"/>
        <path d="M12 18l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.7"/>
        <path d="M10 26h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Лилии': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        {/* Лилия */}
        <path d="M12 2l-2 6 2 6 2-6-2-6z" fill="currentColor" opacity="0.8"/>
        <path d="M8 8l-1 3 1 3 1-3-1-3z" fill="currentColor" opacity="0.6"/>
        <path d="M16 8l-1 3 1 3 1-3-1-3z" fill="currentColor" opacity="0.6"/>
        <path d="M12 14l-1 3 1 3 1-3-1-3z" fill="currentColor" opacity="0.7"/>
        <path d="M10 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Хризантемы': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        {/* Хризантема */}
        <path d="M12 2l-3 6 3 6 3-6-3-6z" fill="currentColor" opacity="0.8"/>
        <path d="M6 8l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.6"/>
        <path d="M18 8l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.6"/>
        <path d="M12 14l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.7"/>
        <path d="M10 22h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Орхидеи': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        {/* Орхидея */}
        <path d="M12 2l-2 6 2 6 2-6-2-6z" fill="currentColor" opacity="0.8"/>
        <path d="M8 8l-1 3 1 3 1-3-1-3z" fill="currentColor" opacity="0.6"/>
        <path d="M16 8l-1 3 1 3 1-3-1-3z" fill="currentColor" opacity="0.6"/>
        <path d="M12 14l-1 3 1 3 1-3-1-3z" fill="currentColor" opacity="0.7"/>
        <path d="M10 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Герберы': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        {/* Гербера */}
        <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.8"/>
        <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.6"/>
        <path d="M12 20v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 24h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Сезонные цветы': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        {/* Сезонные цветы */}
        <path d="M12 2l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.8"/>
        <path d="M8 8l-1 2 1 2 1-2-1-2z" fill="currentColor" opacity="0.6"/>
        <path d="M16 8l-1 2 1 2 1-2-1-2z" fill="currentColor" opacity="0.6"/>
        <path d="M12 12l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.7"/>
        <path d="M10 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 22h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  };

  // Цвета для категорий (светлая тема)
  const categoryColors = {
    'Свадебный букет': 'from-pink-400 to-rose-500',
    'Моно букет': 'from-blue-400 to-indigo-500',
    'Букет MIX': 'from-purple-400 to-violet-500',
    'Комнатные растения': 'from-green-400 to-emerald-500',
    'Подарочные наборы': 'from-yellow-400 to-orange-500',
    'Розы': 'from-red-400 to-pink-500',
    'Тюльпаны': 'from-pink-400 to-purple-500',
    'Пионы': 'from-pink-400 to-rose-500',
    'Лилии': 'from-white to-gray-300',
    'Хризантемы': 'from-yellow-400 to-orange-500',
    'Орхидеи': 'from-purple-400 to-pink-500',
    'Герберы': 'from-yellow-400 to-orange-500',
    'Сезонные цветы': 'from-green-400 to-blue-500'
  };

  // Цвета для категорий (темная тема)
  const categoryColorsDark = {
    'Свадебный букет': 'from-pink-500 to-rose-600',
    'Моно букет': 'from-blue-500 to-indigo-600',
    'Букет MIX': 'from-purple-500 to-violet-600',
    'Комнатные растения': 'from-green-500 to-emerald-600',
    'Подарочные наборы': 'from-yellow-500 to-orange-600',
    'Розы': 'from-red-500 to-pink-600',
    'Тюльпаны': 'from-pink-500 to-purple-600',
    'Пионы': 'from-pink-500 to-rose-600',
    'Лилии': 'from-gray-300 to-gray-400',
    'Хризантемы': 'from-yellow-500 to-orange-600',
    'Орхидеи': 'from-purple-500 to-pink-600',
    'Герберы': 'from-yellow-500 to-orange-600',
    'Сезонные цветы': 'from-green-500 to-blue-600'
  };

  // Получить иконку для категории
  const getCategoryIcon = (categoryName) => {
    return categoryIcons[categoryName] || (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.8"/>
        <path d="M8 8l-1 2 1 2 1-2-1-2z" fill="currentColor" opacity="0.6"/>
        <path d="M16 8l-1 2 1 2 1-2-1-2z" fill="currentColor" opacity="0.6"/>
        <path d="M12 12l-2 4 2 4 2-4-2-4z" fill="currentColor" opacity="0.7"/>
        <path d="M10 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  };

  // Получить цвет для категории
  const getCategoryColor = (categoryName) => {
    const colors = isDarkMode ? categoryColorsDark : categoryColors;
    return colors[categoryName] || (isDarkMode ? 'from-gray-500 to-gray-700' : 'from-gray-400 to-gray-600');
  };

  return (
    <div className="py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-3xl p-6 mb-8 shadow-xl dark:shadow-soft-dark border border-white/20 dark:border-gray-700/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-handwritten-primary text-glow">Категории цветов</h2>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-handwritten-accent">
            Выберите подходящую категорию и найдите идеальный букет для любого случая
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <button
                onClick={() => onCategorySelect(category.name)}
                className={`w-full p-6 rounded-xl transition-all duration-300 transform group-hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
                  selectedCategory === category.name
                    ? 'ring-4 ring-blue-500 dark:ring-blue-400 shadow-xl dark:shadow-soft-dark'
                    : 'hover:shadow-lg dark:hover:shadow-soft-dark'
                }`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${getCategoryColor(category.name)} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                  {getCategoryIcon(category.name)}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-handwritten-secondary">
                  {category.name === 'Свадебный букет' ? '💒 ' + category.name :
                   category.name === 'Моно букет' ? '🌹 ' + category.name :
                   category.name === 'Букет MIX' ? '🌸 ' + category.name :
                   category.name === 'Комнатные растения' ? '🌿 ' + category.name :
                   category.name === 'Подарочные наборы' ? '🎁 ' + category.name :
                   category.name === 'Розы' ? '🌹 ' + category.name :
                   category.name === 'Тюльпаны' ? '🌷 ' + category.name :
                   category.name === 'Пионы' ? '🌺 ' + category.name :
                   category.name === 'Лилии' ? '⚜️ ' + category.name :
                   category.name === 'Хризантемы' ? '🌼 ' + category.name :
                   category.name === 'Орхидеи' ? '🦋 ' + category.name :
                   category.name === 'Герберы' ? '🌻 ' + category.name :
                   category.name === 'Сезонные цветы' ? '🌱 ' + category.name :
                   category.name}
                </h3>
                
                <p className="text-xl text-gray-500 dark:text-gray-400 font-handwritten-accent">
                  <span className="font-handwritten-stats text-blue-600 dark:text-blue-400">{category.count}</span> {pluralizeProduct(category.count)}
                </p>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid; 