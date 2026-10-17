import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuroraBackground } from './AuroraBackground';
import { HERO_IMAGE } from '../data/images';

/**
 * Scroll-driven cinematic video hero.
 *
 * The video is NEVER played with video.play(). Instead, the user's scroll
 * position through a tall (300vh) pinned section is mapped directly to the
 * video's currentTime, scrubbed inside a requestAnimationFrame loop with
 * smooth interpolation to prevent harsh frame jumps.
 *
 * ── Encoding notes ──────────────────────────────────────────────
 * For smooth random-access seeking the source MP4 should be:
 *  - H.264 baseline/main profile, web-optimized (moov atom at front)
 *  - Frequent keyframes (ideally every 1–2s)
 *  - Moderate bitrate (≤ 5 Mbps for 1080p)
 *  - object-fit: cover so any aspect ratio fills the viewport
 * The supplied video already has moov at the front (fast metadata load).
 * ────────────────────────────────────────────────────────────────
 */

// Scroll distance for the pinned hero. 300vh gives a comfortable cinematic
// scrubbing distance without being excessively long.
const HERO_SCROLL_VH = 300;

// Smoothing factor for interpolating currentTime toward target.
// Higher = more responsive (snappier to scroll), lower = smoother (more lag).
// 0.2 is a good balance: feels directly connected to scroll, no harsh jumps,
// but converges fast enough that big scroll reversals don't feel laggy.
const SMOOTHING = 0.2;

// Minimum delta (seconds) before we issue a new currentTime write, to avoid
// flooding the video element with sub-frame seeks.
const MIN_SEEK_DELTA = 0.016; // ~one frame at 60fps

