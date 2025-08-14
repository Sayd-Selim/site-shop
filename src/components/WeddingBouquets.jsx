import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const WeddingBouquets = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const weddingBouquets = [
    {
      id: 1,
      name: "Свадебный букет 'Нежность'",
      description: "Элегантная свадебная композиция из белых роз и пионов с нежными акцентами",
      price: 4500,
      oldPrice: 5200,
      discount: 13,
      rating: 4.8,
      reviewsCount: 203,
      image: process.env.PUBLIC_URL + "/images/marriage/1.jpg",
      features: [
        "Белые розы",
        "Пионы",
        "Гипсофила",
        "Ленточная отделка"
      ]
    },
    {
      id: 2,
      name: "Свадебный букет 'Роскошь'",
      description: "Роскошная свадебная композиция с орхидеями и розами",
      price: 5800,
      rating: 4.9,
      reviewsCount: 112,
      image: process.env.PUBLIC_URL + "/images/marriage/2.jpg",
      features: [
        "Орхидеи фаленопсис",
        "Белые розы",
        "Золотые акценты",
        "Премиум упаковка"
      ]
    },
    {
      id: 3,
      name: "Свадебный букет 'Минимализм'",
      description: "Минималистичная композиция из белых калл",
      price: 3800,
      oldPrice: 4500,
      discount: 16,
      rating: 4.5,
      reviewsCount: 78,
      image: process.env.PUBLIC_URL + "/images/marriage/3.jpg",
      features: [
        "7 белых калл",
        "Минималистичная упаковка",
        "Элегантная лента",
        "Современный дизайн"
      ]
    },
    {
      id: 4,
      name: "Свадебный букет 'Романтика'",
      description: "Романтичный свадебный букет в нежно-розовых тонах",
      price: 4200,
      rating: 4.8,
      reviewsCount: 89,
      image: process.env.PUBLIC_URL + "/images/marriage/4.jpg",
      features: [
        "Розовые розы",
        "Белые пионы",
        "Гипсофила",
        "Романтичная упаковка"
      ]
    }
  ];

  const images = [
    process.env.PUBLIC_URL + "/images/marriage/1.jpg",
    process.env.PUBLIC_URL + "/images/marriage/2.jpg",
    process.env.PUBLIC_URL + "/images/marriage/3.jpg",
    process.env.PUBLIC_URL + "/images/marriage/4.jpg"
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-pink-500 to-rose-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Свадебные букеты
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Создаём элегантные композиции для самого важного дня в вашей жизни
            </p>
          </motion.div>
        </div>
      </section>



      {/* Галерея изображений */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Галерея свадебных букетов</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Просмотрите наши лучшие работы и выберите идеальный букет для вашей свадьбы
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Основное изображение */}
              <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={images[selectedImage]}
                    alt={`Свадебный букет ${selectedImage + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                
                {/* Навигационные кнопки */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Индикаторы */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === selectedImage ? 'bg-white scale-125' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Миниатюры */}
              <div className="flex justify-center mt-6 space-x-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                      index === selectedImage ? 'ring-4 ring-pink-500 scale-110' : 'hover:scale-105'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Миниатюра ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Список свадебных букетов */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Наши свадебные букеты</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Каждый букет создаётся индивидуально с учётом ваших пожеланий
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {weddingBouquets.map((bouquet, index) => (
              <motion.div
                key={bouquet.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={bouquet.image}
                    alt={bouquet.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  {bouquet.discount > 0 && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -{bouquet.discount}%
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{bouquet.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{bouquet.name}</h3>
                  <p className="text-gray-600 mb-4">{bouquet.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {bouquet.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {bouquet.oldPrice && (
                        <span className="text-lg text-gray-400 line-through">{bouquet.oldPrice}₽</span>
                      )}
                      <span className="text-2xl font-bold text-pink-600">{bouquet.price}₽</span>
                    </div>
                    <span className="text-sm text-gray-500">{bouquet.reviewsCount} отзывов</span>
                  </div>
                  
                  <Link
                    to={`/product/${bouquet.id}`}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 px-6 rounded-lg font-semibold text-center block hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Заказать букет
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-rose-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Хотите заказать свадебный букет?</h2>
            <p className="text-xl mb-8 opacity-90">
              Свяжитесь с нами для создания индивидуальной композиции
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/79280171393"
                className="bg-white hover:bg-gray-100 text-pink-600 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Написать в WhatsApp
              </a>
              <a
                href="https://t.me/79280171393"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Написать в Telegram
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WeddingBouquets;
