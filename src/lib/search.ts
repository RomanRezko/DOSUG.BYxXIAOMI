import type { Product } from '@/types';
import { productDetails } from '@/data/productDetails';

/** Нормализация: нижний регистр, ё→е, схлопнуть пробелы */
export function normalize(s: string): string {
  return s.toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ').trim();
}

/** «Стог» для поиска по товару: название, категория, бренд, артикул, код */
function haystack(p: Product): string {
  const d = productDetails[p.slug];
  return normalize(
    [p.name, p.category, p.brand, d?.article ?? '', d?.code ?? '', p.id].join(' '),
  );
}

/** Товар подходит, если каждое слово запроса встречается в «стоге» */
export function matchesQuery(p: Product, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;
  const hay = haystack(p);
  return q.split(' ').every((tok) => hay.includes(tok));
}

/** Отфильтровать и (опционально) ограничить число результатов */
export function searchProducts(
  list: Product[],
  query: string,
  limit = Infinity,
): Product[] {
  const q = normalize(query);
  if (!q) return [];
  const res = list.filter((p) => matchesQuery(p, q));
  return limit === Infinity ? res : res.slice(0, limit);
}

/** Минимальная цена товара по офферам */
export function minPriceOf(p: Product): number {
  const prices = (p.offers ?? []).map((o) => o.price);
  return prices.length ? Math.min(...prices) : p.price;
}
