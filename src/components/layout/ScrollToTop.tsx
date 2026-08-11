'use client';

import { useEffect, useState } from 'react';

/**
 * Плавающая кнопка «наверх». Появляется после прокрутки страницы ниже порога,
 * по клику плавно возвращает к началу.
 */
export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`scroll-top${show ? ' scroll-top--visible' : ''}`}
      aria-label="Наверх"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V6M5 13l7-7 7 7" />
      </svg>
    </button>
  );
}
