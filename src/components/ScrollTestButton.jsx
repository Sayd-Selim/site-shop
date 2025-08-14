import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ScrollTestButton = () => {
  const navigate = useNavigate();

  const testCases = [
    {
      name: "Обычный переход (скролл сбросится)",
      action: () => navigate("/products")
    },
    {
      name: "Переход с категорией (скролл НЕ сбросится)",
      action: () => navigate("/products", { state: { category: "Свадебный букет" } })
    },
    {
      name: "Переход с другой категорией",
      action: () => navigate("/products", { state: { category: "Моно букет" } })
    }
  ];

  return (
    <div className="fixed top-20 left-4 z-50 bg-white p-4 rounded-lg shadow-lg border">
      <h3 className="text-sm font-bold mb-2 text-gray-800">Тест скролла:</h3>
      <div className="space-y-2">
        {testCases.map((testCase, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={testCase.action}
            className="block w-full text-xs px-3 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
          >
            {testCase.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ScrollTestButton;
