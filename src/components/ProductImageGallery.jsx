import React from 'react';
import { motion } from 'framer-motion';

const ProductImageGallery = ({
  images,
  currentImage,
  setCurrentImage,
  isFlying,
  imgRef,
  product,
  isPopular,
  timer,
  isViewed,
  setIsAnyGalleryHovered,
  isAnyGalleryHovered,
  setPauseAfterManual
}) => {
  return (
    <div
      className="relative aspect-[4/5] overflow-hidden bg-gray-100"
      onMouseEnter={() => setIsAnyGalleryHovered(true)}
      onMouseLeave={() => setIsAnyGalleryHovered(false)}
    >
      <motion.img
        ref={imgRef}
        src={images?.[currentImage]}
        alt={product.name}
        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1 ${isFlying ? 'z-50' : ''}`}
        whileHover={{ scale: 1.1 }}
        animate={isFlying ? { x: 200, y: -200, scale: 0.2, opacity: 0 } : { x: 0, y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      />
      {/* Ленточка 'Популярный букет' — премиум-стиль */}
      {isPopular && (
        <div className="absolute left-[-44px] top-4 z-30">
          <div
            className="text-xs font-bold px-12 py-1 shadow-lg rotate-[-45deg] select-none"
            style={{
              width: '140px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
              background: 'linear-gradient(90deg, #FF69B4 0%, #FF1493 100%)',
              color: '#ffffff',
              letterSpacing: '0.05em',
              textShadow: '0 1px 2px rgba(0,0,0,0.25)'
            }}
          >
            🌸 Популярный букет
          </div>
        </div>
      )}
      {/*
      {isPopular && (
        <div className="absolute left-[-44px] top-4 z-30">
          <div
            className="bg-pink-600 text-white text-xs font-bold px-12 py-1 shadow-lg rotate-[-45deg] select-none"
            style={{ width: '140px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
          >
            Популярный букет
          </div>
        </div>
      )}
      */}
      {/* Таймер акции (если нужен) */}
      {/* {timer && product.discount && (
        <div className="absolute top-4 right-1/2 translate-x-1/2 bg-pink-600/90 text-white px-3 py-1 text-xs font-bold rounded-xl shadow-lg animate-fadeIn z-20">
          До конца акции: {timer}
        </div>
      )} */}
      {/* Плашка 'Вы уже смотрели' */}
      {isViewed && (
        <div className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 text-xs font-bold rounded-xl shadow-lg z-20 flex items-center gap-1">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M12 6v6m0 0l2-2m-2 2l-2-2" />
          </svg>
          Вы уже смотрели
        </div>
      )}
      {/* Навигация по фото */}
      {images && images.length > 1 && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5"
          onMouseEnter={() => setIsAnyGalleryHovered(true)}
          onMouseLeave={() => setIsAnyGalleryHovered(false)}
        >
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={e => {
                e.stopPropagation();
                setCurrentImage(idx);
                setPauseAfterManual(true);
              }}
              className={`w-2.5 h-2.5 rounded-full border-2 ${idx === currentImage ? 'bg-pink-600 border-pink-600 scale-125 shadow' : 'bg-white/70 border-white'} transition-all`}
              aria-label={`Перейти к фото ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery; 