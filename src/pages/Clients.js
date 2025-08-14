import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from '../context/ThemeContext';
import PageTransition from '../components/PageTransition';

const Clients = () => {
  const [activeTab, setActiveTab] = useState("order");
  const { isDarkMode } = useTheme();

  const orderSteps = [
    {
      icon: "🎨",
      title: "Авторские композиции",
      description: "Мы не повторяем букеты один-в-один. Делаем авторские композиции по вашим пожеланиям",
    },
    {
      icon: "📝",
      title: "Укажите данные",
      description: "Имя, фамилия, номер телефона",
    },
    {
      icon: "⏰",
      title: "Время готовности",
      description: "Укажите, когда заказ должен быть готов",
    },
    {
      icon: "📦",
      title: "Формат композиции",
      description: "Букет, коробка или корзина",
    },
    {
      icon: "🎨",
      title: "Цветовая гамма",
      description: "Нежная, светлая или яркая",
    },
    {
      icon: "💰",
      title: "Бюджет",
      description: "Укажите желаемую стоимость",
    },
    {
      icon: "💐",
      title: "Пожелания по составу",
      description: "Какие цветы нравятся, какие нет",
    },
    {
      icon: "📋",
      title: "Дополнительно",
      description: "Открытка, доставка и иные пожелания",
    },
  ];

  const orderMethods = [
    {
      icon: "📱",
      title: "WhatsApp",
      description: "Напишите нам в WhatsApp для оформления заказа",
      contact: "8(928)017-13-93",
      time: "Круглосуточно",
    },
    {
      icon: "📲",
      title: "Telegram",
      description: "Напишите нам в Telegram для оформления заказа",
      contact: "8(928)017-13-93",
      time: "Круглосуточно",
    },
    {
      icon: "📷",
      title: "Instagram",
      description: "Следите за нашими работами и пишите в директ",
      contact: "@blumen_zu",
      time: "Круглосуточно",
    },
    {
      icon: "🏢",
      title: "Реквизиты компании",
      description: "Юридическая информация о компании",
      contact: "ИП Закаева Зулихан Алиевна",
      time: "ИНН: 201578245065",
    },
  ];

  const returnInfo = [
    {
      icon: "🏪",
      title: "При самовывозе",
      description:
        "Возврат покупателем возможен в момент выдачи заказа. После того, как клиент забрал заказ и покинул мастерскую, претензии не принимаются и цветы возврату не подлежат.",
    },
    {
      icon: "📸",
      title: "При доставке (не получатель)",
      description:
        "Мы всегда высылаем фотографии готовой композиции перед отправкой. Отказ от цветов возможен в момент получения фотографий, но не после осуществления доставки.",
    },
    {
      icon: "🚚",
      title: "При доставке (получатель)",
      description: "Возврат цветов возможен в момент получения заказа от курьера. После того, как курьер покинул заказчика, цветы возврату не подлежат.",
    },
    {
      icon: "⚠️",
      title: "Важные условия",
      description: "Все претензии принимаем на месте «здесь и сейчас». Покупатель несёт полную ответственность по уходу за цветами после выдачи заказа.",
    },
  ];

  const usefulInfo = [
    {
      icon: "💐",
      title: "Уход за цветами",
      description: "Как продлить жизнь букету и сохранить его свежесть",
    },
    {
      icon: "🎁",
      title: "Подарочные сертификаты",
      description: "Дарите радость близким с нашими сертификатами",
    },
    {
      icon: "🎉",
      title: "Праздничные букеты",
      description: "Специальные предложения к праздникам",
    },
    {
      icon: "⭐",
      title: "Программа лояльности",
      description: "Получайте скидки и бонусы за покупки",
    },
  ];

  const faq = [
    {
      question: "Можно ли заказать букет заранее?",
      answer: "Да, вы можете заказать букет на определенную дату. Рекомендуем делать заказ за 1-2 дня.",
    },
    {
      question: "Что делать, если цветы завяли?",
      answer: "Свяжитесь с нами в течение 2 часов после доставки. Мы заменим букет или вернем деньги.",
    },
    {
      question: "Можно ли изменить время доставки?",
      answer: "Да, вы можете изменить время доставки не позднее чем за 2 часа до назначенного времени.",
    },
    {
      question: "Есть ли подарочная упаковка?",
      answer: "Да, все наши букеты упаковываются в красивую подарочную упаковку бесплатно.",
    },
  ];

  const tabs = [
    { id: "order", label: "Как оформить заказ", icon: "🛒" },
    { id: "where", label: "Где заказать", icon: "📍" },
    { id: "return", label: "Возврат заказа", icon: "🔄" },
    { id: "info", label: "Полезная информация", icon: "ℹ️" },
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 font-handwritten-primary text-glow">Информация для клиентов</h1>
              <p className="text-2xl md:text-3xl opacity-90 mb-8 font-handwritten-accent">Все, что нужно знать о заказе, доставке и возврате цветов</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <span className="text-lg">🛒</span>
                  <span>Простой заказ</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <span className="text-lg">🔄</span>
                  <span>Легкий возврат</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <span className="text-lg">💐</span>
                  <span>Качественные цветы</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                    activeTab === tab.id 
                      ? "bg-pink-500 text-white shadow-lg" 
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <span className="text-2xl">{tab.icon}</span>
                  <span className="font-medium font-handwritten-accent text-2xl">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* How to Order */}
            {activeTab === "order" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 font-handwritten-primary text-glow">Как оформить заказ</h2>
                  <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 font-handwritten-accent">Простая пошаговая инструкция для оформления заказа</p>
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-6 max-w-3xl mx-auto border border-pink-100 dark:border-pink-800">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">⚠️</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 font-handwritten-secondary">Важная информация</h3>
                        <p className="text-gray-700 dark:text-gray-200 leading-relaxed font-handwritten-accent text-2xl">
                          <strong>Доставка в праздничные дни</strong> осуществляется с интервалом в два часа. Пожалуйста, учитывайте это при оформлении заказа.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {orderSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-soft-dark hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                          <span className="text-3xl">{step.icon}</span>
                        </div>
                        <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">{index + 1}</div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 font-handwritten-secondary">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-handwritten-accent text-2xl">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Where to Order */}
            {activeTab === "where" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 font-handwritten-primary text-glow">Где заказать</h2>
                  <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-handwritten-accent">Выберите наиболее удобный для вас способ заказа</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {orderMethods.map((method, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-8 shadow-lg dark:shadow-soft-dark hover:shadow-xl transition-all duration-300 border border-pink-100 dark:border-pink-800"
                    >
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <span className="text-4xl">{method.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3 font-handwritten-secondary">{method.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 font-handwritten-accent text-2xl">{method.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-pink-600 dark:text-pink-400 font-handwritten-accent text-2xl">Контакты:</span>
                              <span className="text-gray-700 dark:text-gray-200 font-handwritten-stats text-xl">{method.contact}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-pink-600 dark:text-pink-400 font-handwritten-accent text-2xl">Время:</span>
                              <span className="text-gray-700 dark:text-gray-200 font-handwritten-accent text-2xl">{method.time}</span>
                            </div>
                            {method.title === "Реквизиты компании" && (
                              <div className="mt-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl space-y-2">
                                <div className="text-sm">
                                  <span className="font-semibold text-pink-600 dark:text-pink-400 font-handwritten-accent text-2xl">Юр. адрес:</span>
                                  <span className="text-gray-700 dark:text-gray-200 font-handwritten-accent text-2xl"> г. Грозный, ул. Воздвиженская 26</span>
                                </div>
                                <div className="text-sm">
                                  <span className="font-semibold text-pink-600 dark:text-pink-400 font-handwritten-accent text-2xl">ОГРНИП:</span>
                                  <span className="text-gray-700 dark:text-gray-200 font-handwritten-stats text-2xl"> 32020360024252</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Return Policy */}
            {activeTab === "return" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 font-handwritten-primary text-glow">Возврат заказа</h2>
                  <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-handwritten-accent">Условия возврата при самовывозе и доставке</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  {returnInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-soft-dark hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">{item.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 font-handwritten-secondary">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-handwritten-accent text-2xl">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-8 text-center"
                >
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 font-handwritten-secondary">Важно помнить</h3>
                  <p className="text-xl text-gray-700 dark:text-gray-200 mb-6 font-handwritten-accent">
                    При возникновении любых проблем с заказом сразу свяжитесь с нами. Мы всегда готовы помочь и решить любые вопросы!
                  </p>
                  <button className="bg-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-pink-600 transition-all duration-300 flex items-center justify-center gap-3 mx-auto font-handwritten-button">
                    <span className="text-xl">📞</span>
                    Связаться с нами
                  </button>
                </motion.div>
              </motion.div>
            )}

            {/* Useful Information */}
            {activeTab === "info" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 font-handwritten-primary text-glow">Полезная информация</h2>
                  <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-handwritten-accent">Советы и рекомендации для наших клиентов</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  {usefulInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-soft-dark hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                          <span className="text-3xl">{item.icon}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 font-handwritten-secondary">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-handwritten-accent text-2xl">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* FAQ */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                  <h3 className="text-5xl font-bold text-gray-800 dark:text-white mb-8 text-center font-handwritten-primary text-glow">Часто задаваемые вопросы</h3>
                  <div className="max-w-4xl mx-auto space-y-6">
                    {faq.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-md dark:hover:shadow-soft-dark transition-all duration-300 border border-gray-200 dark:border-gray-700"
                      >
                        <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 font-handwritten-secondary">{item.question}</h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-handwritten-accent text-2xl">{item.answer}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
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
              <h2 className="text-5xl font-bold text-white mb-6 font-handwritten-primary text-glow">Остались вопросы?</h2>
              <p className="text-2xl text-white/90 mb-8 font-handwritten-accent">Наша команда всегда готова помочь вам с выбором и оформлением заказа</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-pink-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3 font-handwritten-button">
                  <span className="text-xl">📞</span>
                  Позвонить нам
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-pink-600 transition-all duration-300 flex items-center justify-center gap-3 font-handwritten-button">
                  <span className="text-xl">💬</span>
                  Написать в чат
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Clients;
