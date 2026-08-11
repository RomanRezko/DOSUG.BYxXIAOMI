import Link from 'next/link';
import { DosugLogo } from '@/components/layout/DosugLogo';
import { MiLogo } from '@/components/shop/MiLogo';

const MAIN_SITE = 'https://dosug.by';

export function Footer() {
  return (
    <footer className="bg-[#120D31] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#8012FF] opacity-10 blur-[120px]" />

      <div className="container relative z-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo + description + social */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4" aria-label="DOSUG.BY × Xiaomi">
              <DosugLogo height={22} />
              <span className="text-white/35 text-[18px] leading-none" aria-hidden="true">×</span>
              <MiLogo size={26} />
            </Link>
            <p className="text-[15px] text-white/60 mb-6 leading-relaxed max-w-xs">
              Каталог умной техники Xiaomi со сравнением цен в магазинах-партнёрах.
              Спецпроект DOSUG.BY × Xiaomi.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://t.me/dosugby"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#8012FF] transition-colors"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.198-.054-.308-.346-.11l-6.4 4.02-2.76-.918c-.6-.187-.612-.6.125-.89l10.782-4.156c.5-.18.94.12.78.89z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/dosugby"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#8012FF] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Каталог */}
          <div>
            <h3 className="text-[14px] font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Каталог
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tovary#catalog" className="text-[14px] text-white/60 hover:text-[#B6FF61] transition-colors">
                  Все товары
                </Link>
              </li>
              <li>
                <Link href="/tovary" className="text-[14px] text-white/60 hover:text-[#B6FF61] transition-colors">
                  Спецпредложения Xiaomi
                </Link>
              </li>
              <li>
                <a href={MAIN_SITE} className="text-[14px] text-white/60 hover:text-[#B6FF61] transition-colors">
                  Вернуться на сайт
                </a>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-[14px] font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Контакты
            </h3>
            <div className="space-y-2">
              <a href="mailto:info@dosug.by" className="block text-[14px] text-[#B6FF61] hover:underline">
                info@dosug.by
              </a>
              <a href="mailto:reklama@dosug.by" className="block text-[14px] text-[#B6FF61] hover:underline">
                reklama@dosug.by
              </a>
            </div>
            <div className="mt-5 text-[13px] text-white/50 leading-relaxed">
              <p>ИП Резько Роман Николаевич</p>
              <p>УНП: 291573618</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-white/40 leading-relaxed">
            <p>© {new Date().getFullYear()} DOSUG.BY × Xiaomi — все права защищены</p>
            <p>Цены и наличие уточняйте в магазинах-партнёрах</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
