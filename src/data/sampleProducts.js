import { getMonoImage, getMarriageImage, getMixImage } from '../utils/imageUtils';

export const sampleProducts = [
  {
    id: 1,
    name: "Свадебный букет <Нежность>",
    category: "Свадебный букет",
    price: 10000,
    oldPrice: 5200,
    // discount: 13,
    rating: 4.8,
    reviewsCount: 203,
    image: getMarriageImage(1),
    description: "Элегантная свадебная композиция из белых роз и пионов с нежными акцентами",
    isNew: true,
    features: [
      "Белые розы",
      "Пионы",
      "Гипсофила",
      "Ленточная отделка"
    ]
  },
  {
    id: 2,
    name: "Свадебный букет <Роскошь>",
    category: "Свадебный букет",
    price: 12500,
    rating: 4.9,
    reviewsCount: 112,
    image: getMarriageImage(2),
    description: "Роскошная свадебная композиция с орхидеями и розами",
    features: [
      "Орхидеи фаленопсис",
      "Белые розы",
      "Золотые акценты",
      "Премиум упаковка"
    ]
  },
  {
    id: 3,
    name: "Свадебный букет <Минимализм>",
    category: "Свадебный букет",
    price: 3800,
    oldPrice: 4500,
    discount: 16,
    rating: 4.5,
    reviewsCount: 78,
    image: getMarriageImage(3),
    description: "Минималистичная композиция из белых калл",
    features: [
      "7 белых калл",
      "Минималистичная упаковка",
      "Элегантная лента",
      "Современный дизайн"
    ]
  },
  {
    id: 4,
    name: "Свадебный букет <Романтика>",
    category: "Свадебный букет",
    price: 6500,
    rating: 4.8,
    reviewsCount: 89,
    image: getMarriageImage(4),
    description: "Романтичный свадебный букет в нежно-розовых тонах",
    features: [
      "Розовые розы",
      "Белые пионы",
      "Гипсофила",
      "Романтичная упаковка"
    ]
  },

  {
    id: 5,
    name: "Моно букет <Белые розы>",
    category: "Моно букет",
    price: 18000,
    oldPrice: 2800,
    // discount: 21,
    rating: 4.6,
    reviewsCount: 94,
    image: getMonoImage(1),
    description: "Нежный букет из белых тюльпанов",
    features: [
      "20 белых тюльпанов",
      "Весенняя зелень",
      "Нежная упаковка",
      "Белая лента"
    ]
  },
  {
    id: 6,
    name: "Моно букет <Красные розы>",
    category: "Моно букет",
    price: 20000,
    oldPrice: 2800,
    // discount: 21,
    rating: 4.6,
    reviewsCount: 94,
    image: getMonoImage(2),
    description: "Нежный букет из белых тюльпанов",
    features: [
      "20 белых тюльпанов",
      "Весенняя зелень",
      "Нежная упаковка",
      "Белая лента"
    ]
  },
  {
    id: 7,
    name: "Букет MIX <Весеннее настроение>",
    category: "Букет MIX",
    price: 17000,
    rating: 4.7,
    reviewsCount: 134,
    image: getMixImage(1),
    description: "Яркий весенний микс из разных цветов",
    features: [
      "Тюльпаны",
      "Нарциссы",
      "Гиацинты",
      "Весенняя зелень"
    ]
  },
  {
    id: 8,
    name: "Букет MIX <Весеннее настроение>",
    category: "Букет MIX",
    price: 20000,
    rating: 4.7,
    reviewsCount: 134,
    image: getMixImage(2),
    description: "Яркий весенний микс из разных цветов",
    features: [
      "Тюльпаны",
      "Нарциссы",
      "Гиацинты",
      "Весенняя зелень"
    ]
  },
  {
    id: 9,
    name: "Букет MIX <Весеннее настроение>",
    category: "Букет MIX",
    price: 4500,
    rating: 4.7,
    reviewsCount: 134,
    image: getMixImage(3),
    description: "Яркий весенний микс из разных цветов",
    features: [
      "Тюльпаны",
      "Нарциссы",
      "Гиацинты",
      "Весенняя зелень"
    ]
  },
  {
    id: 10,
    name: "Букет MIX <Весеннее настроение>",
    category: "Букет MIX",
    price: 15000,
    rating: 4.7,
    reviewsCount: 134,
    image: getMixImage(4),
    description: "Яркий весенний микс из разных цветов",
    features: [
      "Тюльпаны",
      "Нарциссы",
      "Гиацинты",
      "Весенняя зелень"
    ]
  },
  {
    id: 11,
    name: "Букет MIX <Весеннее настроение>",
    category: "Букет MIX",
    price: 30000,
    rating: 4.7,
    reviewsCount: 134,
    image: getMixImage(5),
    description: "Яркий весенний микс из разных цветов",
    features: [
      "Тюльпаны",
      "Нарциссы",
      "Гиацинты",
      "Весенняя зелень"
    ]
  },
  {
    id: 12,
    name: "Букет MIX <Весеннее настроение>",
    category: "Букет MIX",
    price: 20000,
    rating: 4.7,
    reviewsCount: 134,
    image: getMixImage(6),
    description: "Яркий весенний микс из разных цветов",
    features: [
      "Тюльпаны",
      "Нарциссы",
      "Гиацинты",
      "Весенняя зелень"
    ]
  },
  {
    id: 13,
    name: "Букет MIX <Весеннее настроение>",
    category: "Букет MIX",
    price: 25000,
    rating: 4.7,
    reviewsCount: 134,
    image: getMixImage(7),
    description: "Яркий весенний микс из разных цветов",
    features: [
      "Тюльпаны",
      "Нарциссы",
      "Гиацинты",
      "Весенняя зелень"
    ]
  },
 
  // {
  //   id: 6,
  //   name: "Букет MIX <Весеннее настроение>",
  //   category: "Букет MIX",
  //   price: 2800,
  //   rating: 4.7,
  //   reviewsCount: 134,
  //   image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop&crop=center",
  //   description: "Яркий весенний микс из разных цветов",
  //   features: [
  //     "Тюльпаны",
  //     "Нарциссы",
  //     "Гиацинты",
  //     "Весенняя зелень"
  //   ]
  // },
  // {
  //   id: 7,
  //   name: "Букет MIX <Летний день>",
  //   category: "Букет MIX",
  //   price: 3100,
  //   rating: 4.7,
  //   reviewsCount: 134,
  //   image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop&crop=center",
  //   description: "Яркий летний букет из подсолнухов и ромашек",
  //   features: [
  //     "5 подсолнухов",
  //     "15 ромашек",
  //     "Летняя зелень",
  //     "Яркая упаковка"
  //   ]
  // },
  // {
  //   id: 8,
  //   name: "Букет MIX <Осенняя палитра>",
  //   category: "Букет MIX",
  //   price: 3500,
  //   oldPrice: 4200,
  //   discount: 17,
  //   rating: 4.9,
  //   reviewsCount: 156,
  //   image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop&crop=center",
  //   description: "Тёплый осенний букет в оранжево-красных тонах",
  //   features: [
  //     "Оранжевые розы",
  //     "Красные герберы",
  //     "Жёлтые хризантемы",
  //     "Осенняя зелень"
  //   ]
  // },

  // {
  //   id: 10,
  //   name: "Букет MIX 'Праздничный'",
  //   category: "Букет MIX",
  //   price: 3800,
  //   rating: 4.8,
  //   reviewsCount: 112,
  //   image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop&crop=center",
  //   description: "Праздничный букет для особых случаев",
  //   features: [
  //     "Красные розы",
  //     "Белые лилии",
  //     "Розовые гвоздики",
  //     "Праздничная упаковка"
  //   ]
  // }
];

export const categories = [
  { id: 0, name: "Все категории", count: 13, description: "Выберите подходящую категорию и найдите идеальный букет для любого случая" },
  { id: 1, name: "Свадебный букет", count: 4 },
  { id: 2, name: "Моно букет", count: 2 },
  { id: 3, name: "Букет MIX", count: 7 },
  // { id: 4, name: "Комнатные растения", count: 28 },
  // { id: 5, name: "Подарочные наборы", count: 22 },
  // { id: 6, name: "Орхидеи", count: 12 },
  // { id: 7, name: "Розы", count: 18 },
  // { id: 8, name: "Тюльпаны", count: 8 },
  // { id: 9, name: "Хризантемы", count: 14 },
  // { id: 10, name: "Герберы", count: 11 },
  // { id: 11, name: "Пионы", count: 9 },
  // { id: 12, name: "Сезонные цветы", count: 16 }
]; 