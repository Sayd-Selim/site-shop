import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DeliveryContext = createContext();

export const useDelivery = () => {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error('useDelivery must be used within a DeliveryProvider');
  }
  return context;
};

export const DeliveryProvider = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка заказов пользователя
  const loadUserOrders = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Здесь будет реальный API запрос
      // Временные данные для демонстрации
      const mockOrders = [
        {
          id: '1',
          orderNumber: 'ORD-2024-001',
          date: '2024-03-18',
          status: 'В пути',
          estimatedDelivery: '2024-03-20',
          currentLocation: 'Москва',
          total: 15000,
          items: [
            { id: 1, name: 'Кобура 1', quantity: 1, price: 15000 }
          ],
          history: [
            { date: '2024-03-18', status: 'Заказ принят', location: 'Санкт-Петербург' },
            { date: '2024-03-19', status: 'Передан в доставку', location: 'Санкт-Петербург' },
            { date: '2024-03-20', status: 'В пути', location: 'Москва' },
          ]
        },
        {
          id: '2',
          orderNumber: 'ORD-2024-002',
          date: '2024-03-15',
          status: 'Доставлен',
          estimatedDelivery: '2024-03-17',
          currentLocation: 'Санкт-Петербург',
          total: 25000,
          items: [
            { id: 2, name: 'Кобура 2', quantity: 1, price: 25000 }
          ],
          history: [
            { date: '2024-03-15', status: 'Заказ принят', location: 'Санкт-Петербург' },
            { date: '2024-03-16', status: 'Передан в доставку', location: 'Санкт-Петербург' },
            { date: '2024-03-17', status: 'Доставлен', location: 'Санкт-Петербург' },
          ]
        }
      ];
      
      setOrders(mockOrders);
    } catch (err) {
      setError('Ошибка при загрузке заказов. Пожалуйста, попробуйте позже.');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка заказов при изменении пользователя
  useEffect(() => {
    loadUserOrders();
  }, [user]);

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const value = {
    orders,
    loading,
    error,
    getOrderById,
    loadUserOrders
  };

  return (
    <DeliveryContext.Provider value={value}>
      {children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryContext; 