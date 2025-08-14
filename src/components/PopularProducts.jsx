import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const PopularProducts = ({ products }) => {
  // Получаем топ-4 товара по рейтингу
  const popularProducts = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          🔥 Популярные товары
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Товары, которые выбирают наши покупатели чаще всего
        </p>
      </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {popularProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* Статистика популярности */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {[
          { label: 'Покупателей', value: '2,847', icon: '👥' },
          { label: 'Отзывов', value: '1,234', icon: '⭐' },
          { label: 'Доставок', value: '3,456', icon: '🚚' },
          { label: 'Рейтинг', value: '4.8/5', icon: '🏆' }
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="bg-white/80 backdrop-blur rounded-2xl p-4 text-center border border-white/20"
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default PopularProducts; 