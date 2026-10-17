import {
  FABRIC_WHITE,
  FABRIC_GREEN,
  FABRIC_BEIGE,
  FABRIC_BLUE,
  FABRIC_PEACH,
  FABRIC_DARK,
  FABRIC_BROWN_CURTAIN,
  FABRIC_RED_CURTAIN,
} from './images';

// Centralized product dataset — illustrative placeholders.
// Replace with verified business information.
export const products = [
  {
    id: 'aurelia-sheer',
    name: 'اورلیا شفاف',
    nameEn: 'Aurelia Sheer',
    category: 'sheer',
    price: 24,
    unit: 'یارد',
    image: FABRIC_WHITE,
    gallery: [FABRIC_WHITE, FABRIC_BEIGE],
    colors: [
      { name: 'سفید', hex: '#F5F5F0' },
      { name: 'کرم', hex: '#E8E0D0' },
      { name: 'مرواریدی', hex: '#EDE8DF' },
    ],
    badge: 'new',
    description:
      'پارچه شفاف سبک با بافت ظریف که نور را به زیبایی فیلتر می‌کند و فضایی لطیف و دعوت‌کننده می‌سازد.',
  },
  {
    id: 'nocturne-velvet',
    name: 'نوکتورن مخمل',
    nameEn: 'Nocturne Velvet',
    category: 'velvet',
    price: 42,
    unit: 'یارد',
    image: FABRIC_RED_CURTAIN,
    gallery: [FABRIC_RED_CURTAIN, FABRIC_DARK],
    colors: [
      { name: 'شرابی', hex: '#6B1F2A' },
      { name: 'ذغالی', hex: '#2A2A2E' },
      { name: 'یشمی', hex: '#2D4A3E' },
    ],
    badge: 'featured',
    description:
      'مخمل لوکس با عمق رنگی غنی و درخشش مخملی. اثری برجسته و گرم برای فضاهای خاص.',
  },
  {
    id: 'solstice-linen',
    name: 'سولستیس کتان',
    nameEn: 'Solstice Linen',
    category: 'linen',
    price: 31,
    unit: 'یارد',
    image: FABRIC_BEIGE,
    gallery: [FABRIC_BEIGE, FABRIC_PEACH],
    colors: [
      { name: 'بژ', hex: '#C9B99A' },
      { name: 'خاکستری روشن', hex: '#B5B0A8' },
      { name: 'شنی', hex: '#D4C4A8' },
    ],
    badge: null,
    description:
      'کتان طبیعی با بافت ارگانیک و ظاهری آرام. انتخابی جاودان برای فضاهای مینیمال و گرم.',
  },
  {
    id: 'eclipse-blackout',
    name: 'اکلیپس بلک‌اوت',
    nameEn: 'Eclipse Blackout',
    category: 'blackout',
    price: 36,
    unit: 'یارد',
    image: FABRIC_DARK,
    gallery: [FABRIC_DARK, FABRIC_BROWN_CURTAIN],
    colors: [
      { name: 'مشکی', hex: '#1A1A1E' },
      { name: 'سرمه‌ای', hex: '#1E2238' },
      { name: 'قهوه‌ای تیره', hex: '#3A2E28' },
    ],
    badge: 'featured',
    description:
      'پارچه بلک‌اوت متراکم که نور را به‌طور کامل مسدود می‌کند. ایده‌آل برای اتاق خواب و سینمای خانگی.',
  },
  {
    id: 'celeste-voile',
    name: 'سلست وایل',
    nameEn: 'Celeste Voile',
    category: 'sheer',
    price: 22,
    unit: 'یارد',
    image: FABRIC_BLUE,
    gallery: [FABRIC_BLUE, FABRIC_WHITE],
    colors: [
      { name: 'آبی کمرنگ', hex: '#B8C9D8' },
      { name: 'سفید', hex: '#F0F0F0' },
      { name: 'نقره‌ای', hex: '#D0D4D8' },
    ],
    badge: null,
    description:
      'وایل نازک و شفاف با درخشش ملایم. لایه‌ای ایده‌آل برای ترکیب با پرده‌های سنگین‌تر.',
  },
  {
    id: 'monarch-velvet',
    name: 'مونارک مخمل',
    nameEn: 'Monarch Velvet',
    category: 'velvet',
    price: 46,
    unit: 'یارد',
    image: FABRIC_GREEN,
    gallery: [FABRIC_GREEN, FABRIC_DARK],
    colors: [
      { name: 'سبز زمردی', hex: '#1F4A3A' },
      { name: 'شرابی', hex: '#5C1F28' },
      { name: 'سنگی', hex: '#4A4A50' },
    ],
    badge: 'new',
    description:
      'مخمل پریمیوم با عمق استثنایی و درخشش ابریشمی. انتخابی جسورانه برای فضاهای لوکس.',
  },
  {
    id: 'terra-weave',
    name: 'ترا وِیو',
    nameEn: 'Terra Weave',
    category: 'linen',
    price: 29,
    unit: 'یارد',
    image: FABRIC_PEACH,
    gallery: [FABRIC_PEACH, FABRIC_BEIGE],
    colors: [
      { name: 'گل‌بهی', hex: '#D4B8A0' },
      { name: 'تراکوتا', hex: '#C49A82' },
      { name: 'بژ', hex: '#D8CDB8' },
    ],
    badge: null,
    description:
      'بافت کتانی با ریشه‌های طبیعی. ظاهری آرام و زمینی که گرمی را به فضای شما می‌آورد.',
  },
  {
    id: 'obsidian-dimout',
    name: 'ابسیدین دیم‌اوت',
    nameEn: 'Obsidian Dimout',
    category: 'blackout',
    price: 34,
    unit: 'یارد',
    image: FABRIC_BROWN_CURTAIN,
    gallery: [FABRIC_BROWN_CURTAIN, FABRIC_DARK],
    colors: [
      { name: 'قهوه‌ای', hex: '#4A3828' },
      { name: 'مشکی', hex: '#1C1C20' },
      { name: 'زغالی', hex: '#2E2A28' },
    ],
    badge: null,
    description:
      'پارچه دیم‌اوت با بافت متراکم که نور را به‌طور قابل‌توجهی کاهش می‌دهد و حریم خصوصی ایجاد می‌کند.',
  },
];

export const filterTabs = [
  { id: 'all', label: 'همه پارچه‌ها' },
  { id: 'sheer', label: 'شفاف' },
  { id: 'blackout', label: 'بلک‌اوت' },
  { id: 'velvet', label: 'مخمل' },
  { id: 'linen', label: 'کتان' },
];
