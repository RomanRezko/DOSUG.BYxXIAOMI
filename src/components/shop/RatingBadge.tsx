'use client';

import { useState } from 'react';
import type { PartnerOffer } from '@/types';
import { partners } from '@/data/partners';

interface RatingBadgeProps {
  offers?: PartnerOffer[];
  /** Средний рейтинг товара (фолбэк, если нет офферов) */
  rating: number;
}

/**
 * Плашка рейтинга. Значение — средний рейтинг по магазинам.
 * При наведении/клике — popover с рейтингом в каждом магазине
 * (по аналогии с DiscountBadge).
 */
export function RatingBadge({ offers, rating }: RatingBadgeProps) {
  const [open, setOpen] = useState(false);

  const rows = (offers ?? [])
    .filter((o) => partners[o.partnerId] && typeof o.rating === 'number')
    .map((o) => ({ partner: partners[o.partnerId], rating: o.rating as number }))
    .sort((a, b) => b.rating - a.rating);

  const avg = rows.length
    ? Math.round((rows.reduce((s, r) => s + r.rating, 0) / rows.length) * 10) / 10
    : rating;

  // Нет данных по магазинам — статичная плашка без popover
  if (rows.length === 0) {
    return (
      <span className="rating">
        <span className="rating-star">★</span>
        {rating.toFixed(1)}
      </span>
    );
  }

  return (
    <div className="rate" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="rating rate__tag"
        aria-expanded={open}
        aria-label={`Рейтинг ${avg.toFixed(1)} — показать по магазинам`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        <span className="rating-star">★</span>
        {avg.toFixed(1)}
        <svg className="rate__chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="rate__pop"
          role="tooltip"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <p className="rate__title">Рейтинг в магазинах</p>
          <ul className="rate__list">
            {rows.map((row) => (
              <li key={row.partner.id} className="rate__row">
                <span className="rate__logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={row.partner.logo} alt={row.partner.name} loading="lazy" />
                </span>
                <span className="rate__val">
                  <span className="rating-star">★</span>
                  {row.rating.toFixed(1)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
