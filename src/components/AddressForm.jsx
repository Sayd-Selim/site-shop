import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AddressForm = ({ onSave, initialData = null }) => {
  const [address, setAddress] = useState(initialData || {
    title: '',
    fullName: '',
    street: '',
    house: '',
    apartment: '',
    city: '',
    postalCode: '',
    phone: '',
    isDefault: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(address);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Название адреса
        </label>
        <input
          type="text"
          value={address.title}
          onChange={(e) => setAddress({ ...address, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          placeholder="Например: Дом, Работа"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          ФИО
        </label>
        <input
          type="text"
          value={address.fullName}
          onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Улица
          </label>
          <input
            type="text"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Дом
          </label>
          <input
            type="text"
            value={address.house}
            onChange={(e) => setAddress({ ...address, house: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Квартира
        </label>
        <input
          type="text"
          value={address.apartment}
          onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Город
          </label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Индекс
          </label>
          <input
            type="text"
            value={address.postalCode}
            onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Телефон
        </label>
        <input
          type="tel"
          value={address.phone}
          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={address.isDefault}
          onChange={(e) => setAddress({ ...address, isDefault: e.target.checked })}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Сделать адресом по умолчанию
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Сохранить
        </button>
      </div>
    </motion.form>
  );
};

export default AddressForm; 