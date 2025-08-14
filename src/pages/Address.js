import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import PageTransition from '../components/PageTransition';

const Address = () => {
  const { isDarkMode } = useTheme();

  const addressInfo = [
    {
      icon: '📍',
      title: 'Точный адрес',
      description: 'Грозный, Эсамбаева 14А, здание «Groztek», 5 этаж'
    },
    {
      icon: '🏢',
      title: 'Здание',
      description: 'Современное офисное здание «Groztek» с удобным подъездом'
    },
    {
      icon: '🛗',
      title: 'Как добраться',
      description: 'Поднимитесь на лифте на 5 этаж, наша мастерская находится в конце коридора'
    },
    {
      icon: '🚗',
      title: 'Парковка',
      description: 'Бесплатная парковка у здания, удобный подъезд на автомобиле'
    }
  ];

  const workingHours = [
    {
      day: 'Понедельник - Пятница',
      time: '9:00 - 21:00',
      status: 'Работаем'
    },
    {
      day: 'Суббота',
      time: '10:00 - 20:00',
      status: 'Работаем'
    },
    {
      day: 'Воскресенье',
      time: '10:00 - 18:00',
      status: 'Работаем'
    }
  ];

  const transportInfo = [
    {
      icon: '🚌',
      title: 'Автобус',
      description: 'Автобусы №15, №23, №45 до остановки «Эсамбаева»'
    },
    {
      icon: '🚕',
      title: 'Такси',
      description: 'Скажите водителю: «Groztek, 5 этаж»'
    },
    {
      icon: '🚶',
      title: 'Пешком',
      description: '5 минут от центральной площади города'
    }
  ];

  const features = [
    {
      icon: '🎨',
      title: 'Уютная мастерская',
      description: 'Просторное помещение с большими окнами и естественным освещением'
    },
    {
      icon: '☕',
      title: 'Зона ожидания',
      description: 'Комфортная зона для ожидания с кофе и чаем'
    },
    {
      icon: '📱',
      title: 'Wi-Fi',
      description: 'Бесплатный интернет для наших клиентов'
    },
    {
      icon: '🅿️',
      title: 'Парковка',
      description: 'Удобная парковка прямо у входа в здание'
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
                Наш адрес
              </h1>
              <p className="text-2xl md:text-2xl opacity-90 mb-8 font-handwritten-accent">
                Приходите к нам в гости в нашу уютную мастерскую
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <span className="text-lg">📍</span>
                  <span>Центр города</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <span className="text-lg">🅿️</span>
                  <span>Бесплатная парковка</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <span className="text-lg">🚗</span>
                  <span>Удобный подъезд</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Address Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 font-handwritten-primary text-glow">
                Где нас найти
              </h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-handwritten-accent">
                Мы находимся в самом центре города в современном здании
              </p>
            </div>

            {/* Address Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {addressInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-soft-dark hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 font-handwritten-secondary">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-handwritten-accent text-2xl">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main Address Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-3xl p-12 text-white text-center mb-16"
            >
              <div className="max-w-4xl mx-auto">
                <h3 className="text-5xl font-bold mb-6 font-handwritten-primary text-glow">
                  🏢 Groztek, 5 этаж
                </h3>
                <p className="text-2xl mb-8 opacity-90 font-handwritten-stats text-2xl">
                  Грозный, Эсамбаева 14А
                </p>
                <div className="bg-white/20 rounded-2xl p-6 inline-block">
                  <p className="text-2xl font-medium font-handwritten-accent">
                    Наша мастерская находится на 5 этаже в конце коридора
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Working Hours */}
            <div className="mb-16">
              <h3 className="text-5xl font-bold text-gray-800 dark:text-white mb-8 text-center font-handwritten-primary text-glow">
                Время работы
              </h3>
              <div className="max-w-2xl mx-auto">
                {workingHours.map((schedule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-soft-dark mb-4 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🕒</span>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-800 dark:text-white font-handwritten-secondary">
                          {schedule.day}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">
                          {schedule.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full font-medium font-handwritten-badge">
                        {schedule.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* How to Get There */}
            <div className="mb-16">
              <h3 className="text-5xl font-bold text-gray-800 dark:text-white mb-8 text-center font-handwritten-primary text-glow">
                Как добраться
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {transportInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-soft-dark hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 font-handwritten-secondary">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-handwritten-accent text-2xl">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-16">
              <h3 className="text-5xl font-bold text-gray-800 dark:text-white mb-8 text-center font-handwritten-primary text-glow">
                Что вас ждет в мастерской
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-8 shadow-lg dark:shadow-soft-dark hover:shadow-xl transition-all duration-300 border border-pink-100 dark:border-pink-800"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 font-handwritten-secondary">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-handwritten-accent text-2xl">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-12 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🗺️</span>
              </div>
              <h3 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 font-handwritten-secondary">
                Карта
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 font-handwritten-accent text-2xl">
                Здесь будет интерактивная карта с отметкой нашей мастерской
              </p>
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-inner dark:shadow-soft-dark">
                <p className="text-2xl font-medium text-gray-700 dark:text-gray-200 font-handwritten-stats">
                  🏢 Groztek, 5 этаж
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2 font-handwritten-accent text-2xl">
                  Грозный, Эсамбаева 14А
                </p>
              </div>
            </motion.div>
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
                Ждем вас в гости!
              </h2>
              <p className="text-2xl text-white/90 mb-8 font-handwritten-accent">
                Приходите к нам в мастерскую, чтобы увидеть наши работы и обсудить ваш заказ
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-pink-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3 font-handwritten-button">
                  <span className="text-xl">📱</span>
                  Связаться с нами
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-pink-600 transition-all duration-300 flex items-center justify-center gap-3 font-handwritten-button">
                  <span className="text-xl">🗺️</span>
                  Построить маршрут
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Address;
