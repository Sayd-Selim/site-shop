import React from 'react';
import { motion } from 'framer-motion';

const StoreFeatures = () => {
  const features = [
    {
      icon: '🛡️',
      title: 'Гарантия качества',
      description: 'Все товары проходят строгий контроль качества и имеют гарантию производителя'
    },
    {
      icon: '🚚',
      title: 'Быстрая доставка',
      description: 'Доставка по всей России от 1 дня. Бесплатная доставка при заказе от 5000₽'
    },
    {
      icon: '💰',
      title: 'Лучшие цены',
      description: 'Прямые поставки от производителей позволяют предлагать самые выгодные цены'
    },
    {
      icon: '🔒',
      title: 'Безопасная оплата',
      description: 'Оплата при получении, банковскими картами или электронными платежами'
    },
    {
      icon: '📞',
      title: 'Поддержка 24/7',
      description: 'Наши специалисты готовы помочь вам в любое время суток'
    },
    {
      icon: '🔄',
      title: 'Возврат товара',
      description: 'Возможность возврата товара в течение 14 дней без объяснения причин'
    }
  ];

  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Почему выбирают нас?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Мы предлагаем лучшие условия для покупки профессионального снаряжения
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Дополнительная информация */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-6 text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">10+</div>
            <div className="text-sm opacity-90">Лет на рынке</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">50,000+</div>
            <div className="text-sm opacity-90">Довольных клиентов</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">1000+</div>
            <div className="text-sm opacity-90">Товаров в каталоге</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StoreFeatures; 