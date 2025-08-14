import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Регистрируем компоненты Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Reviews = ({ productId, reviews = [], isAdmin = false, currentUser = null }) => {
    const [newReview, setNewReview] = useState({
        rating: 0,
        text: '',
        name: '',
        email: '',
        images: []
    });
    const [hoveredRating, setHoveredRating] = useState(0);
    const [filterRating, setFilterRating] = useState(0);
    const [sortBy, setSortBy] = useState('date');
    const [replyTo, setReplyTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [moderationQueue, setModerationQueue] = useState([]);
    const [editingReview, setEditingReview] = useState(null);
    const [reportReason, setReportReason] = useState('');
    const [showReportModal, setShowReportModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [showStats, setShowStats] = useState(false);
    const [showPhotoFilter, setShowPhotoFilter] = useState(false);
    const fileInputRef = useRef(null);

    // Убедимся, что reviews это массив
    const reviewsArray = Array.isArray(reviews) ? reviews : [];

    // Фильтрация и сортировка отзывов
    const filteredReviews = reviewsArray
        .filter(review => {
            if (filterRating !== 0 && review.rating !== filterRating) return false;
            if (showPhotoFilter && (!review.images || review.images.length === 0)) return false;
            return true;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(b.date) - new Date(a.date);
                case 'rating':
                    return b.rating - a.rating;
                case 'helpful':
                    return (b.helpfulCount || 0) - (a.helpfulCount || 0);
                case 'likes':
                    return (b.likes || 0) - (a.likes || 0);
                default:
                    return 0;
            }
        });

    const averageRating = reviewsArray.length
        ? (reviewsArray.reduce((acc, review) => acc + review.rating, 0) / reviewsArray.length).toFixed(1)
        : 0;

    const ratingCounts = {
        5: reviewsArray.filter(review => review.rating === 5).length,
        4: reviewsArray.filter(review => review.rating === 4).length,
        3: reviewsArray.filter(review => review.rating === 3).length,
        2: reviewsArray.filter(review => review.rating === 2).length,
        1: reviewsArray.filter(review => review.rating === 1).length
    };

    // Данные для графиков
    const pieChartData = {
        labels: ['5 звезд', '4 звезды', '3 звезды', '2 звезды', '1 звезда'],
        datasets: [{
            data: Object.values(ratingCounts),
            backgroundColor: [
                '#10B981', // green-500
                '#34D399', // green-400
                '#FBBF24', // yellow-400
                '#F87171', // red-400
                '#EF4444'  // red-500
            ]
        }]
    };

    const barChartData = {
        labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
        datasets: [{
            label: 'Количество отзывов',
            data: [12, 19, 15, 8, 22, 14],
            backgroundColor: '#3B82F6' // blue-500
        }]
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting review:', { productId, ...newReview });
        setNewReview({ rating: 0, text: '', name: '', email: '', images: [] });
    };

    const handleReply = (reviewId) => {
        if (replyText.trim()) {
            console.log('Submitting reply:', { reviewId, text: replyText });
            setReplyText('');
            setReplyTo(null);
        }
    };

    const handleLike = (reviewId, type) => {
        console.log('Liking review:', { reviewId, type });
    };

    const handleHelpful = (reviewId) => {
        console.log('Marking review as helpful:', reviewId);
    };

    const handleModerate = (reviewId, action) => {
        console.log('Moderating review:', { reviewId, action });
        setModerationQueue(prev => prev.filter(id => id !== reviewId));
    };

    const handleEdit = (review) => {
        setEditingReview(review);
        setNewReview({
            rating: review.rating,
            text: review.text,
            name: review.name,
            email: review.email,
            images: review.images || []
        });
    };

    const handleDelete = (reviewId) => {
        if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
            console.log('Deleting review:', reviewId);
        }
    };

    const handleReport = (reviewId) => {
        setSelectedReview(reviewId);
        setShowReportModal(true);
    };

    const handleSubmitReport = () => {
        if (reportReason.trim()) {
            console.log('Submitting report:', { reviewId: selectedReview, reason: reportReason });
            setShowReportModal(false);
            setReportReason('');
            setSelectedReview(null);
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        console.log('Uploading images:', files);
    };

    const handleRemoveImage = (index) => {
        setNewReview(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        
        // Заголовок
        doc.setFontSize(20);
        doc.text('Отзывы о товаре', 14, 20);
        
        // Таблица отзывов
        const tableData = filteredReviews.map(review => [
            review.name,
            review.rating + ' ★',
            review.text,
            new Date(review.date).toLocaleDateString(),
            review.verified ? 'Да' : 'Нет'
        ]);
        
        doc.autoTable({
            head: [['Имя', 'Рейтинг', 'Текст', 'Дата', 'Проверенная покупка']],
            body: tableData,
            startY: 30
        });
        
        // Сохраняем PDF
        doc.save('reviews.pdf');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-8">
            {/* Модальное окно для жалобы */}
            <AnimatePresence>
                {showReportModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Отправить жалобу
                            </h3>
                            <textarea
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                         focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                                placeholder="Укажите причину жалобы..."
                            />
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => setShowReportModal(false)}
                                    className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400
                                             hover:text-gray-900 dark:hover:text-white"
                                >
                                    Отмена
                                </button>
                                <button
                                    onClick={handleSubmitReport}
                                    className="px-4 py-2 text-sm text-white bg-primary-500 rounded-lg
                                             hover:bg-primary-600 focus:outline-none focus:ring-2
                                             focus:ring-primary-500/50"
                                >
                                    Отправить
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Заголовок и статистика */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Отзывы ({reviewsArray.length})
                    </h2>
                    <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-5 h-5 ${
                                        i < Math.floor(averageRating)
                                            ? 'text-accent-400'
                                            : 'text-gray-300 dark:text-gray-600'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-lg font-medium text-gray-900 dark:text-white">
                            {averageRating}
                        </span>
                        <span className="text-sm text-gray-500">
                            ({reviewsArray.length} отзывов)
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowStats(!showStats)}
                        className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400
                                 hover:text-gray-900 dark:hover:text-white
                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    >
                        Статистика
                    </button>
                    <button
                        onClick={handleExportPDF}
                        className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400
                                 hover:text-gray-900 dark:hover:text-white
                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    >
                        Экспорт PDF
                    </button>
                    <button
                        onClick={() => document.getElementById('reviewForm').scrollIntoView({ behavior: 'smooth' })}
                        className="px-4 py-2 rounded-lg text-white bg-primary-500 hover:bg-primary-600
                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                 transition-all duration-200"
                    >
                        Написать отзыв
                    </button>
                </div>
            </div>

            {/* Статистика */}
            <AnimatePresence>
                {showStats && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white dark:bg-gray-800 rounded-xl">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Распределение оценок
                                </h3>
                                <div className="h-64">
                                    <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Динамика отзывов
                                </h3>
                                <div className="h-64">
                                    <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Фильтры и сортировка */}
            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Фильтр по рейтингу:</span>
                    <div className="flex gap-1">
                        {[0, 5, 4, 3, 2, 1].map(rating => (
                            <button
                                key={rating}
                                onClick={() => setFilterRating(rating)}
                                className={`px-2 py-1 rounded-lg text-sm ${
                                    filterRating === rating
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                }`}
                            >
                                {rating === 0 ? 'Все' : `${rating}★`}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Сортировать по:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400
                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    >
                        <option value="date">Дате</option>
                        <option value="rating">Рейтингу</option>
                        <option value="helpful">Полезности</option>
                        <option value="likes">Лайкам</option>
                    </select>
                </div>

                <button
                    onClick={() => setShowPhotoFilter(!showPhotoFilter)}
                    className={`px-2 py-1 rounded-lg text-sm ${
                        showPhotoFilter
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}
                >
                    Только с фото
                </button>
            </div>

            {/* Статистика рейтингов */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    {[5, 4, 3, 2, 1].map(rating => (
                        <div key={rating} className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 w-8">{rating} звезд</span>
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${(ratingCounts[rating] / reviewsArray.length) * 100}%`
                                    }}
                                    className="h-full bg-accent-400"
                                />
                            </div>
                            <span className="text-sm text-gray-500 w-12">
                                {ratingCounts[rating]}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Форма отзыва */}
                <form id="reviewForm" onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Ваша оценка
                        </label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(rating => (
                                <button
                                    key={rating}
                                    type="button"
                                    onMouseEnter={() => setHoveredRating(rating)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                                    className="p-1 focus:outline-none"
                                >
                                    <svg
                                        className={`w-6 h-6 ${
                                            rating <= (hoveredRating || newReview.rating)
                                                ? 'text-accent-400'
                                                : 'text-gray-300 dark:text-gray-600'
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Ваш отзыв
                        </label>
                        <textarea
                            name="text"
                            value={newReview.text}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                     focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                            placeholder="Расскажите о вашем опыте использования товара..."
                        />
                    </div>

                    {/* Загрузка изображений */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Фотографии
                        </label>
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-4">
                                {newReview.images.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Фото ${index + 1}`}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full
                                                     hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 border border-gray-300
                                         dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700
                                         focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                            >
                                Добавить фото
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Ваше имя
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={newReview.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                         focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                                placeholder="Иван"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={newReview.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                         focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                                placeholder="ivan@example.com"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-6 py-3 rounded-lg text-white bg-primary-500 hover:bg-primary-600
                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50
                                 transition-all duration-200"
                    >
                        {editingReview ? 'Сохранить изменения' : 'Отправить отзыв'}
                    </button>
                </form>
            </div>

            {/* Список отзывов */}
            <div className="space-y-6">
                <AnimatePresence>
                    {filteredReviews.map(review => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {review.name}
                                    </h3>
                                    <div className="flex items-center mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-4 h-4 ${
                                                    i < review.rating
                                                        ? 'text-accent-400'
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
                                <div className="flex items-center gap-2">
                                    {review.verified && (
                                        <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100
                                                       dark:text-green-400 dark:bg-green-900/30 rounded-full">
                                            Проверенная покупка
                                        </span>
                                    )}
                                    <span className="text-sm text-gray-500">
                                        {new Date(review.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {review.text}
                            </p>

                            {/* Галерея изображений отзыва */}
                            {review.images && review.images.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                                    {review.images.map((image, index) => (
                                        <div key={index} className="aspect-square rounded-lg overflow-hidden">
                                            <img
                                                src={image}
                                                alt={`Фото ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Действия с отзывом */}
                            <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleLike(review.id, 'like')}
                                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-500
                                                 dark:text-gray-400 dark:hover:text-primary-400"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        {review.likes || 0}
                                    </button>
                                    <button
                                        onClick={() => handleLike(review.id, 'dislike')}
                                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500
                                                 dark:text-gray-400 dark:hover:text-red-400"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v4a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                        </svg>
                                        {review.dislikes || 0}
                                    </button>
                                </div>

                                <button
                                    onClick={() => handleHelpful(review.id)}
                                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-500
                                             dark:text-gray-400 dark:hover:text-primary-400"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                    </svg>
                                    Полезно ({review.helpfulCount || 0})
                                </button>

                                <button
                                    onClick={() => setReplyTo(replyTo === review.id ? null : review.id)}
                                    className="text-sm text-gray-500 hover:text-primary-500
                                             dark:text-gray-400 dark:hover:text-primary-400"
                                >
                                    Ответить
                                </button>

                                <button
                                    onClick={() => handleReport(review.id)}
                                    className="text-sm text-gray-500 hover:text-red-500
                                             dark:text-gray-400 dark:hover:text-red-400"
                                >
                                    Пожаловаться
                                </button>

                                {currentUser && (currentUser.id === review.userId || isAdmin) && (
                                    <div className="flex items-center gap-2 ml-auto">
                                        <button
                                            onClick={() => handleEdit(review)}
                                            className="text-sm text-gray-500 hover:text-primary-500
                                                     dark:text-gray-400 dark:hover:text-primary-400"
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="text-sm text-gray-500 hover:text-red-500
                                                     dark:text-gray-400 dark:hover:text-red-400"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                )}

                                {isAdmin && (
                                    <div className="flex items-center gap-2 ml-auto">
                                        <button
                                            onClick={() => handleModerate(review.id, 'approve')}
                                            className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100
                                                     dark:text-green-400 dark:bg-green-900/30 rounded-full
                                                     hover:bg-green-200 dark:hover:bg-green-900/50"
                                        >
                                            Одобрить
                                        </button>
                                        <button
                                            onClick={() => handleModerate(review.id, 'reject')}
                                            className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100
                                                     dark:text-red-400 dark:bg-red-900/30 rounded-full
                                                     hover:bg-red-200 dark:hover:bg-red-900/50"
                                        >
                                            Отклонить
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Форма ответа */}
                            {replyTo === review.id && (
                                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        rows={2}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                                        placeholder="Напишите ваш ответ..."
                                    />
                                    <div className="flex justify-end gap-2 mt-2">
                                        <button
                                            onClick={() => {
                                                setReplyTo(null);
                                                setReplyText('');
                                            }}
                                            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400
                                                     hover:text-gray-900 dark:hover:text-white"
                                        >
                                            Отмена
                                        </button>
                                        <button
                                            onClick={() => handleReply(review.id)}
                                            className="px-4 py-2 text-sm text-white bg-primary-500 rounded-lg
                                                     hover:bg-primary-600 focus:outline-none focus:ring-2
                                                     focus:ring-primary-500/50"
                                        >
                                            Отправить
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Ответы на отзыв */}
                            {review.replies && review.replies.length > 0 && (
                                <div className="mt-4 space-y-4">
                                    {review.replies.map(reply => (
                                        <div
                                            key={reply.id}
                                            className="pl-4 border-l-2 border-gray-200 dark:border-gray-700"
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {reply.name}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(reply.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {reply.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Reviews; 