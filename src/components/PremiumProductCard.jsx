import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PremiumProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  // Параллакс эффект для изображения
  const handleMouseMove = useCallback((e) => {
    if (!imageRef.current || !isHovered) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const moveX = (x - centerX) / 20;
    const moveY = (y - centerY) / 20;
    
    imageRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
  }, [isHovered]);

  const handleMouseLeave = useCallback(() => {
    if (imageRef.current) {
      imageRef.current.style.transform = 'translate(0px, 0px) scale(1)';
    }
  }, []);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Имитация добавления в корзину
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1500);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % (product.images?.length || 1)
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      (prev - 1 + (product.images?.length || 1)) % (product.images?.length || 1)
    );
  };

  // Закрытие модального окна по Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Основная карточка */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group relative bg-white border border-gray-300 overflow-hidden cursor-pointer select-none"
        style={{ 
          boxShadow: isHovered 
            ? '0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(139, 69, 19, 0.15)' 
            : '0 8px 25px rgba(0, 0, 0, 0.12)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={0}
      >
        {/* Изображение товара */}
        <div 
          className="relative aspect-[4/5] overflow-hidden bg-gray-100"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.img
            ref={imageRef}
            src={product.images?.[currentImageIndex] || product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          
          {/* Наложение при наведении */}
          <motion.div
            className="absolute inset-0 bg-black/10"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Бейдж скидки */}
          {product.discount && (
            <motion.div 
              className="absolute top-4 left-4 z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-black text-white px-4 py-2 text-sm font-bold tracking-wider uppercase">
                -{product.discount}%
              </div>
            </motion.div>
          )}

          {/* Бейдж "Новинка" */}
          {product.isNew && (
            <motion.div 
              className="absolute top-4 right-4 z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-amber-800 text-white px-4 py-2 text-sm font-bold tracking-wider uppercase">
                Новинка
              </div>
            </motion.div>
          )}

          {/* Навигация по изображениям */}
          {product.images && product.images.length > 1 && (
            <motion.div 
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
            >
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-white scale-125 shadow-lg' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Информация о товаре */}
        <div className="p-6 space-y-4">
          {/* Название */}
          <h3 className="text-xl font-bold text-black tracking-tight leading-tight uppercase">
            {product.name}
          </h3>

          {/* Атрибуты */}
          <div className="flex flex-wrap gap-2">
            {product.material && (
              <span className="text-xs bg-gray-100 text-gray-800 px-3 py-1 font-bold tracking-wide uppercase border border-gray-200">
                {product.material}
              </span>
            )}
            {product.handmade && (
              <span className="text-xs bg-amber-50 text-amber-900 px-3 py-1 font-bold tracking-wide uppercase border border-amber-200">
                Ручная работа
              </span>
            )}
            {product.weaponType && (
              <span className="text-xs bg-gray-100 text-gray-800 px-3 py-1 font-bold tracking-wide uppercase border border-gray-200">
                {product.weaponType}
              </span>
            )}
            {product.country && (
              <span className="text-xs bg-gray-100 text-gray-800 px-3 py-1 font-bold tracking-wide uppercase border border-gray-200">
                {product.country}
              </span>
            )}
          </div>

          {/* Цена */}
          <div className="flex items-baseline space-x-3">
            <span className="text-2xl font-bold text-black tracking-tight">
              {product.price.toLocaleString()} ₽
            </span>
            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through font-medium">
                {product.oldPrice.toLocaleString()} ₽
              </span>
            )}
          </div>

          {/* Кнопка "Подробнее" */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-black text-white py-4 px-6 font-bold tracking-wider uppercase hover:bg-gray-800 transition-all duration-200 border-2 border-black hover:border-gray-800"
          >
            Подробнее
          </motion.button>
        </div>

        {/* Glow эффект при фокусе */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent pointer-events-none rounded-none"
          animate={{ 
            borderColor: isFocused ? 'rgba(139, 69, 19, 0.4)' : 'transparent',
            boxShadow: isFocused ? '0 0 25px rgba(139, 69, 19, 0.3)' : 'none'
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Модальное окно */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white max-w-7xl w-full max-h-[95vh] overflow-y-auto border border-gray-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Галерея изображений */}
                <div className="bg-gray-100 p-8">
                  <div className="space-y-6">
                    <div className="relative aspect-square overflow-hidden bg-white border border-gray-200">
                      <motion.img
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        src={product.images?.[currentImageIndex] || product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Навигация */}
                      {product.images && product.images.length > 1 && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/80 text-white p-3 hover:bg-black transition-all duration-200"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/80 text-white p-3 hover:bg-black transition-all duration-200"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.button>
                        </>
                      )}
                    </div>

                    {/* Миниатюры */}
                    {product.images && product.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-3">
                        {product.images.map((image, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`aspect-square overflow-hidden border-2 transition-all duration-200 ${
                              index === currentImageIndex 
                                ? 'border-black shadow-lg' 
                                : 'border-gray-300 hover:border-gray-500'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${product.name} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Информация */}
                <div className="p-8 space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-black tracking-tight mb-4 uppercase">
                      {product.name}
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {product.description || 'Высококачественная кобура для надежного ношения оружия. Изготовлена из премиальных материалов с соблюдением всех стандартов безопасности и комфорта.'}
                    </p>
                  </div>

                  {/* Характеристики */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-black uppercase tracking-wide">Характеристики</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {product.material && (
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">Материал:</span>
                          <span className="font-bold text-black">{product.material}</span>
                        </div>
                      )}
                      {product.weaponType && (
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">Тип оружия:</span>
                          <span className="font-bold text-black">{product.weaponType}</span>
                        </div>
                      )}
                      {product.country && (
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">Страна:</span>
                          <span className="font-bold text-black">{product.country}</span>
                        </div>
                      )}
                      {product.weight && (
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">Вес:</span>
                          <span className="font-bold text-black">{product.weight}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Совместимость */}
                  {product.compatibility && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-black uppercase tracking-wide">Совместимость</h3>
                      <div className="flex flex-wrap gap-3">
                        {product.compatibility.map((model, index) => (
                          <span key={index} className="text-sm bg-gray-100 text-gray-800 px-4 py-2 font-bold tracking-wide uppercase border border-gray-200">
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Отзывы */}
                  {product.reviews && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-black uppercase tracking-wide">Отзывы</h3>
                      <div className="space-y-4 max-h-48 overflow-y-auto">
                        {product.reviews.slice(0, 3).map((review, index) => (
                          <div key={index} className="border-l-4 border-black pl-4 bg-gray-50 p-4">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 font-medium">{review.author}</span>
                            </div>
                            <p className="text-gray-700">{review.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Цена и кнопка */}
                  <div className="border-t border-gray-300 pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-4xl font-bold text-black tracking-tight">
                          {product.price.toLocaleString()} ₽
                        </span>
                        {product.oldPrice && (
                          <span className="text-xl text-gray-400 line-through ml-3 font-medium">
                            {product.oldPrice.toLocaleString()} ₽
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      disabled={isAddingToCart}
                      className="w-full bg-black text-white py-5 px-8 font-bold tracking-wider uppercase hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 border-2 border-black hover:border-gray-800 text-lg"
                    >
                      {isAddingToCart ? 'Добавляется...' : 'Добавить в корзину'}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Кнопка закрытия */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors duration-200 bg-white p-2 border border-gray-300"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PremiumProductCard; 