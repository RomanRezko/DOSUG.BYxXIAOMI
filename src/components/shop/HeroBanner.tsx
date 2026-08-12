'use client';

import { useEffect, useState } from 'react';

/**
 * Hero-карусель на первом экране. Пока — заглушки под промо-баннеры.
 * Заменить содержимое слайдов на изображения, когда будут готовы.
 * Рекомендуемый размер макета: десктоп ~1920×520 (24:7), мобайл ~1080×720 (3:2).
 */
type Slide = {
  title: string;
  /** Фоновый градиент-заглушка */
  bg: string;
};

const SLIDES: Slide[] = [
  {
    title: 'Здесь будет hero-баннер',
    bg: 'linear-gradient(120deg, var(--color-mauve) 0%, rgba(182,255,97,0.35) 55%, rgba(255,105,0,0.18) 100%)',
  },
  {
    title: 'Промо-баннер · акции Xiaomi',
    bg: 'linear-gradient(120deg, rgba(255,105,0,0.20) 0%, var(--color-mauve) 55%, rgba(128,18,255,0.16) 100%)',
  },
  {
    title: 'Промо-баннер · новинки и хиты',
    bg: 'linear-gradient(120deg, rgba(128,18,255,0.16) 0%, rgba(182,255,97,0.32) 60%, var(--color-mauve) 100%)',
  },
];

export function HeroBanner() {
  const [index, setIndex] = useState(0);
  const count = SLIDES.length;

  const go = (n: number) => setIndex((n + count) % count);
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  // Автопрокрутка (пауза не нужна — заглушка декоративная)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [count]);

  const slide = SLIDES[index];

  return (
    <section className="container" style={{ paddingTop: 24, paddingBottom: 8 }}>
      <div className="hero-banner" role="group" aria-roledescription="карусель" aria-label="Промо-баннеры">
        {/* Слайд */}
        <div className="hero-banner__slide" style={{ background: slide.bg }}>
          <div className="hero-banner__inner">
            <svg className="w-9 h-9 mb-3 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 16l4.5-4.5a1 1 0 011.4 0L13 16m-2-2l2.2-2.2a1 1 0 011.4 0L21 16M16 9.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
            </svg>
            <p className="hero-banner__title">{slide.title}</p>
            <p className="hero-banner__hint">
              Заглушка · рекомендуемый размер{' '}
              <span className="sm:hidden">1080×720</span>
              <span className="hidden sm:inline">1920×520</span>
            </p>
          </div>
        </div>

        {/* Стрелки */}
        <button
          type="button"
          onClick={prev}
          aria-label="Предыдущий баннер"
          className="hero-banner__arrow hero-banner__arrow--prev"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Следующий баннер"
          className="hero-banner__arrow hero-banner__arrow--next"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Точки */}
        <div className="hero-banner__dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Баннер ${i + 1}`}
              aria-current={i === index}
              className={`hero-banner__dot ${i === index ? 'is-active' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
