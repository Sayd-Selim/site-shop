import React from 'react';
import { motion } from 'framer-motion';

const Form = ({ onSubmit, children, className = '' }) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={onSubmit}
      className={`space-y-6 ${className}`}
    >
      {children}
    </motion.form>
  );
};

const FormGroup = ({ children, error }) => {
  return (
    <div className="space-y-2">
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {children}
    </label>
  );
};

const Input = ({ type = 'text', error, ...props }) => {
  return (
    <motion.input
      whileFocus={{ scale: 1.01 }}
      type={type}
      className={`w-full p-2 border rounded-lg transition-colors duration-200
        ${error
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
        }
        dark:bg-gray-700 dark:text-white
      `}
      {...props}
    />
  );
};

const Select = ({ children, error, ...props }) => {
  return (
    <motion.select
      whileFocus={{ scale: 1.01 }}
      className={`w-full p-2 border rounded-lg transition-colors duration-200
        ${error
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
        }
        dark:bg-gray-700 dark:text-white
      `}
      {...props}
    >
      {children}
    </motion.select>
  );
};

const TextArea = ({ error, ...props }) => {
  return (
    <motion.textarea
      whileFocus={{ scale: 1.01 }}
      className={`w-full p-2 border rounded-lg transition-colors duration-200
        ${error
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
        }
        dark:bg-gray-700 dark:text-white
      `}
      {...props}
    />
  );
};

const Button = ({ children, type = 'button', variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`px-4 py-2 rounded-lg transition-colors duration-200 ${variants[variant]}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

Form.Group = FormGroup;
Form.Label = Label;
Form.Input = Input;
Form.Select = Select;
Form.TextArea = TextArea;
Form.Button = Button;

export default Form; 