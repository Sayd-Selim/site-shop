// ВНИМАНИЕ: Этот компонент устарел. Используйте ProductCard из components/ProductCard.jsx
const ProductCardOld = React.memo(({ 
    product, 
    onAddToCart, 
    formatPrice, 
    onSelectProduct, 
    onToggleFavorite, 
    isFavorite, 
    onAddToCompare, 
    isInCompare,
    onFilterByCharacteristic, 
    viewMode
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [showQuickView, setShowQuickView] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [isZoomed, setIsZoomed] = useState(false);
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });
    const reviews = mockReviews[product.name] || [];
    const averageRating = useMemo(() => 
      reviews.length > 0
        ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
        : 0,
      [reviews]
    );
    const [showQuickFilters, setShowQuickFilters] = useState(false);
    const [cartAnimation, setCartAnimation] = useState(false);
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
  
    const handleAddToCartClick = useCallback((e) => {
      e.stopPropagation();
      setCartAnimation(true);
      onAddToCart(product);
      addToCartSound.play().catch(() => {});
      setTimeout(() => setCartAnimation(false), 1000);
    }, [product, onAddToCart]);
  
    const handleQuickViewClick = useCallback((e) => {
      e.stopPropagation();
      setShowQuickView(true);
    }, []);
  
    const handleFavoriteClick = useCallback((e) => {
      e.stopPropagation();
      onToggleFavorite(product);
      addToFavoritesSound.play().catch(() => {});
    }, [product, onToggleFavorite]);
  
    const handleCompareClick = useCallback((e) => {
      e.stopPropagation();
      onAddToCompare(product);
    }, [product, onAddToCompare]);
  
    const nextImage = useCallback(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productImages[product.name].length);
    }, [product.name]);
  
    const prevImage = useCallback(() => {
      setCurrentImageIndex((prev) => (prev - 1 + productImages[product.name].length) % productImages[product.name].length);
    }, [product.name]);
  
    const handleMouseMove = useCallback((e) => {
      if (isZoomed) {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        e.currentTarget.style.setProperty('--x', `${x}%`);
        e.currentTarget.style.setProperty('--y', `${y}%`);
      }
    }, [isZoomed]);
  
    const handleTooltipMouseMove = useCallback((e) => {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    }, []);
  
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="group relative bg-white dark:bg-gray-900 rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden cursor-pointer transform transition-all duration-700 hover:scale-[1.03] hover:-translate-y-3 border border-gray-100/50 dark:border-gray-700/50 backdrop-blur-sm"
        onClick={() => onSelectProduct(product)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsZoomed(false);
        }}
      >
        {/* Градиентный фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-gray-800/50 dark:via-gray-900 dark:to-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Badge скидки */}
        {product.discount > 0 && (
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-6 left-6 z-20"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full blur-sm opacity-75"></div>
              <div className="relative bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform hover:scale-110 transition-transform duration-200">
                -{product.discount}%
              </div>
            </div>
          </motion.div>
        )}
  
        {/* Badge категории */}
        <motion.div 
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="absolute top-6 right-6 z-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur-sm opacity-75"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform hover:scale-110 transition-transform duration-200">
              {product.category === 'holsters' ? 'Кобура' : 'Ремень'}
            </div>
          </div>
        </motion.div>
  
        {/* Изображение товара */}
        <div 
          className="relative h-96 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <motion.img
            whileHover={{ scale: isZoomed ? 1.15 : 1.08 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src={productImages[product.name][currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700"
            style={{
              transformOrigin: 'var(--x) var(--y)',
              cursor: isZoomed ? 'zoom-out' : 'zoom-in'
            }}
          />
          
          {/* Градиент поверх изображения */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* Кнопки действий */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex space-x-4">
              {/* Quick View Button */}
              <motion.button
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="bg-white/95 dark:bg-gray-800/95 text-gray-900 dark:text-white px-6 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 backdrop-blur-sm"
                onClick={handleQuickViewClick}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-semibold text-lg">Быстрый просмотр</span>
              </motion.button>
            </div>
          </div>
  
          {/* Кнопки избранное и сравнение */}
          <div className={`absolute top-6 right-6 flex space-x-3 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <motion.button
              initial={{ scale: 0, opacity: 0, x: 20 }}
              animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="bg-white/95 dark:bg-gray-800/95 p-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 backdrop-blur-sm"
              onClick={handleFavoriteClick}
            >
              <svg
                className={`w-7 h-7 transition-all duration-300 ${isFavorite ? 'text-red-500 scale-110' : 'text-gray-400 hover:text-red-500'}`}
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </motion.button>
            
            <motion.button
              initial={{ scale: 0, opacity: 0, x: 20 }}
              animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="bg-white/95 dark:bg-gray-800/95 p-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 backdrop-blur-sm"
              onClick={handleCompareClick}
            >
              <svg
                className={`w-7 h-7 transition-all duration-300 ${isInCompare ? 'text-blue-500 scale-110' : 'text-gray-400 hover:text-blue-500'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </motion.button>
          </div>
  
          {/* Навигация по изображениям */}
          {productImages[product.name].length > 1 && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -30 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 30 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </>
          )}
  
          {/* Индикаторы изображений */}
          {productImages[product.name].length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
              {productImages[product.name].map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-white scale-125 shadow-lg' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          )}
  
          {/* Рейтинг */}
          <div className="absolute bottom-6 right-6 bg-white/95 dark:bg-gray-800/95 px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 backdrop-blur-sm">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {averageRating ? averageRating.toFixed(1) : '0.0'}
            </span>
          </div>
        </div>
  
        {/* Информация о товаре */}
        <div className="p-8 space-y-6 relative z-10">
          {/* Бренд */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {product.brand}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent"></div>
          </div>
  
          {/* Название товара */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500">
            {product.name}
          </h3>
  
          {/* Рейтинг и отзывы */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-base text-gray-500 dark:text-gray-400 font-medium">
              ({reviews.length} отзывов)
            </span>
          </div>
  
          {/* Характеристики */}
          <div className="flex flex-wrap gap-3">
            {product.characteristics && Object.entries(product.characteristics).slice(0, 3).map(([key, value]) => (
              <span key={key} className="text-sm bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full font-medium shadow-sm">
                {key}: {value}
              </span>
            ))}
          </div>
  
          {/* Цена и кнопка */}
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {formatPrice(product.price)} ₽
                </span>
                {product.discount > 0 && (
                  <span className="text-xl text-gray-500 line-through font-medium">
                    {formatPrice(product.price * (1 + product.discount / 100))} ₽
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse shadow-lg"></div>
                <span className="text-base text-green-600 dark:text-green-400 font-semibold">
                  В наличии
                </span>
              </div>
            </div>
  
            {/* Кнопка добавления в корзину */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 flex items-center space-x-3 ${
                cartAnimation ? 'bg-gradient-to-r from-green-500 to-green-600' : ''
              }`}
              onClick={handleAddToCartClick}
            >
              <motion.span
                animate={cartAnimation ? { rotate: 360 } : {}}
                transition={{ duration: 0.6 }}
              >
                {cartAnimation ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )}
              </motion.span>
              <span className="font-semibold text-lg">{cartAnimation ? 'Добавлено!' : 'В корзину'}</span>
            </motion.button>
          </div>
        </div>
  
        {/* Анимация добавления в корзину */}
        <AnimatePresence>
          {isAddingToCart && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm flex items-center justify-center rounded-3xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
  
        {/* Quick View Modal */}
        <AnimatePresence>
          {showQuickView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowQuickView(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="bg-white dark:bg-gray-900 rounded-3xl max-w-5xl w-full p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex gap-8">
                  <div className="w-1/2">
                    <div className="relative">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        src={productImages[product.name][currentImageIndex]}
                        alt={product.name}
                        className="w-full h-auto rounded-2xl cursor-zoom-in shadow-xl"
                      />
                      {productImages[product.name].length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
                          {productImages[product.name].map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentImageIndex ? 'bg-white scale-125 shadow-lg' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    {productImages[product.name].length > 1 && (
                      <div className="flex justify-center mt-6 space-x-3">
                        {productImages[product.name].map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-20 h-20 rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                              index === currentImageIndex ? 'ring-3 ring-blue-500 scale-110' : 'hover:scale-105'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${product.name} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="w-1/2 space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        {product.name}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        {product.category === 'holsters' 
                          ? 'Высококачественная кобура для надежного ношения оружия. Изготовлена из прочных материалов с учетом всех требований безопасности.'
                          : 'Прочный и стильный ремень для повседневного использования. Отличное качество и комфорт в носке.'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ${
                            i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                        ({reviews.length} отзывов)
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {formatPrice(product.price)} ₽
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddToCartClick}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-3 shadow-xl"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="font-semibold text-lg">В корзину</span>
                      </motion.button>
                    </div>
                    <button
                      onClick={() => setShowQuickView(false)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium"
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  });

export default ProductCardOld;