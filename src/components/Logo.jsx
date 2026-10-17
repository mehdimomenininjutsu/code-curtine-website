export function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F1D9A0" />
          <stop offset="50%" stopColor="#D4AF69" />
          <stop offset="100%" stopColor="#8B6A35" />
        </linearGradient>
      </defs>
      <line x1="4" y1="6" x2="32" y2="6" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 6 Q7 20 6 30" stroke="url(#logo-grad)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M11 6 Q13 20 11 30" stroke="url(#logo-grad)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M18 6 Q18 20 18 30" stroke="url(#logo-grad)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M25 6 Q23 20 25 30" stroke="url(#logo-grad)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M30 6 Q29 20 30 30" stroke="url(#logo-grad)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
