import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const ConsultationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    consultationType: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Обработка Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Блокируем скролл и компенсируем исчезновение скроллбара
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const consultationTypes = [
    { value: 'wedding', label: 'Свадебный букет', icon: '💒' },
    { value: 'occasion', label: 'Букет по случаю', icon: '🎉' },
    { value: 'care', label: 'Уход за цветами', icon: '🌱' },
    { value: 'custom', label: 'Индивидуальный заказ', icon: '✨' },
    { value: 'general', label: 'Общая консультация', icon: '💬' }
  ];

  const quickActions = [
    {
      title: 'WhatsApp консультация',
      icon: '📱',
      color: 'from-green-400 to-green-600',
      link: 'https://wa.me/79280171393?text=Здравствуйте! Нужна консультация по выбору букета 🌸',
      description: 'Быстрый ответ в течение 5 минут'
    },
    {
      title: 'Telegram консультация',
      icon: '📲',
      color: 'from-blue-400 to-blue-600',
      link: 'https://t.me/79280171393?text=Здравствуйте! Нужна консультация по выбору букета 🌸',
      description: 'Удобный чат с флористом'
    },
    {
      title: 'Позвонить сейчас',
      icon: '📞',
      color: 'from-pink-400 to-rose-600',
      link: 'tel:+79280171393',
      description: 'Прямой звонок флористу'
    }
  ];

  const handleQuickAction = (link) => {
    window.open(link, '_blank');
  };

  return createPortal(
    (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} relative rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border mx-4`}
            onClick={(e) => e.stopPropagation()}
          >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 text-gray-400 hover:text-gray-600 ${isDarkMode ? 'dark:hover:text-gray-200' : ''} transition-colors z-10`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className={`relative p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌸</span>
              </div>
              <h2 className={`text-4xl font-bold mb-2 font-handwritten-primary ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Консультация флориста
              </h2>
              <p className={`font-handwritten-accent text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Выберите удобный способ связи или оставьте заявку
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto p-6">
            {/* Quick Actions */}
            <div className="mb-8">
              <h3 className={`text-2xl font-bold mb-4 font-handwritten-secondary ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Быстрые способы связи
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickAction(action.link)}
                    className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-2xl text-center hover:shadow-lg transition-all duration-300 group`}
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {action.icon}
                    </div>
                    <h4 className="font-bold text-xl mb-1 font-handwritten-button">
                      {action.title}
                    </h4>
                    <p className="text-xl opacity-90 font-handwritten-accent">
                      {action.description}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    ),
    document.body
  );
};

export default ConsultationModal;
