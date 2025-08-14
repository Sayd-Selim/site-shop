import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AdminReviews = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const reviews = [
    {
      id: 1,
      product: {
        id: 1,
        name: 'Кобура Glock 17',
        image: '/images/products/glock-holster.jpg',
      },
      user: {
        id: 1,
        name: 'Иван Петров',
        avatar: '/images/avatars/user1.jpg',
      },
      rating: 5,
      comment: 'Отличная кобура, очень удобная и качественная. Рекомендую!',
      status: 'approved',
      createdAt: '2024-03-20T10:30:00',
    },
    {
      id: 2,
      product: {
        id: 2,
        name: 'Ремень Tactical Belt',
        image: '/images/products/tactical-belt.jpg',
      },
      user: {
        id: 2,
        name: 'Анна Сидорова',
        avatar: '/images/avatars/user2.jpg',
      },
      rating: 4,
      comment: 'Хороший ремень, но немного жестковат. В целом довольна покупкой.',
      status: 'pending',
      createdAt: '2024-03-19T15:45:00',
    },
  ];

  const statusColors = {
    approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  const statusLabels = {
    approved: 'Одобрен',
    pending: 'На модерации',
    rejected: 'Отклонен',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Управление отзывами
        </h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Поиск отзывов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Список отзывов */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Товар
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Пользователь
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Оценка
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Статус
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {reviews.map((review) => (
                    <motion.tr
                      key={review.id}
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      className="cursor-pointer"
                      onClick={() => setSelectedReview(review)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              src={review.product.image}
                              alt={review.product.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {review.product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 flex-shrink-0">
                            <img
                              src={review.user.avatar}
                              alt={review.user.name}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {review.user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-xl ${
                                i < review.rating
                                  ? 'text-yellow-400'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            statusColors[review.status]
                          }`}
                        >
                          {statusLabels[review.status]}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Детали отзыва */}
        <div className="lg:col-span-1">
          {selectedReview ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Детали отзыва
                </h2>
                <button
                  onClick={() => setSelectedReview(null)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Информация о товаре */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Товар
                  </h3>
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <img
                      src={selectedReview.product.image}
                      alt={selectedReview.product.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedReview.product.name}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Информация о пользователе */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Пользователь
                  </h3>
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <img
                      src={selectedReview.user.avatar}
                      alt={selectedReview.user.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedReview.user.name}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Оценка */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Оценка
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-2xl ${
                            i < selectedReview.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Комментарий */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Комментарий
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-900 dark:text-white">
                      {selectedReview.comment}
                    </p>
                  </div>
                </div>

                {/* Действия */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={selectedReview.status}
                      onChange={(e) => {
                        // Обработка изменения статуса
                      }}
                      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
                    >
                      <option value="approved">Одобрить</option>
                      <option value="pending">На модерации</option>
                      <option value="rejected">Отклонить</option>
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
              Выберите отзыв для просмотра деталей
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReviews; 