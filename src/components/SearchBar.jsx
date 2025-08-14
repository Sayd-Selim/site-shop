import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Временные данные для демонстрации
  const mockProducts = [
    { id: 1, name: 'Кобура Classic', category: 'Кобуры', price: '2,500 ₽' },
    { id: 2, name: 'Кобура Pro', category: 'Кобуры', price: '3,500 ₽' },
    { id: 3, name: 'Кобура Elite', category: 'Кобуры', price: '4,500 ₽' },
    { id: 4, name: 'Ремень Tactical', category: 'Аксессуары', price: '1,800 ₽' },
    { id: 5, name: 'Подсумок Universal', category: 'Аксессуары', price: '2,200 ₽' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      
      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 300));

      // В реальном приложении здесь будет запрос к API
      const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );

      setSuggestions(filteredProducts);
      setIsLoading(false);
    };

    fetchSuggestions();
  }, [query]);

  const handleSuggestionClick = (product) => {
    setQuery(product.name);
    setShowSuggestions(false);
    navigate(`/product/${product.id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Поиск товаров..."
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700
                   dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      <AnimatePresence>
        {showSuggestions && (query.length >= 2) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg
                     border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto"
          >
            {isLoading ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" />
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-100" />
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            ) : suggestions.length > 0 ? (
              <ul>
                {suggestions.map((product) => (
                  <motion.li
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                    className="p-3 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleSuggestionClick(product)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {product.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                          {product.category}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {product.price}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Ничего не найдено
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar; 