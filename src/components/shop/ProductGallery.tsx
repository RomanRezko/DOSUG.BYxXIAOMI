'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';

interface ProductGalleryProps {
  emoji: string;
  backgrounds: string[];
  /** Реальные фото товара; если заданы — используются вместо эмодзи */
  images?: string[];
  /** Слот тега скидки (верхний левый угол) */
  discountSlot?: ReactNode;
}

function Chevron({ dir }: { dir: number }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={dir < 0 ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Галерея товара: крупное фото + миниатюры, стрелки листания,
 * зум по клику (лайтбокс на весь экран). Если фото нет — эмодзи-плейсхолдер.
 */
export function ProductGallery({ emoji, backgrounds, images, discountSlot }: ProductGalleryProps) {
  const hasPhotos = !!images && images.length > 0;
  const items = hasPhotos ? images! : backgrounds;
  const count = items.length;

  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  const go = useCallback(
    (dir: number) => setActive((a) => (a + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoom(false);
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [zoom, go]);

  return (
    <div>
      {/* Main */}
      <div
        className="relative card flex items-center justify-center h-[320px] sm:h-[420px] overflow-hidden"
        style={{ background: hasPhotos ? '#fff' : backgrounds[active] }}
      >
        {discountSlot && <div className="absolute top-4 left-4 z-20">{discountSlot}</div>}

        {hasPhotos ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={images![active]}
            alt=""
            className="max-h-full max-w-full object-contain p-4 cursor-zoom-in"
            onClick={() => setZoom(true)}
          />
        ) : (
          <span className="text-[160px] sm:text-[200px] leading-none select-none">{emoji}</span>
        )}

        {count > 1 && (
          <>
            <button
              type="button"
              className="gallery-arrow"
              style={{ left: 12 }}
              aria-label="Предыдущее фото"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
            >
              <Chevron dir={-1} />
            </button>
            <button
              type="button"
              className="gallery-arrow"
              style={{ right: 12 }}
              aria-label="Следующее фото"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
            >
              <Chevron dir={1} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex flex-wrap gap-3 mt-3">
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Фото ${i + 1}`}
            aria-pressed={i === active}
            className="relative flex items-center justify-center h-[72px] w-[72px] rounded-[14px] overflow-hidden transition-all"
            style={{
              background: hasPhotos ? '#fff' : (it as string),
              outline: i === active ? '2px solid var(--color-violet)' : '2px solid transparent',
              outlineOffset: 2,
              border: hasPhotos
                ? '1px solid color-mix(in srgb, var(--color-russian-violet) 8%, transparent)'
                : undefined,
            }}
          >
            {hasPhotos ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={it} alt="" className="max-h-full max-w-full object-contain p-1.5" />
            ) : (
              <span className="text-[34px] leading-none select-none">{emoji}</span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {zoom && hasPhotos && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото"
          onClick={() => setZoom(false)}
        >
          <button
            type="button"
            className="gallery-lightbox__close"
            aria-label="Закрыть"
            onClick={() => setZoom(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                className="gallery-arrow gallery-arrow--lb"
                style={{ left: 20 }}
                aria-label="Предыдущее фото"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
              >
                <Chevron dir={-1} />
              </button>
              <button
                type="button"
                className="gallery-arrow gallery-arrow--lb"
                style={{ right: 20 }}
                aria-label="Следующее фото"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
              >
                <Chevron dir={1} />
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images![active]}
            alt=""
            className="gallery-lightbox__img"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="gallery-lightbox__counter">
            {active + 1} / {count}
          </div>
        </div>
      )}
    </div>
  );
}
