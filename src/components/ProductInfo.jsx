import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductInfo = ({
  product,
  rating,
  reviews,
  shortDesc,
  inStock,
  miniReview,
  tags,
  renderStars,
  favorite,
  handleFavorite,
  variants,
  selectedVariant,
  setSelectedVariant,
  productPrice,
  oldPrice,
  handleAddToCart,
  isFlying,
  CartIcon,
  stockLeft,
  quickViewOpen,
  setQuickViewOpen,
  deliveryInfo,
  isFreeDelivery,
  stickers,
  reviewsList,
  recentBuyers,
  similarProducts,
  images,
  currentImage,
  setCurrentImage,
  colorScheme,
  sizeChart
}) => (
  <div className="p-5 space-y-3">

    {/* Краткое описание */}
    <div className="text-xs text-gray-600 line-clamp-2 mb-1">{shortDesc}</div>
    {/* Индикатор наличия и дата поступления */}
    <div className="mb-1">
      {inStock ? (
        <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">В наличии</span>
      ) : (
        <span className="inline-block bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold">Нет в наличии</span>
      )}
      {/* Дата поступления */}
      {!inStock && product.arrivalDate && (
        <span className="ml-2 inline-block bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Поступление: {product.arrivalDate}
        </span>
      )}
    </div>


    <h3 className="text-lg font-extrabold text-gray-900 leading-tight line-clamp-2 tracking-tight">
      {product.name}
    </h3>

    
    <div className="flex items-end gap-2 mt-2">
      <span className="text-2xl font-extrabold text-gray-900">
        {productPrice}
      </span>
      {oldPrice && (
        <span className="text-base text-gray-400 line-through">
          {oldPrice}
        </span>
      )}
      {/* Осталось N шт. */}
      <span className="ml-2 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold animate-pulse">
        Осталось {stockLeft} шт.
      </span>
    </div>
    {/* Варианты */}
    {variants && (
      <div className="flex gap-2 mb-2">
        {(variants || []).map(v => (
          <button
            key={v.id}
            onClick={e => { e.stopPropagation(); setSelectedVariant(v.id); }}
            className={`w-7 h-7 rounded-full border-2 ${selectedVariant === v.id ? 'border-pink-600' : 'border-gray-300'} flex items-center justify-center transition-all`}
            style={{ background: v.color }}
            title={v.name}
          >
            {selectedVariant === v.id && (
              <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        ))}
      </div>
    )}


    {/* Подробнее */}
    {/* <Link
      to={`/product/${product.id}`}
      onClick={e => e.stopPropagation()}
      className="block w-full mt-2 text-center text-pink-600 hover:underline text-sm font-semibold"
    >
      Подробнее
    </Link> */}

  </div>
);

export default ProductInfo; 