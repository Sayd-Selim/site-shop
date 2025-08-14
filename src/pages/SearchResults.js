import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const query = searchParams.get('q');

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      
      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Временные данные для демонстрации
      const mockResults = [
        {
          id: 1,
          name: 'Кобура Classic',
          category: 'Кобуры',
          price: '2,500 ₽',
          image: '/images/holster1.jpg',
          description: 'Классическая кобура из натуральной кожи'
        },
        {
          id: 2,
          name: 'Кобура Pro',
          category: 'Кобуры',
          price: '3,500 ₽',
          image: '/images/holster2.jpg',
          description: 'Профессиональная кобура с дополнительной защитой'
        },
        {
          id: 3,
          name: 'Кобура Elite',
          category: 'Кобуры',
          price: '4,500 ₽',
          image: '/images/holster3.jpg',
          description: 'Элитная кобура с премиальной отделкой'
        }
      ];

      // В реальном приложении здесь будет запрос к API
      const filteredResults = mockResults.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filteredResults);
      setIsLoading(false);
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" />
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-100" />
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Результаты поиска: {query}
      </h1>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 dark:text-white">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {product.category}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {product.price}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    В корзину
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
            По вашему запросу ничего не найдено
          </h2>
          <p className="text-gray-500 dark:text-gray-500">
            Попробуйте изменить параметры поиска
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults; 