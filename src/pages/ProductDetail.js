import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Reviews from '../components/Reviews';
import ProductComparison from '../components/ProductComparison';
import StockNotification from '../components/StockNotification';
import Form from '../components/Form';
import PageTransition from '../components/PageTransition';

// Временные данные для демонстрации
const mockProduct = {
    id: 1,
    name: 'Кобура Tactical Pro',
    description: 'Профессиональная кобура для тактического использования. Изготовлена из высококачественного кевлара с дополнительной защитой. Идеально подходит для ежедневного ношения и тактических операций.',
    price: 4500,
    images: [
        'https://arsenal.army/components/com_jshopping/files/img_products/full_kobura_shtat_pod_pm_3_arsenal_.jpg',
        'https://arsenal.army/components/com_jshopping/files/img_products/full_kobura_shtat_pod_pm_3_arsenal_.jpg',
        'https://arsenal.army/components/com_jshopping/files/img_products/full_kobura_shtat_pod_pm_3_arsenal_.jpg',
    ],
    category: 'holsters',
    rating: 4.8,
    reviews: 124,
    isNew: true,
    discount: 0,
    specifications: {
        material: 'Кевлар',
        weight: '250 г',
        dimensions: '20 x 15 x 5 см',
        color: 'Черный',
        compatibility: 'Glock 17, 19, 26'
    },
    similarProducts: [
        {
            id: 2,
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
            id: 3,
            name: 'Тактический ремень',
            description: 'Прочный тактический ремень с быстросъемной пряжкой',
            price: 3500,
            image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            category: 'accessories',
            rating: 4.7,
            reviews: 56,
            isNew: true
        }
    ],
    reviews: [
        {
            id: 1,
            name: 'Александр',
            rating: 5,
            text: 'Отличная кобура! Очень удобная и надежная. Использую уже несколько месяцев, никаких нареканий.',
            date: '2024-02-15',
            verified: true,
            helpfulCount: 12,
            likes: 15,
            dislikes: 2,
            userId: 1,
            images: [
                '/images/reviews/holster-1.jpg',
                '/images/reviews/holster-2.jpg'
            ],
            replies: [
                {
                    id: 1,
                    name: 'Администратор',
                    text: 'Спасибо за ваш отзыв! Рады, что кобура вас устраивает.',
                    date: '2024-02-16'
                }
            ]
        },
        {
            id: 2,
            name: 'Михаил',
            rating: 4,
            text: 'Хорошая кобура, но есть пара моментов, которые можно улучшить. В целом доволен покупкой.',
            date: '2024-02-10',
            verified: true,
            helpfulCount: 5,
            likes: 8,
            dislikes: 1,
            userId: 2,
            images: [
                '/images/reviews/holster-3.jpg'
            ],
            replies: [
                {
                    id: 2,
                    name: 'Администратор',
                    text: 'Спасибо за ваш отзыв! Мы всегда работаем над улучшением наших продуктов. Если у вас есть конкретные предложения по улучшению, мы будем рады их рассмотреть.',
                    date: '2024-02-11'
                }
            ]
        }
    ]
};

console.log('mockProduct',mockProduct);

