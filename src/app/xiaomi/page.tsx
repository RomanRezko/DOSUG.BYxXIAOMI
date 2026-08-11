import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/data/products';
import { ProductCard } from '@/components/shop/ProductCard';
import { MiLogo } from '@/components/shop/MiLogo';
import { DosugLogo } from '@/components/layout/DosugLogo';
import { CollabMarquee } from '@/components/shop/CollabMarquee';

export const metadata: Metadata = {
  title: 'DOSUG.BY × Xiaomi — Коллаборация',
  description:
    'Специальная коллаборация DOSUG.BY и Xiaomi: умная техника со скидками до 30% для жителей Минска и всей Беларуси.',
};

const featured = products
  .filter((p) => p.oldPrice)
  .sort((a, b) => (b.oldPrice! - b.price) - (a.oldPrice! - a.price))
  .slice(0, 3);

const stats = [
  { value: '250+', label: 'товаров в коллабе' },
  { value: 'до −30%', label: 'скидки на технику' },
  { value: '2 года', label: 'официальной гарантии' },
  { value: '1 день', label: 'доставка по Минску' },
];

const perks = [
  {
    emoji: '🏠',
    title: 'Умный дом',
    text: 'Пылесосы, аэрогрили, отпариватели и весы Xiaomi — подобрали технику, которая реально экономит время.',
    bg: 'var(--color-mauve)',
  },
  {
    emoji: '🎟️',
    title: 'Цены для своих',
    text: 'Эксклюзивные цены коллаборации только на DOSUG.BY. Дешевле, чем в обычной рознице.',
    bg: 'rgba(182, 255, 97, 0.4)',
  },
  {
    emoji: '🛡️',
    title: 'Только оригинал',
    text: 'Официальная продукция Xiaomi с гарантией и сервисом в Беларуси. Никаких «серых» поставок.',
    bg: 'rgba(255, 105, 0, 0.14)',
  },
];

function CollabLockup({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <DosugLogo height={26} letterColor={dark ? '#fff' : 'var(--color-russian-violet)'} />
      <span
        className="text-[24px] font-light"
        style={{ color: dark ? 'rgba(255,255,255,0.5)' : 'var(--color-text-muted)' }}
        aria-hidden="true"
      >
        ×
      </span>
      <MiLogo size={40} />
    </div>
  );
}

export default function XiaomiCollabPage() {
  return (
    <div style={{ background: 'var(--color-background-alt)' }}>
      {/* Marquee announcement */}
      <CollabMarquee />

      {/* Hero */}
      <section className="bg-gradient-collab noise-overlay relative overflow-hidden">
        {/* decorative squiggle */}
        <svg
          className="absolute -right-10 -top-10 w-[520px] opacity-25 pointer-events-none hidden md:block"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20 200 C 20 100 120 100 140 180 S 260 320 300 200 S 380 80 390 200"
            stroke="var(--color-green-yellow)"
            strokeWidth="34"
            strokeLinecap="round"
          />
        </svg>

        <div className="container relative z-10" style={{ padding: '56px 24px 72px' }}>
          <div className="mb-8">
            <CollabLockup dark />
          </div>

          <span className="tag" style={{ background: 'var(--color-xiaomi)', color: '#fff' }}>
            Специальная коллаборация
          </span>

          <h1
            className="text-display mt-5"
            style={{ color: '#fff', maxWidth: 900 }}
          >
            Досуг стал{' '}
            <span className="text-gradient-collab">умнее</span>
          </h1>

          <p
            className="mt-5 text-[18px] sm:text-[20px]"
            style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 620 }}
          >
            DOSUG.BY и Xiaomi объединились, чтобы сделать умную технику доступнее.
            Гаджеты для дома, которые оставляют больше времени на любимый досуг —
            по ценам коллаборации.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/#catalog" className="btn btn--lg btn-collab">
              Смотреть каталог
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="#pochemu" className="btn btn--lg btn--secondary">
              Почему это выгодно
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="py-6 px-2 text-center"
                  style={{
                    borderLeft: i % 4 === 0 ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <div
                    className="text-[26px] sm:text-[32px] font-bold"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-green-yellow)' }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="container" style={{ padding: '72px 24px 0' }} aria-labelledby="featured-heading">
        <div className="section-header">
          <h2 id="featured-heading" className="section-title" style={{ marginBottom: 0 }}>
            Хиты коллаборации
          </h2>
          <Link href="/#catalog" className="section-link">
            Все товары
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Why / perks */}
      <section id="pochemu" className="container" style={{ padding: '72px 24px' }} aria-labelledby="perks-heading">
        <h2 id="perks-heading" className="section-title">Почему DOSUG.BY × Xiaomi</h2>
        <div className="feature-grid mt-8">
          {perks.map((perk) => (
            <div key={perk.title} className="feature-card">
              <div className="feature-icon" style={{ background: perk.bg, color: 'inherit' }}>
                <span className="text-[28px]">{perk.emoji}</span>
              </div>
              <h3 className="text-[20px] font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                {perk.title}
              </h3>
              <p className="mt-2 text-[15px]" style={{ color: 'var(--color-text-muted)' }}>
                {perk.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="container" style={{ padding: '0 24px 96px' }}>
        <div
          className="relative overflow-hidden text-center"
          style={{
            background: 'linear-gradient(120deg, var(--color-xiaomi) 0%, var(--color-violet) 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: '64px 24px',
          }}
        >
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-6">
              <DosugLogo height={26} />
              <span className="text-[22px]" style={{ color: 'rgba(255,255,255,0.6)' }} aria-hidden="true">×</span>
              <MiLogo size={40} />
            </div>
            <h2
              className="text-[clamp(28px,5vw,48px)] font-bold"
              style={{ fontFamily: 'var(--font-heading)', color: '#fff', maxWidth: 640, lineHeight: 1.1 }}
            >
              Больше техники — больше досуга
            </h2>
            <p className="mt-4 text-[17px]" style={{ color: 'rgba(255,255,255,0.9)', maxWidth: 520 }}>
              Успейте забрать гаджеты Xiaomi по ценам коллаборации. Доставка по всей Беларуси.
            </p>
            <Link
              href="/#catalog"
              className="btn btn--lg mt-8"
              style={{ background: '#fff', color: 'var(--color-russian-violet)' }}
            >
              Перейти в каталог
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
