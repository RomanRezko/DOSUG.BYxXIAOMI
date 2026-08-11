'use client';

import { useState } from 'react';
import type { PartnerOffer } from '@/types';
import { partners } from '@/data/partners';

function formatPrice(value: number): string {
  return value.toLocaleString('ru-RU') + ' р.';
}

/**
 * Выбор магазина внутри карточки товара.
 * Выпадающий список магазинов (только там, где товар есть) — по умолчанию
 * выбран с лучшей ценой. Выбранный магазин показывается логотипом + ценой,
 * кнопка «Купить» ведёт в этот магазин. Высота фиксирована → карточки ровные.
 */
export function StorePicker({ offers }: { offers?: PartnerOffer[] }) {
  const valid = (offers ?? []).filter((o) => partners[o.partnerId]);
  const bestId = valid.length
    ? valid.reduce((a, b) => (b.price < a.price ? b : a)).partnerId
    : null;

  const [selectedId, setSelectedId] = useState(bestId);

  if (valid.length === 0 || !selectedId) {
    return (
      <p className="text-[13px] text-[var(--color-text-muted)]">
        Скоро в продаже у партнёров
      </p>
    );
  }

  const current = valid.find((o) => o.partnerId === selectedId) ?? valid[0];
  const currentPartner = partners[current.partnerId];
  const isBest = current.partnerId === bestId;

  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
        Магазин · {valid.length}
      </p>

      {/* Выпадающий список магазинов */}
      <div className="store-select">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="store-select__control"
          aria-label="Выберите магазин"
        >
          {valid.map((offer) => {
            const p = partners[offer.partnerId];
            return (
              <option key={offer.partnerId} value={offer.partnerId}>
                {p.name} — {formatPrice(offer.price)}
                {offer.partnerId === bestId ? ' · лучшая цена' : ''}
              </option>
            );
          })}
        </select>
        <svg className="store-select__chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Выбранный магазин: логотип + цена + переход */}
      <div className="store-panel">
        <span className="store-logo-lg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={currentPartner.logo} alt="" loading="lazy" />
        </span>

        <div className="flex flex-col gap-0.5 mr-auto">
          {isBest && <span className="offer-best-tag self-start">лучшая цена</span>}
          <span className="store-panel__price">{formatPrice(current.price)}</span>
        </div>

        <a
          href={current.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="btn btn--sm btn-collab shrink-0"
          aria-label={`Купить в «${currentPartner.name}» — откроется в новой вкладке`}
        >
          Купить
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
