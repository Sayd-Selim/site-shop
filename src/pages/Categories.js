import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { pluralizeProduct } from '../utils/pluralize';
import { getMonoImage } from '../utils/imageUtils';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mainCategories = [
    {
      id: 'wedding',
      name: 'Свадебный букет',
      description: 'Элегантные композиции для самого важного дня',
      image: process.env.PUBLIC_URL + '/images/marriage/1.jpg',
      count: 4,
      color: 'from-pink-400 to-rose-500',
      icon: '💒',
      features: [
        'Белые розы и пионы',
        'Орхидеи фаленопсис',
        'Минималистичные каллы',
        'Романтичные композиции'
      ]
    },
    {
      id: 'mono',
      name: 'Моно букеты',
      description: 'Классические букеты из одного вида цветов',
      image: getMonoImage(1),
      count: 2,
      color: 'from-blue-400 to-indigo-500',
      icon: '🌹',
      features: [
        'Красные розы',
        'Белые тюльпаны',
        'Розовые пионы',
        'Фиолетовые ирисы'
      ]
    },
    {
      id: 'mix',
      name: 'Букеты MIX',
      description: 'Яркие композиции из разных видов цветов',
      image: getMonoImage(1),
      count: 0,
      color: 'from-purple-400 to-violet-500',
      icon: '🌸',
      features: [
        'Весенние миксы',
        'Летние композиции',
        'Осенние палитры',
        'Праздничные букеты'
      ]
    }
  ];

  const otherCategories = [
    {
      id: 'plants',
      name: 'Комнатные растения',
      description: 'Зелёные друзья для вашего дома',
      count: 28,
      color: 'from-green-400 to-emerald-500',
      icon: '🌿'
    },
    {
      id: 'gifts',
      name: 'Подарочные наборы',
      description: 'Готовые подарки для особых случаев',
      count: 22,
      color: 'from-yellow-400 to-orange-500',
      icon: '🎁'
    },
    {
      id: 'orchids',
      name: 'Орхидеи',
      description: 'Экзотические красавицы',
      count: 12,
      color: 'from-purple-400 to-pink-500',
      icon: '🦋'
    },
    {
      id: 'roses',
      name: 'Розы',
      description: 'Королевы цветов',
      count: 18,
      color: 'from-red-400 to-pink-500',
      icon: '🌹'
    },
    {
      id: 'tulips',
      name: 'Тюльпаны',
      description: 'Весенние первоцветы',
      count: 8,
      color: 'from-pink-400 to-purple-500',
      icon: '🌷'
    },
    {
      id: 'peonies',
      name: 'Пионы',
      description: 'Пышные красавцы',
      count: 9,
      color: 'from-pink-400 to-rose-500',
      icon: '🌺'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-pink-500 to-rose-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Категории цветов
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Выберите подходящую категорию и найдите идеальный букет для любого случая
            </p>
          </motion.div>
        </div>
      </section>

      {/* Основные категории */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Основные категории</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Три главные категории цветов для всех ваших потребностей
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mainCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20`}></div>
                    <div className="absolute top-4 right-4 text-4xl">{category.icon}</div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-gray-900">{category.count} {pluralizeProduct(category.count)}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.name}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {category.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link
                      to={category.id === 'wedding' ? '/wedding-bouquets' : `/products?category=${encodeURIComponent(category.name)}`}
                      className={`w-full bg-gradient-to-r ${category.color} text-white py-3 px-6 rounded-lg font-semibold text-center block hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                    >
                      Смотреть {category.name}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Дополнительные категории */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Другие категории</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Специализированные категории для особых случаев
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {otherCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className="block"
                >
                  <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-xs text-gray-500 mb-3">
                      {category.description}
                    </p>
                    
                    <div className="text-xs text-gray-400">
                                              {category.count} {pluralizeProduct(category.count)}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-rose-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Не можете выбрать категорию?</h2>
            <p className="text-xl mb-8 opacity-90">
              Наши флористы помогут подобрать идеальный букет для любого случая
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-white hover:bg-gray-100 text-pink-600 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Перейти в каталог
              </Link>
              <a
                href="https://wa.me/79280171393"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Проконсультироваться
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Categories; 