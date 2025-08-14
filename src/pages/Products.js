import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { scrollToElement } from "../utils/scrollUtils";
import { pluralizeFlower } from "../utils/pluralize";
import Skeleton from "../components/Skeleton";
import PageTransition from "../components/PageTransition";
import { useNotification } from "../context/NotificationContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { sampleProducts, categories } from "../data/sampleProducts";
import ProductCard from "../components/ProductCard";
import CategoryGrid from "../components/CategoryGrid";
import SpecialOffersBanner from "../components/SpecialOffersBanner";
import PopularProducts from "../components/PopularProducts";
import NewArrivals from "../components/NewArrivals";
import DiscountProducts from "../components/DiscountProducts";
import StoreFeatures from "../components/StoreFeatures";
import HeroSection from "../components/HeroSection";
import ControlPanel from "../components/ControlPanel";
import ConsultationModal from "../components/ConsultationModal";

// Иконка поиска для компонента "Товары не найдены"
const SearchIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const Products = () => {
  const { showNotification } = useNotification();
  const { cart } = useCart();
  const { isDarkMode } = useTheme();
  const location = useLocation();

  // Состояния
  const [products, setProducts] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все категории");
  // Динамически рассчитываем максимальную цену для фильтра
  const maxPrice = useMemo(() => {
    if (selectedCategory === "Все категории") {
      // Для всех категорий - максимальная цена среди всех продуктов
      return Math.max(...products.map((p) => p.price));
    } else {
      // Для конкретной категории - максимальная цена в этой категории
      const categoryProducts = products.filter((p) => p.category === selectedCategory);
      return categoryProducts.length > 0 ? Math.max(...categoryProducts.map((p) => p.price)) : 10000;
    }
  }, [products, selectedCategory]);

  const [priceRange, setPriceRange] = useState([0, maxPrice]);

  // Обновляем priceRange при изменении maxPrice
  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showDiscountOnly, setShowDiscountOnly] = useState(false);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  // Анимации
  const containerRef = useRef();
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  // Применяем категорию из state при загрузке страницы
  useEffect(() => {
    if (location.state && location.state.category) {
      setSelectedCategory(location.state.category);

      // Если нужно прокрутить к категориям, делаем это
      if (location.state.scrollToCategory) {
        setTimeout(() => {
          scrollToElement("#products-section", { offset: 100 });
        }, 300);
      } else {
        // Плавно прокручиваем к области с карточками после небольшой задержки
        setTimeout(() => {
          scrollToElement("#products-section", { offset: 100 });
        }, 300);
      }

      // Очищаем state после применения
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Фильтрация и сортировка
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Поиск
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Категория
    if (selectedCategory !== "Все категории") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    // Ценовой диапазон
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1]);

    // Только со скидкой
    if (showDiscountOnly) {
      result = result.filter((product) => product.discount);
    }

    // Только в наличии
    if (showInStockOnly) {
      result = result.filter((product) => product.inStock !== false);
    }

    // Только новые
    if (showNewOnly) {
      result = result.filter((product) => product.isNew);
    }

    // Сортировка
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "popular":
      default:
        result.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, priceRange, sortBy, showDiscountOnly, showInStockOnly, showNewOnly]);

  // Обновление отфильтрованных продуктов
  useEffect(() => {
    setFilteredProducts(filteredAndSortedProducts);
  }, [filteredAndSortedProducts]);

  // Получение уникальных тегов
  const allTags = useMemo(() => {
    const tags = new Set();
    products.forEach((product) => {
      if (product.features) {
        product.features.forEach((feature) => tags.add(feature));
      }
    });
    return Array.from(tags);
  }, [products]);

  // Обработчики
  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleCategoryChange = useCallback(
    (category) => {
      setSelectedCategory(category);
      // Обновляем диапазон цен при смене категории
      if (category === "Все категории") {
        const maxPriceAll = Math.max(...products.map((p) => p.price));
        setPriceRange([0, maxPriceAll]);
      } else {
        const categoryProducts = products.filter((p) => p.category === category);
        const maxPriceCategory = categoryProducts.length > 0 ? Math.max(...categoryProducts.map((p) => p.price)) : 10000;
        setPriceRange([0, maxPriceCategory]);
      }
    },
    [products]
  );

  const handlePriceRangeChange = useCallback((range) => {
    // Проверяем, чтобы минимальная цена не была больше максимальной
    if (range[0] > range[1]) {
      // Если минимальная больше максимальной, меняем их местами
      setPriceRange([range[1], range[0]]);
    } else {
      setPriceRange(range);
    }
  }, []);

  const handleSortChange = useCallback((sort) => {
    setSortBy(sort);
  }, []);

  const handleTagToggle = useCallback((tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("Все категории");
    const maxPriceAll = Math.max(...products.map((p) => p.price));
    setPriceRange([0, maxPriceAll]);
    setSelectedTags([]);
    setShowDiscountOnly(false);
    setShowInStockOnly(false);
    setShowNewOnly(false);
  }, [products]);

  // Статистика
  const stats = useMemo(
    () => ({
      total: products.length,
      filtered: filteredProducts.length,
      categories: categories.length,
      averagePrice: Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length),
      maxDiscount: Math.max(...products.filter((p) => p.discount).map((p) => p.discount), 0),
    }),
    [products, filteredProducts]
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-rose-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <HeroSection 
          stats={stats} 
          onConsultationClick={() => setShowConsultationModal(true)}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Специальные предложения */}
          <SpecialOffersBanner />

          {/* Категории товаров */}
          <div id="category-grid" className="mb-8">
            {/* <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Категории цветов</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Выберите интересующую вас категорию для быстрой навигации по цветам и букетам</p>
            </motion.div> */}

            <CategoryGrid categories={categories} onCategorySelect={handleCategoryChange} selectedCategory={selectedCategory} />
          </div>

          {/* Панель управления */}
          <ControlPanel
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            sortBy={sortBy}
            onSortChange={(e) => handleSortChange(e.target.value)}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            showDiscountOnly={showDiscountOnly}
            onShowDiscountOnlyChange={(e) => setShowDiscountOnly(e.target.checked)}
            showInStockOnly={showInStockOnly}
            onShowInStockOnlyChange={(e) => setShowInStockOnly(e.target.checked)}
            showNewOnly={showNewOnly}
            onShowNewOnlyChange={(e) => setShowNewOnly(e.target.checked)}
            onClearFilters={clearFilters}
            maxPrice={maxPrice}
          />

          {/* Популярные товары (показываем только если нет активных фильтров) */}
          {/* {selectedCategory === "all" && !searchQuery && !showDiscountOnly && !showInStockOnly && !showNewOnly && (
            <>
              <PopularProducts products={products} />
              <NewArrivals products={products} />
              <DiscountProducts products={products} />
            </>
          )} */}

          {/* Результаты поиска */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="text-gray-600 dark:text-gray-300 font-handwritten-accent text-xl">
                Найдено {pluralizeFlower(filteredProducts.length)}:{" "}
                <span className="font-semibold text-pink-600 dark:text-pink-400 font-handwritten-stats">{filteredProducts.length}</span>
                {/* {filteredProducts.length !== products.length && <span className="ml-1 mr-1 text-3xl text-gray-500 font-handwritten-accent">из </span> } */}
                {/* <span className="font-semibold text-pink-600 font-handwritten-stats">{products.length}</span> */}
              </div>

              {filteredProducts.length !== products.length && (
                <button
                  onClick={clearFilters}
                  className="text-md text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 underline font-handwritten-button"
                >
                  Сбросить фильтры
                </button>
              )}
            </div>
          </div>

          {/* Сетка товаров */}
          <div id="products-section" ref={containerRef}>
            {loading ? (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}
              >
                <AnimatePresence>
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      layout
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <SearchIcon />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 font-handwritten-secondary">Цветы не найдены</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 font-handwritten-accent">Попробуйте изменить параметры поиска или фильтры</p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-pink-500 dark:bg-pink-600 text-white rounded-2xl hover:bg-pink-600 dark:hover:bg-pink-700 transition-all font-handwritten-button"
                  >
                    Очистить фильтры
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Пагинация (если нужно) */}
          {/* {filteredProducts.length > 12 && (
            <div className="mt-12 flex justify-center">
              <div className="flex gap-2">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`px-4 py-2 rounded-xl transition-all ${page === 1 ? "bg-pink-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )} */}

          {/* Преимущества магазина (показываем только если нет активных фильтров) */}
          {/* {selectedCategory === "all" && !searchQuery && !showDiscountOnly && !showInStockOnly && !showNewOnly && <StoreFeatures />} */}
        </div>
        {/* Модальное окно консультации флориста */}
        <ConsultationModal isOpen={showConsultationModal} onClose={() => setShowConsultationModal(false)} />
      </div>
    </PageTransition>
  );
};

export default Products;
