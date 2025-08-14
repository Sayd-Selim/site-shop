import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SpecialOffersBanner = () => {
  const [currentOffer, setCurrentOffer] = useState(0);
  
  const offers = [
    {
      id: 1,
      title: "Скидка 30% на все букеты",
      description: "Только до конца недели! Красивые букеты по выгодным ценам",
      color: "from-pink-500 to-rose-500",
      icon: "🌸",
      link: "/category/bukety"
    },
    {
      id: 2,
      title: "Бесплатная доставка",
      description: "При заказе от 3000₽ доставка по всему городу бесплатно",
      color: "from-emerald-500 to-green-500",
      icon: "🚚",
      link: "/delivery"
    },
    {
      id: 3,
      title: "Свадебные композиции",
      description: "Новая коллекция свадебных букетов со скидкой до 40%",
      color: "from-purple-500 to-violet-500",
      icon: "💒",
      link: "/category/svadebnye-kompozitsii"
    },
    {
      id: 4,
      title: "Подарок к заказу",
      description: "При покупке от 5000₽ получайте красивую вазу для цветов в подарок",
      color: "from-amber-500 to-orange-500",
      icon: "🎁",
      link: "/promotions"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [offers.length]);

  return (
    <div className="mb-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentOffer}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${offers[currentOffer].color} p-6 text-white shadow-xl`}
        >
          {/* Фоновые элементы */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{offers[currentOffer].icon}</span>
                <h3 className="text-xl font-bold font-handwritten-secondary text-glow">{offers[currentOffer].title}</h3>
              </div>
              <p className="text-white/90 mb-4 max-w-md font-handwritten-accent">
                {offers[currentOffer].description}
              </p>
              <button className="bg-white/20 backdrop-blur px-6 py-2 rounded-xl hover:bg-white/30 transition-all border border-white/30 font-handwritten-button">
                Подробнее
              </button>
            </div>
            
            <div className="hidden md:flex items-center justify-center w-24 h-24 bg-white/20 rounded-full">
              <span className="text-4xl">{offers[currentOffer].icon}</span>
            </div>
          </div>

          {/* Индикаторы */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentOffer(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentOffer ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SpecialOffersBanner; 