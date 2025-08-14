import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ type }) => {
  const variants = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1
      }
    }
  };

  switch (type) {
    case 'product':
      return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            className="relative pb-[100%] bg-gray-200 dark:bg-gray-700"
          />
          <div className="p-4 space-y-3">
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"
            />
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"
            />
            <div className="flex justify-between items-center">
              <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"
              />
              <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"
              />
            </div>
          </div>
        </div>
      );

    case 'text':
      return (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"
        />
      );

    case 'button':
      return (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"
        />
      );

    case 'image':
      return (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          className="relative pb-[100%] bg-gray-200 dark:bg-gray-700 rounded-lg"
        />
      );

    default:
      return null;
  }
};

export default Skeleton; 