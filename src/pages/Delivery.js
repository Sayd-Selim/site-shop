import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import PageTransition from '../components/PageTransition';

const Delivery = () => {
  const [selectedZone, setSelectedZone] = useState('city');
  const { isDarkMode } = useTheme();

  const deliveryZones = [
    {
      id: 'city',
      name: 'По городу',
      price: 'от 200 ₽',
      time: '2-4 часа',
      description: 'Доставка по всему городу в зависимости от дальности'
    },
    {
      id: 'free',
      name: 'Бесплатная доставка',
      price: '0 ₽',
      time: '2-4 часа',
      description: 'При заказе от 7 000₽ (кроме доставки до двери)'
    },
    {
      id: 'region',
      name: 'За городом',
      price: 'по тарифу такси',
      time: '4-8 часов',
      description: 'Доставка по всей ЧР и близлежащим регионам'
    }
  ];

  const deliveryMethods = [
    {
      icon: '🚚',
      title: 'Курьерская доставка',
      description: 'Доставка прямо к вашей двери в удобное время',
      features: ['Бесплатно от 7000 ₽', 'Точное время доставки', 'SMS уведомления']
    },
    {
      icon: '📍',
      title: 'Самовывоз',
      description: 'Заберите заказ в нашем магазине',
      features: ['Бесплатно', 'Готовность через 1 час', 'Проверка качества']
    },
    {
      icon: '⏰',
      title: 'Заказ на определенное время',
      description: 'Доставка точно в назначенное время',
      features: ['Планирование заранее', 'Идеально для праздников', 'Гарантия времени']
    }
  ];

  const deliveryFeatures = [
    {
      icon: '🛡️',
      title: 'Безопасность',
      description: 'Цветы упакованы в специальные контейнеры для сохранения свежести'
    },
    {
      icon: '🎁',
      title: 'Подарочная упаковка',
      description: 'Красивое оформление для особых случаев'
    },
    {
      icon: '⭐',
      title: 'Качество',
      description: 'Гарантия свежести цветов при доставке'
    },
    {
      icon: '💳',
      title: 'Оплата',
      description: 'Оплата при получении или онлайн'
    }
  ];

  const faq = [
    {
      question: 'В какое время работает доставка?',
      answer: 'Доставка работает ежедневно с 8:00 до 22:00. В праздничные дни время может быть изменено.'
    },
    {
      question: 'Можно ли заказать доставку в выходные?',
      answer: 'Да, мы доставляем цветы 7 дней в неделю, включая выходные и праздники.'
    },
    {
      question: 'Что делать, если цветы повреждены при доставке?',
      answer: 'Если цветы повреждены, мы заменим их на новые или вернем деньги. Свяжитесь с нами в течение 2 часов после доставки.'
    },
    {
      question: 'Можно ли изменить время доставки?',
      answer: 'Да, вы можете изменить время доставки не позднее чем за 2 часа до назначенного времени.'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-pink-500 to-rose-600 text-white overflow-hidden">
          {/* Адаптивный фон для темной темы */}
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-black/20 via-purple-900/10 to-black/30' : 'bg-black/10'}`}></div>
          
          {/* Декоративные элементы для темной темы */}
          {isDarkMode && (
            <>
              {/* Звезды */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-32 right-32 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-40 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-16 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-28 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
              </div>
              
              {/* Градиентные круги */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full blur-3xl"></div>
            </>
          )}
          
          {/* Светлые декоративные элементы для светлой темы */}
          {!isDarkMode && (
            <>
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl"></div>
            </>
          )}
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 font-handwritten-primary text-glow">
                Доставка цветов
              </h1>
              <p className="text-xl md:text-2xl opacity-90 mb-8 font-handwritten-accent">
                Мы делаем доставку цветочных композиций по всей ЧР и близлежащим регионам
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <span className="text-lg">⏰</span>
                  <span>Доставка 24/7</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <span className="text-lg">📍</span>
                  <span>По всей ЧР</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <span className="text-lg">🛡️</span>
                  <span>Гарантия качества</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Delivery Methods */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 font-handwritten-primary text-glow">
                Способы доставки
              </h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-handwritten-accent">
                Выберите наиболее удобный для вас способ получения цветов
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {deliveryMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-8 shadow-lg dark:shadow-soft-dark hover:shadow-xl transition-all duration-300 border border-pink-100 dark:border-pink-800"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <span className="text-4xl">{method.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center font-handwritten-secondary">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center mb-6 font-handwritten-accent text-2xl">
                    {method.description}
                  </p>
                  <ul className="space-y-3">
                    {method.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-2xl text-gray-600 dark:text-gray-300 font-handwritten-accent">
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Zones */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 font-handwritten-primary text-glow">
                Зоны и стоимость доставки
              </h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-handwritten-accent">
                Выберите зону доставки и узнайте стоимость и время
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {deliveryZones.map((zone) => (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                    selectedZone === zone.id
                      ? 'border-pink-500 dark:border-pink-400 bg-pink-50 dark:bg-pink-900/20 shadow-lg dark:shadow-soft-dark'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-pink-300 dark:hover:border-pink-500 hover:shadow-md dark:hover:shadow-soft-dark'
                  }`}
                  onClick={() => setSelectedZone(zone.id)}
                >
                  {selectedZone === zone.id && (
                    <motion.div
                      layoutId="selectedZone"
                      className="absolute top-0 right-0 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 font-handwritten-secondary">
                      {zone.name}
                    </h3>
                    <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2 font-handwritten-stats">
                      {zone.price}
                    </div>
                    <div className="text-2xl text-gray-600 dark:text-gray-300 mb-3 font-handwritten-accent">
                      {zone.time}
                    </div>
                    <p className="text-2xl text-gray-500 dark:text-gray-400 font-handwritten-accent">
                      {zone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 font-handwritten-primary text-glow">
                Почему выбирают нашу доставку
              </h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-handwritten-accent">
                Мы заботимся о качестве и своевременности доставки ваших цветов
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliveryFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <span className="text-4xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 font-handwritten-secondary">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 font-handwritten-primary text-glow">
                Часто задаваемые вопросы
              </h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-handwritten-accent">
                Ответы на самые популярные вопросы о доставке
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6">
              {faq.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-md dark:hover:shadow-soft-dark transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 font-handwritten-secondary">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-handwritten-accent text-2xl">
                    {item.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-5xl font-bold text-white mb-6 font-handwritten-primary text-glow">
                Готовы заказать доставку?
              </h2>
              <p className="text-2xl text-white/90 mb-8 font-handwritten-accent">
                Свяжитесь с нами для оформления заказа или задайте любые вопросы
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-pink-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3 font-handwritten-button">
                  <span className="text-xl">📞</span>
                  Заказать доставку
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-pink-600 transition-all duration-300 flex items-center justify-center gap-3 font-handwritten-button">
                  <span className="text-xl">📍</span>
                  Рассчитать стоимость
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Delivery;
