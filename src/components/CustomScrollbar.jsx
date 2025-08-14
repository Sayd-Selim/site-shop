import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomScrollbar = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Скрываем стандартный скроллбар */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      /* Стилизуем трек скроллбара */
      ::-webkit-scrollbar-track {
        background: transparent;
      }

      /* Стилизуем ползунок скроллбара */
      ::-webkit-scrollbar-thumb {
        background: rgba(156, 163, 175, 0.5);
        border-radius: 4px;
        transition: background 0.2s ease;
      }

      /* Стилизуем ползунок при наведении */
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(156, 163, 175, 0.7);
      }

      /* Стилизуем ползунок при активном состоянии */
      ::-webkit-scrollbar-thumb:active {
        background: rgba(156, 163, 175, 0.9);
      }

      /* Стили для темной темы */
      .dark ::-webkit-scrollbar-thumb {
        background: rgba(75, 85, 99, 0.5);
      }

      .dark ::-webkit-scrollbar-thumb:hover {
        background: rgba(75, 85, 99, 0.7);
      }

      .dark ::-webkit-scrollbar-thumb:active {
        background: rgba(75, 85, 99, 0.9);
      }

      /* Скрываем скроллбар для Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
      }

      /* Стили для темной темы в Firefox */
      .dark * {
        scrollbar-color: rgba(75, 85, 99, 0.5) transparent;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default CustomScrollbar; 