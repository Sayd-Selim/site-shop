import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDelivery } from '../context/DeliveryContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Tracking = () => {
  const { orders, loading, error } = useDelivery();
  const { user } = useAuth();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'delivered'

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'active') return order.status !== 'Доставлен';
    if (filter === 'delivered') return order.status === 'Доставлен';
    return true;
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Для просмотра заказов необходимо войти в систему
          </h2>
          <div className="text-center">
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md"
            >
              Войти
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="mt-4 text-gray-600">Загрузка заказов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center text-red-600">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Мои заказы</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Все
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'active' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Активные
            </button>
            <button
              onClick={() => setFilter('delivered')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'delivered' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Доставленные
            </button>
          </div>
        </div>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-gray-600 text-lg mb-6">У вас пока нет заказов</p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md"
            >
              Перейти к покупкам
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl"
              >
                <div 
                  className="p-6 border-b border-gray-100 cursor-pointer"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Заказ #{order.orderNumber}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {new Date(order.date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-gray-800">
                        {order.total.toLocaleString('ru-RU')} ₽
                      </p>
                      <span className={`inline-block px-4 py-1.5 rounded-full text-sm mt-2 font-medium ${
                        order.status === 'Доставлен'
                          ? 'bg-green-50 text-green-600'
                          : order.status === 'В пути'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-yellow-50 text-yellow-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedOrder === order.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="mb-8">
                          <h3 className="text-lg font-semibold mb-6 text-gray-800">
                            Статус доставки
                          </h3>
                          <div className="relative pl-8">
                            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-blue-100"></div>
                            
                            {order.history.map((item, index) => (
                              <div key={index} className="relative mb-8 last:mb-0">
                                <div className="absolute left-0 w-6 h-6 rounded-full bg-white border-2 border-blue-400 flex items-center justify-center">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                </div>
                                
                                <div className="ml-8 bg-blue-50 rounded-lg p-4">
                                  <p className="font-medium text-gray-800">{item.status}</p>
                                  <div className="mt-2 space-y-1">
                                    <p className="text-sm text-gray-600 flex items-center">
                                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                      {item.date}
                                    </p>
                                    <p className="text-sm text-gray-600 flex items-center">
                                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                      {item.location}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            Товары
                          </h3>
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <div>
                                  <p className="font-medium text-gray-800">{item.name}</p>
                                  <p className="text-sm text-gray-600">
                                    Количество: {item.quantity}
                                  </p>
                                </div>
                                <p className="font-medium text-gray-800">
                                  {item.price.toLocaleString('ru-RU')} ₽
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-600">Ожидаемая дата доставки:</p>
                              <p className="font-medium text-gray-800">{order.estimatedDelivery}</p>
                            </div>
                            <button className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors">
                              Скачать чек
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Tracking; 