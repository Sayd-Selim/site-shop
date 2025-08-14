import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PremiumProductCard from '../components/PremiumProductCard';
import { premiumHolsters } from '../data/premiumHolsters';

const PremiumHolsters = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { id: 'all', name: 'Все кобуры' },
    { id: 'leather', name: 'Кожаные' },
    { id: 'tactical', name: 'Тактические' },
    { id: 'classic', name: 'Классические' }
  ];

  const sortOptions = [
    { id: 'name', name: 'По названию' },
    { id: 'price-low', name: 'Цена: по возрастанию' },
    { id: 'price-high', name: 'Цена: по убыванию' },
    { id: 'rating', name: 'По рейтингу' }
  ];

  const filterProducts = (products) => {
    let filtered = products;

    // Фильтрация по категории
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => {
        if (selectedCategory === 'leather') {
          return product.material?.includes('кожа');
        } else if (selectedCategory === 'tactical') {
          return product.material?.includes('кевлар') || product.material?.includes('углепластик');
        } else if (selectedCategory === 'classic') {
          return product.material === 'Натуральная кожа' && !product.material?.includes('кевлар');
        }
        return true;
      });
    }

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredProducts = filterProducts(premiumHolsters);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold tracking-tight mb-4 uppercase">
              Премиальные кобуры
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Высококачественные кобуры для профессионалов. Военная эстетика, 
              премиальные материалы, безупречное качество.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Фильтры и сортировка */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Категории */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 font-bold tracking-wide uppercase transition-all duration-200 border-2 ${
                    selectedCategory === category.id
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300 hover:border-black'
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>

            {/* Сортировка */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">Сортировка:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 bg-white font-medium focus:outline-none focus:border-black"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Сетка товаров */}
      <div className="container mx-auto px-4 py-12">
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Товары не найдены
            </h3>
            <p className="text-gray-600">
              Попробуйте изменить параметры фильтрации
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <PremiumProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Статистика */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">{premiumHolsters.length}</div>
              <div className="text-gray-300 uppercase tracking-wide">Моделей кобур</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">4.8</div>
              <div className="text-gray-300 uppercase tracking-wide">Средний рейтинг</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-gray-300 uppercase tracking-wide">Гарантия качества</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Описание */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-black mb-6 uppercase tracking-wide"
            >
              Военная эстетика в каждом изделии
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-700 leading-relaxed mb-8"
            >
              Наши премиальные кобуры созданы для тех, кто ценит качество, надежность и стиль. 
              Каждое изделие проходит строгий контроль качества и изготавливается с использованием 
              лучших материалов и современных технологий.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-black mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2 uppercase tracking-wide">Качество</h3>
                <p className="text-gray-600">Премиальные материалы и ручная работа</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2 uppercase tracking-wide">Надежность</h3>
                <p className="text-gray-600">Проверено в реальных условиях</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M5 7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H7a2 2 0 01-2-2V7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2 uppercase tracking-wide">Дизайн</h3>
                <p className="text-gray-600">Военная эстетика и функциональность</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumHolsters; 