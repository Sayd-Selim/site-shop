import React from 'react';
import { motion } from 'framer-motion';

const LoyaltyProgram = ({ points = 0, level = 'Bronze' }) => {
  const levels = {
    Bronze: { min: 0, max: 1000, color: 'bg-yellow-600' },
    Silver: { min: 1001, max: 5000, color: 'bg-gray-400' },
    Gold: { min: 5001, max: 10000, color: 'bg-yellow-400' },
    Platinum: { min: 10001, max: Infinity, color: 'bg-blue-400' }
  };

  const currentLevel = levels[level];
  const progress = ((points - currentLevel.min) / (currentLevel.max - currentLevel.min)) * 100;

  const benefits = {
    Bronze: ['Базовая скидка 5%', 'Доступ к распродажам'],
    Silver: ['Скидка 10%', 'Приоритетная поддержка', 'Бесплатная доставка'],
    Gold: ['Скидка 15%', 'VIP-поддержка', 'Ранний доступ к новинкам'],
    Platinum: ['Скидка 20%', 'Персональный менеджер', 'Эксклюзивные предложения']
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 dark:text-white">Программа лояльности</h3>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 dark:text-gray-300">Ваш уровень: {level}</span>
          <span className="text-gray-600 dark:text-gray-300">{points} баллов</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className={`h-2.5 rounded-full ${currentLevel.color}`}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold dark:text-white">Ваши преимущества:</h4>
        <ul className="space-y-2">
          {benefits[level].map((benefit, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center text-gray-600 dark:text-gray-300"
            >
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {benefit}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
        <p className="text-sm text-blue-600 dark:text-blue-300">
          Получайте 1 балл за каждые 100 рублей в заказе. Баллы можно использовать для получения скидок!
        </p>
      </div>
    </div>
  );
};

export default LoyaltyProgram; 