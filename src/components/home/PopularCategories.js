import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pluralizeProduct } from "../../utils/pluralize";

const PopularCategories = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const categories = [
        {
            name: "Свадебные букеты",
            icon: "🕊️",
            count: 4,
            color: "from-pink-400 to-rose-500",
            bgColor: "bg-pink-50 dark:bg-pink-900/20",
            gradient: "from-pink-400/20 to-rose-500/20",
            description: "Элегантные композиции для самого важного дня"
        },
        {
            name: "Моно букеты",
            icon: "🌹",
            count: 2,
            color: "from-emerald-400 to-green-500",
            bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
            gradient: "from-emerald-400/20 to-green-500/20",
            description: "Классические букеты из одного вида цветов"
        },
        {
            name: "Букеты MIX",
            icon: "💐",
            count: 7,
            color: "from-purple-400 to-violet-500",
            bgColor: "bg-purple-50 dark:bg-purple-900/20",
            gradient: "from-purple-400/20 to-violet-500/20",
            description: "Яркие композиции из разных видов цветов"
        },
        // {
        //     name: "Подарочные наборы",
        //     icon: "🎁",
        //     count: 78,
        //     color: "from-amber-400 to-orange-500",
        //     bgColor: "bg-amber-50 dark:bg-amber-900/20",
        //     gradient: "from-amber-400/20 to-orange-500/20",
        //     description: "Готовые подарки с цветами"
        // }
    ];

    const mapToProductsCategory = (name) => {
        switch (name) {
            case "Свадебные букеты":
                return "Свадебный букет";
            case "Моно букеты":
                return "Моно букет";
            case "Букеты MIX":
                return "Букет MIX";
            default:
                return "Все категории";
        }
    };

    const handleViewAll = (name) => {
        const category = mapToProductsCategory(name);
        navigate("/products", { state: { category } });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.querySelector("#popular-categories");
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
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="popular-categories" className="py-20 ">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="mb-6">
                        <h2 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100 font-handwritten-primary text-glow">
                            Популярные категории
                        </h2>
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent to-emerald-300 dark:to-emerald-400"></div>
                            <span className="text-2xl font-handwritten-secondary text-emerald-400 dark:text-emerald-300">🌿</span>
                            <div className="w-16 h-px bg-gradient-to-l from-transparent to-emerald-300 dark:to-emerald-400"></div>
                        </div>
                    </div>
                    <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-handwritten-accent">
                        Выберите категорию и найдите идеальные цветы для любого случая
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`relative p-6 rounded-2xl ${category.bgColor} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm cursor-pointer flex flex-col border border-gray-200 dark:border-gray-700`}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <motion.div
                                    className="absolute top-4 right-4"
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className={`p-3 rounded-full bg-gradient-to-r ${category.gradient} shadow-lg`}>
                                        <span className="text-white text-xl">{category.icon}</span>
                                    </div>
                                </motion.div>

                                <div className="mt-4 flex-1">
                                    <motion.h3
                                        className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent tracking-tight font-handwritten-secondary"
                                    >
                                        {category.icon} {category.name}
                                    </motion.h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed font-medium">
                                        {category.description}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {category.count} {pluralizeProduct(category.count)}
                                </span>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleViewAll(category.name)}
                                    className={`px-4 py-2 rounded-lg bg-gradient-to-r ${category.color} text-white text-sm font-semibold shadow-md hover:shadow-lg transition-shadow duration-300`}
                                >
                                    Смотреть все
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Декоративный элемент в конце секции */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="text-center mt-16"
                >
                    <div className="inline-flex items-center gap-6 px-8 py-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-full border border-emerald-200 dark:border-emerald-700/50 shadow-lg">
                        <span className="text-2xl font-handwritten-secondary text-emerald-500 dark:text-emerald-400">🌱</span>
                        <span className="text-2xl font-handwritten-accent text-gray-700 dark:text-gray-200">Каждая категория - это мир красоты и гармонии</span>
                        <span className="text-2xl font-handwritten-secondary text-green-500 dark:text-green-400">🌿</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PopularCategories; 