import Link from 'next/link';
import type { Product } from '@/types';
import { productDetails } from '@/data/productDetails';
import { partners } from '@/data/partners';
import { RatingBadge } from '@/components/shop/RatingBadge';

function formatPrice(value: number): string {
  return value.toLocaleString('ru-RU') + ' р.';
}

function storesLabel(n: number): string {
  return n === 1 ? 'в 1 магазине' : `в ${n} магазинах`;
}

interface ProductCardProps {
  product: Product;
}

// Брендовые фоны для эмодзи-плейсхолдеров (из палитры дизайн-системы)
const THUMB_BG: Record<string, string> = {
  tv: 'var(--color-mauve)',
  phone: 'rgba(182, 255, 97, 0.35)',
  tablet: 'rgba(182, 255, 97, 0.35)',
  vacuum: 'rgba(128, 18, 255, 0.10)',
  kitchen: 'rgba(233, 114, 76, 0.16)',
  home: 'var(--color-mauve)',
  monitor: 'rgba(67, 146, 241, 0.16)',
};

export function ProductCard({ product }: ProductCardProps) {
  const validOffers = (product.offers ?? []).filter((o) => partners[o.partnerId]);
  const offerPrices = validOffers.map((o) => o.price);
  const minOfferPrice = offerPrices.length ? Math.min(...offerPrices) : product.price;
  const storeCount = validOffers.length;
  // Максимальная скидка среди магазинов (относительно обычной цены)
  const discount = product.oldPrice
    ? Math.round((1 - minOfferPrice / product.oldPrice) * 100)
    : 0;
  const photo = product.images?.[0] ?? productDetails[product.slug]?.images?.[0];

  return (
    <article className="card flex flex-col group">
      {/* Thumbnail → страница товара */}
      <Link
        href={`/tovary/${product.slug}`}
        className="relative flex items-center justify-center h-[190px] shrink-0 overflow-hidden"
        style={{ background: photo ? '#fff' : (THUMB_BG[product.categorySlug] ?? 'var(--color-mauve)') }}
        aria-label={product.name}
      >
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt=""
            className="max-h-full max-w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="text-[76px] leading-none transition-transform duration-300 group-hover:scale-110">
            {product.emoji}
          </span>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <span
            className="tag tag--small absolute top-3 left-3"
            style={{ background: 'var(--color-accent-red)', color: '#fff' }}
          >
            −{discount}%
          </span>
        )}

      </Link>

      {/* Body */}
      <div className="flex flex-col grow p-5">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <RatingBadge offers={product.offers} rating={product.rating} />
          <span className="text-[12px] text-[var(--color-text-muted)]">
            {product.reviewCount} отзывов
          </span>
        </div>

        {/* Name → страница товара */}
        <h3 className="mb-2">
          <Link
            href={`/tovary/${product.slug}`}
            title={product.name}
            className="text-[14px] font-semibold leading-snug line-clamp-2 transition-colors hover:text-[var(--color-violet)]"
          >
            {product.name}
          </Link>
        </h3>

        {/* Иконки всех магазинов, где есть товар */}
        {storeCount > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-4" aria-label="Магазины с этим товаром">
            {validOffers.map((o) => {
              const p = partners[o.partnerId];
              return (
                <span key={o.partnerId} className="store-mini" title={p.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logo} alt={p.name} loading="lazy" />
                </span>
              );
            })}
          </div>
        )}

        {/* Цена «от» + кнопка перехода к ценам */}
        <div className="mt-auto pt-4 border-t border-[color-mix(in_srgb,var(--color-russian-violet)_10%,transparent)]">
          <div className="flex items-end justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-[12px] text-[var(--color-text-muted)] leading-none mb-1">
                Цена от
              </span>
              <div className="flex items-end gap-2">
                <span
                  className="text-[22px] font-bold leading-none"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-russian-violet)' }}
                >
                  {formatPrice(minOfferPrice)}
                </span>
                {product.oldPrice && (
                  <span className="text-[13px] text-[var(--color-text-muted)] line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>
            {storeCount > 0 && (
              <span className="text-[12px] text-[var(--color-text-muted)] whitespace-nowrap">
                {storesLabel(storeCount)}
              </span>
            )}
          </div>

          <Link
            href={`/tovary/${product.slug}`}
            className="btn btn--xiaomi w-full mt-4"
          >
            Сравнить цены
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