const ProductDetail = () => {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isOutOfStock] = useState(false); // В реальном приложении это будет зависеть от наличия товара
    const [activeTab, setActiveTab] = useState('description');
    const [reviewForm, setReviewForm] = useState({
        name: '',
        rating: '5',
        comment: ''
    });
    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: 'Иван Петров',
            rating: 5,
            date: '2024-02-15',
            comment: 'Отличная кобура! Очень удобная и качественная.'
        },
        {
            id: 2,
            name: 'Алексей Смирнов',
            rating: 4,
            date: '2024-02-10',
            comment: 'Хорошее качество, но немного дороговато.'
        }
    ]);

    const handleAddToCart = () => {
        // Здесь будет логика добавления в корзину
        console.log('Added to cart:', { ...mockProduct, quantity });
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            id: reviews.length + 1,
            name: reviewForm.name,
            rating: parseInt(reviewForm.rating),
            date: new Date().toISOString().split('T')[0],
            comment: reviewForm.comment
        };
        setReviews([newReview, ...reviews]);
        setReviewForm({ name: '', rating: '5', comment: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReviewForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Временные данные для демонстрации
    const products = [
        {
            id: 1,
            name: 'Кобура Classic',
            price: '2,500 ₽',
            material: 'Кожа',
            size: 'Универсальный',
            weight: '150 г',
            color: 'Черный',
            warranty: '1 год',
            image: '/images/holster1.jpg'
        },
        {
            id: 2,
            name: 'Кобура Pro',
            price: '3,500 ₽',
            material: 'Нейлон',
            size: 'Универсальный',
            weight: '120 г',
            color: 'Черный',
            warranty: '2 года',
            image: '/images/holster2.jpg'
        },
        {
            id: 3,
            name: 'Кобура Elite',
            price: '4,500 ₽',
            material: 'Кевлар',
            size: 'Универсальный',
            weight: '100 г',
            color: 'Черный',
            warranty: '3 года',
            image: '/images/holster3.jpg'
        }
    ];

    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <img
                            src={mockProduct.images[selectedImage]}
                            alt={mockProduct.name}
                            className="max-w-lg w-full mx-auto rounded-lg shadow-lg"
                        />
                        {mockProduct.isNew && (
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 text-sm font-semibold text-white bg-accent-500 rounded-full">
                                    Новинка
                                </span>
                            </div>
                        )}
                        {mockProduct.discount > 0 && (
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full">
                                    -{mockProduct.discount}%
                                </span>
                            </div>
                        )}
                        {/* Миниатюры */}
                        <div className="flex gap-2 mt-4 justify-center">
                            {mockProduct.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`border-2 rounded-lg p-1 transition-all duration-200 ${selectedImage === idx ? 'border-blue-500' : 'border-transparent'}`}
                                    style={{ outline: 'none' }}
                                >
                                    <img
                                        src={img}
                                        alt={`Миниатюра ${idx + 1}`}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {mockProduct.name}
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(mockProduct.rating) ? 'text-accent-400' : 'text-gray-300 dark:text-gray-600'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-gray-600 dark:text-gray-400">
                                {mockProduct.rating ? mockProduct.rating.toFixed(1) : '0.0'} ({mockProduct.reviews.length} отзывов)
                            </span>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <nav className="flex space-x-8">
                                {['description', 'features', 'reviews'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm
                                            ${activeTab === tab
                                                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                            }`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="mt-6">
                            {activeTab === 'description' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="prose dark:prose-invert max-w-none"
                                >
                                    <p>{mockProduct.description}</p>
                                </motion.div>
                            )}

                            {activeTab === 'features' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(mockProduct.specifications).map(([key, value]) => (
                                            <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                                <span className="text-gray-600 dark:text-gray-400">{key}</span>
                                                <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'reviews' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-8"
                                >
                                    {/* Review Form */}
                                    <Form onSubmit={handleReviewSubmit}>
                                        <Form.Group>
                                            <Form.Label htmlFor="name">Ваше имя</Form.Label>
                                            <Form.Input
                                                id="name"
                                                name="name"
                                                value={reviewForm.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label htmlFor="rating">Оценка</Form.Label>
                                            <Form.Select
                                                id="rating"
                                                name="rating"
                                                value={reviewForm.rating}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                {[5, 4, 3, 2, 1].map((rating) => (
                                                    <option key={rating} value={rating}>
                                                        {rating} {rating === 1 ? 'звезда' : 'звезд'}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label htmlFor="comment">Комментарий</Form.Label>
                                            <Form.TextArea
                                                id="comment"
                                                name="comment"
                                                value={reviewForm.comment}
                                                onChange={handleInputChange}
                                                rows="4"
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Button type="submit" variant="primary">
                                            Оставить отзыв
                                        </Form.Button>
                                    </Form>

                                    {/* Reviews List */}
                                    <div className="space-y-6">
                                        {reviews.map((review) => (
                                            <motion.div
                                                key={review.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                                            {review.name}
                                                        </h4>
                                                        <div className="flex items-center mt-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg
                                                                    key={i}
                                                                    className={`w-4 h-4 ${
                                                                        i < review.rating
                                                                            ? 'text-yellow-400'
                                                                            : 'text-gray-300 dark:text-gray-600'
                                                                    }`}
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        {review.date}
                                                    </span>
                                                </div>
                                                <p className="mt-4 text-gray-700 dark:text-gray-300">
                                                    {review.comment}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                {mockProduct.discount > 0 ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-3xl font-bold text-primary-500">
                                            {Math.round(mockProduct.price * (1 - mockProduct.discount / 100))} ₽
                                        </span>
                                        <span className="text-xl text-gray-500 line-through">
                                            {mockProduct.price} ₽
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-3xl font-bold text-primary-500">
                                        {mockProduct.price} ₽
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2 rounded-l-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-16 text-center border-t border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                    />
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-2 rounded-r-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>
                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`p-2 rounded-lg ${
                                        isFavorite
                                            ? 'text-red-500 hover:text-red-600'
                                            : 'text-gray-400 hover:text-gray-500'
                                    }`}
                                >
                                    <svg className="w-6 h-6" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-medium
                                         bg-primary-500 hover:bg-primary-600
                                         text-white shadow-sm hover:shadow-md
                                         focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                         transition-all duration-200"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                В корзину
                            </button>
                            <button
                                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-medium
                                         bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
                                         text-gray-700 dark:text-gray-300
                                         focus:outline-none focus:ring-2 focus:ring-gray-500/50
                                         transition-all duration-200"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Задать вопрос
                            </button>
                        </div>

                        {isOutOfStock && (
                            <StockNotification product={{ id, name: 'Кобура' }} />
                        )}
                    </motion.div>
                </div>

                {/* Отзывы */}
                {/* <div className="mt-16">
                    <Reviews productId={mockProduct.id} reviews={mockProduct.reviews} />
                </div> */}

                {/* Похожие товары */}
                {/* <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Похожие товары
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {mockProduct.similarProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div> */}

                {/* <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 dark:text-white">Сравнить с другими товарами</h2>
                    <ProductComparison products={products} />
                </div> */}
            </div>
        </PageTransition>
    );
};

export default ProductDetail;