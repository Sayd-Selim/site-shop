import React from 'react';
import { motion } from 'framer-motion';

// Анимация появления с затуханием
export const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay }}
  >
    {children}
  </motion.div>
);

// Анимация появления снизу
export const SlideUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    {children}
  </motion.div>
);

// Анимация появления слева
export const SlideInLeft = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    {children}
  </motion.div>
);

// Анимация появления справа
export const SlideInRight = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    {children}
  </motion.div>
);

// Анимация масштабирования при наведении
export const ScaleOnHover = ({ children }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

// Анимация нажатия
export const PressAnimation = ({ children }) => (
  <motion.div
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.1 }}
  >
    {children}
  </motion.div>
);

// Анимация пульсации
export const Pulse = ({ children }) => (
  <motion.div
    animate={{
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse"
    }}
  >
    {children}
  </motion.div>
);

// Анимация встряхивания
export const Shake = ({ children }) => (
  <motion.div
    animate={{
      x: [0, -5, 5, -5, 5, 0],
    }}
    transition={{
      duration: 0.5,
    }}
  >
    {children}
  </motion.div>
);

// Анимация вращения
export const Rotate = ({ children }) => (
  <motion.div
    animate={{
      rotate: 360,
    }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    {children}
  </motion.div>
);

// Анимация появления с размытием
export const BlurIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, filter: "blur(10px)" }}
    animate={{ opacity: 1, filter: "blur(0px)" }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

// Анимация появления с поворотом
export const RotateIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, rotate: -10 }}
    animate={{ opacity: 1, rotate: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    {children}
  </motion.div>
);

// Анимация появления с отскоком
export const BounceIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay
    }}
  >
    {children}
  </motion.div>
);

// Анимация появления с волной
export const WaveIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay
    }}
  >
    {children}
  </motion.div>
);

// Анимация появления с разбросом
export const StaggerChildren = ({ children, staggerDelay = 0.1 }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      visible: {
        transition: {
          staggerChildren: staggerDelay
        }
      }
    }}
  >
    {children}
  </motion.div>
);

// Анимация для дочерних элементов
export const StaggerChild = ({ children }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
  >
    {children}
  </motion.div>
);

// Анимация появления с затуханием для списков
export const ListItem = ({ children, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    {children}
  </motion.div>
);

// Анимация для уведомлений
export const NotificationAnimation = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.3 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    transition={{
      type: "spring",
      stiffness: 500,
      damping: 30
    }}
  >
    {children}
  </motion.div>
);

// Анимация для модальных окон
export const ModalAnimation = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 25
    }}
  >
    {children}
  </motion.div>
);

// Анимация для кнопок
export const ButtonAnimation = ({ children }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 17
    }}
  >
    {children}
  </motion.button>
);

// Анимация для карточек
export const CardAnimation = ({ children }) => (
  <motion.div
    whileHover={{ y: -5 }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 20
    }}
  >
    {children}
  </motion.div>
);

// Анимация для иконок
export const IconAnimation = ({ children }) => (
  <motion.div
    whileHover={{ rotate: 360 }}
    transition={{
      type: "spring",
      stiffness: 200,
      damping: 10
    }}
  >
    {children}
  </motion.div>
);

// Анимация для загрузки
export const LoadingAnimation = ({ children }) => (
  <motion.div
    animate={{
      scale: [1, 1.2, 1],
      opacity: [1, 0.5, 1]
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse"
    }}
  >
    {children}
  </motion.div>
); 