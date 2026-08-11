import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { partners } from '@/data/partners';
import { ProductGallery } from '@/components/shop/ProductGallery';
import { DiscountBadge } from '@/components/shop/DiscountBadge';
import { ProductCard } from '@/components/shop/ProductCard';
import { PartnerOffers } from '@/components/shop/PartnerOffers';
import { CollabMarquee } from '@/components/shop/CollabMarquee';
import { getSpecs, getDescription, getGalleryBackgrounds } from '@/lib/productContent';
import { productDetails } from '@/data/productDetails';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: 'Товар не найден' };
  return {
    title: `${product.name} — цены в магазинах`,
    description: getDescription(product).slice(0, 160),
  };
}

function formatPrice(value: number): string {
  return value.toLocaleString('ru-RU') + ' р.';
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const specs = getSpecs(product);
  const description = getDescription(product);
  const backgrounds = getGalleryBackgrounds(product.categorySlug);
  const details = productDetails[product.slug];

  const offers = (product.offers ?? []).filter((o) => partners[o.partnerId]);
  const minPrice = offers.length ? Math.min(...offers.map((o) => o.price)) : product.price;

  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={{ background: 'var(--color-background-alt)' }}>
      <CollabMarquee />

      <div className="container" style={{ padding: '24px 24px 96px' }}>
        {/* Breadcrumbs */}
        <nav className="text-[13px] mb-6 text-[var(--color-text-muted)]">
          <Link href="/" className="hover:text-[var(--color-violet)]">Каталог Xiaomi</Link>
          {' / '}
          <span className="text-[var(--color-text)]">{product.category}</span>
        </nav>

        {/* Top: 3 колонки — [заголовок+цена+фото] · [характеристики] · [магазины] */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr_0.9fr] items-start">
          {/* Col A: заголовок, рейтинг, цена — над фото */}
          <div>
            <h1
              className="text-[24px] sm:text-[30px] font-bold leading-tight"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-russian-violet)' }}
            >
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3">
              <span className="rating">
                <span className="rating-star">★</span>
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[13px] text-[var(--color-text-muted)]">
                {product.reviewCount} отзывов
              </span>
              <span className="text-[13px] text-[var(--color-text-muted)]">·</span>
              <span className="text-[13px] text-[var(--color-text-muted)]">{product.category}</span>
              {details?.article && (
                <>
                  <span className="text-[13px] text-[var(--color-text-muted)]">·</span>
                  <span className="text-[13px] text-[var(--color-text-muted)]">
                    Артикул: {details.article}
                  </span>
                </>
              )}
            </div>

            {/* From price */}
            <div className="mt-4 flex items-end gap-3">
              <span className="text-[13px] text-[var(--color-text-muted)] mb-1">Цена от</span>
              <span
                className="text-[32px] font-bold leading-none"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-russian-violet)' }}
              >
                {formatPrice(minPrice)}
              </span>
              {product.oldPrice && (
                <span className="text-[16px] text-[var(--color-text-muted)] line-through mb-1">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>


            {/* Фото — ниже заголовка */}
            <div className="mt-6">
              <ProductGallery
                emoji={product.emoji}
                backgrounds={backgrounds}
                images={details?.images ?? product.images}
                discountSlot={<DiscountBadge offers={product.offers} oldPrice={product.oldPrice} />}
              />
            </div>
          </div>

          {/* Col B: основные характеристики (без заголовка — таблица ровняется с блоком магазинов) */}
          <section aria-label="Характеристики">
            <dl className="card overflow-hidden">
              {specs.map((s, i) => (
                <div
                  key={s.label}
                  className="flex items-baseline justify-between gap-3 px-4 py-2.5"
                  style={{ background: i % 2 === 0 ? 'transparent' : 'var(--color-background-alt)' }}
                >
                  <dt className="text-[13px] text-[var(--color-text-muted)]">{s.label}</dt>
                  <dd className="text-[13px] font-medium text-right">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Col C: магазины (компактно, на уровне заголовка) */}
          <section aria-labelledby="stores-heading">
            <h2 id="stores-heading" className="sr-only">Магазины-партнёры</h2>
            <div className="card p-4" style={{ overflow: 'visible' }}>
              <PartnerOffers offers={product.offers} compact title="Где купить" />
            </div>
            <p className="text-[12px] text-[var(--color-text-muted)] mt-3">
              Цены указаны магазинами-партнёрами и могут отличаться. Переход в магазин — по клику.
            </p>

            {/* Сервисы */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {[
                { icon: '🛡️', label: `Гарантия ${details?.warrantyMonths ?? 24} мес.` },
                { icon: '🚚', label: 'Доставка и самовывоз' },
                { icon: '💳', label: 'Оплата картой и рассрочка' },
                { icon: '🇧🇾', label: 'Официально в Беларуси' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 text-[12px] px-3 py-2 rounded-[12px]"
                  style={{ background: 'var(--color-background-alt)' }}
                >
                  <span className="text-[16px]">{s.icon}</span>
                  {s.label}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Описание + комплектация */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.9fr] items-start mt-14">
          <section aria-labelledby="desc-heading">
            <h2 id="desc-heading" className="text-[22px] font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Описание
            </h2>
            <p className="text-[15px] leading-relaxed text-[var(--color-text)]">{description}</p>

            <ul className="mt-5 flex flex-col gap-2">
              {['Официальная гарантия', 'Оригинальная продукция Xiaomi', 'Сравнение цен в 9 магазинах-партнёрах'].map((li) => (
                <li key={li} className="flex items-start gap-2 text-[14px]">
                  <span style={{ color: 'var(--color-violet)' }}>✓</span>
                  {li}
                </li>
              ))}
            </ul>
          </section>

          {details?.includes && details.includes.length > 0 && (
            <section aria-labelledby="includes-heading">
              <h2 id="includes-heading" className="text-[22px] font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Комплектация
              </h2>
              <ul className="card overflow-hidden">
                {details.includes.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 px-4 py-2.5 text-[14px]"
                    style={{ background: i % 2 === 0 ? 'transparent' : 'var(--color-background-alt)' }}
                  >
                    <span style={{ color: 'var(--color-violet)' }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-16">
            <h2 id="related-heading" className="section-title">Похожие товары</h2>
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
