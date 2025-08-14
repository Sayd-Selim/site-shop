import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import PageTransition from '../components/PageTransition';

const BonusProgram = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(1);
  const { isDarkMode } = useTheme();

  // Имитация загрузки данных пользователя
  useEffect(() => {
    // Моковые данные - в реальном приложении здесь был бы API запрос
    setCurrentBalance(2500);
    setTotalSpent(125000);
    
    // Определяем текущую группу на основе потраченной суммы
    if (totalSpent >= 500000) {
      setCurrentGroup(3);
    } else if (totalSpent >= 100000) {
      setCurrentGroup(2);
    } else {
      setCurrentGroup(1);
    }
  }, [totalSpent]);

  const bonusGroups = [
    {
      id: 1,
      name: '1 группа',
      entryAmount: '0₽',
      bonusPercent: 5,
      writeOffPercent: 100,
      color: 'from-blue-400 to-blue-600',
      icon: '🌟',
      description: 'Базовая группа для всех клиентов'
    },
    {
      id: 2,
      name: '2 группа',
      entryAmount: '100 000₽',
      bonusPercent: 10,
      writeOffPercent: 100,
      color: 'from-purple-400 to-purple-600',
      icon: '💎',
      description: 'Для постоянных клиентов'
    },
    {
      id: 3,
      name: '3 группа',
      entryAmount: '500 000₽',
      bonusPercent: 20,
      writeOffPercent: 100,
      color: 'from-emerald-400 to-emerald-600',
      icon: '👑',
      description: 'VIP группа для премиум клиентов'
    }
  ];

  const programRules = [
    {
      icon: '🎯',
      title: 'Вход в программу',
      description: 'Вход в бонусную программу осуществляется при первой покупке, с момента действия бонусной программы.'
    },
    {
      icon: '💰',
      title: 'Накопление бонусов',
      description: 'С каждой следующей покупки накапливается сумма для входа в определённую группу.'
    },
    {
      icon: '💎',
      title: 'Курс бонусов',
      description: '1 бонус = 1₽'
    },
    {
      icon: '♾️',
      title: 'Бессрочная программа',
      description: 'Программа бессрочная и действует без сгорания накопленной суммы.'
    },
    {
      icon: '🚫',
      title: 'Ограничения',
      description: 'Бонусы нельзя списывать в праздники: 8 марта, День матери, Ураза Байрам, Ид аль Фитр.'
    }
  ];

  const restrictedHolidays = [
    { name: '8 марта', date: '8 марта' },
    { name: 'День матери', date: 'Последнее воскресенье ноября' },
    { name: 'Ураза Байрам', date: 'По исламскому календарю' },
    { name: 'Ид аль Фитр', date: 'По исламскому календарю' }
  ];

  const calculateNextGroup = () => {
    if (currentGroup === 1) {
      return { group: 2, remaining: 100000 - totalSpent };
    } else if (currentGroup === 2) {
      return { group: 3, remaining: 500000 - totalSpent };
    }
    return null;
  };

  const nextGroup = calculateNextGroup();

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-purple-500 to-blue-600 text-white overflow-hidden">
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
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
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
                Бонусная программа
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 font-handwritten-accent">
                Накопительная система бонусов для наших постоянных клиентов
              </p>
            </motion.div>
          </div>
        </section>

        {/* Текущий статус пользователя */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white text-center mb-8 font-handwritten-secondary">Ваш статус</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2 font-handwritten-stats">{currentBalance.toLocaleString()}₽</div>
                  <div className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Текущий баланс бонусов</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2 font-handwritten-stats">{totalSpent.toLocaleString()}₽</div>
                  <div className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Общая сумма покупок</div>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 font-handwritten-stats">{currentGroup}</div>
                  <div className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Текущая группа</div>
                </div>
              </div>

              {nextGroup && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 text-center">
                  <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2 font-handwritten-secondary">
                    До следующей группы
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">
                    Осталось потратить <span className="font-bold text-orange-600 dark:text-orange-400 font-handwritten-stats">{nextGroup.remaining.toLocaleString()}₽</span> 
                    для перехода в группу <span className="font-handwritten-stats">{nextGroup.group}</span>
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Бонусные группы */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 font-handwritten-primary text-glow">Бонусные группы</h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-handwritten-accent">
                Выберите подходящую группу и начните накапливать бонусы
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {bonusGroups.map((group, index) => (
                <div 
                  key={group.id}
                  className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-soft-dark overflow-hidden border border-gray-100 dark:border-gray-700 ${
                    currentGroup === group.id ? 'ring-4 ring-purple-500 dark:ring-purple-400' : ''
                  }`}
                >
                  {currentGroup === group.id && (
                    <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold font-handwritten-badge">
                      Текущая
                    </div>
                  )}
                  
                  <div className={`h-32 bg-gradient-to-r ${group.color} flex items-center justify-center`}>
                    <div className="text-6xl">{group.icon}</div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-handwritten-secondary">{group.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 font-handwritten-accent text-2xl">{group.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Вход от:</span>
                        <span className="font-semibold text-gray-900 dark:text-white font-handwritten-stats">{group.entryAmount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Начисление:</span>
                        <span className="font-semibold text-green-600 dark:text-green-400 font-handwritten-stats">{group.bonusPercent}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Списание:</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400 font-handwritten-stats">{group.writeOffPercent}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Условия программы */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 font-handwritten-primary text-glow">Условия программы</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {programRules.map((rule, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <div className="text-4xl mb-4">{rule.icon}</div>
                  <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3 font-handwritten-secondary">{rule.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">{rule.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Праздничные ограничения */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 font-handwritten-primary text-glow">Праздничные ограничения</h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-handwritten-accent">
                В эти праздничные дни списание бонусов временно приостановлено
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {restrictedHolidays.map((holiday, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-soft-dark p-6 text-center border border-gray-100 dark:border-gray-700">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2 font-handwritten-secondary">{holiday.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">{holiday.date}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Как это работает */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 font-handwritten-primary text-glow">Как это работает</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3 font-handwritten-secondary">Делайте покупки</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">
                    Каждая покупка увеличивает общую сумму и приближает к следующей группе
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3 font-handwritten-secondary">Получайте бонусы</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">
                    Накапливайте бонусы в зависимости от вашей группы (5%, 10% или 20%)
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3 font-handwritten-secondary">Используйте бонусы</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">
                    Оплачивайте до 100% стоимости покупки накопленными бонусами
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-500 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-6 font-handwritten-primary text-glow">Готовы начать накапливать бонусы?</h2>
              <p className="text-2xl mb-8 opacity-90 font-handwritten-accent">
                Сделайте первую покупку и автоматически присоединитесь к бонусной программе
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/products"
                  className="bg-white hover:bg-gray-100 text-purple-600 px-8 py-3 rounded-lg font-semibold transition-colors font-handwritten-button"
                >
                  Перейти в каталог
                </a>
                <a
                  href="https://wa.me/79280171393"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors font-handwritten-button"
                >
                  Задать вопрос
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default BonusProgram;
