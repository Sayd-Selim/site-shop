import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const NewArrivals = ({ products }) => {
  // Получаем товары с флагом isNew
  const newProducts = products.filter(product => product.isNew).slice(0, 4);

  if (newProducts.length === 0) return null;

  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          🆕 Новинки
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Свежие поступления в нашем магазине военторга
        </p>
      </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {newProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            {/* Бейдж "Новинка" */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                НОВИНКА
              </span>
            </div>
            
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* Кнопка "Смотреть все новинки" */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-8"
      >
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl">
          Смотреть все новинки
        </button>
      </motion.div>
    </div>
  );
};

export default NewArrivals; 