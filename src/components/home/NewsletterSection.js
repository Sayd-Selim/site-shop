import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки email на сервер
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-4 sm:p-8 mb-16 relative overflow-hidden">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1)_0%,transparent_50%)]"></div>
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 font-handwritten-primary text-glow">
            Подпишитесь на рассылку
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-blue-300"></div>
            <span className="text-2xl font-handwritten-secondary text-blue-400">📧</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-blue-300"></div>
          </div>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-300 mb-8 text-2xl sm:text-2xl font-handwritten-accent"
        >
          Получайте первыми информацию о новых букетах, сезонных цветах и специальных предложениях
        </motion.p>
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ваш email"
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 w-full"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-100 transition-colors duration-300 font-handwritten-button w-full sm:w-auto"
          >
            Подписаться
          </motion.button>
        </motion.form>

        {/* Декоративный элемент в конце секции */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <span className="text-2xl font-handwritten-secondary text-blue-300">🌺</span>
            <span className="text-2xl font-handwritten-accent text-gray-300">Будьте в курсе всех новинок</span>
            <span className="text-2xl font-handwritten-secondary text-purple-300">🌺</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewsletterSection; 