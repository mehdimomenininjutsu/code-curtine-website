// Shared inline SVG icons — no external dependency
const base = (props) => ({
  width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round',
  ...props,
});

export const SearchIcon = (p) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
);
export const UserIcon = (p) => (
  <svg {...base(p)}><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" /></svg>
);
export const HeartIcon = (p) => (
  <svg {...base(p)}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A3.5 3.5 0 0 0 18.5 5c-1.42 0-2.74.79-3.5 2-.76-1.21-2.08-2-3.5-2A3.5 3.5 0 0 0 8 8.5c0 2.29 1.51 4.04 3 5.5l5 5Z" /></svg>
);
export const HeartFilled = (p) => (
  <svg {...base(p)} fill="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A3.5 3.5 0 0 0 18.5 5c-1.42 0-2.74.79-3.5 2-.76-1.21-2.08-2-3.5-2A3.5 3.5 0 0 0 8 8.5c0 2.29 1.51 4.04 3 5.5l5 5Z" /></svg>
);
export const BagIcon = (p) => (
  <svg {...base(p)}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
);
export const MenuIcon = (p) => (
  <svg {...base(p)}><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);
export const CloseIcon = (p) => (
  <svg {...base(p)}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);
export const ChevronDown = (p) => (
  <svg {...base(p)}><path d="m6 9 6 6 6-6" /></svg>
);
export const ChevronLeft = (p) => (
  <svg {...base(p)}><path d="m15 18-6-6 6-6" /></svg>
);
export const ChevronRight = (p) => (
  <svg {...base(p)}><path d="m9 18 6-6-6-6" /></svg>
);
export const ArrowLeft = (p) => (
  <svg {...base(p)}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
);
export const ArrowRight = (p) => (
  <svg {...base(p)}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);
export const PlusIcon = (p) => (
  <svg {...base(p)}><path d="M5 12h14" /><path d="M12 5v14" /></svg>
);
export const MinusIcon = (p) => (
  <svg {...base(p)}><path d="M5 12h14" /></svg>
);
export const CheckIcon = (p) => (
  <svg {...base(p)}><path d="M20 6 9 17l-5-5" /></svg>
);
export const TruckIcon = (p) => (
  <svg {...base(p)}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M14 9h4l4 4v4a1 1 0 0 1-1 1h-1" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>
);
export const ShieldIcon = (p) => (
  <svg {...base(p)}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1 7-2 2.5 1 5 2 7 2a1 1 0 0 1 1 1Z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const SparkleIcon = (p) => (
  <svg {...base(p)}><path d="M9.94 4.94a1 1 0 0 1 1.9 0l1.07 3.2a1 1 0 0 0 .63.63l3.2 1.07a1 1 0 0 1 0 1.9l-3.2 1.07a1 1 0 0 0-.63.63l-1.07 3.2a1 1 0 0 1-1.9 0L8.86 13.4a1 1 0 0 0-.63-.63l-3.2-1.07a1 1 0 0 1 0-1.9l3.2-1.07a1 1 0 0 0 .63-.63Z" /></svg>
);
export const ScissorsIcon = (p) => (
  <svg {...base(p)}><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></svg>
);
export const RulerIcon = (p) => (
  <svg {...base(p)}><path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z" /><path d="m7.5 10.5 2 2" /><path d="m10.5 7.5 2 2" /><path d="m13.5 4.5 2 2" /><path d="m4.5 13.5 2 2" /></svg>
);
export const PaletteIcon = (p) => (
  <svg {...base(p)}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><path d="M12 2a10 10 0 0 0 0 20 2 2 0 0 0 2-2v-1a2 2 0 0 1 2-2h1a3 3 0 0 0 3-3 10 10 0 0 0-8-12Z" /></svg>
);
export const InstagramIcon = (p) => (
  <svg {...base(p)}><rect width="20" height="20" x="2" y="2" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);
export const PinterestIcon = (p) => (
  <svg {...base(p)}><path d="M8 12a4 4 0 1 1 8 0c0 2.5-1.5 4-3 4-1 0-1.5-.5-1.5-1.5L12 18" /><path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-1-.2-2.5 0-3.5l1.2-5S9 12 9 11c0-1.5 1-2.5 2-2.5s1.5 1 1.5 2.5c0 1.5-1 3.5-1 4.5s.5 2 2 2 3-1.5 3-4c0-3.5-2.5-6-6-6Z" /></svg>
);
export const LinkedinIcon = (p) => (
  <svg {...base(p)}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);
export const ArrowUp = (p) => (
  <svg {...base(p)}><path d="m18 15-6-6-6 6" /></svg>
);
