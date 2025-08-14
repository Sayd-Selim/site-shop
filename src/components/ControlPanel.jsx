import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

// Иконки для фильтров
const FilterIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const GridIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

const ListIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const ControlPanel = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  showFilters,
  onToggleFilters,
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  showDiscountOnly,
  onShowDiscountOnlyChange,
  showInStockOnly,
  onShowInStockOnlyChange,
  showNewOnly,
  onShowNewOnlyChange,
  onClearFilters,
  maxPrice,
  onConsultationClick,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-3xl p-6 mb-8 shadow-xl dark:shadow-soft-dark border border-white/20 dark:border-gray-700/50">
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        {/* Поиск */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Поиск цветов и букетов..."
              value={searchQuery}
              onChange={onSearchChange}
              className="text-2xl w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent transition-all font-handwritten-accent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Сортировка и вид */}
        <div className="flex gap-4 items-center">
          <select
            value={sortBy}
            onChange={onSortChange}
            className="text-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent transition-all font-handwritten-accent text-gray-900 dark:text-white"
          >
            <option value="popular">По популярности</option>
            <option value="price-low">По цене (возрастание)</option>
            <option value="price-high">По цене (убывание)</option>
            <option value="rating">По рейтингу</option>
            <option value="newest">По новизне</option>
          </select>

          {/* <div className="flex bg-gray-100 rounded-2xl p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
            >
              <GridIcon />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
            >
              <ListIcon />
            </button>
          </div> */}

          <button
            onClick={onToggleFilters}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl transition-all ${
              showFilters 
                ? "bg-pink-500 dark:bg-pink-600 text-white" 
                : "bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
            }`}
          >
            <FilterIcon />
            <span className="hidden sm:inline font-handwritten-button">Фильтры</span>
          </button>

          {onConsultationClick && (
            <button
              onClick={onConsultationClick}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors font-handwritten-button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">Консультация флориста</span>
            </button>
          )}
        </div>
      </div>

      {/* Расширенные фильтры */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Категории */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-200 font-handwritten-secondary">Категории</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => onCategoryChange("Все категории")}
                    className={`block w-full text-left px-3 py-2 rounded-xl transition-all ${
                      selectedCategory === "Все категории" 
                        ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300" 
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    <div className="text-left">
                      <div className="text-2xl font-medium font-handwritten-accent">Все категории</div>
                      <div className="text-xl text-gray-500 dark:text-gray-400 mt-1 font-handwritten-accent">
                        Выберите подходящую категорию и найдите идеальный букет для любого случая
                      </div>
                    </div>
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => onCategoryChange(category.name)}
                      className={`block w-full text-left px-3 py-2 rounded-xl transition-all text-2xl ${
                        selectedCategory === category.name 
                          ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300" 
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      <span className="font-handwritten-accent">
                        {category.name} ({category.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ценовой диапазон */}
              <div>
                <h3 className="font-medium text-lg mb-3 text-gray-700 dark:text-gray-200">
                  Цена: {priceRange[0].toLocaleString()}₽ - {priceRange[1].toLocaleString()}₽
                </h3>
                <div className="space-y-4">
                  {/* <div className="flex gap-2">
                                         <input
                       type="number"
                       placeholder="От"
                       value={priceRange[0]}
                       onChange={(e) => {
                         const newMin = parseInt(e.target.value) || 0;
                         if (newMin <= priceRange[1]) {
                           onPriceRangeChange([newMin, priceRange[1]]);
                         }
                       }}
                       className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                     />
                                         <input
                       type="number"
                       placeholder="До"
                       value={priceRange[1]}
                       onChange={(e) => {
                         const newMax = parseInt(e.target.value) || maxPrice;
                         if (newMax >= priceRange[0]) {
                           onPriceRangeChange([priceRange[0], newMax]);
                         }
                       }}
                       className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                     />
                  </div> */}
                  {/* Слайдер для минимальной цены */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">От: {priceRange[0].toLocaleString()}₽</label>
                    <input
                      type="range"
                      min="0"
                      max={maxPrice}
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  {/* Слайдер для максимальной цены */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">До: {priceRange[1].toLocaleString()}₽</label>
                    <input
                      type="range"
                      min="0"
                      max={maxPrice}
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              {/* Быстрые фильтры */}
              {/* <div>
                <h3 className="font-semibold mb-3 text-gray-700">Быстрые фильтры</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showDiscountOnly}
                      onChange={onShowDiscountOnlyChange}
                      className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                    />
                    <span className="text-sm">Только со скидкой</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showInStockOnly}
                      onChange={onShowInStockOnlyChange}
                      className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                    />
                    <span className="text-sm">В наличии</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={showNewOnly} onChange={onShowNewOnlyChange} className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500" />
                    <span className="text-sm">Новинки</span>
                  </label>
                </div>
              </div> */}

              {/* Очистить фильтры */}
              <div className="flex items-end">
                <button onClick={onClearFilters} className="w-full px-4 py-3 bg-red-500 dark:bg-red-600 text-white rounded-2xl hover:bg-red-600 dark:hover:bg-red-700 transition-all">
                  Очистить фильтры
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ControlPanel;

// CSS стили для слайдеров
const styles = `
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ec4899;
    cursor: pointer;
    border: 2px solid #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ec4899;
    cursor: pointer;
    border: 2px solid #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .slider::-webkit-slider-track {
    background: #e5e7eb;
    height: 8px;
    border-radius: 4px;
  }
  
  .slider::-moz-range-track {
    background: #e5e7eb;
    height: 8px;
    border-radius: 4px;
  }

  .dark .slider::-webkit-slider-track {
    background: #4b5563;
  }
  
  .dark .slider::-moz-range-track {
    background: #4b5563;
  }
`;

// Добавляем стили в head
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
