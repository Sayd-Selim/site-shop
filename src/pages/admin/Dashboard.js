import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminOrders from './Orders';
import AdminProducts from './Products';
import AdminUsers from './Users';
import AdminDiscounts from './Discounts';
import AdminReviews from './Reviews';
import AdminDelivery from './Delivery';
import AdminPayments from './Payments';
import AdminSEO from './SEO';
import AdminLanguages from './Languages';
import AdminContent from './Content';
import Analytics from './Analytics';

const AdminDashboard = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/admin', label: 'Обзор', icon: '📊' },
    { path: '/admin/orders', label: 'Заказы', icon: '📦' },
    { path: '/admin/products', label: 'Товары', icon: '🛍️' },
    { path: '/admin/users', label: 'Пользователи', icon: '👥' },
    { path: '/admin/discounts', label: 'Скидки', icon: '🏷️' },
    { path: '/admin/reviews', label: 'Отзывы', icon: '⭐' },
    { path: '/admin/delivery', label: 'Доставка', icon: '🚚' },
    { path: '/admin/payments', label: 'Платежи', icon: '💳' },
    { path: '/admin/seo', label: 'SEO', icon: '🔍' },
    { path: '/admin/languages', label: 'Языки', icon: '🌐' },
    { path: '/admin/content', label: 'Контент', icon: '📝' },
    { path: '/admin/analytics', label: 'Аналитика', icon: '📈' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Боковое меню */}
      <motion.div
        initial={{ width: isSidebarOpen ? 280 : 80 }}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white dark:bg-gray-800 shadow-lg"
      >
        <div className="p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isSidebarOpen ? '◀ Свернуть' : '▶'}
          </button>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                  : ''
              }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </motion.div>

      {/* Основной контент */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="discounts" element={<AdminDiscounts />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="delivery" element={<AdminDelivery />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="seo" element={<AdminSEO />} />
            <Route path="languages" element={<AdminLanguages />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Компонент обзора
const AdminOverview = () => {
  const stats = [
    { label: 'Новые заказы', value: '12', change: '+2', icon: '📦' },
    { label: 'Активные пользователи', value: '1,234', change: '+15%', icon: '👥' },
    { label: 'Доход за сегодня', value: '₽45,678', change: '+8%', icon: '💰' },
    { label: 'Новые отзывы', value: '8', change: '+3', icon: '⭐' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Панель управления
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
            <div className="mt-4">
              <span
                className={`text-sm font-medium ${
                  stat.change.startsWith('+')
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">
                за последние 24 часа
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* График продаж */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Продажи за неделю
          </h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            График продаж будет здесь
          </div>
        </div>

        {/* Последние заказы */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Последние заказы
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <div
                key={order}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Заказ #{order}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    2 товара • ₽12,345
                  </p>
                </div>
                <span className="px-3 py-1 text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400 rounded-full">
                  Выполнен
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 