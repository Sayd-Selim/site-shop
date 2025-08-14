import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AdminCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 1,
      name: 'Кобуры',
      slug: 'holsters',
      description: 'Профессиональные кобуры для различных моделей оружия',
      image: '/images/categories/holsters.jpg',
      parentId: null,
      productsCount: 25,
      status: 'active',
      createdAt: '2024-03-01',
      updatedAt: '2024-03-20',
      subcategories: [
        {
          id: 2,
          name: 'Кобуры для Glock',
          slug: 'glock-holsters',
          description: 'Кобуры специально разработанные для пистолетов Glock',
          image: '/images/categories/glock-holsters.jpg',
          parentId: 1,
          productsCount: 10,
          status: 'active',
        },
        {
          id: 3,
          name: 'Кобуры для SIG Sauer',
          slug: 'sig-holsters',
          description: 'Кобуры для пистолетов SIG Sauer',
          image: '/images/categories/sig-holsters.jpg',
          parentId: 1,
          productsCount: 8,
          status: 'active',
        },
      ],
    },
    {
      id: 4,
      name: 'Ремни',
      slug: 'belts',
      description: 'Профессиональные ремни для ношения кобур',
      image: '/images/categories/belts.jpg',
      parentId: null,
      productsCount: 15,
      status: 'active',
      subcategories: [],
    },
    // Добавьте больше категорий здесь
  ];

  const statusColors = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    inactive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Управление категориями
        </h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Поиск категорий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddingCategory(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Добавить категорию
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Список категорий */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Категория
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Подкатегории
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Товары
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Статус
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {categories.map((category) => (
                    <React.Fragment key={category.id}>
                      <motion.tr
                        whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                        className="cursor-pointer"
                        onClick={() => setSelectedCategory(category)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                src={category.image}
                                alt={category.name}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {category.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {category.slug}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {category.subcategories.length}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {category.productsCount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              statusColors[category.status]
                            }`}
                          >
                            {category.status === 'active' ? 'Активна' : 'Неактивна'}
                          </span>
                        </td>
                      </motion.tr>
                      {category.subcategories.map((subcategory) => (
                        <motion.tr
                          key={subcategory.id}
                          whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                          className="cursor-pointer bg-gray-50 dark:bg-gray-700"
                          onClick={() => setSelectedCategory(subcategory)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center pl-8">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  src={subcategory.image}
                                  alt={subcategory.name}
                                  className="h-10 w-10 rounded-lg object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {subcategory.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {subcategory.slug}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">-</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {subcategory.productsCount}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                statusColors[subcategory.status]
                              }`}
                            >
                              {subcategory.status === 'active' ? 'Активна' : 'Неактивна'}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Детали категории */}
        <div className="lg:col-span-1">
          {selectedCategory ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedCategory.name}
                </h2>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Изображение */}
                <div>
                  <img
                    src={selectedCategory.image}
                    alt={selectedCategory.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                {/* Основная информация */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Основная информация
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Slug</span>
                      <span className="text-gray-900 dark:text-white">
                        {selectedCategory.slug}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Товаров</span>
                      <span className="text-gray-900 dark:text-white">
                        {selectedCategory.productsCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Подкатегорий</span>
                      <span className="text-gray-900 dark:text-white">
                        {selectedCategory.subcategories.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Описание */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Описание
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-900 dark:text-white">
                      {selectedCategory.description}
                    </p>
                  </div>
                </div>

                {/* Подкатегории */}
                {selectedCategory.subcategories.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Подкатегории
                    </h3>
                    <div className="space-y-2">
                      {selectedCategory.subcategories.map((subcategory) => (
                        <div
                          key={subcategory.id}
                          className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                        >
                          <div className="flex items-center">
                            <img
                              src={subcategory.image}
                              alt={subcategory.name}
                              className="h-8 w-8 rounded-lg object-cover"
                            />
                            <span className="ml-3 text-gray-900 dark:text-white">
                              {subcategory.name}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {subcategory.productsCount} товаров
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Действия */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={selectedCategory.status}
                      onChange={(e) => {
                        // Обработка изменения статуса
                      }}
                      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
                    >
                      <option value="active">Активна</option>
                      <option value="inactive">Неактивна</option>
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
              Выберите категорию для просмотра деталей
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно добавления категории */}
      {isAddingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-2xl"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Добавить новую категорию
              </h2>
              <button
                onClick={() => setIsAddingCategory(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Название
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Slug
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Родительская категория
                </label>
                <select className="mt-1 block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
                  <option value="">Нет</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Описание
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Изображение
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Загрузить файл</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">или перетащите</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, GIF до 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Добавить категорию
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories; 