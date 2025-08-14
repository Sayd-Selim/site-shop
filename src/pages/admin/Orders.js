import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AdminOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const orders = [
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      customer: {
        name: 'Иван Петров',
        email: 'ivan@example.com',
        phone: '+7 (999) 123-45-67',
      },
      items: [
        {
          id: 1,
          name: 'Кобура для Glock 17',
          price: 5000,
          quantity: 1,
          image: '/images/products/glock17-holster.jpg',
        },
        {
          id: 2,
          name: 'Ремень для кобуры',
          price: 1500,
          quantity: 1,
          image: '/images/products/holster-belt.jpg',
        },
      ],
      total: 6500,
      status: 'processing',
      paymentMethod: 'card',
      paymentStatus: 'paid',
      shippingAddress: {
        street: 'ул. Ленина, 10',
        city: 'Москва',
        state: 'Московская область',
        zip: '123456',
      },
      createdAt: '2024-03-20 15:30',
      updatedAt: '2024-03-20 15:35',
      notes: 'Доставить до 18:00',
    },
    // Добавьте больше заказов здесь
  ];

  const statusColors = {
    processing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  const paymentStatusColors = {
    paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Управление заказами
        </h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Поиск заказов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2"
          >
            <option value="all">Все заказы</option>
            <option value="processing">В обработке</option>
            <option value="shipped">Отправлены</option>
            <option value="delivered">Доставлены</option>
            <option value="cancelled">Отменены</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Список заказов */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Заказ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Клиент
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Сумма
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Дата
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {orders.map((order) => (
                    <motion.tr
                      key={order.id}
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      className="cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {order.orderNumber}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {order.items.length} товаров
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {order.customer.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {order.customer.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {order.total.toLocaleString()} ₽
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {order.paymentMethod === 'card' ? 'Карта' : 'Наличные'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              statusColors[order.status]
                            }`}
                          >
                            {order.status === 'processing'
                              ? 'В обработке'
                              : order.status === 'shipped'
                              ? 'Отправлен'
                              : order.status === 'delivered'
                              ? 'Доставлен'
                              : 'Отменен'}
                          </span>
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              paymentStatusColors[order.paymentStatus]
                            }`}
                          >
                            {order.paymentStatus === 'paid'
                              ? 'Оплачен'
                              : order.paymentStatus === 'pending'
                              ? 'Ожидает оплаты'
                              : 'Ошибка оплаты'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {order.createdAt}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Детали заказа */}
        <div className="lg:col-span-1">
          {selectedOrder ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedOrder.orderNumber}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Информация о клиенте */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Информация о клиенте
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-900 dark:text-white font-medium">
                      {selectedOrder.customer.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {selectedOrder.customer.email}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {selectedOrder.customer.phone}
                    </p>
                  </div>
                </div>

                {/* Адрес доставки */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Адрес доставки
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-900 dark:text-white">
                      {selectedOrder.shippingAddress.street}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {selectedOrder.shippingAddress.city},{' '}
                      {selectedOrder.shippingAddress.state}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {selectedOrder.shippingAddress.zip}
                    </p>
                  </div>
                </div>

                {/* Товары */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Товары
                  </h3>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                      >
                        <div className="h-16 w-16 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.quantity} × {item.price.toLocaleString()} ₽
                          </p>
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {(item.price * item.quantity).toLocaleString()} ₽
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Итого */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      Итого
                    </span>
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      {selectedOrder.total.toLocaleString()} ₽
                    </span>
                  </div>
                </div>

                {/* Примечания */}
                {selectedOrder.notes && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Примечания
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-gray-900 dark:text-white">
                        {selectedOrder.notes}
                      </p>
                    </div>
                  </div>
                )}

                {/* Действия */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => {
                        // Обработка изменения статуса
                      }}
                      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
                    >
                      <option value="processing">В обработке</option>
                      <option value="shipped">Отправлен</option>
                      <option value="delivered">Доставлен</option>
                      <option value="cancelled">Отменен</option>
                    </select>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Обновить статус
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center text-gray-500 dark:text-gray-400">
              Выберите заказ для просмотра деталей
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders; 