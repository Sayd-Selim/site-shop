import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/ProductCard";
import StatsSection from "../components/home/StatsSection";
import PopularCategories from "../components/home/PopularCategories";
import ProductCatalog from "../components/ProductCatalog";
import Footer from "../components/home/Footer";
import HeroSection from "../components/home/HeroSection";
import ReviewsSection from "../components/home/ReviewsSection";
import NewsletterSection from "../components/home/NewsletterSection";

// Временные данные для демонстрации
const mockProducts = [
  {
    id: 1,
    name: "Свадебный букет 'Нежность'",
    description: "Элегантная свадебная композиция из белых роз и пионов с нежными акцентами",
    price: 4500,
    image: process.env.PUBLIC_URL + "/images/marriage/1.jpg",
    category: "Свадебный букет",
    rating: 4.8,
    reviews: 203,
    isNew: true,
    discount: 0,
  },
  {
    id: 2,
    name: "Свадебный букет 'Роскошь'",
    description: "Роскошная свадебная композиция с орхидеями и розами",
    price: 5800,
    image: process.env.PUBLIC_URL + "/images/marriage/2.jpg",
    category: "Свадебный букет",
    rating: 4.9,
    reviews: 112,
    isNew: false,
    discount: 0,
  },
  {
    id: 3,
    name: "Моно букет 'Красные розы'",
    description: "Классический букет из 25 красных роз с зеленью эвкалипта",
    price: 3200,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop&crop=center",
    category: "Моно букет",
    rating: 4.9,
    reviews: 178,
    isNew: false,
    discount: 0,
  },
  {
    id: 4,
    name: "Букет MIX 'Весеннее настроение'",
    description: "Яркий весенний микс из тюльпанов, нарциссов и гиацинтов",
    price: 2800,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop&crop=center",
    category: "Букет MIX",
    rating: 4.7,
    reviews: 134,
    isNew: true,
    discount: 0,
  },
];

const categories = [
  { id: "all", name: "Все товары" },
  { id: "Свадебный букет", name: "Свадебный букет" },
  { id: "Моно букет", name: "Моно букет" },
  { id: "Букет MIX", name: "Букет MIX" },
  { id: "Комнатные растения", name: "Комнатные растения" },
  { id: "Подарочные наборы", name: "Подарочные наборы" },
];

const quickFilters = [
  { id: "new", name: "Новинки", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
  { id: "discount", name: "Со скидкой", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  {
    id: "popular",
    name: "Популярные",
    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [selectedQuickFilters, setSelectedQuickFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const filteredProducts = mockProducts
    .filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesQuickFilters =
        selectedQuickFilters.length === 0 ||
        selectedQuickFilters.some((filter) => {
          switch (filter) {
            case "new":
              return product.isNew;
            case "discount":
              return product.discount > 0;
            case "popular":
              return product.rating >= 4.5;
            default:
              return true;
          }
        });
      return matchesCategory && matchesSearch && matchesPrice && matchesQuickFilters;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const handleQuickFilterToggle = (filterId) => {
    setSelectedQuickFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <HeroSection />

      {/* Статистика */}
      <StatsSection />

      {/* Популярные категории с улучшенным дизайном */}
      <PopularCategories />

      {/* Отзывы клиентов с улучшенным дизайном */}
      <ReviewsSection />

      {/* Подписка на рассылку */}
      <NewsletterSection />

      <Footer />
    </div>
  );
};

export default Home;
