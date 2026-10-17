import { COLL_VELVET, COLL_NATURAL, COLL_LIGHT } from './images';

export const collections = [
  {
    id: 'velvet-atelier',
    name: 'آتلیه مخمل',
    nameEn: 'The Velvet Atelier',
    desc: 'بافت‌های غنی، عمق و ظرافت بی‌نظیر. مجموعه‌ای برای کسانی که جسارت و لوکس بودن را در یک پارچه جست‌وجو می‌کنند.',
    image: COLL_VELVET,
    filter: 'velvet',
  },
  {
    id: 'natural-edit',
    name: 'انتخاب طبیعی',
    nameEn: 'The Natural Edit',
    desc: 'بافت‌های کتانی، رنگ‌های ملایم و زیبایی محتاطانه. پارچه‌هایی که آرامش طبیعت را به فضای شما می‌آورند.',
    image: COLL_NATURAL,
    filter: 'linen',
  },
  {
    id: 'light-collection',
    name: 'مجموعه نور',
    nameEn: 'The Light Collection',
    desc: 'پارچه‌های شفاف و نیمه‌شفاف که نور طبیعی را شکل می‌دهند. لایه‌ای ظریف برای فضاهای پر از نور.',
    image: COLL_LIGHT,
    filter: 'sheer',
  },
];
