import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NotificationSettings = ({ onSave, initialSettings = null }) => {
  const [settings, setSettings] = useState(initialSettings || {
    email: {
      orderUpdates: true,
      promotions: false,
      newProducts: true,
      priceChanges: true,
      stockUpdates: true
    },
    push: {
      orderUpdates: true,
      promotions: false,
      newProducts: true,
      priceChanges: true,
      stockUpdates: true
    },
    sms: {
      orderUpdates: true,
      promotions: false,
      newProducts: false,
      priceChanges: false,
      stockUpdates: false
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(settings);
  };

  const toggleSetting = (channel, type) => {
    setSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: !prev[channel][type]
      }
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Настройки уведомлений
      </h2>

      {/* Email Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Email уведомления
        </h3>
        <div className="space-y-2">
          {Object.entries(settings.email).map(([type, enabled]) => (
            <div key={type} className="flex items-center justify-between">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                {type === 'orderUpdates' && 'Обновления заказа'}
                {type === 'promotions' && 'Акции и скидки'}
                {type === 'newProducts' && 'Новые товары'}
                {type === 'priceChanges' && 'Изменения цен'}
                {type === 'stockUpdates' && 'Наличие товаров'}
              </label>
              <input
                type="checkbox"
                checked={enabled}
                onChange={() => toggleSetting('email', type)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Push уведомления
        </h3>
        <div className="space-y-2">
          {Object.entries(settings.push).map(([type, enabled]) => (
            <div key={type} className="flex items-center justify-between">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                {type === 'orderUpdates' && 'Обновления заказа'}
                {type === 'promotions' && 'Акции и скидки'}
                {type === 'newProducts' && 'Новые товары'}
                {type === 'priceChanges' && 'Изменения цен'}
                {type === 'stockUpdates' && 'Наличие товаров'}
              </label>
              <input
                type="checkbox"
                checked={enabled}
                onChange={() => toggleSetting('push', type)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          SMS уведомления
        </h3>
        <div className="space-y-2">
          {Object.entries(settings.sms).map(([type, enabled]) => (
            <div key={type} className="flex items-center justify-between">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                {type === 'orderUpdates' && 'Обновления заказа'}
                {type === 'promotions' && 'Акции и скидки'}
                {type === 'newProducts' && 'Новые товары'}
                {type === 'priceChanges' && 'Изменения цен'}
                {type === 'stockUpdates' && 'Наличие товаров'}
              </label>
              <input
                type="checkbox"
                checked={enabled}
                onChange={() => toggleSetting('sms', type)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Сохранить настройки
        </button>
      </div>
    </motion.form>
  );
};

export default NotificationSettings; 