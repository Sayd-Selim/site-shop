import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const DeliveryCalculator = () => {
  const { deliveryMethod, setDeliveryMethod, calculateDelivery } = useCart();
  const [address, setAddress] = useState({
    city: '',
    street: '',
    house: '',
    apartment: ''
  });

  const deliveryMethods = [
    {
      id: 'standard',
      name: 'Стандартная доставка',
      description: 'Доставка курьером (2-3 дня)',
      price: 300
    },
    {
      id: 'express',
      name: 'Экспресс доставка',
      description: 'Доставка курьером (1 день)',
      price: 500
    },
    {
      id: 'pickup',
      name: 'Самовывоз',
      description: 'Бесплатно из магазина',
      price: 0
    }
  ];

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value.trim()
    }));
  };

  const handleDeliveryMethodChange = (methodId) => {
    if (!methodId) return;
    setDeliveryMethod(methodId);
  };

  const selectedMethod = deliveryMethods.find(m => m.id === deliveryMethod) || deliveryMethods[0];
  const deliveryCost = calculateDelivery ? calculateDelivery(address) : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Доставка
      </h3>

      <div className="space-y-6">
        {/* Методы доставки */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Способ доставки
          </h4>
          <div className="space-y-3">
            {deliveryMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-start p-4 rounded-lg border cursor-pointer
                          ${deliveryMethod === method.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                          }`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  value={method.id}
                  checked={deliveryMethod === method.id}
                  onChange={() => handleDeliveryMethodChange(method.id)}
                  className="mt-1"
                />
                <div className="ml-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 dark:text-white font-medium">
                      {method.name}
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {method.price > 0 ? `${method.price} ₽` : 'Бесплатно'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {method.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Адрес доставки */}
        {deliveryMethod !== 'pickup' && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Адрес доставки
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Город
                </label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Улица
                </label>
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Дом
                </label>
                <input
                  type="text"
                  name="house"
                  value={address.house}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Квартира
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={address.apartment}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* Итоговая стоимость доставки */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-900 dark:text-white font-medium">
              Стоимость доставки
            </span>
            <span className="text-gray-900 dark:text-white font-medium">
              {deliveryCost} ₽
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCalculator; 