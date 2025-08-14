import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import OrderStatus from '../components/OrderStatus';
import ViewHistory from '../components/ViewHistory';
import AddressForm from '../components/AddressForm';
import NotificationSettings from '../components/NotificationSettings';
import { useNotification } from '../context/NotificationContext';

// Временные данные для демонстрации
const mockUser = {
    firstName: 'Александр',
    lastName: 'Иванов',
    email: 'alex@example.com',
    phone: '+7 (999) 123-45-67',
    address: 'ул. Примерная, д. 1, кв. 1',
    city: 'Москва',
    postalCode: '123456'
};

const mockOrders = [
    {
        id: 1,
        date: '2024-03-15',
        status: 'completed',
        total: 11500,
        items: [
            {
                id: 1,
                name: 'Кобура Tactical Pro',
                price: 4500,
                image: 'https://images.unsplash.com/photo-1619994403077-5f2b9ebf5b1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                quantity: 1
            },
            {
                id: 2,
                name: 'Тактический ремень',
                price: 3500,
                image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                quantity: 2
            }
        ]
    },
    {
        id: 2,
        date: '2024-03-10',
        status: 'processing',
        total: 4500,
        items: [
            {
                id: 3,
                name: 'Кобура IWB',
                price: 4500,
                image: 'https://images.unsplash.com/photo-1619994403077-5f2b9ebf5b1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                quantity: 1
            }
        ]
    }
];

const mockFavorites = [
    {
        id: 4,
        name: 'Кобура OWB',
        description: 'Наружная кобура для открытого ношения',
        price: 3800,
        image: 'https://images.unsplash.com/photo-1619994403077-5f2b9ebf5b1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'holsters',
        rating: 4.6,
        reviews: 42,
        discount: 10
    },
    {
        id: 5,
        name: 'Тактический ремень',
        description: 'Прочный тактический ремень с быстросъемной пряжкой',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'accessories',
        rating: 4.7,
        reviews: 56,
        isNew: true
    }
];

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(mockUser);
    const { showNotification } = useNotification();

    // Моковые данные для демонстрации
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            title: 'Дом',
            fullName: 'Иван Иванов',
            street: 'Ленина',
            house: '10',
            apartment: '5',
            city: 'Москва',
            postalCode: '123456',
            phone: '+7 (999) 123-45-67',
            isDefault: true
        }
    ]);

    const [orders] = useState([
        {
            id: 1,
            date: '2024-03-15',
            status: 'Доставлен',
            total: 15000,
            items: [
                { name: 'Кобура Classic', price: 5000, quantity: 2 },
                { name: 'Ремень Pro', price: 5000, quantity: 1 }
            ]
        }
    ]);

    const [favorites] = useState([
        {
            id: 1,
            name: 'Кобура Elite',
            price: 8000,
            image: 'https://images.unsplash.com/photo-1589996448606-842d49a811eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
    ]);

    const [wishlist] = useState([
        {
            id: 2,
            name: 'Кобура Tactical',
            price: 12000,
            image: 'https://images.unsplash.com/photo-1589996448606-842d49a811eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        // Здесь будет логика сохранения данных
        console.log('Profile updated:', formData);
    };

    const handleSaveAddress = (address) => {
        setAddresses(prev => [...prev, { ...address, id: Date.now() }]);
        showNotification('Адрес успешно сохранен', 'success');
    };

    const handleSaveNotifications = (settings) => {
        console.log('Notification settings saved:', settings);
        showNotification('Настройки уведомлений сохранены', 'success');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Личные данные
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Имя
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                                 disabled:opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Фамилия
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                                 disabled:opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                                 disabled:opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Телефон
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                                 disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Адрес доставки
                                </h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Адрес
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                                 disabled:opacity-50"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Город
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                                                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                     focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                                     disabled:opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Индекс
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                                                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                     focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                                     disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 rounded-lg text-white bg-primary-500 hover:bg-primary-600
                                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                                 transition-all duration-200"
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            )}
                        </form>
                    </motion.div>
                );

            case 'orders':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            История заказов
                        </h2>
                        <div className="space-y-4">
                            {orders.map(order => (
                                <div
                                    key={order.id}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Заказ #{order.id}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {order.date}
                                            </p>
                                        </div>
                                        <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        {order.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between text-sm"
                                            >
                                                <span>
                                                    {item.name} x {item.quantity}
                                                </span>
                                                <span>{item.price * item.quantity} ₽</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex justify-between font-semibold">
                                            <span>Итого</span>
                                            <span>{order.total} ₽</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );

            case 'favorites':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Избранные товары
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {favorites.map(product => (
                                <div
                                    key={product.id}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {product.price} ₽
                                        </p>
                                        <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                            В корзину
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );

            case 'wishlist':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Список желаний
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {wishlist.map(product => (
                                <div
                                    key={product.id}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {product.price} ₽
                                        </p>
                                        <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                            В корзину
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );

            case 'addresses':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Адреса доставки
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {addresses.map(address => (
                                <div
                                    key={address.id}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {address.title}
                                        </h3>
                                        {address.isDefault && (
                                            <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                По умолчанию
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {address.fullName}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {address.street}, {address.house}
                                        {address.apartment && `, кв. ${address.apartment}`}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {address.city}, {address.postalCode}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {address.phone}
                                    </p>
                                    <div className="mt-4 flex space-x-2">
                                        <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                            Редактировать
                                        </button>
                                        <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Добавить новый адрес
                            </h3>
                            <AddressForm onSave={handleSaveAddress} />
                        </div>
                    </motion.div>
                );

            case 'notifications':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Настройки уведомлений
                        </h2>
                        <NotificationSettings onSave={handleSaveNotifications} />
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 space-y-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            activeTab === 'profile'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        Личные данные
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            activeTab === 'orders'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        История заказов
                    </button>
                    <button
                        onClick={() => setActiveTab('favorites')}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            activeTab === 'favorites'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        Избранные товары
                    </button>
                    <button
                        onClick={() => setActiveTab('wishlist')}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            activeTab === 'wishlist'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        Список желаний
                    </button>
                    <button
                        onClick={() => setActiveTab('addresses')}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            activeTab === 'addresses'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        Адреса доставки
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            activeTab === 'notifications'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        Настройки уведомлений
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1">{renderContent()}</div>
            </div>
        </div>
    );
};

export default Profile; 