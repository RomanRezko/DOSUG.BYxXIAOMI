/**
 * Место под hero-баннер на первом экране. Пока — заглушка.
 * Заменить содержимое на промо-баннер (изображение/слайдер) когда будет готов.
 * Рекомендуемый размер макета: ~1920×520 (соотношение ~24:7).
 */
export function HeroBanner() {
  return (
    <section className="container" style={{ paddingTop: 24, paddingBottom: 8 }}>
      <div className="hero-banner" role="img" aria-label="Место под баннер">
        <div className="hero-banner__inner">
          <svg className="w-9 h-9 mb-3 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 16l4.5-4.5a1 1 0 011.4 0L13 16m-2-2l2.2-2.2a1 1 0 011.4 0L21 16M16 9.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
          </svg>
          <p className="hero-banner__title">Здесь будет hero-баннер</p>
          <p className="hero-banner__hint">Заглушка · рекомендуемый размер 1920×520</p>
        </div>
      </div>
    </section>
  );
}
