import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Statistics = () => {
  const [timeRange, setTimeRange] = useState('week');

  // Моковые данные для демонстрации
  const stats = {
    totalSales: '125,000 ₽',
    totalOrders: 45,
    averageOrder: '2,778 ₽',
    topProducts: [
      { name: 'Кобура Classic', sales: 15, revenue: '37,500 ₽' },
      { name: 'Кобура Pro', sales: 12, revenue: '42,000 ₽' },
      { name: 'Ремень Tactical', sales: 8, revenue: '24,000 ₽' }
    ],
    salesByCategory: [
      { category: 'Кобуры', sales: '85,000 ₽' },
      { category: 'Аксессуары', sales: '40,000 ₽' }
    ]
  };

  const StatCard = ({ title, value, icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
        <div className="text-blue-600 dark:text-blue-400">
          {icon}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Статистика продаж
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 rounded-lg ${
              timeRange === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            Неделя
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded-lg ${
              timeRange === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            Месяц
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-4 py-2 rounded-lg ${
              timeRange === 'year'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            Год
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Общая выручка"
          value={stats.totalSales}
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Количество заказов"
          value={stats.totalOrders}
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
        />
        <StatCard
          title="Средний чек"
          value={stats.averageOrder}
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Топ продаж</h2>
          <div className="space-y-4">
            {stats.topProducts.map((product, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{product.sales} продаж</p>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{product.revenue}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Продажи по категориям</h2>
          <div className="space-y-4">
            {stats.salesByCategory.map((category, index) => (
              <div key={index} className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{category.category}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{category.sales}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Statistics; 