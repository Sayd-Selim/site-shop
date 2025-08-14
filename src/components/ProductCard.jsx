import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import QuickView from './QuickView';
import ProductInfo from './ProductInfo';
import OrderModal from './OrderModal';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const imgRef = useRef();
  const { isDarkMode } = useTheme();

  // Моковые данные для описания и наличия
  const shortDesc = product.shortDesc ?? 'Красивый букет для любого случая.';
  const inStock = product.inStock ?? true;












  // Получаем изображение для отображения
  const getProductImage = () => {
    // Для всех продуктов используем изображение из product.image или дефолтное
    if (product.image) {
      return product.image;
    }
    
    // Дефолтное изображение
    return 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=400&q=80';
  };
  
  const productImage = getProductImage();







  

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="group relative bg-white dark:bg-gray-800 rounded-[20px] cursor-pointer select-none shadow-lg hover:shadow-xl dark:shadow-soft-dark dark:hover:shadow-soft-dark transition-all duration-300 border border-gray-50 dark:border-gray-700"
        style={{
          minHeight: 'fit-content',
          height: 'auto',
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={0}
        whileHover={{ 
          y: -6,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      >
        {/* Изображение с градиентом */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.img
            ref={imgRef}
            src={productImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          
          {/* Градиент для контраста текста */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          
          {/* Бейдж популярности */}
          {product.isPopular && (
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-pink-600 dark:text-pink-400 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm border border-white/50 dark:border-gray-700/50 font-handwritten-badge">
                🌸 Популярный
              </div>
            </div>
          )}
          
          {/* Бейдж скидки */}
          {product.discount && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-red-500 dark:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm font-handwritten-badge">
                -{product.discount}%
              </div>
            </div>
          )}


        </div>

        {/* Информационная секция */}
        <div className="p-5 space-y-4">
          

          {/* Название букета */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight font-handwritten-secondary" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
            {product.category === 'Свадебный букет' ? '💒 ' + product.name :
             product.category === 'Моно букет' ? '🌹 ' + product.name :
             product.category === 'Букет MIX' ? '🌸 ' + product.name :
             product.category === 'Комнатные растения' ? '🌿 ' + product.name :
             product.category === 'Подарочные наборы' ? '🎁 ' + product.name :
             product.category === 'Розы' ? '🌹 ' + product.name :
             product.category === 'Тюльпаны' ? '🌷 ' + product.name :
             product.category === 'Пионы' ? '🌺 ' + product.name :
             product.category === 'Лилии' ? '⚜️ ' + product.name :
             product.category === 'Хризантемы' ? '🌼 ' + product.name :
             product.category === 'Орхидеи' ? '🦋 ' + product.name :
             product.category === 'Герберы' ? '🌻 ' + product.name :
             product.category === 'Сезонные цветы' ? '🌱 ' + product.name :
             product.name}
          </h3>

          {/* Краткое описание */}
          <p className="text-2xl text-gray-500 dark:text-gray-400 leading-relaxed font-handwritten-accent" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
            {shortDesc}
          </p>

          {/* Цена и кнопка корзины */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-baseline gap-1" style={{ minWidth: 0, flexShrink: 1 }}>
              <span className="text-3xl font-bold text-pink-600 dark:text-pink-400 font-handwritten-stats" style={{ wordBreak: 'break-all' }}>
                {product.price.toLocaleString()}
              </span>
              <span className="text-xl font-medium text-pink-600 dark:text-pink-400 font-handwritten-stats">₽</span>
            </div>
            
            {/* Кнопка "Заказать" */}
            <button 
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600 text-white px-4 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105 flex-shrink-0"
              style={{ minWidth: 'fit-content' }}
              onClick={(e) => {
                e.stopPropagation();
                setOrderModalOpen(true);
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-lg font-medium font-handwritten-button">Заказать</span>
            </button>
          </div>
        </div>

        {/* Декоративная линия */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-100 dark:via-pink-900 to-transparent" />
      </motion.div>
      
      {/* Быстрый просмотр */}
      <QuickView product={product} isOpen={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
      
      {/* Модал заказа */}
      <OrderModal 
        product={product} 
        isOpen={orderModalOpen} 
        onClose={() => setOrderModalOpen(false)} 
      />
    </>
  );
};

export default ProductCard; 