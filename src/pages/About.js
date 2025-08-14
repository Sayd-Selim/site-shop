import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import PageTransition from '../components/PageTransition';

const About = () => {
  const [activeTab, setActiveTab] = useState('about');
  const { isDarkMode } = useTheme();

  // Статистика компании
  const [stats, setStats] = useState({
    years: 0,
    clients: 0,
    orders: 0,
    rating: 0
  });

  useEffect(() => {
    const animateStats = () => {
      const targetStats = {
        years: 5,
        clients: 2500,
        orders: 15000,
        rating: 4.9
      };

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setStats({
          years: Math.floor(targetStats.years * progress),
          clients: Math.floor(targetStats.clients * progress),
          orders: Math.floor(targetStats.orders * progress),
          rating: parseFloat((targetStats.rating * progress).toFixed(1))
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setStats(targetStats);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  const companyInfo = [
    {
      icon: '🏢',
      title: 'ИП Закаева Зулихан Алиевна',
      description: 'Индивидуальный предприниматель'
    },
    {
      icon: '📍',
      title: 'Адрес',
      description: 'Грозный, Эсамбаева 14А, здание «Groztek», 5 этаж'
    },
    {
      icon: '📋',
      title: 'ИНН',
      description: '201578245065'
    },
    {
      icon: '📄',
      title: 'ОГРНИП',
      description: '32020360024252'
    }
  ];

  const teamMembers = [
    {
      name: 'Зулихан Алиевна',
      position: 'Основатель и главный флорист',
      description: 'Профессиональный флорист с многолетним опытом создания уникальных композиций',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Амина',
      position: 'Флорист-дизайнер',
      description: 'Специалист по созданию свадебных и праздничных композиций',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Малика',
      position: 'Менеджер по работе с клиентами',
      description: 'Помогает клиентам выбрать идеальную композицию для любого случая',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face'
    }
  ];

  const achievements = [
    {
      icon: '🏆',
      title: 'Лучший флорист 2023',
      description: 'Победитель городского конкурса флористов'
    },
    {
      icon: '⭐',
      title: 'Высокий рейтинг',
      description: '4.9 из 5 звезд по отзывам клиентов'
    },
    {
      icon: '💐',
      title: 'Более 15,000 заказов',
      description: 'Успешно выполненных композиций'
    },
    {
      icon: '🎉',
      title: '5 лет опыта',
      description: 'Создания прекрасных цветочных композиций'
    }
  ];

  const values = [
    {
      icon: '💎',
      title: 'Качество',
      description: 'Используем только свежие цветы премиум-класса'
    },
    {
      icon: '🎨',
      title: 'Креативность',
      description: 'Каждая композиция уникальна и создается индивидуально'
    },
    {
      icon: '🤝',
      title: 'Надежность',
      description: 'Выполняем заказы точно в срок с гарантией качества'
    },
    {
      icon: '💝',
      title: 'Забота',
      description: 'Внимательно относимся к каждому клиенту и его пожеланиям'
    }
  ];

  const testimonials = [
    {
      name: 'Алина',
      text: 'Потрясающие букеты! Заказывала на день рождения мамы, все были в восторге. Спасибо за красоту!',
      rating: 5,
      date: '2 дня назад'
    },
    {
      name: 'Руслан',
      text: 'Отличный сервис и качество. Заказывал свадебную композицию, все было идеально!',
      rating: 5,
      date: '1 неделю назад'
    },
    {
      name: 'Мадина',
      text: 'Очень довольна работой флористов. Букет был еще красивее, чем на фото!',
      rating: 5,
      date: '3 дня назад'
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 font-handwritten-primary text-glow">
                О нас
              </h1>
              <p className="text-2xl md:text-3xl max-w-3xl mx-auto opacity-90 font-handwritten-accent">
                Создаем прекрасные цветочные композиции с 2021 года
              </p>
            </motion.div>
          </div>
        </section>

        {/* Статистика */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-pink-600 dark:text-pink-400 mb-2 font-handwritten-stats">{stats.years}</div>
                <div className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Лет опыта</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-rose-600 dark:text-rose-400 mb-2 font-handwritten-stats">{stats.clients.toLocaleString()}</div>
                <div className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2 font-handwritten-stats">{stats.orders.toLocaleString()}</div>
                <div className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Выполненных заказов</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 font-handwritten-stats">{stats.rating}</div>
                <div className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Средний рейтинг</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* О компании */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-handwritten-primary text-glow">Наша история</h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-handwritten-accent">
                Мы начали свой путь в 2019 году с небольшой мастерской в центре Грозного. 
                За это время мы создали тысячи уникальных цветочных композиций и помогли 
                нашим клиентам выразить свои чувства через красоту цветов.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {companyInfo.map((info, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-soft-dark p-6 text-center border border-gray-200 dark:border-gray-700">
                  <div className="text-4xl mb-4">{info.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 font-handwritten-secondary">{info.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">{info.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Наши ценности */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-handwritten-primary text-glow">Наши ценности</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => (
                <div key={index} className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-6 text-center border border-pink-200 dark:border-pink-800">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 font-handwritten-secondary">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">{value.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Команда */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-handwritten-primary text-glow">Наша команда</h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-handwritten-accent">
                Профессиональные флористы с многолетним опытом создания уникальных композиций
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-soft-dark overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="h-64 bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 font-handwritten-secondary">{member.name}</h3>
                    <p className="text-pink-600 dark:text-pink-400 font-medium mb-3 font-handwritten-accent text-2xl">{member.position}</p>
                    <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">{member.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Достижения */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-handwritten-primary text-glow">Наши достижения</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 text-center border border-emerald-200 dark:border-emerald-800">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 font-handwritten-secondary">{achievement.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">{achievement.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Отзывы */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-handwritten-primary text-glow">Отзывы клиентов</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-soft-dark p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-2xl ml-2">{testimonial.date}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic font-handwritten-accent text-2xl">"{testimonial.text}"</p>
                  <p className="font-semibold text-gray-900 dark:text-white font-handwritten-secondary text-2xl">{testimonial.name}</p>
                </div>
              ))}
            </motion.div>
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
              <h2 className="text-5xl font-bold mb-6 font-handwritten-primary text-glow">Готовы создать что-то прекрасное?</h2>
              <p className="text-2xl mb-8 opacity-90 font-handwritten-accent">
                Свяжитесь с нами и мы поможем воплотить ваши идеи в жизнь
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/79280171393"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors font-handwritten-button"
                >
                  Написать в WhatsApp
                </a>
                <a
                  href="https://t.me/79280171393"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors font-handwritten-button"
                >
                  Написать в Telegram
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About; 