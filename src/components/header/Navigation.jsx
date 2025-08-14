import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { SlideInLeft, SlideInRight, ScaleOnHover, ButtonAnimation, IconAnimation } from "../MicroAnimations";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ThemeToggle";
import NotificationsPanel from "../NotificationsPanel";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipTimeout, setTooltipTimeout] = useState(null);
  const location = useLocation();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Моковые уведомления для демонстрации
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "Новый заказ",
      message: "Ваш заказ #12345 успешно оформлен",
      time: "5 минут назад",
      read: false,
    },
    {
      id: 2,
      type: "discount",
      title: "Скидка",
      message: "Специальное предложение: скидка 20% на все кобуры",
      time: "1 час назад",
      read: false,
    },
    {
      id: 3,
      type: "delivery",
      title: "Доставка",
      message: "Ваш заказ #12344 отправлен",
      time: "2 часа назад",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Блокировка скролла при открытом мобильном меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Cleanup tooltip timeout
  useEffect(() => {
    return () => {
      if (tooltipTimeout) clearTimeout(tooltipTimeout);
    };
  }, [tooltipTimeout]);

  const menuItems = [
    { path: "/", label: "Главная", fullLabel: "Главная" },
    { path: "/products", label: "Каталог", fullLabel: "Каталог товаров" },
    { path: "/about", label: "О нас", fullLabel: "О нашей компании" },
    // { path: '/wedding-bouquets', label: 'Свадебные букеты' },
    { path: "/contact", label: "Контакты", fullLabel: "Контакты" },
    { path: "/delivery", label: "Доставка", fullLabel: "Доставка и оплата" },
    { path: "/clients", label: "Клиентам", fullLabel: "Информация для клиентов" },
    { path: "/address", label: "Адрес", fullLabel: "Наш адрес" },
    { path: "/flower-care", label: "Уход", fullLabel: "Уход за цветами" },
    { path: "/bonus-program", label: "Бонусы", fullLabel: "Бонусная программа" },
    // { path: '/premium-holsters', label: 'Премиум кобуры' },
    // { path: '/admin', label: 'Админ панель' },
    // { path: '/tracking', label: 'Отследить заказ' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full transition-all duration-300 ${
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      style={{ zIndex: 9999 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Left Section - Logo */}
          <div className="flex items-center">
            <ScaleOnHover>
              <Link to="/" className="flex items-center space-x-2 group">
                <IconAnimation>
                  <motion.svg
                    className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ rotate: 90 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </motion.svg>
                </IconAnimation>
                <motion.span
                  className="text-lg md:text-xl font-bold text-gray-900 dark:text-white"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Holster Store
                </motion.span>
              </Link>
            </ScaleOnHover>
          </div>

          {/* Center Section - Main Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 px-4 lg:px-8">
            <div className="flex items-center space-x-6 lg:space-x-8">
              {menuItems.map((item) => (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => {
                    if (tooltipTimeout) clearTimeout(tooltipTimeout);
                    const timeout = setTimeout(() => setHoveredItem(item.path), 300);
                    setTooltipTimeout(timeout);
                  }}
                  onMouseLeave={() => {
                    if (tooltipTimeout) clearTimeout(tooltipTimeout);
                    setHoveredItem(null);
                  }}
                >
                  <Link
                    to={item.path}
                    className={`relative text-sm font-medium transition-all duration-300 group whitespace-nowrap
                      ${
                        isActive(item.path) ? "text-blue-600 dark:text-blue-400" : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      } ${item.path === "/admin" ? "font-bold text-red-600 dark:text-red-400" : ""}`}
                  >
                    <span className="relative">
                      {item.label}
                      <span
                        className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full ${
                          isActive(item.path) ? "w-full" : ""
                        }`}
                      />
                    </span>
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* Tooltip */}
                  {/* {hoveredItem === item.path && item.label !== item.fullLabel && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg shadow-lg z-50 whitespace-nowrap"
                    >
                      {item.fullLabel}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
                    </motion.div>
                  )} */}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
              style={{ zIndex: 9999 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <motion.span
                className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 mt-1 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <motion.span
                className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 mt-1 ${
                  isOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </motion.button>
            {/* Search */}
            {/* <div className="relative">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 transform hover:scale-110 relative overflow-hidden p-2"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 2, opacity: 0.3 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </motion.svg>
              </motion.button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
                  >
                    <motion.input
                      type="text"
                      placeholder="Поиск..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div> */}

            {/* Notifications */}
            {/* <div className="relative">
              <motion.button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 transform hover:scale-110 relative overflow-visible p-2"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 2, opacity: 0.3 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </motion.svg>
                {unreadCount > 0 && (
                  <motion.div
                    className="absolute -top-2 -right-2 min-w-[20px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1 z-[100] shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      boxShadow: [
                        "0 0 0 0 rgba(239, 68, 68, 0)",
                        "0 0 0 4px rgba(239, 68, 68, 0.2)",
                        "0 0 0 8px rgba(239, 68, 68, 0.1)",
                        "0 0 0 12px rgba(239, 68, 68, 0)",
                        "0 0 0 0 rgba(239, 68, 68, 0)"
                      ]
                    }}
                    transition={{ 
                      scale: { type: "spring", stiffness: 500, damping: 15 },
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </motion.div>
                )}
              </motion.button>
              <NotificationsPanel
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
                notifications={notifications}
              />
            </div> */}

            {/* Cart */}
            {/* <Link
              to="/cart"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 transform hover:scale-110 relative overflow-hidden p-2"
            >
              <motion.div
                className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 2, opacity: 0.3 }}
                transition={{ duration: 0.4 }}
              />
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </motion.svg>
              {cartItems.length > 0 && (
                <motion.span 
                  className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  {cartItems.length}
                </motion.span>
              )}
            </Link> */}

            {/* Profile */}
            {/* {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 transform hover:scale-110 relative overflow-hidden p-2"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 0, opacity: 0 }}
                    whileTap={{ scale: 2, opacity: 0.3 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 relative z-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    whileHover={{ rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </motion.svg>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 overflow-hidden"
                    >
                      <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          Личный кабинет
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          Выйти
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 transform hover:scale-110 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400"
              >
                Войти
              </Link>
            )} */}

            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative overflow-hidden p-2">
              <motion.div
                className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 2, opacity: 0.3 }}
                transition={{ duration: 0.4 }}
              />
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Portal */}
      {isOpen && createPortal(
        <AnimatePresence>
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm"
              style={{ zIndex: 9998 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto"
              style={{ zIndex: 9999 }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    Меню
                  </motion.span>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Menu Items */}
                <motion.div
                  className="flex flex-col space-y-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      variants={{
                        hidden: { x: -20, opacity: 0 },
                        visible: { x: 0, opacity: 1 },
                      }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300
                          ${
                            isActive(item.path)
                              ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                              : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                      >
                        {item.fullLabel}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-center">
                    <ThemeToggle />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        </AnimatePresence>,
        document.body
      )}
    </motion.nav>
  );
};

export default Navigation;
