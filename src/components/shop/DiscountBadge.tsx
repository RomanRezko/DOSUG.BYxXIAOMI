'use client';

import { useState } from 'react';
import type { PartnerOffer } from '@/types';
import { partners } from '@/data/partners';

interface DiscountBadgeProps {
  offers?: PartnerOffer[];
  /** Базовая (обычная) цена, от которой считается скидка */
  oldPrice?: number;
}

/**
 * Тег максимальной скидки среди всех магазинов.
 * При наведении/клике — popover со списком скидок по магазинам.
 */
export function DiscountBadge({ offers, oldPrice }: DiscountBadgeProps) {
  const [open, setOpen] = useState(false);

  if (!oldPrice) return null;

  const rows = (offers ?? [])
    .filter((o) => partners[o.partnerId] && o.price < oldPrice)
    .map((o) => ({
      partner: partners[o.partnerId],
      pct: Math.round((1 - o.price / oldPrice) * 100),
      price: o.price,
    }))
    .sort((a, b) => b.pct - a.pct);

  if (rows.length === 0) return null;
  const max = rows[0].pct;

  return (
    <div
      className="disc"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="disc__tag"
        aria-expanded={open}
        aria-label={`Максимальная скидка ${max} процентов — показать по магазинам`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        −{max}%
      </button>

      {open && (
        <div
          className="disc__pop"
          role="tooltip"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <p className="disc__title">Скидки в магазинах</p>
          <ul className="disc__list">
            {rows.map((row) => (
              <li key={row.partner.id} className="disc__row">
                <span className="disc__logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={row.partner.logo} alt={row.partner.name} loading="lazy" />
                </span>
                <span className="disc__pct">−{row.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
