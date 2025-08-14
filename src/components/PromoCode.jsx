import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const PromoCode = () => {
  const { promoCode, applyPromoCode, calculateTotal } = useCart();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!code || code.trim().length < 3) {
      setError('Промокод должен содержать минимум 3 символа');
      return;
    }

    // Пример проверки промокода
    const validCodes = {
      'SUMMER2024': 0.1, // 10% скидка
      'WELCOME': 0.15,   // 15% скидка
      'SPECIAL': 0.2     // 20% скидка
    };

    const normalizedCode = code.trim().toUpperCase();
    
    if (validCodes[normalizedCode]) {
      applyPromoCode(normalizedCode);
      setSuccess(true);
      setCode('');
    } else {
      setError('Неверный промокод');
    }
  };

  const { discount = 0 } = calculateTotal() || {};

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Промокод
      </h3>
      
      {promoCode && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-green-700 dark:text-green-400">
              Промокод {promoCode} применен
            </span>
            <span className="text-green-700 dark:text-green-400 font-semibold">
              -{discount} ₽
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Введите промокод"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
          {success && (
            <p className="mt-2 text-sm text-green-500">
              Промокод успешно применен!
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg
                   hover:bg-primary-600 transition-colors
                   focus:outline-none focus:ring-2 focus:ring-primary-500/50"
        >
          Применить
        </button>
      </form>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Доступные промокоды:
        </h4>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 dark:text-gray-400">
            SUMMER2024 - скидка 10%
          </li>
          <li className="text-sm text-gray-600 dark:text-gray-400">
            WELCOME - скидка 15%
          </li>
          <li className="text-sm text-gray-600 dark:text-gray-400">
            SPECIAL - скидка 20%
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PromoCode; 