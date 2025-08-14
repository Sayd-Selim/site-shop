import { motion, AnimatePresence } from "framer-motion";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const StatsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    purchases: 0,
    products: 0,
    support: 0
  });
  const [stats, setStats] = useState([
    {
      number: "8,500+",
      label: "Довольных клиентов",
      description: "Более 8,500 довольных клиентов с 2020 года",
      icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      gradient: "from-emerald-500/20 to-green-500/20",
      trend: "+30%",
      trendUp: true,
      reviews: "4.9/5",
      lastUpdate: "Обновлено сегодня",
      totalReviews: "8.5k",
      growth: "32%",
      chartData: [30, 45, 60, 75, 85],
      satisfaction: "98%",
      responseTime: "< 5 мин",
      averageOrder: "₽3,200",
      returnRate: "0.5%",
      warranty: "7 дней",
      paymentMethods: "4 способа",
      monthlyOrders: "800+",
      repeatCustomers: "75%",
      averageRating: "4.9",
      deliveryRegions: "25 регионов",
      baseNumber: 8500,
      growthRate: 0.30, // 30% рост в год
    },
    {
      number: "500+",
      label: "🌺 Видов цветов",
      description: "Более 500 видов цветов",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      gradient: "from-pink-500/20 to-rose-500/20",
      trend: "+20%",
      trendUp: true,
      reviews: "4.8/5",
      lastUpdate: "Обновлено вчера",
      totalReviews: "6.2k",
      growth: "45%",
      chartData: [20, 35, 50, 65, 85],
      satisfaction: "95%",
      responseTime: "< 10 мин",
      averageOrder: "₽2,800",
      returnRate: "0.8%",
      warranty: "7 дней",
      paymentMethods: "4 способа",
      baseNumber: 500,
      growthRate: 0.20, // 20% рост в год
    },
    {
      number: "24/7",
      label: "Поддержка клиентов",
      description: "Бесплатная консультация и помощь",
      icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50 dark:bg-violet-900/20",
      gradient: "from-violet-500/20 to-purple-500/20",
      trend: "100%",
      trendUp: true,
      reviews: "5.0/5",
      lastUpdate: "Обновлено сейчас",
      totalReviews: "9.8k",
      growth: "28%",
      chartData: [40, 55, 70, 85, 100],
      satisfaction: "99%",
      responseTime: "< 2 мин",
      averageOrder: "₽3,500",
      returnRate: "0.3%",
      warranty: "7 дней",
      paymentMethods: "4 способа",
      baseNumber: 100,
      growthRate: 0.28, // 28% рост в год
    },
    {
      number: "1-2 часа",
      label: "Быстрая доставка",
      description: "Доставка в день заказа",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      gradient: "from-amber-500/20 to-orange-500/20",
      trend: "-15%",
      trendUp: false,
      reviews: "4.7/5",
      lastUpdate: "Обновлено 2 дня назад",
      totalReviews: "5.5k",
      growth: "-15%",
      chartData: [30, 35, 40, 45, 50],
      satisfaction: "92%",
      responseTime: "< 15 мин",
      averageOrder: "₽2,900",
      returnRate: "0.6%",
      warranty: "7 дней",
      paymentMethods: "4 способа",
      baseNumber: 3,
      growthRate: -0.15, // -15% изменение в год
    },
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector("#stats-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1f2937",
        bodyColor: "#4b5563",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            return `${context.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        display: false,
      },
      x: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const getProgressColor = (value) => {
    if (value >= 90) return "text-green-500";
    if (value >= 70) return "text-blue-500";
    if (value >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getProgressWidth = (value) => {
    return `${value}%`;
  };

  const formatNumber = (num) => {
    return num.toLocaleString("ru-RU");
  };

  const calculateCurrentValue = (baseNumber, growthRate, startDate = new Date("2020-01-01")) => {
    const now = new Date();
    const yearsPassed = (now - startDate) / (1000 * 60 * 60 * 24 * 365);
    const currentValue = baseNumber * Math.pow(1 + growthRate, yearsPassed);
    return Math.round(currentValue);
  };

  // Функция для анимации числа
  const animateNumber = (start, end, duration, setter) => {
    const startTime = performance.now();
    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Функция плавности (easeOutQuad)
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      
      const current = Math.floor(start + (end - start) * easeProgress);
      setter(current);

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    };
    requestAnimationFrame(updateNumber);
  };

  // Анимация при первой загрузке
  useEffect(() => {
    // Фиксированные целевые значения
    const targetPurchases = 28719; // 28,719
    const targetProducts = 500;    // 500
    const targetSupport = 100;     // 100

    // Анимируем к целевым значениям
    animateNumber(0, targetPurchases, 2000, (value) => {
      setAnimatedNumbers(prev => ({ ...prev, purchases: value }));
    });
    animateNumber(0, targetProducts, 2000, (value) => {
      setAnimatedNumbers(prev => ({ ...prev, products: value }));
    });
    animateNumber(0, targetSupport, 2000, (value) => {
      setAnimatedNumbers(prev => ({ ...prev, support: value }));
    });
  }, []); // Пустой массив зависимостей - только при монтировании

  return (
    <section id="stats-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="mb-6">
            <h2 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100 font-handwritten-primary text-glow">Наши достижения</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-pink-300 dark:to-pink-400"></div>
              <span className="text-2xl font-handwritten-secondary text-pink-400 dark:text-pink-300">✨</span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-pink-300 dark:to-pink-400"></div>
            </div>
          </div>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-handwritten-accent">Мы гордимся тем, что дарим радость и красоту нашим клиентам</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative p-6 rounded-2xl ${stat.bgColor} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm flex flex-col h-full border border-gray-200 dark:border-gray-700`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-6 flex-shrink-0">
                <motion.div className="absolute top-4 right-4" whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }}>
                  <div className={`p-3 rounded-full bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                    {stat.label === "Довольных клиентов" ? (
                      <span className="text-white text-xl">🌸</span>
                    ) : stat.label === "🌺 Видов цветов" ? (
                      <span className="text-white text-xl">🌺</span>
                    ) : stat.label === "Поддержка клиентов" ? (
                      <span className="text-white text-xl">💬</span>
                    ) : (
                      <span className="text-white text-xl">🚚</span>
                    )}
                  </div>
                </motion.div>

                <div className="mt-4 flex-1">
                  <motion.h3
                    className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent tracking-tight font-handwritten-stats"
                  >
                    {stat.label === "Довольных клиентов" ? `${formatNumber(animatedNumbers.purchases)}+` :
                     stat.label === "🌺 Видов цветов" ? `${formatNumber(animatedNumbers.products)}+` :
                     stat.label === "Поддержка клиентов" ? "24/7" :
                     stat.number}
                  </motion.h3>
                  <p className="text-xl font-semibold text-gray-700 dark:text-gray-200 mt-2 tracking-wide font-handwritten-secondary">
                    {stat.label === "Довольных клиентов" ? "🌸 " + stat.label :
                     stat.label === "🌺 Видов цветов" ? stat.label :
                     stat.label === "Поддержка клиентов" ? "💬 " + stat.label :
                     "🚚 " + stat.label}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed font-medium">
                    {stat.label === "Довольных клиентов" ? `Более ${formatNumber(animatedNumbers.purchases)} довольных клиентов с 2021 года` :
                     stat.label === "🌺 Видов цветов" ? `Более ${formatNumber(animatedNumbers.products)} видов цветов` :
                     stat.description}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-6 flex-1 flex flex-col justify-end">
                <div className="h-24 w-full relative">
                  <Line
                    data={{
                      labels: ["Янв", "Фев", "Мар", "Апр", "Май"],
                      datasets: [
                        {
                          data: stat.chartData,
                          borderColor: `rgb(${
                            stat.color.split("-")[1] === "emerald"
                              ? "16, 185, 129"
                              : stat.color.split("-")[1] === "pink"
                              ? "239, 68, 68"
                              : stat.color.split("-")[1] === "violet"
                              ? "139, 92, 246"
                              : "245, 158, 11"
                          })`,
                          backgroundColor: `rgba(${
                            stat.color.split("-")[1] === "emerald"
                              ? "16, 185, 129"
                              : stat.color.split("-")[1] === "pink"
                              ? "239, 68, 68"
                              : stat.color.split("-")[1] === "violet"
                              ? "139, 92, 246"
                              : "245, 158, 11"
                          }, 0.1)`,
                          fill: true,
                          tension: 0.4,
                        },
                      ],
                    }}
                    options={chartOptions}
                  />
                </div>

                <AnimatePresence>
                  {expandedCard === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 pt-2">
                        <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Возвраты</span>
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">{stat.returnRate}</span>
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Гарантия</span>
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">{stat.warranty}</span>
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Способы оплаты</span>
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">{stat.paymentMethods}</span>
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Регионы доставки</span>
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">{stat.deliveryRegions}</span>
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Повторные покупки</span>
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">{stat.repeatCustomers}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Декоративный элемент в конце секции */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full border border-pink-200 dark:border-pink-700/50 shadow-lg">
            <span className="text-2xl font-handwritten-secondary text-pink-500 dark:text-pink-400">🌹</span>
            <span className="text-2xl font-handwritten-accent text-gray-700 dark:text-gray-200">Каждый букет создается с любовью</span>
            <span className="text-2xl font-handwritten-secondary text-purple-500 dark:text-purple-400">🌹</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
