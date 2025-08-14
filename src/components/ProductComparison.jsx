import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductComparison = ({ products = [] }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const addToComparison = (product) => {
    if (selectedProducts.length < 3 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeFromComparison = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const comparisonAttributes = [
    { key: 'price', label: 'Цена' },
    { key: 'material', label: 'Материал' },
    { key: 'size', label: 'Размер' },
    { key: 'weight', label: 'Вес' },
    { key: 'color', label: 'Цвет' },
    { key: 'warranty', label: 'Гарантия' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 dark:text-white">Сравнение товаров</h3>

      {selectedProducts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 text-left dark:text-white">Характеристика</th>
                {selectedProducts.map(product => (
                  <th key={product.id} className="p-2 text-left dark:text-white">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg mb-2"
                      />
                      <button
                        onClick={() => removeFromComparison(product.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <p className="text-sm dark:text-white">{product.name}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonAttributes.map(attr => (
                <tr key={attr.key} className="border-t dark:border-gray-700">
                  <td className="p-2 font-medium dark:text-white">{attr.label}</td>
                  {selectedProducts.map(product => (
                    <td key={product.id} className="p-2 dark:text-white">
                      {product[attr.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            Выберите товары для сравнения (максимум 3)
          </p>
        </div>
      )}

      <div className="mt-6">
        <h4 className="font-semibold mb-2 dark:text-white">Доступные товары:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(product => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              className="border dark:border-gray-700 rounded-lg p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h5 className="font-medium dark:text-white">{product.name}</h5>
              <p className="text-gray-600 dark:text-gray-400">{product.price} ₽</p>
              <button
                onClick={() => addToComparison(product)}
                disabled={selectedProducts.length >= 3}
                className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                Добавить к сравнению
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductComparison; 