import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ViewHistory = () => {
    const [viewedProducts, setViewedProducts] = useState([
        {
            id: 1,
            name: 'Кобура Tactical Pro',
            price: 4500,
            image: 'https://images.unsplash.com/photo-1619994403077-5f2b9ebf5b1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            category: 'holsters',
            viewedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 минут назад
        },
        {
            id: 2,
            name: 'Тактический ремень',
            price: 3500,
            image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            category: 'accessories',
            viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 часа назад
        },
        {
            id: 3,
            name: 'Кобура IWB',
            price: 3800,
            image: 'https://images.unsplash.com/photo-1619994403077-5f2b9ebf5b1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            category: 'holsters',
            viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 день назад
        }
    ]);

    const removeFromHistory = (productId) => {
        setViewedProducts(prev =>
            prev.filter(product => product.id !== productId)
        );
    };

    const clearHistory = () => {
        setViewedProducts([]);
    };

    const formatTimeAgo = (date) => {
        const now = new Date();
        const viewed = new Date(date);
        const diffInMinutes = Math.floor((now - viewed) / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInDays > 0) {
            return `${diffInDays} ${diffInDays === 1 ? 'день' : 'дня'} назад`;
        } else if (diffInHours > 0) {
            return `${diffInHours} ${diffInHours === 1 ? 'час' : 'часа'} назад`;
        } else {
            return `${diffInMinutes} ${diffInMinutes === 1 ? 'минуту' : 'минут'} назад`;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    История просмотров
                </h2>
                {viewedProducts.length > 0 && (
                    <button
                        onClick={clearHistory}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900
                                 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                 rounded-lg px-4 py-2"
                    >
                        Очистить историю
                    </button>
                )}
            </div>

            {viewedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {viewedProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden
                                     group hover:shadow-md transition-shadow duration-200"
                        >
                            <Link to={`/product/${product.id}`} className="block">
                                <div className="relative aspect-square">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10
                                                  transition-colors duration-200" />
                                </div>
                            </Link>

                            <div className="p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="font-medium text-gray-900 dark:text-white
                                                     hover:text-primary-500 dark:hover:text-primary-400
                                                     transition-colors"
                                        >
                                            {product.name}
                                        </Link>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {product.category}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeFromHistory(product.id)}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                                 rounded-lg p-1"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {product.price} ₽
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {formatTimeAgo(product.viewedAt)}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        История просмотров пуста
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Просмотренные товары появятся здесь
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm
                                     text-sm font-medium rounded-lg text-white bg-primary-500 hover:bg-primary-600
                                     focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                        >
                            Перейти к товарам
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewHistory; 