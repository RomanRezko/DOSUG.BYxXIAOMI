'use client';

import { useMemo, useState } from 'react';
import { products, productCategories } from '@/data/products';
import { partnerList } from '@/data/partners';
import { ProductCard } from '@/components/shop/ProductCard';
import { CollabMarquee } from '@/components/shop/CollabMarquee';
import { HeroBanner } from '@/components/shop/HeroBanner';

type SortKey = 'popular' | 'cheap' | 'expensive' | 'rating';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'popular', label: 'Популярные' },
  { key: 'cheap', label: 'Сначала дешевле' },
  { key: 'expensive', label: 'Сначала дороже' },
  { key: 'rating', label: 'По рейтингу' },
];

/** Минимальная цена товара по магазинам */
const minPriceOf = (p: (typeof products)[number]) =>
  p.offers && p.offers.length ? Math.min(...p.offers.map((o) => o.price)) : p.price;

export default function CatalogHomePage() {
  const [category, setCategory] = useState('all');
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>('popular');

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
            <div className="sidebar-block">
              <h2 className="sidebar-title">Категории</h2>
              <ul className="flex flex-col gap-1">
                {productCategories.map((c) => {
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
            </div>

            <div className="sidebar-block">
              <div className="flex items-center justify-between mb-1">
                <h2 className="sidebar-title" style={{ marginBottom: 0, border: 'none', paddingBottom: 0 }}>
                  Магазин
                </h2>
                {selectedStores.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedStores([])}
                    className="text-[12px] font-medium"
                    style={{ color: 'var(--color-violet)' }}
                  >
                    Сбросить
                  </button>
                )}
              </div>
              <ul className="flex flex-col gap-0.5 mt-2">
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
                      className="px-3 py-1.5 rounded-full text-[13px] font-semibold transition-colors"
                      style={{
                        background: active ? 'var(--color-russian-violet)' : '#fff',
                        color: active ? '#fff' : 'var(--color-text)',
                        border: '1.5px solid ' + (active ? 'var(--color-russian-violet)' : 'rgba(18,13,49,0.1)'),
                      }}
                    >
                      {s.label}
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