// Reduced-motion: show a static poster frame instead of the scroll animation.
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function HeroSection() {
  const sectionRef = useRef(null);      // tall scroll container (300vh)
  const stickyRef = useRef(null);       // sticky 100vh viewport
  const videoRef = useRef(null);        // the <video>
  const fallbackRef = useRef(null);     // fallback <img>

  // Refs for the rAF loop (no React state to avoid re-renders on scroll)
  const targetTimeRef = useRef(0);      // where scroll says we should be
  const currentTimeRef = useRef(0);     // smoothed current position
  const rafRef = useRef(null);
  const durationRef = useRef(0);
  const readyRef = useRef(false);

  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // ── Detect reduced motion ──
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ── Video setup: preload metadata, wait for readiness ──
  useEffect(() => {
    if (reducedMotion) return; // skip video for reduced motion
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      durationRef.current = video.duration || 0;
      // Force the first frame to render so we don't show black
      video.currentTime = 0;
    };

    const onCanPlay = () => {
      if (readyRef.current) return;
      readyRef.current = true;
      durationRef.current = video.duration || 0;
      video.currentTime = 0;
      setVideoReady(true);
    };

    const onError = () => {
      setVideoFailed(true);
    };

    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('error', onError);

    // Some browsers need a nudge to load enough for seeking
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('error', onError);
    };
  }, [reducedMotion]);

  // ── Scroll → target time (passive, cheap) ──
  useEffect(() => {
    if (reducedMotion || videoFailed) return;

    const onScroll = () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video || !durationRef.current) return;

      const rect = section.getBoundingClientRect();
      // How far have we scrolled into the 300vh section?
      // top starts at 0 and goes negative as we scroll down.
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));

      targetTimeRef.current = progress * durationRef.current;

      // Fade hero text out during first 30% of scroll, subtle upward drift
      const textOpacity = Math.max(0, 1 - progress / 0.3);
      const textY = -progress * 60; // gentle upward drift
      const sticky = stickyRef.current;
      if (sticky) {
        sticky.style.setProperty('--hero-text-opacity', textOpacity);
        sticky.style.setProperty('--hero-text-y', `${textY}px`);
      }
    };

    // Use passive listener — never preventDefault, never forces layout.
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reducedMotion, videoFailed]);

  // ── rAF loop: smoothly interpolate currentTime toward target ──
  useEffect(() => {
    if (reducedMotion || videoFailed) return;

    const tick = () => {
      const video = videoRef.current;
      if (video && readyRef.current && durationRef.current) {
        const target = targetTimeRef.current;
        const current = currentTimeRef.current;

        // Smooth interpolation toward target
        const diff = target - current;
        const next = current + diff * SMOOTHING;

        // Only seek if the change is meaningful (prevents seek flooding)
        if (Math.abs(next - current) > MIN_SEEK_DELTA || Math.abs(diff) > MIN_SEEK_DELTA) {
          // Clamp to valid range
          const clamped = Math.min(durationRef.current, Math.max(0, next));
          video.currentTime = clamped;
          currentTimeRef.current = clamped;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, videoFailed]);

  // ── Reduced motion: static poster, no scroll animation ──
  if (reducedMotion) {
    return (
      <section className="hero" id="home">
        <div className="hero-bg">
          <img src={HERO_IMAGE} alt="نشیمنکی لوکس با پرده‌های شفاف و نور طبیعی" />
        </div>
        <div className="hero-overlay" />
        <AuroraBackground />
        <div className="hero-content">
          <div className="hero-inner">
            <span className="eyebrow hero-eyebrow">هنر پارچه‌های لوکس</span>
            <h1 className="hero-title">
              فضای خود را با هنر<br />
              <span className="gold-text">پارچه</span> دگرگون کنید
            </h1>
            <p className="hero-subtitle">
              پارچه‌های پرده‌ای استثنایی را کشف کنید که گرمی، بافت و ظرفت جاودان را به هر فضایی می‌آورند.
            </p>
            <div className="hero-cta">
              <Link to="/shop" className="btn btn-gold">کاوش پارچه‌ها</Link>
              <a href="/#collections" className="btn btn-outline" onClick={(e) => {
                e.preventDefault();
                document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
              }}>مجموعه‌های ما را کشف کنید</a>
            </div>
            <p className="hero-trust">پارچه‌های منتخب برای فضاهای متمایز</p>
          </div>
        </div>
      </section>
    );
  }

  // ── Main scroll-driven experience ──
  return (
    <section
      ref={sectionRef}
      className="hero-scroll-section"
      id="home"
      style={{ height: `${HERO_SCROLL_VH}vh` }}
    >
      <div ref={stickyRef} className="hero-scroll-sticky">
        {/* Video background — never autoplays, scrubbed by scroll */}
        <div className="hero-video-wrap">
          {!videoFailed && (
            <video
              ref={videoRef}
              className={`hero-video ${videoReady ? 'ready' : ''}`}
              preload="auto"
              muted
              playsInline
              // Never auto-play; we scrub currentTime via scroll
              // poster shows first frame while loading
              poster={HERO_IMAGE}
            >
              <source src="/video/hero.mp4" type="video/mp4" />
            </video>
          )}

          {/* Fallback image if video fails to load */}
          {(videoFailed || !videoReady) && (
            <img
              ref={fallbackRef}
              className="hero-video-fallback"
              src={HERO_IMAGE}
              alt="نشیمنکی لوکس با پرده‌های شفاف و نور طبیعی"
            />
          )}

          {/* Subtle gradient overlay for text readability — kept light */}
          <div className="hero-video-overlay" />

          {/* Loading indicator — minimal premium treatment */}
          {!videoReady && !videoFailed && (
            <div className="hero-video-loader">
              <div className="hero-video-loader-bar" />
            </div>
          )}
        </div>

        <AuroraBackground />

        {/* Hero text — fades out as user scrolls into the experience */}
        <div className="hero-content hero-scroll-content">
          <div className="hero-inner">
            <span className="eyebrow hero-eyebrow">هنر پارچه‌های لوکس</span>
            <h1 className="hero-title">
              فضای خود را با هنر<br />
              <span className="gold-text">پارچه</span> دگرگون کنید
            </h1>
            <p className="hero-subtitle">
              پارچه‌های پرده‌ای استثنایی را کشف کنید که گرمی، بافت و ظرفت جاودان را به هر فضایی می‌آورند.
            </p>
            <div className="hero-cta">
              <Link to="/shop" className="btn btn-gold">کاوش پارچه‌ها</Link>
              <a href="/#collections" className="btn btn-outline" onClick={(e) => {
                e.preventDefault();
                document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
              }}>مجموعه‌های ما را کشف کنید</a>
            </div>
            <p className="hero-trust">پارچه‌های منتخب برای فضاهای متمایز</p>
          </div>
        </div>

        <div className="hero-scroll" aria-hidden="true">SCROLL</div>
      </div>
    </section>
  );
}
