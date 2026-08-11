'use client';

import Link from 'next/link';
import { useState } from 'react';
import { DosugLogo } from '@/components/layout/DosugLogo';
import { MiLogo } from '@/components/shop/MiLogo';

const MAIN_SITE = 'https://dosug.by';

function BackArrow() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m0 0l7 7m-7-7l7-7" />
    </svg>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#120D31] sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 py-4"
            aria-label="DOSUG.BY × Xiaomi — на главную"
          >
            <DosugLogo height={22} />
            <span className="text-white/35 text-[18px] leading-none" aria-hidden="true">×</span>
            <MiLogo size={26} />
          </Link>

          {/* Центр: Вернуться на dosug.by — рамка, прозрачная заливка */}
          <a
            href={MAIN_SITE}
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 hover:border-[#B6FF61] bg-transparent text-white/80 hover:text-[#B6FF61] text-[14px] font-semibold rounded-full transition-colors"
          >
            <BackArrow />
            Вернуться на dosug.by
          </a>

          {/* Правая часть: поиск + соцсети + Каталог */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-[#B6FF61] hover:bg-[#8012FF]/20 transition-colors"
              aria-label="Поиск"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <div className="flex items-center gap-1">
              <a
                href="https://t.me/dosugby"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-[#B6FF61] hover:bg-[#8012FF]/20 transition-colors"
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
                className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-[#B6FF61] hover:bg-[#8012FF]/20 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>

            {/* Каталог → якорь на каталог главной */}
            <Link
              href="/tovary#catalog"
              className="ml-2 px-5 py-2.5 bg-[#B6FF61] hover:bg-[#a8f050] text-[#120D31] text-[14px] font-semibold rounded-full transition-all hover:scale-105"
            >
              Каталог
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-[#8012FF]/20 transition-colors"
            aria-label="Меню"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-[#8012FF]/20 flex flex-col gap-3">
            <Link
              href="/tovary#catalog"
              className="block w-full py-3 bg-[#B6FF61] text-[#120D31] text-center text-[15px] font-semibold rounded-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Каталог
            </Link>
            <a
              href={MAIN_SITE}
              className="flex items-center justify-center gap-2 py-3 border border-white/30 text-white/80 text-[15px] font-semibold rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BackArrow />
              Вернуться на dosug.by
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
