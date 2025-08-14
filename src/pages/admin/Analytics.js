import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
} from 'chart.js';

// Регистрация компонентов Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [],
  });
  const [userBehaviorData, setUserBehaviorData] = useState({
    labels: [],
    datasets: [],
  });
  const [popularProducts, setPopularProducts] = useState([]);
  const [discountEffectiveness, setDiscountEffectiveness] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('sales');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [selectedView, setSelectedView] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date(),
  });
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [alertThresholds, setAlertThresholds] = useState({
    sales: 10000,
    conversion: 2,
    returns: 5,
  });

  // Имитация загрузки данных
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Здесь будет реальный API запрос
        // Пока используем моковые данные
        const mockSalesData = {
          labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
          datasets: [
            {
              label: 'Продажи',
              data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: 'Цель',
              data: [20000, 20000, 20000, 20000, 20000, 20000, 20000],
              borderColor: 'rgb(255, 99, 132)',
              borderDash: [5, 5],
              tension: 0.1,
            },
          ],
        };

        const mockUserBehavior = {
          labels: ['Просмотры', 'Добавления в корзину', 'Покупки'],
          datasets: [
            {
              data: [300, 150, 100],
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(75, 192, 192, 0.5)',
              ],
            },
          ],
        };

        const mockPopularProducts = [
          { id: 1, name: 'Кобура 1', sales: 150, revenue: 45000, rating: 4.8, reviews: 45 },
          { id: 2, name: 'Кобура 2', sales: 120, revenue: 36000, rating: 4.6, reviews: 38 },
          { id: 3, name: 'Кобура 3', sales: 100, revenue: 30000, rating: 4.9, reviews: 52 },
        ];

        const mockDiscountEffectiveness = [
          { discount: '10%', sales: 50, revenue: 15000, conversion: 15 },
          { discount: '20%', sales: 80, revenue: 24000, conversion: 25 },
          { discount: '30%', sales: 60, revenue: 18000, conversion: 20 },
        ];

        setSalesData(mockSalesData);
        setUserBehaviorData(mockUserBehavior);
        setPopularProducts(mockPopularProducts);
        setDiscountEffectiveness(mockDiscountEffectiveness);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  const handleExport = () => {
    // Здесь будет логика экспорта данных
    console.log(`Exporting data in ${exportFormat} format`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Аналитика</h1>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 pl-10"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
            <button
              onClick={handleExport}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Экспорт
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 rounded-lg ${
                timeRange === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Неделя
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded-lg ${
                timeRange === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Месяц
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 rounded-lg ${
                timeRange === 'year'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Год
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedView('overview')}
              className={`px-4 py-2 rounded-lg ${
                selectedView === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Обзор
            </button>
            <button
              onClick={() => setSelectedView('products')}
              className={`px-4 py-2 rounded-lg ${
                selectedView === 'products'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Товары
            </button>
            <button
              onClick={() => setSelectedView('users')}
              className={`px-4 py-2 rounded-lg ${
                selectedView === 'users'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Пользователи
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="all">Все сегменты</option>
                <option value="new">Новые клиенты</option>
                <option value="returning">Постоянные клиенты</option>
                <option value="vip">VIP клиенты</option>
              </select>
              <button
                onClick={() => setComparisonMode(!comparisonMode)}
                className={`px-4 py-2 rounded-lg ${
                  comparisonMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Сравнение периодов
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Пороги уведомлений:</span>
              <input
                type="number"
                value={alertThresholds.sales}
                onChange={(e) =>
                  setAlertThresholds({
                    ...alertThresholds,
                    sales: Number(e.target.value),
                  })
                }
                className="w-24 border border-gray-300 rounded-lg px-2 py-1"
                placeholder="Продажи"
              />
              <input
                type="number"
                value={alertThresholds.conversion}
                onChange={(e) =>
                  setAlertThresholds({
                    ...alertThresholds,
                    conversion: Number(e.target.value),
                  })
                }
                className="w-24 border border-gray-300 rounded-lg px-2 py-1"
                placeholder="Конверсия"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Начало периода
                </label>
                <input
                  type="date"
                  value={dateRange.start.toISOString().split('T')[0]}
                  onChange={(e) =>
                    setDateRange({
                      ...dateRange,
                      start: new Date(e.target.value),
                    })
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Конец периода
                </label>
                <input
                  type="date"
                  value={dateRange.end.toISOString().split('T')[0]}
                  onChange={(e) =>
                    setDateRange({
                      ...dateRange,
                      end: new Date(e.target.value),
                    })
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <button
              onClick={() => {
                // Здесь будет логика применения фильтров
                console.log('Applying filters:', dateRange);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Применить
            </button>
          </div>
        </div>
      </div>

      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Общая выручка</h3>
          <p className="text-2xl font-bold text-blue-600">
            {popularProducts
              .reduce((sum, product) => sum + product.revenue, 0)
              .toLocaleString('ru-RU')}{' '}
            ₽
          </p>
          <p className="text-sm text-gray-600 mt-2">+12% к прошлому периоду</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Количество заказов</h3>
          <p className="text-2xl font-bold text-green-600">
            {popularProducts.reduce((sum, product) => sum + product.sales, 0)}
          </p>
          <p className="text-sm text-gray-600 mt-2">+8% к прошлому периоду</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Средний чек</h3>
          <p className="text-2xl font-bold text-purple-600">
            {Math.round(
              popularProducts.reduce((sum, product) => sum + product.revenue, 0) /
                popularProducts.reduce((sum, product) => sum + product.sales, 0)
            ).toLocaleString('ru-RU')}{' '}
            ₽
          </p>
          <p className="text-sm text-gray-600 mt-2">+5% к прошлому периоду</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Конверсия</h3>
          <p className="text-2xl font-bold text-orange-600">
            {Math.round(
              (userBehaviorData.datasets[0].data[2] /
                userBehaviorData.datasets[0].data[0]) *
                100
            )}
            %
          </p>
          <p className="text-sm text-gray-600 mt-2">+3% к прошлому периоду</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* График продаж */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Статистика продаж</h2>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1"
            >
              <option value="sales">Продажи</option>
              <option value="revenue">Выручка</option>
              <option value="orders">Заказы</option>
            </select>
          </div>
          <Line
            data={salesData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Динамика продаж',
                },
              },
            }}
          />
        </div>

        {/* Анализ поведения пользователей */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Поведение пользователей</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Pie
                data={userBehaviorData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Воронка продаж</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Просмотры</span>
                    <span className="font-medium">300</span>
                  </div>
                  <div className="flex justify-between">
                    <span>В корзину</span>
                    <span className="font-medium">150</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Покупки</span>
                    <span className="font-medium">100</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Конверсия</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Просмотр → Корзина</span>
                    <span className="font-medium">50%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Корзина → Покупка</span>
                    <span className="font-medium">67%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Популярные товары */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Популярные товары</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Товар</th>
                  <th className="px-4 py-2 text-left">Продажи</th>
                  <th className="px-4 py-2 text-left">Выручка</th>
                  <th className="px-4 py-2 text-left">Рейтинг</th>
                  <th className="px-4 py-2 text-left">Отзывы</th>
                </tr>
              </thead>
              <tbody>
                {popularProducts.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">{product.sales}</td>
                    <td className="px-4 py-2">
                      {product.revenue.toLocaleString('ru-RU')} ₽
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1">{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">{product.reviews}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Эффективность скидок */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Эффективность скидок</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Скидка</th>
                    <th className="px-4 py-2 text-left">Продажи</th>
                    <th className="px-4 py-2 text-left">Выручка</th>
                    <th className="px-4 py-2 text-left">Конверсия</th>
                  </tr>
                </thead>
                <tbody>
                  {discountEffectiveness.map((discount, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{discount.discount}</td>
                      <td className="px-4 py-2">{discount.sales}</td>
                      <td className="px-4 py-2">
                        {discount.revenue.toLocaleString('ru-RU')} ₽
                      </td>
                      <td className="px-4 py-2">{discount.conversion}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-4">Рекомендации</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Скидка 20% показывает лучшую конверсию
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">!</span>
                  Скидка 30% имеет низкую маржинальность
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">→</span>
                  Рекомендуется увеличить период действия скидки 20%
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Дополнительные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Топ категории</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Кобуры для пистолетов</span>
              <span className="font-medium">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span>Кобуры для револьверов</span>
              <span className="font-medium">30%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span>Аксессуары</span>
              <span className="font-medium">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">География продаж</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Москва</span>
              <span className="font-medium">35%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span>Санкт-Петербург</span>
              <span className="font-medium">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span>Другие города</span>
              <span className="font-medium">40%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Метрики эффективности</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>ROI</span>
                <span className="font-medium">245%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>LTV</span>
                <span className="font-medium">₽12,500</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>CAC</span>
                <span className="font-medium">₽1,200</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Новые метрики */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Активность пользователей</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Новые пользователи</span>
                <span className="font-medium">+245</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Активные сессии</span>
                <span className="font-medium">1,234</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Время на сайте</span>
                <span className="font-medium">4.5 мин</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Маркетинговые метрики</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>CTR</span>
                <span className="font-medium">3.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>CPC</span>
                <span className="font-medium">₽45</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>ROAS</span>
                <span className="font-medium">4.8</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Качество обслуживания</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Среднее время ответа</span>
                <span className="font-medium">2.5 мин</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Удовлетворенность</span>
                <span className="font-medium">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Возвраты</span>
                <span className="font-medium">2.3%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '23%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Анализ корзины */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Анализ корзины</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Средний чек</span>
                <span className="font-medium">₽3,500</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Товаров в корзине</span>
                <span className="font-medium">2.8</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '56%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Брошенные корзины</span>
                <span className="font-medium">23%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '23%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Анализ устройств */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Устройства</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Мобильные</span>
                <span className="font-medium">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-cyan-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Десктоп</span>
                <span className="font-medium">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-cyan-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Планшеты</span>
                <span className="font-medium">5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-cyan-600 h-2 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Анализ источников трафика */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Источники трафика</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Поиск</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-violet-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Соц. сети</span>
                <span className="font-medium">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-violet-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Прямые</span>
                <span className="font-medium">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-violet-600 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Анализ эффективности */}
      <div className="mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Анализ эффективности</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Эффективность каналов</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Поисковая реклама</span>
                  <div className="flex items-center">
                    <span className="font-medium text-green-600 mr-2">ROI 320%</span>
                    <span className="text-sm text-gray-500">(₽45,000)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Социальные сети</span>
                  <div className="flex items-center">
                    <span className="font-medium text-green-600 mr-2">ROI 280%</span>
                    <span className="text-sm text-gray-500">(₽35,000)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Email-рассылки</span>
                  <div className="flex items-center">
                    <span className="font-medium text-green-600 mr-2">ROI 450%</span>
                    <span className="text-sm text-gray-500">(₽25,000)</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Эффективность акций</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Скидка 20%</span>
                  <div className="flex items-center">
                    <span className="font-medium text-green-600 mr-2">+45%</span>
                    <span className="text-sm text-gray-500">(₽120,000)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Бесплатная доставка</span>
                  <div className="flex items-center">
                    <span className="font-medium text-green-600 mr-2">+30%</span>
                    <span className="text-sm text-gray-500">(₽80,000)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Подарок при покупке</span>
                  <div className="flex items-center">
                    <span className="font-medium text-green-600 mr-2">+25%</span>
                    <span className="text-sm text-gray-500">(₽60,000)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Рекомендации и уведомления */}
      <div className="mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Рекомендации и уведомления</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Рекомендации</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <div>
                    <p className="font-medium">Увеличить бюджет на поисковую рекламу</p>
                    <p className="text-sm text-gray-600">ROI выше среднего на 45%</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-500 mr-2">!</span>
                  <div>
                    <p className="font-medium">Оптимизировать мобильную версию</p>
                    <p className="text-sm text-gray-600">Высокий процент отказов на мобильных</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">→</span>
                  <div>
                    <p className="font-medium">Расширить ассортимент аксессуаров</p>
                    <p className="text-sm text-gray-600">Растущий спрос в категории</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Уведомления</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-red-500 mr-2">!</span>
                  <div>
                    <p className="font-medium">Высокий процент возвратов</p>
                    <p className="text-sm text-gray-600">Превышен порог в 5%</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-500 mr-2">!</span>
                  <div>
                    <p className="font-medium">Падение конверсии</p>
                    <p className="text-sm text-gray-600">На 15% ниже среднего</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <div>
                    <p className="font-medium">Рост среднего чека</p>
                    <p className="text-sm text-gray-600">На 20% выше прошлого периода</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics; 