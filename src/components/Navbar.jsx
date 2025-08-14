import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Notifications from './Notifications';
import SearchBar from './SearchBar';

const Navbar = () => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [cartItemsCount] = useState(2); // Временное значение для демонстрации
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="group flex items-center space-x-2">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center"
                            >
                                <span className="text-white font-bold">H</span>
                            </motion.div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                Holster Store
                            </span>
                        </Link>
                    </div>
                    
                    <div className="flex-1 max-w-2xl mx-8">
                        <SearchBar />
                    </div>

                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <Notifications />
                        <Link
                            to="/profile"
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-500
                                     focus:outline-none focus:ring-2 focus:ring-primary-500/50 rounded-lg
                                     transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </Link>
                        <Link
                            to="/cart"
                            className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-primary-500
                                     focus:outline-none focus:ring-2 focus:ring-primary-500/50 rounded-lg
                                     transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs
                                               rounded-full flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>
                        <Link
                            to="/admin"
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                            Админ панель
                        </Link>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar; 