export interface Venue {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  subcategorySlug: string;
  description: string;
  address: string;
  city: string;
  district?: string;
  metro?: string;
  latitude: number;
  longitude: number;
  phones: string[];
  website?: string;
  email?: string;
  workingHours: Record<string, string>;
  cuisines?: string[];
  features: string[];
  priceRange?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  legalInfo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface News {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  categorySlug: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  venue: string;
  address: string;
  startDate: string;
  endDate?: string;
  price?: string;
  ageRestriction?: string;
  category: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  parentSlug?: string;
  icon?: string;
  count?: number;
}

export interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

/** Партнёрский магазин-ритейлер */
export interface Partner {
  id: string;
  /** Название магазина (для alt/aria) */
  name: string;
  /** Фирменный цвет партнёра (HEX) */
  color: string;
  /** Домашняя страница магазина */
  homepage: string;
  /** Путь к логотипу в /public */
  logo: string;
}

/** Оффер: товар продаётся у конкретного партнёра по цене и ссылке */
export interface PartnerOffer {
  partnerId: string;
  /** Прямая ссылка на товар в магазине партнёра */
  url: string;
  /** Цена товара в этом магазине, BYN */
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  /** Эмодзи-иконка для брендового плейсхолдера */
  emoji: string;
  /** Реальные фото товара (пути в /public) */
  images?: string[];
  /** Актуальная цена, BYN */
  price: number;
  /** Старая цена до скидки, BYN */
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  /** Товар в наличии */
  inStock: boolean;
  /** Метка «Хит», «Новинка» и т.п. */
  badge?: string;
  /** Магазины-партнёры, где продаётся товар */
  offers?: PartnerOffer[];
}
