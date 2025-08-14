import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const SpecialOffers = () => {
    const [isVisible, setIsVisible] = useState(false);

    const offers = [
        {
            title: "Скидка на кобуры",
            description: "Специальное предложение на все кобуры IWB",
            discount: "25%",
            image: "/images/holster-offer.jpg",
            color: "from-indigo-400 to-violet-500",
            bgColor: "bg-indigo-50",
            gradient: "from-indigo-400/20 to-violet-500/20",
            endDate: "2024-04-30",
            code: "HOLSTER25"
        },
        {
            title: "Комплект со скидкой",
            description: "Кобура + ремень = выгодная цена",
            discount: "30%",
            image: "/images/combo-offer.jpg",
            color: "from-cyan-400 to-teal-500",
            bgColor: "bg-cyan-50",
            gradient: "from-cyan-400/20 to-teal-500/20",
            endDate: "2024-04-25",
            code: "COMBO30"
        },
        {
            title: "Аксессуары",
            description: "Скидка на все аксессуары для оружия",
            discount: "20%",
            image: "/images/accessories-offer.jpg",
            color: "from-rose-400 to-pink-500",
            bgColor: "bg-rose-50",
            gradient: "from-rose-400/20 to-pink-500/20",
            endDate: "2024-04-28",
            code: "ACC20"
        }
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

        const element = document.getElementById("special-offers");
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
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long'
        });
    };

    return (
        <section id="special-offers" className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">
                        Специальные предложения
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Воспользуйтесь нашими специальными предложениями и получите дополнительную скидку
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {offers.map((offer, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`relative p-6 rounded-2xl ${offer.bgColor} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm`}
                        >
                            <div className="absolute top-4 right-4">
                                <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${offer.color} text-white text-sm font-bold`}>
                                    -{offer.discount}
                                </div>
                            </div>

                            <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden">
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                                {offer.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-4">
                                {offer.description}
                            </p>

                            <div className="flex items-center justify-between mb-4">
                                <div className="text-sm text-gray-500">
                                    До {formatDate(offer.endDate)}
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    Код: {offer.code}
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-full py-3 rounded-lg bg-gradient-to-r ${offer.color} text-white font-medium shadow-md hover:shadow-lg transition-shadow duration-300`}
                            >
                                Использовать предложение
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SpecialOffers; 