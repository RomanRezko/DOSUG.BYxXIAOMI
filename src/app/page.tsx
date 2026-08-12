'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, productCategories } from '@/data/products';
import { partnerList } from '@/data/partners';
import { ProductCard } from '@/components/shop/ProductCard';
import { CollabMarquee } from '@/components/shop/CollabMarquee';
import { HeroBanner } from '@/components/shop/HeroBanner';

type SortKey = 'popular' | 'cheap' | 'expensive' | 'rating';
type VisibleSort = 'cheap' | 'expensive' | 'rating';

const SORT_OPTIONS: { key: VisibleSort; label: string }[] = [
  { key: 'cheap', label: 'Сначала дешевле' },
  { key: 'expensive', label: 'Сначала дороже' },
  { key: 'rating', label: 'По рейтингу' },
];

/** Сколько категорий показывать в свёрнутом состоянии */
const CAT_LIMIT = 8;

function SortIcon({ kind }: { kind: VisibleSort }) {
  if (kind === 'rating') {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.2l1.2-6.6L2.5 9l6.6-.9L12 2z" />
      </svg>
    );
  }
  const d = kind === 'cheap' ? 'M12 5v14M6 11l6-6 6 6' : 'M12 19V5M6 13l6 6 6-6';
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d={d} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Минимальная цена товара по магазинам */
const minPriceOf = (p: (typeof products)[number]) =>
  p.offers && p.offers.length ? Math.min(...p.offers.map((o) => o.price)) : p.price;

function CatalogContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState('all');
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>('popular');
  const [catExpanded, setCatExpanded] = useState(false);
  // Сворачивание блоков фильтров на мобильной (на десктопе всегда раскрыты)
  const [catOpen, setCatOpen] = useState(false);
  const [storesOpen, setStoresOpen] = useState(false);

  // Категория из URL (?cat=slug) — для ссылок из бургер-меню
  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setCategory(cat);
  }, [searchParams]);

  const toggleStore = (id: string) =>
    setSelectedStores((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const visible = useMemo(() => {
    let list = products.filter((p) => {
      if (category !== 'all' && p.categorySlug !== category) return false;
      if (selectedStores.length > 0) {
        const inStore = (p.offers ?? []).some((o) => selectedStores.includes(o.partnerId));
        if (!inStore) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'cheap':
          return minPriceOf(a) - minPriceOf(b);
        case 'expensive':
          return minPriceOf(b) - minPriceOf(a);
        case 'rating':
          return b.rating - a.rating || b.reviewCount - a.reviewCount;
        default:
          return b.reviewCount - a.reviewCount;
      }
    });

    return list;
  }, [category, selectedStores, sort]);

  const countFor = (slug: string) =>
    slug === 'all'
      ? products.length
      : products.filter((p) => p.categorySlug === slug).length;

  const storeCountFor = (id: string) =>
    products.filter((p) => (p.offers ?? []).some((o) => o.partnerId === id)).length;

  return (
    <div style={{ background: 'var(--color-background-alt)' }}>
      {/* Бегущая строка между шапкой и баннером */}
      <CollabMarquee />

      {/* Hero-баннер (заглушка) */}
      <HeroBanner />

      <div id="catalog" className="container scroll-mt-24" style={{ padding: '24px 24px 96px' }}>
        <h1
          className="text-[26px] sm:text-[32px] font-bold mb-1"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-russian-violet)' }}
        >
          Каталог Xiaomi
        </h1>
        <p className="text-[15px] text-[var(--color-text-muted)] mb-8">
          Умная техника Xiaomi со сравнением цен в магазинах-партнёрах.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-[260px] shrink-0">
            <div className="flex flex-row items-start gap-3 lg:block">
            <div className="sidebar-block flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setCatOpen((v) => !v)}
                className="w-full flex items-center gap-2 lg:pointer-events-none"
                aria-expanded={catOpen}
              >
                <h2 className="sidebar-title flex-1 text-left" style={{ marginBottom: 0 }}>
                  Категории
                </h2>
                <svg
                  className={`w-4 h-4 shrink-0 lg:hidden text-[var(--color-text-muted)] transition-transform ${catOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`${catOpen ? 'block' : 'hidden'} lg:block mt-3`}>
              <ul className="flex flex-col gap-1">
                {(catExpanded ? productCategories : productCategories.slice(0, CAT_LIMIT)).map((c) => {
                  const active = category === c.slug;
                  return (
                    <li key={c.slug}>
                      <button
                        type="button"
                        onClick={() => setCategory(c.slug)}
                        className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-[12px] text-left transition-colors"
                        style={{
                          background: active ? 'var(--color-violet)' : 'transparent',
                          color: active ? '#fff' : 'var(--color-text)',
                          fontWeight: active ? 600 : 500,
                        }}
                      >
                        <span className="flex items-center gap-2 text-[14px]">
                          <span>{c.icon}</span>
                          {c.name}
                        </span>
                        <span
                          className="text-[12px]"
                          style={{ color: active ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)' }}
                        >
                          {countFor(c.slug)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {productCategories.length > CAT_LIMIT && (
                <button
                  type="button"
                  onClick={() => setCatExpanded((v) => !v)}
                  className="mt-2 flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold"
                  style={{ color: 'var(--color-violet)' }}
                  aria-expanded={catExpanded}
                >
                  {catExpanded ? 'Свернуть' : `Показать все (${productCategories.length})`}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${catExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
              </div>
            </div>

            <div className="sidebar-block flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setStoresOpen((v) => !v)}
                  className="flex-1 flex items-center gap-2 lg:pointer-events-none"
                  aria-expanded={storesOpen}
                >
                  <h2 className="sidebar-title flex-1 text-left" style={{ marginBottom: 0, border: 'none', paddingBottom: 0 }}>
                    Магазин
                  </h2>
                  <svg
                    className={`w-4 h-4 shrink-0 lg:hidden text-[var(--color-text-muted)] transition-transform ${storesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {selectedStores.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedStores([])}
                    className="text-[12px] font-medium shrink-0"
                    style={{ color: 'var(--color-violet)' }}
                  >
                    Сбросить
                  </button>
                )}
              </div>
              <ul className={`${storesOpen ? 'flex' : 'hidden'} lg:flex flex-col gap-0.5 mt-3`}>
                {partnerList.map((p) => {
                  const checked = selectedStores.includes(p.id);
                  return (
                    <li key={p.id}>
                      <label className="flex items-center justify-between gap-2 px-2 py-2 rounded-[10px] cursor-pointer hover:bg-[var(--color-background-alt)] transition-colors">
                        <span className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleStore(p.id)}
                            style={{ accentColor: 'var(--color-violet)', width: 16, height: 16 }}
                          />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.logo}
                            alt={p.name}
                            className="h-[16px] w-auto max-w-[92px] object-contain"
                            style={{ opacity: checked ? 1 : 0.85 }}
                          />
                        </span>
                        <span className="text-[12px] text-[var(--color-text-muted)]">
                          {storeCountFor(p.id)}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <p className="text-[14px] text-[var(--color-text-muted)]">
                Найдено <b style={{ color: 'var(--color-text)' }}>{visible.length}</b> товаров
              </p>
              <div className="flex flex-wrap gap-2">
                {SORT_OPTIONS.map((s) => {
                  const active = sort === s.key;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setSort(s.key)}
                      title={s.label}
                      aria-label={s.label}
                      aria-pressed={active}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold transition-colors"
                      style={{
                        background: active ? 'var(--color-russian-violet)' : '#fff',
                        color: active ? '#fff' : 'var(--color-text)',
                        border: '1.5px solid ' + (active ? 'var(--color-russian-violet)' : 'rgba(18,13,49,0.1)'),
                      }}
                    >
                      <SortIcon kind={s.key} />
                      <span className="hidden sm:inline">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grid */}
            {visible.length > 0 ? (
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="card p-10 text-center">
                <p className="text-[40px] mb-2">🔍</p>
                <p className="font-semibold">Ничего не найдено</p>
                <p className="text-[14px] text-[var(--color-text-muted)] mt-1">
                  Попробуйте изменить фильтры
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogHomePage() {
  return (
    <Suspense fallback={null}>
      <CatalogContent />
    </Suspense>
  );
}
