import {
  CAT_SHEER,
  CAT_BLACKOUT,
  CAT_VELVET,
  CAT_LINEN,
  CAT_PATTERNED,
  CAT_CONTEMPORARY,
} from './images';

export const categories = [
  {
    id: 'sheer',
    name: 'پرده‌های شفاف',
    desc: 'پارچه‌های سبک و نیمه‌شفاف که نور طبیعی را نرم می‌کنند.',
    image: CAT_SHEER,
    featured: true,
  },
  {
    id: 'blackout',
    name: 'پارچه‌های بلک‌اوت',
    desc: 'پارچه‌های متراکم برای جلوگیری از ورود نور.',
    image: CAT_BLACKOUT,
    featured: false,
  },
  {
    id: 'velvet',
    name: 'پرده‌های مخمل',
    desc: 'بافت غنی و ظاهری لوکس و برجسته.',
    image: CAT_VELVET,
    featured: true,
  },
  {
    id: 'linen',
    name: 'کتان و بافت طبیعی',
    desc: 'بافت‌های ارگانیک با شخصیت جاودان.',
    image: CAT_LINEN,
    featured: false,
  },
  {
    id: 'patterned',
    name: 'پارچه‌های طرح‌دار',
    desc: 'طرح‌ها و الگوهای تزئینی متمایز.',
    image: CAT_PATTERNED,
    featured: false,
  },
  {
    id: 'contemporary',
    name: 'کلاسیک‌های معاصر',
    desc: 'طراحی‌های همه‌کاره برای فضاهای مدرن و زیبا.',
    image: CAT_CONTEMPORARY,
    featured: false,
  },
];
