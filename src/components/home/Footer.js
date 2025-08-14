import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate("/products", {
      state: {
        category: category,
        scrollToCategory: true,
      },
    });
  };

  const handleInfoClick = (page) => {
    switch (page) {
      case "about":
        navigate("/about");
        break;
      case "delivery":
        navigate("/delivery");
        break;
      case "warranty":
        navigate("/clients", {
          state: {
            filter: "return_order",
          },
        });
        break;
      case "privacy":
        navigate("/privacy");
        break;
      case "faq":
        navigate("/faq");
        break;
      default:
        break;
    }
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
      },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.footer
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl mt-16 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О компании */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center font-handwritten-secondary">
              <motion.svg
                className="w-5 h-5 mr-2 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </motion.svg>
              О компании
            </h3>
            <motion.p className=" text-2xl text-gray-400 mb-4 leading-relaxed font-handwritten-accent" variants={itemVariants}>
              Профессиональный цветочный магазин с широким ассортиментом свежих цветов и букетов. Мы создаем красоту и дарим радость с 2021 года.
            </motion.p>
            <motion.div className="flex space-x-4" variants={itemVariants}>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Каталог */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center font-handwritten-secondary">
              <motion.svg
                className="w-5 h-5 mr-2 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </motion.svg>
              Каталог
            </h3>
            <ul className="space-y-2">
              {[
                { text: "Свадебные букеты", category: "Свадебный букет", color: "yellow" },
                { text: "Моно букеты", category: "Моно букет", color: "blue" },
                { text: "Букеты MIX", category: "Букет MIX", color: "green" },
                { text: "Новинки", category: "Все категории", color: "gray" },
              ].map((item, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <motion.button
                    onClick={() => handleCategoryClick(item.category)}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center w-full text-left"
                    whileHover={{ x: 5 }}
                    variants={linkVariants}
                  >
                    <motion.span className={`w-1.5 h-1.5 bg-${item.color}-400 rounded-full mr-2`} whileHover={{ scale: 1.5 }} />
                    {item.text}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Информация */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center font-handwritten-secondary">
              <motion.svg
                className="w-5 h-5 mr-2 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </motion.svg>
              Информация
            </h3>
            <ul className="space-y-2">
              {[
                { text: "О нас", page: "about", color: "yellow" },
                { text: "Доставка и оплата", page: "delivery", color: "blue" },
                { text: "Гарантия и возврат", page: "warranty", color: "green" },
                { text: "FAQ", page: "faq", color: "pink" },
              ].map((item, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <motion.button
                    onClick={() => handleInfoClick(item.page)}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center w-full text-left"
                    whileHover={{ x: 5 }}
                    variants={linkVariants}
                  >
                    <motion.span className={`w-1.5 h-1.5 bg-${item.color}-400 rounded-full mr-2`} whileHover={{ scale: 1.5 }} />
                    {item.text}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Контакты */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center font-handwritten-secondary">
              <motion.svg
                className="w-5 h-5 mr-2 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </motion.svg>
              Контакты
            </h3>
            <ul className="space-y-2">
              <motion.li className="flex items-center text-gray-400" variants={itemVariants} whileHover={{ x: 5 }}>
                <motion.svg className="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" whileHover={{ scale: 1.2 }}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </motion.svg>
                Грозный, Эсамбаева 14А, здание «Groztek», 5 этаж
              </motion.li>
              <motion.li className="flex items-center text-gray-400" variants={itemVariants} whileHover={{ x: 5 }}>
                <motion.svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" whileHover={{ scale: 1.2 }}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </motion.svg>
                8 (928) 017-13-93
              </motion.li>
              <motion.li className="flex items-center text-gray-400" variants={itemVariants} whileHover={{ x: 5 }}>
                <motion.svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" whileHover={{ scale: 1.2 }}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </motion.svg>
                info@flower-store.ru
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Нижняя часть футера */}
        <motion.div className="mt-12 pt-8 border-t border-gray-800" variants={itemVariants}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <motion.div className="text-gray-400 text-sm mb-4 md:mb-0 font-handwritten-accent" whileHover={{ scale: 1.05 }}>
              © 2025 Flower Store. Все права защищены.
            </motion.div>
            <motion.div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4" whileHover={{ scale: 1.05 }}>
              <span className="text-gray-400 text-sm">Способы оплаты:</span>
              <div className="flex space-x-2 sm:space-x-4">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="h-6 sm:h-8">
                  <svg viewBox="0 0 100 32" className="h-full">
                    <rect width="100" height="32" rx="4" fill="#1A1F71" />
                    <path d="M35 8h30v16H35z" fill="#F7B600" />
                    <path d="M35 8h30v16H35z" fill="#FFFFFF" />
                    <text x="50" y="22" textAnchor="middle" fill="#1A1F71" fontFamily="Arial" fontWeight="bold" fontSize="14">
                      VISA
                    </text>
                  </svg>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="h-6 sm:h-8">
                  <svg viewBox="0 0 100 32" className="h-full">
                    <rect width="100" height="32" rx="4" fill="#EB001B" />
                    <circle cx="35" cy="16" r="8" fill="#F79E1B" />
                    <circle cx="65" cy="16" r="8" fill="#FF5F00" />
                    <text x="50" y="22" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial" fontWeight="bold" fontSize="12">
                      MASTERCARD
                    </text>
                  </svg>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="h-6 sm:h-8">
                  <svg viewBox="0 0 100 32" className="h-full">
                    <rect width="100" height="32" rx="4" fill="#00A4E3" />
                    <circle cx="50" cy="16" r="8" fill="#FFFFFF" />
                    <text x="50" y="22" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial" fontWeight="bold" fontSize="16">
                      MIR
                    </text>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Декоративный элемент в конце футера */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-4 sm:px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <span className="text-2xl font-handwritten-secondary text-emerald-400">🌸</span>
            <span className="text-lg font-handwritten-accent text-gray-300">Создаем красоту вместе с вами</span>
            <span className="text-2xl font-handwritten-secondary text-blue-400">🌺</span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
