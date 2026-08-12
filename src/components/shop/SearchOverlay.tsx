'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { searchProducts, minPriceOf } from '@/lib/search';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const formatPrice = (v: number) => v.toLocaleString('ru-RU') + ' р.';

/**
 * Глобальный оверлей поиска. Живые подсказки (топ-8 товаров) со ссылками
 * на страницы товаров + переход ко всем результатам на каталоге (/?q=...).
 */
export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Сброс и фокус при открытии
  useEffect(() => {
    if (open) {
      setQ('');
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Esc — закрыть; блокируем прокрутку фона
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const results = useMemo(() => searchProducts(products, q, 8), [q]);
  const total = useMemo(() => (q.trim() ? searchProducts(products, q).length : 0), [q]);

  if (!open) return null;

  const goAll = () => {
    const query = q.trim();
    onClose();
    window.location.href = query
      ? `/?q=${encodeURIComponent(query)}#catalog`
      : '/#catalog';
  };

  return (
    <div className="search-overlay" onMouseDown={onClose}>
      <div className="search-panel" onMouseDown={(e) => e.stopPropagation()}>
        <form
          className="search-bar"
          onSubmit={(e) => {
            e.preventDefault();
            goAll();
          }}
        >
          <svg className="w-5 h-5 shrink-0 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Поиск по товарам Xiaomi…"
            aria-label="Поиск по товарам"
            className="search-bar__input"
          />
          {q && (
            <button type="button" className="search-bar__clear" aria-label="Очистить" onClick={() => { setQ(''); inputRef.current?.focus(); }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button type="button" className="search-bar__cancel" onClick={onClose}>
            Отмена
          </button>
        </form>

        {q.trim() !== '' && (
          <div className="search-results">
            {results.length > 0 ? (
              <>
                <ul className="search-list">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link href={`/tovary/${p.slug}`} className="search-item" onClick={onClose}>
                        <span className="search-item__thumb">
                          {p.images?.[0] ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={p.images[0]} alt="" loading="lazy" />
                          ) : (
                            <span className="text-[20px]">{p.emoji}</span>
                          )}
                        </span>
                        <span className="search-item__body">
                          <span className="search-item__name">{p.name}</span>
                          <span className="search-item__meta">{p.category}</span>
                        </span>
                        <span className="search-item__price">от {formatPrice(minPriceOf(p))}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <button type="button" className="search-more" onClick={goAll}>
                  Показать все результаты ({total})
                </button>
              </>
            ) : (
              <p className="search-empty">
                Ничего не найдено по запросу «{q.trim()}»
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
