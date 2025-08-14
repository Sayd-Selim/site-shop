import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import PageTransition from '../components/PageTransition';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isDarkMode } = useTheme();

  const contactMethods = [
    {
      icon: '📱',
      title: 'WhatsApp',
      description: 'Быстрая связь через WhatsApp',
      contact: '8(928)017-13-93',
      action: 'Написать в WhatsApp',
      link: 'https://wa.me/79280171393',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: '📲',
      title: 'Telegram',
      description: 'Свяжитесь с нами в Telegram',
      contact: '8(928)017-13-93',
      action: 'Написать в Telegram',
      link: 'https://t.me/79280171393',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: '📷',
      title: 'Instagram',
      description: 'Следите за нашими работами',
      contact: '@blumen_zu',
      action: 'Перейти в Instagram',
      link: 'https://instagram.com/blumen_zu',
      color: 'from-pink-400 to-purple-600'
    },
    {
      icon: '📞',
      title: 'Телефон',
      description: 'Позвоните нам напрямую',
      contact: '8(928)017-13-93',
      action: 'Позвонить',
      link: 'tel:+79280171393',
      color: 'from-pink-400 to-rose-600'
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

  const faq = [
    {
      question: 'В какое время лучше звонить?',
      answer: 'Лучше всего звонить в рабочее время с 9:00 до 21:00. В выходные мы работаем с 10:00 до 20:00.'
    },
    {
      question: 'Как быстро вы отвечаете в мессенджерах?',
      answer: 'Мы стараемся отвечать в течение 15-30 минут в рабочее время. В нерабочее время ответим на следующий день.'
    },
    {
      question: 'Можно ли заказать через Instagram?',
      answer: 'Да, вы можете написать нам в директ Instagram, и мы поможем оформить заказ.'
    },
    {
      question: 'Есть ли доставка в выходные?',
      answer: 'Да, мы работаем и доставляем заказы в выходные дни по предварительной договоренности.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
      alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
    }, 2000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Контакт скопирован в буфер обмена!');
  };

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
                Свяжитесь с нами
              </h1>
              <p className="text-2xl md:text-3xl opacity-90 mb-8 font-handwritten-accent">
                Выберите удобный способ связи или оставьте сообщение
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <span className="text-lg">📱</span>
                  <span>WhatsApp</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <span className="text-lg">📲</span>
                  <span>Telegram</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <span className="text-lg">📷</span>
                  <span>Instagram</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 font-handwritten-primary text-glow">
                Способы связи
              </h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-handwritten-accent">
                Выберите наиболее удобный для вас способ связи
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-soft-dark hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <span className="text-4xl">{method.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3 font-handwritten-secondary">
                        {method.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 font-handwritten-accent text-2xl">
                        {method.description}
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-700 dark:text-gray-200 font-handwritten-stats text-2xl">{method.contact}</span>
                          <button
                            onClick={() => copyToClipboard(method.contact)}
                            className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 text-xl font-medium font-handwritten-accent"
                          >
                            Копировать
                          </button>
                        </div>
                        <a
                          href={method.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-block w-full bg-gradient-to-r ${method.color} text-white px-6 py-3 rounded-xl font-bold text-center hover:shadow-lg transition-all duration-300 font-handwritten-button`}
                        >
                          {method.action}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Working Hours */}
            <div className="mb-16">
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center font-handwritten-primary text-glow">
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
                        <span className="text-xl">🕒</span>
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

            {/* Contact Form and Company Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg dark:shadow-soft-dark border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 font-handwritten-primary text-glow">
                  Оставить сообщение
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-2xl font-medium text-gray-700 dark:text-gray-200 mb-2 font-handwritten-accent">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Введите ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-2xl font-medium text-gray-700 dark:text-gray-200 mb-2 font-handwritten-accent">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <label className="block text-2xl font-medium text-gray-700 dark:text-gray-200 mb-2 font-handwritten-accent">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-2xl font-medium text-gray-700 dark:text-gray-200 mb-2 font-handwritten-accent">
                      Сообщение *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent transition-all duration-300 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Опишите ваш заказ или задайте вопрос..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-handwritten-button"
                  >
                    {isSubmitting ? 'Отправляем...' : 'Отправить сообщение'}
                  </button>
                </form>
              </motion.div>

              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-3xl p-8 border border-pink-100 dark:border-pink-800">
                  <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 font-handwritten-primary text-glow">
                    Информация о компании
                  </h3>
                  <div className="space-y-4">
                    {companyInfo.map((info, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">{info.icon}</span>
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-1 font-handwritten-secondary">
                            {info.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg dark:shadow-soft-dark border border-gray-100 dark:border-gray-700">
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 font-handwritten-primary text-glow">
                    Часто задаваемые вопросы
                  </h3>
                  <div className="space-y-4">
                    {faq.map((item, index) => (
                      <div key={index} className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-b-0">
                        <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 font-handwritten-secondary">
                          {item.question}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-2xl font-handwritten-accent">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
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
                Готовы заказать?
              </h2>
              <p className="text-2xl text-white/90 mb-8 font-handwritten-accent">
                Свяжитесь с нами любым удобным способом, и мы поможем создать идеальный букет
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/79280171393"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-green-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3 font-handwritten-button"
                >
                  <span className="text-xl">📱</span>
                  WhatsApp
                </a>
                <a
                  href="tel:+79280171393"
                  className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-pink-600 transition-all duration-300 flex items-center justify-center gap-3 font-handwritten-button"
                >
                  <span className="text-xl">📞</span>
                  Позвонить
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact; 