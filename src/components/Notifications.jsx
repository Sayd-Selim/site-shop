import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'order',
            title: 'Заказ #1234',
            message: 'Ваш заказ принят в обработку',
            time: '5 минут назад',
            read: false
        },
        {
            id: 2,
            type: 'discount',
            title: 'Специальное предложение',
            message: 'Скидка 15% на все кобуры',
            time: '1 час назад',
            read: false
        },
        {
            id: 3,
            type: 'system',
            title: 'Обновление системы',
            message: 'Добавлены новые функции',
            time: '2 часа назад',
            read: true
        }
    ]);

    const [isOpen, setIsOpen] = useState(false);
    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const removeNotification = (id) => {
        setNotifications(prev =>
            prev.filter(notification => notification.id !== id)
        );
    };

    const getIcon = (type) => {
        switch (type) {
            case 'order':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                );
            case 'discount':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'system':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-primary-500
                         focus:outline-none focus:ring-2 focus:ring-primary-500/50 rounded-lg
                         transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold
                                   w-5 h-5 flex items-center justify-center rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg
                                 border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                    >
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Уведомления
                            </h3>
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                            {notifications.length > 0 ? (
                                notifications.map(notification => (
                                    <motion.div
                                        key={notification.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className={`p-4 border-b border-gray-200 dark:border-gray-700
                                                  ${!notification.read ? 'bg-primary-50 dark:bg-primary-900/20' : ''}
                                                  hover:bg-gray-50 dark:hover:bg-gray-700/50
                                                  transition-colors`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`p-2 rounded-lg ${
                                                notification.type === 'order'
                                                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                                    : notification.type === 'discount'
                                                    ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                                            }`}>
                                                {getIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {notification.title}
                                                    </h4>
                                                    <button
                                                        onClick={() => removeNotification(notification.id)}
                                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                                                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                                                 rounded-lg p-1"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    {notification.message}
                                                </p>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">
                                                        {notification.time}
                                                    </span>
                                                    {!notification.read && (
                                                        <button
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="text-xs text-primary-500 hover:text-primary-600
                                                                     focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                                                     rounded-lg px-2 py-1"
                                                        >
                                                            Отметить как прочитанное
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                    Нет уведомлений
                                </div>
                            )}
                        </div>

                        {notifications.length > 0 && (
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => setNotifications([])}
                                    className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900
                                             dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                             rounded-lg px-4 py-2"
                                >
                                    Очистить все
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Notifications; 