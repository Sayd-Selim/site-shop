import React from 'react';
import { motion } from 'framer-motion';

const ReviewsSection = () => {
  const reviews = [
    { 
      name: "Анна М.", 
      rating: 5, 
      text: "Прекрасный букет! Цветы свежие, доставка вовремя. Муж был в восторге от подарка." 
    },
    { 
      name: "Елена К.", 
      rating: 5, 
      text: "Заказывала комнатное растение для мамы. Очень красивое, приехало в отличном состоянии." 
    },
    { 
      name: "Мария С.", 
      rating: 4, 
      text: "Свадебная композиция получилась идеальной! Все гости восхищались красотой цветов." 
    },
  ];

  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="mb-6">
          <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white font-handwritten-primary text-glow">
            Отзывы наших клиентов
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-yellow-300"></div>
            <span className="text-2xl font-handwritten-secondary text-yellow-400">⭐</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-yellow-300"></div>
          </div>
        </div>
        <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-handwritten-accent">
          Что говорят о нас довольные клиенты
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <span className="text-2xl font-bold text-white">{review.name[0]}</span>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1 text-gray-900 dark:text-white font-handwritten-secondary">{review.name}</h4>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-6 h-6 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <span className="text-2xl">
                {review.text.includes('букет') ? '🌸' : 
                 review.text.includes('растение') ? '🌱' : 
                 review.text.includes('свадеб') ? '💒' : '💐'}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-2xl leading-relaxed font-handwritten-feature">{review.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Декоративный элемент в конце секции */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-center mt-16"
      >
        <div className="inline-flex items-center gap-6 px-8 py-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-full border border-yellow-200 shadow-lg">
          <span className="text-2xl font-handwritten-secondary text-yellow-500">⭐</span>
          <span className="text-2xl font-handwritten-accent text-gray-700">Ваше мнение очень важно для нас</span>
          <span className="text-2xl font-handwritten-secondary text-orange-500">⭐</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewsSection; 