import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductCatalog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [selectedQuickFilters, setSelectedQuickFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const categories = [
    { id: "all", name: "Все товары", icon: "M4 6h16M4 12h16M4 18h16" },
    { id: "holsters", name: "Кобуры", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
    { id: "belts", name: "Ремни", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    {
      id: "accessories",
      name: "Аксессуары",
      icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    },
    { id: "parts", name: "Запчасти", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  const quickFilters = [
    { id: "new", name: "Новинки", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { id: "popular", name: "Популярные", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
    { id: "discount", name: "Со скидкой", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id: "inStock", name: "В наличии", icon: "M5 13l4 4L19 7" },
  ];

  const products = [
    {
      id: 1,
      name: "Кобура IWB Stealth",
      category: "holsters",
      price: 4500,
      image: "/images/products/holster-1.jpg",
      rating: 4.8,
      reviews: 124,
      isNew: true,
      isPopular: true,
      discount: 15,
      inStock: true,
    },
    {
      id: 2,
      name: "Тактический ремень Pro",
      category: "belts",
      price: 3200,
      image: "/images/products/belt-1.jpg",
      rating: 4.6,
      reviews: 89,
      isNew: false,
      isPopular: true,
      discount: 0,
      inStock: true,
    },
    {
      id: 3,
      name: "Прицел Red Dot",
      category: "accessories",
      price: 8900,
      image: "/images/products/sight-1.jpg",
      rating: 4.9,
      reviews: 56,
      isNew: true,
      isPopular: false,
      discount: 20,
      inStock: true,
    },
    {
      id: 4,
      name: "УСМ Premium",
      category: "parts",
      price: 5600,
      image: "/images/products/trigger-1.jpg",
      rating: 4.7,
      reviews: 42,
      isNew: false,
      isPopular: true,
      discount: 0,
      inStock: false,
    },
    {
      id: 5,
      name: "Кобура OWB Tactical",
      category: "holsters",
      price: 3800,
      image: "/images/products/holster-2.jpg",
      rating: 4.5,
      reviews: 78,
      isNew: false,
      isPopular: false,
      discount: 10,
      inStock: true,
    },
    {
      id: 6,
      name: "Ремень кожаный Classic",
      category: "belts",
      price: 2800,
      image: "/images/products/belt-2.jpg",
      rating: 4.4,
      reviews: 65,
      isNew: false,
      isPopular: false,
      discount: 0,
      inStock: true,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("product-catalog");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleQuickFilterToggle = (filterId) => {
    setSelectedQuickFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
    setCurrentPage(1);
  };

  // Фильтрация товаров
  let filteredProducts = products.filter((product) => {
    // Фильтр по категории
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    
    // Фильтр по поиску
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Фильтр по цене
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    // Фильтр по быстрым фильтрам
    const quickFilterMatch = selectedQuickFilters.length === 0 || selectedQuickFilters.some(filter => {
      switch (filter) {
        case "new":
          return product.isNew;
        case "popular":
          return product.isPopular;
        case "discount":
          return product.discount > 0;
        case "inStock":
          return product.inStock;
        default:
          return true;
      }
    });
    
    return categoryMatch && searchMatch && priceMatch && quickFilterMatch;
  });

  // Сортировка товаров
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popular":
        return b.isPopular - a.isPopular;
      default:
        return b.isPopular - a.isPopular;
    }
  });

  // Пагинация
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div id="product-catalog" className="mb-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center"
      >
        Каталог товаров
      </motion.h2>

      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              selectedCategory === category.id
                ? "bg-gray-900 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {category.name}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        {quickFilters.map((filter) => (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuickFilterToggle(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              selectedQuickFilters.includes(filter.id)
                ? "bg-gray-900 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={filter.icon} />
            </svg>
            {filter.name}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 dark:border-gray-700
                                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                                     placeholder-gray-500 dark:placeholder-gray-400
                                     focus:outline-none focus:ring-2 focus:ring-gray-700
                                     transition-all duration-200"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                                 focus:outline-none focus:ring-2 focus:ring-gray-700
                                 transition-all duration-200"
        >
          <option value="popular">По популярности</option>
          <option value="price-asc">Цена: по возрастанию</option>
          <option value="price-desc">Цена: по убыванию</option>
          <option value="rating">По рейтингу</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Цена: {priceRange[0]}₽ - {priceRange[1]}₽
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="30000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="30000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory + searchQuery + sortBy + priceRange.join(",") + selectedQuickFilters.join(",")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                currentPage === index + 1
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {index + 1}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
