import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import PromoCode from '../components/PromoCode';
import { pluralizeProduct } from '../utils/pluralize';

// Временные данные для демонстрации
const mockCartItems = [
    {
        id: 1,
        name: 'Кобура Tactical Pro',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1619994403077-5f2b9ebf5b1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        discount: 0
    },
    {
        id: 2,
        name: 'Тактический ремень',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 2,
        discount: 10
    }
];

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const { showNotification } = useNotification();
    const [promoCode, setPromoCode] = React.useState('');
    const [discount, setDiscount] = React.useState(0);

    const handleRemoveItem = (productId) => {
        removeFromCart(productId);
        showNotification('Товар удален из корзины', 'success');
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            showNotification('Количество не может быть меньше 1', 'warning');
            return;
        }
        updateQuantity(productId, newQuantity);
        showNotification('Количество обновлено', 'success');
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            showNotification('Корзина пуста', 'error');
            return;
        }
        navigate('/checkout');
    };

    const handleClearCart = () => {
        clearCart();
        showNotification('Корзина очищена', 'info');
    };

    const applyPromoCode = () => {
        // Здесь будет логика применения промокода
        if (promoCode.toLowerCase() === 'welcome10') {
            setDiscount(10);
        } else {
            setDiscount(0);
        }
    };

    const subtotal = cartItems.reduce((sum, item) => {
        const itemPrice = item.discount
            ? item.price * (1 - item.discount / 100)
            : item.price;
        return sum + itemPrice * item.quantity;
    }, 0);

    const totalDiscount = subtotal * (discount / 100);
    const total = subtotal - totalDiscount;

    const handleApplyPromo = (discount) => {
        // Здесь будет логика применения скидки
        console.log(`Применена скидка: ${discount}%`);
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md mx-auto">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-24 h-24 mx-auto mb-6 text-gray-400"
                        >
                            <svg
                                className="w-full h-full"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </motion.div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Корзина пуста
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Добавьте товары в корзину, чтобы оформить заказ
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/products')}
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
                        >
                            Перейти к товарам
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Корзина
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            {cartItems.length} {pluralizeProduct(cartItems.length)} на сумму{' '}
                            {getCartTotal().toLocaleString()} ₽
                        </p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClearCart}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors flex items-center space-x-2"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                        <span>Очистить корзину</span>
                    </motion.button>
                </div>

                <div className="space-y-6">
                    <AnimatePresence>
                        {cartItems.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center space-x-6">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="relative"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-lg shadow-md"
                                        />
                                        <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {item.quantity}
                                        </div>
                                    </motion.div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            {item.price.toLocaleString()} ₽
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                                            Итого: {(item.price * item.quantity).toLocaleString()} ₽
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center space-x-3 bg-white dark:bg-gray-600 rounded-lg p-2 shadow-sm">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-500 hover:bg-gray-200 dark:hover:bg-gray-400 transition-colors"
                                        >
                                            <svg
                                                className="w-4 h-4 text-gray-600 dark:text-gray-300"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M20 12H4"
                                                />
                                            </svg>
                                        </motion.button>
                                        <span className="text-lg font-medium text-gray-900 dark:text-white w-8 text-center">
                                            {item.quantity}
                                        </span>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-500 hover:bg-gray-200 dark:hover:bg-gray-400 transition-colors"
                                        >
                                            <svg
                                                className="w-4 h-4 text-gray-600 dark:text-gray-300"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 4v16m8-8H4"
                                                />
                                            </svg>
                                        </motion.button>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <span className="text-lg text-gray-600 dark:text-gray-400">
                                Итого:
                            </span>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                {getCartTotal().toLocaleString()} ₽
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/products')}
                                className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Продолжить покупки
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleCheckout}
                                className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
                            >
                                Оформить заказ
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Cart; 