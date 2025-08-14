import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        paymentMethod: 'card'
    });

    const [cartItems] = useState([
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
        // Здесь будет логика отправки заказа
        console.log('Order submitted:', { formData, cartItems });
    };

    const subtotal = cartItems.reduce((sum, item) => {
        const itemPrice = item.discount
            ? item.price * (1 - item.discount / 100)
            : item.price;
        return sum + itemPrice * item.quantity;
    }, 0);

    const shipping = 500; // Фиксированная стоимость доставки
    const total = subtotal + shipping;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Оформление заказа
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Форма заказа */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Контактная информация */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Контактная информация
                            </h2>
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
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
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
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
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
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
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
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Адрес доставки */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Адрес доставки
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Адрес
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
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
                                            required
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                                                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                     focus:outline-none focus:ring-2 focus:ring-primary-500/50"
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
                                            required
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                                                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                     focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Способ оплаты */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Способ оплаты
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="card"
                                        name="paymentMethod"
                                        value="card"
                                        checked={formData.paymentMethod === 'card'}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500"
                                    />
                                    <label htmlFor="card" className="ml-2 text-gray-700 dark:text-gray-300">
                                        Банковская карта
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="cash"
                                        name="paymentMethod"
                                        value="cash"
                                        checked={formData.paymentMethod === 'cash'}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500"
                                    />
                                    <label htmlFor="cash" className="ml-2 text-gray-700 dark:text-gray-300">
                                        Оплата при получении
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Итого */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm space-y-6 sticky top-8">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Ваш заказ
                        </h2>

                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 dark:text-white">
                                            {item.name}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500">
                                                {item.quantity} ×
                                            </span>
                                            {item.discount > 0 ? (
                                                <>
                                                    <span className="text-sm font-medium text-primary-500">
                                                        {Math.round(item.price * (1 - item.discount / 100))} ₽
                                                    </span>
                                                    <span className="text-sm text-gray-500 line-through">
                                                        {item.price} ₽
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-sm font-medium text-primary-500">
                                                    {item.price} ₽
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Подытог</span>
                                <span>{subtotal} ₽</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Доставка</span>
                                <span>{shipping} ₽</span>
                            </div>
                            <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                                <span>Итого</span>
                                <span>{total} ₽</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full px-6 py-3 rounded-lg text-white bg-primary-500 hover:bg-primary-600
                                     focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                     transition-all duration-200"
                        >
                            Оформить заказ
                        </button>

                        <Link
                            to="/cart"
                            className="block text-center text-gray-600 dark:text-gray-400 hover:text-primary-500
                                     transition-colors"
                        >
                            Вернуться в корзину
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout; 