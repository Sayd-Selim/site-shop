import { motion } from 'framer-motion';

const OrderStatus = ({ status, orderNumber, estimatedDelivery }) => {
    const steps = [
        { id: 'processing', label: 'В обработке', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'confirmed', label: 'Подтвержден', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'shipped', label: 'Отправлен', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
        { id: 'delivered', label: 'Доставлен', icon: 'M5 13l4 4L19 7' }
    ];

    const currentStepIndex = steps.findIndex(step => step.id === status);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Статус заказа #{orderNumber}
                </h2>
                {estimatedDelivery && (
                    <p className="mt-1 text-sm text-gray-500">
                        Ожидаемая дата доставки: {estimatedDelivery}
                    </p>
                )}
            </div>

            <div className="relative">
                {/* Прогресс-бар */}
                <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-primary-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                {/* Шаги */}
                <div className="relative flex justify-between">
                    {steps.map((step, index) => {
                        const isCompleted = index <= currentStepIndex;
                        const isCurrent = index === currentStepIndex;

                        return (
                            <div key={step.id} className="flex flex-col items-center">
                                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center
                                              ${isCompleted
                                                    ? 'bg-primary-500 text-white'
                                                    : isCurrent
                                                    ? 'bg-primary-100 text-primary-500 dark:bg-primary-900/30'
                                                    : 'bg-gray-100 text-gray-400 dark:bg-gray-700'
                                                }`}>
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d={step.icon}
                                        />
                                    </svg>
                                </div>
                                <span className={`mt-2 text-sm font-medium ${
                                    isCompleted
                                        ? 'text-primary-500'
                                        : isCurrent
                                        ? 'text-gray-900 dark:text-white'
                                        : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Дополнительная информация */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Информация о доставке
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                        <span className="font-medium">Трек-номер:</span> {orderNumber}
                    </p>
                    <p>
                        <span className="font-medium">Служба доставки:</span> Почта России
                    </p>
                    <p>
                        <span className="font-medium">Адрес доставки:</span> г. Москва, ул. Примерная, д. 1
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderStatus; 