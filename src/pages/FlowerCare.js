import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import PageTransition from '../components/PageTransition';

const FlowerCare = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { isDarkMode } = useTheme();

  const tabs = [
    { id: 'general', label: 'Общий уход', icon: '🌺' },
    { id: 'warm', label: 'Тёплое время', icon: '☀️' },
    { id: 'cold', label: 'Холодное время', icon: '❄️' },
    { id: 'bouquet', label: 'Букеты', icon: '💐' },
    { id: 'basket', label: 'Корзины/Коробки', icon: '🧺' },
    { id: 'chrysal', label: 'Кризаль', icon: '💧' },
    { id: 'types', label: 'Типы цветов', icon: '🌸' }
  ];

  const warmWeatherCare = [
    {
      step: 1,
      title: 'Подрезка стеблей',
      description: 'После получения подрежьте все стебли примерно на 1 см. и поставьте в холодную воду.'
    },
    {
      step: 2,
      title: 'Защита от солнца',
      description: 'Держите цветы подальше от прямых солнечных лучей.'
    },
    {
      step: 3,
      title: 'Избегайте кондиционера',
      description: 'Не ставьте цветы прямо под обдув кондиционера.'
    },
    {
      step: 4,
      title: 'Прохладное место',
      description: 'Выберите для цветов максимально прохладное место в доме.'
    },
    {
      step: 5,
      title: 'Смена воды',
      description: 'Меняйте воду через день.'
    }
  ];

  const coldWeatherCare = [
    {
      step: 1,
      title: 'Прогрев цветов',
      description: 'После получения дайте цветам минут 5−10, чтобы согреться.'
    },
    {
      step: 2,
      title: 'Подрезка стеблей',
      description: 'Подрежьте все стебли примерно на 1 см, после поставьте в холодную воду.'
    },
    {
      step: 3,
      title: 'Защита от отопления',
      description: 'Держите цветы подальше от отопительных приборов (особенно подоконники).'
    },
    {
      step: 4,
      title: 'Избегайте тёплого ветра',
      description: 'Не ставьте цветы под тёплый обдув ветра.'
    },
    {
      step: 5,
      title: 'Прохладное место',
      description: 'Держите цветы в прохладном месте, но не там где они будут мёрзнуть.'
    },
    {
      step: 6,
      title: 'Смена воды',
      description: 'Меняйте воду через день.'
    }
  ];

  const chrysalInfo = [
    {
      icon: '🎁',
      title: 'В комплекте',
      description: 'При покупке любой композиции мы прикладываем для клиента специальное средство Chrysal (кризаль) для продления жизни срезанных цветов.'
    },
    {
      icon: '💧',
      title: 'Использование',
      description: 'Всю воду, которую вы даёте цветам, разбавляйте этим средством.'
    },
    {
      icon: '📦',
      title: 'Большие композиции',
      description: 'Если Ваша композиция большого объёма, то можно разделить содержимое пакетика на первый и второй день.'
    },
    {
      icon: '🌿',
      title: 'Малые композиции',
      description: 'Если же композиция маленького или среднего объёма, то можно добавлять по щепотке каждый день.'
    }
  ];

  const flowerTypes = [
    {
      category: 'Розы, орхидеи и древесные цветы',
      flowers: 'Розы, орхидеи, зелень, шамилациум, прунус, протея, бруния, вибурнум, илекс, мимоза, скиммия',
      care: 'Требуют большого количества воды и среза под острым углом.',
      icon: '🌹'
    },
    {
      category: 'Каллы',
      flowers: 'Каллы',
      care: 'Воду нужно держать на донышке вазы, не больше 1 см., иначе стебель начинает мякнуть. Срез нужно делать под прямым углом.',
      icon: '🌷'
    },
    {
      category: 'Луковичные цветы',
      flowers: 'Тюльпаны, гиацинты, мускари, латирус, нарциссы, ландыши, анемоны, ранункулюсы',
      care: 'Нужно маленькое количество воды и прямой срез.',
      icon: '🌷'
    },
    {
      category: 'Остальные цветы',
      flowers: 'Все остальные виды цветов',
      care: 'Срез косой и среднее количество воды.',
      icon: '🌸'
    }
  ];

  const bouquetCare = [
    {
      type: 'Авторский букет',
      description: 'Букет, который сделан по определённой стилистике и расстановке из разных цветов',
      steps: [
        'Не спешите избавиться от упаковки, так как она служит завершающим элементом в образе букета.',
        'Как есть поставьте букет в вазу, предварительно подрезав стебли примерно на 1 см.',
        'Меняйте воду и подрезайте стебли на 1 см. каждый день.',
        'В таком виде букет можно хранить 1−2 дня.',
        'После 1−2 дней снимите упаковку, разрежьте связку из изоленты на ножке, также подрежьте.',
        'Для большей стойкости цветов советуем разделить их по вазам.',
        'Цветы, которые требуют большого объёма воды отдельно, малого отдельно.'
      ]
    },
    {
      type: 'Монобукет/Дуобукет',
      description: 'Букет из одного/двух видов цветов',
      steps: [
        'Снимите упаковку с букета.',
        'Разрежьте связку из изоленты.',
        'Поставьте в вазу с прохладной водой, подрезав стебли примерно на 1 см.',
        'Меняйте воду и подрезайте стебли на 1 см. каждый день.'
      ]
    }
  ];

  const basketCare = [
    {
      step: 1,
      title: 'Первые действия',
      description: 'После получения корзины/коробки необходимо подлить воду в центр композиции между цветами в первые полчаса.'
    },
    {
      step: 2,
      title: 'Правильное размещение',
      description: 'Держите в прохладном месте подальше от прямых солнечных лучей, отопительных приборов и обдува ветра.'
    },
    {
      step: 3,
      title: 'Полив в первые дни',
      description: 'В первые 3−4 дня подливайте каждый день чистую холодную воду прямо между цветами у их основания.'
    },
    {
      step: 4,
      title: 'Разбор композиции',
      description: 'После прошествия 3−4 дней можно разобрать композицию и поставить цветы в вазу (таким образом они будут цвести дольше).'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-8"
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-handwritten-secondary">Важные правила ухода</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-2xl mr-3">💧</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white font-handwritten-secondary text-2xl">Храните цветы только в чистых ёмкостях</h4>
                    <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Желательно стеклянных, используйте всегда прохладную чистую воду, разбавленную кризалем.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-3">⏰</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white font-handwritten-secondary text-2xl">Своевременная постановка в воду</h4>
                    <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">После получения букета его необходимо поставить в воду в первые полчаса. Это является важным условием для того, чтобы цветы не залежались и у них не испортился товарный вид.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-3">🌱</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white font-handwritten-secondary text-2xl">Индивидуальный подход</h4>
                    <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Так как цветок — это не только красивое, но и сложное творение Всевышнего, то каждый из них требует разного ухода.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case 'warm':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 mb-6"
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-handwritten-secondary">☀️ Уход в тёплое время года</h3>
              <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Особенности ухода за цветами в жаркую погоду</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {warmWeatherCare.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-soft-dark p-6 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {item.step}
                    </div>
                    <h4 className="text-2xl font-semibold text-gray-900 dark:text-white font-handwritten-secondary">{item.title}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'cold':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 mb-6"
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-handwritten-secondary">❄️ Уход в холодное время года</h3>
              <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Особенности ухода за цветами в холодную погоду</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coldWeatherCare.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-soft-dark p-6 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {item.step}
                    </div>
                    <h4 className="text-2xl font-semibold text-gray-900 dark:text-white font-handwritten-secondary">{item.title}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'bouquet':
        return (
          <div className="space-y-8">
            {bouquetCare.map((bouquet, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-soft-dark p-8 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4">💐</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-handwritten-secondary">{bouquet.type}</h3>
                    <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">{bouquet.description}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {bouquet.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start">
                      <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1">
                        {stepIndex + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-200 font-handwritten-accent text-2xl">{step}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'basket':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6"
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-handwritten-secondary">🧺 Композиции в корзине или коробке</h3>
              <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Композиции, сделанные в корзине, либо коробке, не отличаются друг от друга по уходу за ними. Все цветы посажены в специальную флористическую губку, которая служит подпиткой для них.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {basketCare.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-soft-dark p-6 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {item.step}
                    </div>
                    <h4 className="text-2xl font-semibold text-gray-900 dark:text-white font-handwritten-secondary">{item.title}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'chrysal':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6"
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-handwritten-secondary">💧 Chrysal (Кризаль)</h3>
              <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Специальное средство для продления жизни срезанных цветов</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chrysalInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-soft-dark p-6 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 font-handwritten-secondary">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'types':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6 mb-6"
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-handwritten-secondary">🌸 Уход за разными типами цветов</h3>
              <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl">Каждый тип цветов требует особого подхода к уходу</p>
            </motion.div>
            
            <div className="grid grid-cols-1 gap-6">
              {flowerTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-soft-dark p-6 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">{type.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 font-handwritten-secondary">{type.category}</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-2 font-handwritten-accent text-2xl"><strong>Цветы:</strong> {type.flowers}</p>
                      <p className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-2xl"><strong>Уход:</strong> {type.care}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-green-500 to-emerald-600 text-white overflow-hidden">
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
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-transparent rounded-full blur-3xl"></div>
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
                Уход за цветами
              </h1>
              <p className="text-2xl md:text-2xl max-w-3xl mx-auto opacity-90 font-handwritten-accent">
                Подробное руководство по уходу за цветами в любых условиях
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{tab.icon}</span>
                  <span className="font-handwritten-accent text-2xl">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {renderContent()}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-6 font-handwritten-primary text-glow">Остались вопросы по уходу?</h2>
              <p className="text-2xl mb-8 opacity-90 font-handwritten-accent">
                Наши флористы всегда готовы помочь с советом по уходу за цветами
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/79280171393"
                  className="bg-white hover:bg-gray-100 text-green-600 px-8 py-3 rounded-lg font-semibold transition-colors font-handwritten-button"
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

export default FlowerCare;
