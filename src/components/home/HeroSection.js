import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ isDarkMode = false }) => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleViewBouquets = () => {
    const bouquetsSection = document.getElementById("popular-categories");

    if (bouquetsSection) {
      bouquetsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // Попробуем найти секцию с букетами по содержимому
      const sections = document.querySelectorAll("section");
      const bouquetsSectionAlt = Array.from(sections).find(
        (section) => section.textContent.includes("Популярные категории") || section.textContent.includes("Свадебные букеты")
      );

      if (bouquetsSectionAlt) {
        bouquetsSectionAlt.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        // Fallback - скролл вниз на определенное расстояние
        window.scrollBy({
          top: 800,
          behavior: "smooth",
        });
      }
    }
  };

  const handleLearnMore = () => {
    navigate('/contact');
  };

  // Анимированные частицы для темной темы
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div
      className={`relative h-[800px] xs:h-[800px] sm:h-[650px] md:h-[710px] rounded-3xl overflow-hidden mb-16 pt-32 xs:pt-32 sm:pt-20 mt-2 ${
        isDarkMode ? "bg-gradient-to-br from-gray-900 via-purple-900 to-black" : ""
      }`}
    >
      <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
        {/* Фоновое изображение для светлой темы */}
        {!isDarkMode && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            }}
          />
        )}

        {/* Темная тема - космический фон */}
        {isDarkMode && (
          <>
            {/* Анимированный градиентный фон */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/50 to-black" />
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/15 via-transparent to-blue-500/15" />
            <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/10 via-transparent to-purple-500/10" />

            {/* Анимированные частицы */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 bg-white/40 rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Неоновые кольца */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 30%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 30%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Сетка для космического эффекта */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Светящиеся точки */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-400 rounded-full shadow-lg shadow-pink-400/60"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/60"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/60"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            {/* Дополнительные неоновые эффекты */}
            <motion.div
              className="absolute top-1/2 left-1/6 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3,
              }}
            />
            <motion.div
              className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4,
              }}
            />
          </>
        )}
      </motion.div>

      <div className="absolute inset-0 flex items-center sm:items-center items-start xs:pt-16 xs:mt-6 sm:pt-0 sm:mt-0">
        <div className="max-w-2xl mx-4 md:ml-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-1 xs:gap-2 md:gap-4 mb-3 xs:mb-6 sm:mb-6"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                backgroundColor: isDarkMode ? "rgba(236, 72, 153, 0.25)" : "rgba(255,255,255,0.15)",
                boxShadow: isDarkMode ? "0 0 30px rgba(236, 72, 153, 0.5)" : "0 0 30px rgba(255,255,255,0.15)",
              }}
              className={`backdrop-blur-sm px-1.5 xs:px-2.5 sm:px-3 md:px-4 py-1 xs:py-2 sm:py-2 rounded-full border shadow-lg cursor-pointer group relative overflow-hidden ${
                isDarkMode ? "bg-pink-500/25 border-pink-400/40 shadow-pink-500/25" : "bg-white/10 border-white/10"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className={`text-xs font-medium flex items-center gap-1 md:gap-2 relative ${isDarkMode ? "text-pink-200" : "text-white"}`}>
                <svg
                  className="w-2.5 h-2.5 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 transform group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-handwritten-badge">Свежие цветы</span>
              </span>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
                backgroundColor: isDarkMode ? "rgba(239,68,68,0.25)" : "rgba(239,68,68,0.95)",
                boxShadow: isDarkMode ? "0 0 30px rgba(239,68,68,0.5)" : "0 0 30px rgba(239,68,68,0.4)",
              }}
              className={`backdrop-blur-sm px-1.5 xs:px-2.5 sm:px-3 md:px-4 py-1 xs:py-2 sm:py-2 rounded-full border shadow-lg cursor-pointer group relative overflow-hidden ${
                isDarkMode ? "bg-red-500/25 border-red-400/40 shadow-red-500/25" : "bg-red-500/90 border-red-400/20"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="text-white text-xs font-medium flex items-center gap-1 md:gap-2 relative">
                <svg
                  className="w-2.5 h-2.5 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 transform group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-handwritten-badge">Скидка 25%</span>
              </span>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
                backgroundColor: isDarkMode ? "rgba(16,185,129,0.25)" : "rgba(16,185,129,0.95)",
                boxShadow: isDarkMode ? "0 0 30px rgba(16,185,129,0.5)" : "0 0 30px rgba(16,185,129,0.4)",
              }}
              className={`backdrop-blur-sm px-1.5 xs:px-2.5 sm:px-3 md:px-4 py-1 xs:py-2 sm:py-2 rounded-full border shadow-lg cursor-pointer group relative overflow-hidden ${
                isDarkMode ? "bg-emerald-500/25 border-emerald-400/40 shadow-emerald-500/25" : "bg-emerald-500/90 border-emerald-400/20"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="text-white text-xs font-medium flex items-center gap-1 md:gap-2 relative">
                <svg
                  className="w-2.5 h-2.5 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 transform group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-handwritten-badge">Доставка 24/7</span>
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-4xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 xs:mb-4 sm:mb-4 leading-tight tracking-tight relative font-handwritten-primary ${
              isDarkMode ? "text-white drop-shadow-[0_0_25px_rgba(236,72,153,0.6)]" : "text-white text-glow"
            }`}
          >
            <span className="relative inline-block">
              {isDarkMode ? (
                <>
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                    Красивые цветы
                  </span>
                  <br />
                  <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">для любого случая</span>
                </>
              ) : (
                "Красивые цветы для любого случая"
              )}
            </span>
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-2 xs:mb-4 sm:mb-4">
            <motion.h2
              className={`text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold mb-1 xs:mb-1 sm:mb-2 font-handwritten-secondary ${
                isDarkMode
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                  : "text-yellow-300 text-glow-gold"
              }`}
            >
              ✨ Создаем настроение с 2021 года ✨
            </motion.h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl mb-4 xs:mb-8 sm:mb-8 max-w-lg leading-relaxed font-handwritten-accent ${
              isDarkMode ? "text-gray-200 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]" : "text-gray-200"
            }`}
          >
            Свежие букеты и комнатные растения для создания уюта и радости. Более 500 видов цветов в наличии с доставкой по городу.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 xs:gap-6"
          >
            <motion.button
              onClick={handleViewBouquets}
              whileHover={{
                scale: 1.05,
                boxShadow: isDarkMode ? "0 0 40px rgba(236, 72, 153, 0.4)" : "0 0 40px rgba(17, 24, 39, 0.6)",
                backgroundColor: isDarkMode ? "rgba(236, 72, 153, 0.2)" : "rgb(17, 24, 39)",
              }}
              whileTap={{ scale: 0.95 }}
              className={`text-white px-4 xs:px-6 md:px-8 py-2.5 xs:py-3 md:py-4 rounded-xl text-sm xs:text-base sm:text-base md:text-lg font-semibold shadow-lg border flex items-center gap-2 group hover:bg-gray-800 transition-all duration-300 relative overflow-hidden ${
                isDarkMode ? "bg-pink-500/20 border-pink-400/30 shadow-pink-500/20 hover:bg-pink-500/30" : "bg-gray-900 border-gray-700"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative font-handwritten-button">Смотреть букеты</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300 relative"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>

            <motion.button
              onClick={handleLearnMore}
              whileHover={{
                scale: 1.05,
                backgroundColor: isDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(255,255,255,0.2)",
                boxShadow: isDarkMode ? "0 0 30px rgba(59, 130, 246, 0.4)" : "0 0 30px rgba(255,255,255,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              className={`text-white px-4 xs:px-6 md:px-8 py-2.5 xs:py-3 md:py-4 rounded-xl text-sm xs:text-base sm:text-base md:text-lg font-semibold border flex items-center gap-2 group transition-all duration-300 relative overflow-hidden ${
                isDarkMode ? "bg-blue-500/20 border-blue-400/30 shadow-blue-500/20 hover:bg-blue-500/30" : "bg-white/10 border-white/20 shadow-white/10 hover:bg-white/20"
              }`}
            >
              <span className="relative font-handwritten-button">Узнать больше</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300 relative"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Остальные элементы остаются без изменений для краткости */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-4 xs:mt-8 sm:mt-8 flex flex-wrap items-center gap-3 xs:gap-4 md:gap-6"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                backgroundColor: isDarkMode ? "rgba(16, 185, 129, 0.2)" : "rgba(255,255,255,0.1)",
                boxShadow: isDarkMode ? "0 0 30px rgba(16, 185, 129, 0.3)" : "0 0 30px rgba(255,255,255,0.1)",
              }}
              className={`flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-lg border shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                isDarkMode ? "bg-emerald-500/10 border-emerald-400/20 shadow-emerald-500/10" : "bg-white/5 border-white/10"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center group-hover:bg-emerald-400/30 transition-colors duration-300 relative ${
                  isDarkMode ? "bg-emerald-400/20" : "bg-emerald-400/20"
                }`}
              >
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 transform group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span
                className={`group-hover:text-white transition-colors duration-300 relative font-handwritten-feature ${
                  isDarkMode ? "text-emerald-200" : "text-gray-200"
                }`}
              >
                Гарантия качества
              </span>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
                backgroundColor: isDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(255,255,255,0.1)",
                boxShadow: isDarkMode ? "0 0 30px rgba(59, 130, 246, 0.3)" : "0 0 30px rgba(255,255,255,0.1)",
              }}
              className={`flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-lg border shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                isDarkMode ? "bg-blue-500/10 border-blue-400/20 shadow-blue-500/10" : "bg-white/5 border-white/10"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center group-hover:bg-blue-400/30 transition-colors duration-300 relative ${
                  isDarkMode ? "bg-blue-400/20" : "bg-blue-400/20"
                }`}
              >
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-blue-400 transform group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span
                className={`group-hover:text-white transition-colors duration-300 relative font-handwritten-feature ${
                  isDarkMode ? "text-blue-200" : "text-gray-200"
                }`}
              >
                Быстрая доставка
              </span>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
                backgroundColor: isDarkMode ? "rgba(147, 51, 234, 0.2)" : "rgba(255,255,255,0.1)",
                boxShadow: isDarkMode ? "0 0 30px rgba(147, 51, 234, 0.3)" : "0 0 30px rgba(255,255,255,0.1)",
              }}
              className={`flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-lg border shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                isDarkMode ? "bg-purple-500/10 border-purple-400/20 shadow-purple-500/10" : "bg-white/5 border-white/10"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center group-hover:bg-purple-400/30 transition-colors duration-300 relative ${
                  isDarkMode ? "bg-purple-400/20" : "bg-purple-400/20"
                }`}
              >
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-purple-400 transform group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <span
                className={`group-hover:text-white transition-colors duration-300 relative font-handwritten-feature ${
                  isDarkMode ? "text-purple-200" : "text-gray-200"
                }`}
              >
                Безопасная оплата
              </span>
            </motion.div>
          </motion.div>

          {/* Остальные элементы остаются без изменений */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-4 xs:mt-8 sm:mt-8 flex flex-wrap items-center gap-3 xs:gap-4"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{
                    scale: 1.1,
                    zIndex: 1,
                    boxShadow: isDarkMode ? "0 0 30px rgba(236, 72, 153, 0.4)" : "0 0 30px rgba(255,255,255,0.3)",
                  }}
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white overflow-hidden shadow-lg transition-all duration-300 cursor-pointer relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <img src={`https://i.pravatar.cc/150?img=${index + 10}`} alt={`Customer ${index + 1}`} className="w-full h-full object-cover relative" />
                </motion.div>
              ))}
            </div>
            <div className={`font-handwritten-stats ${isDarkMode ? "text-gray-300" : "text-gray-200"}`}>
              <span className="font-semibold text-white">28 719+</span> довольных клиентов
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-4 xs:mt-8 sm:mt-8 flex flex-wrap items-center gap-3 xs:gap-4"
          >
            <div
              className={`flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-lg border shadow-lg group transition-colors duration-300 relative overflow-hidden ${
                isDarkMode
                  ? "bg-emerald-500/10 border-emerald-400/20 shadow-emerald-500/10 hover:bg-emerald-500/20"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 transform group-hover:scale-110 transition-transform duration-300 relative"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span
                className={`group-hover:text-white transition-colors duration-300 relative font-handwritten-info ${
                  isDarkMode ? "text-emerald-200" : "text-gray-200"
                }`}
              >
                Доставка по всей России
              </span>
            </div>
            <div
              className={`flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-lg border shadow-lg group transition-colors duration-300 relative overflow-hidden ${
                isDarkMode
                  ? "bg-emerald-500/10 border-emerald-400/20 shadow-emerald-500/10 hover:bg-emerald-500/20"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 transform group-hover:scale-110 transition-transform duration-300 relative"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span
                className={`group-hover:text-white transition-colors duration-300 relative font-handwritten-info ${
                  isDarkMode ? "text-emerald-200" : "text-gray-200"
                }`}
              >
                24/7 Поддержка
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
