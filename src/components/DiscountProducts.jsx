import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const DiscountProducts = ({ products }) => {
  // Получаем товары со скидкой
  const discountProducts = products.filter(product => product.discount).slice(0, 4);

  if (discountProducts.length === 0) return null;

  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          💥 Товары со скидкой
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Специальные предложения и акции на профессиональное снаряжение
        </p>
      </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {discountProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            {/* Бейдж скидки */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                -{product.discount}%
              </span>
            </div>
            
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* Таймер акции */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl p-6 text-white text-center"
      >
        <h3 className="text-xl font-bold mb-2">⏰ Акция заканчивается через:</h3>
        <div className="flex justify-center gap-4 text-2xl font-bold">
          <div className="bg-white/20 backdrop-blur rounded-2xl px-4 py-2">
            <div>24</div>
            <div className="text-sm opacity-80">Часов</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl px-4 py-2">
            <div>12</div>
            <div className="text-sm opacity-80">Минут</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl px-4 py-2">
            <div>45</div>
            <div className="text-sm opacity-80">Секунд</div>
          </div>
        </div>
        <p className="mt-4 text-sm opacity-90">
          Успейте купить товары со скидкой до конца акции!
        </p>
      </motion.div>
    </div>
  );
};

export default DiscountProducts; 