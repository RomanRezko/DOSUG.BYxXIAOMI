import type { Product } from '@/types';
import { productDetails } from '@/data/productDetails';

export interface Spec {
  label: string;
  value: string;
}

/** Диагональ из названия (напр. 43" / 23.8"), если есть */
function diagonal(name: string): string | null {
  const m = name.match(/(\d{2}(?:\.\d)?)"/);
  return m ? `${m[1]}"` : null;
}

/** Память из названия (напр. 8/256GB) */
function memory(name: string): { ram?: string; rom?: string } {
  const m = name.match(/(\d+)\/(\d+)\s?GB/i);
  return m ? { ram: `${m[1]} ГБ`, rom: `${m[2]} ГБ` } : {};
}

/**
 * Характеристики товара — по категории, с подстановкой из названия.
 * Демо-данные для тестовой страницы товара.
 */
export function getSpecs(product: Product): Spec[] {
  const real = productDetails[product.slug]?.specs;
  if (real && real.length) return real;

  const common: Spec[] = [
    { label: 'Бренд', value: product.brand },
    { label: 'Гарантия', value: '24 месяца' },
    { label: 'Страна бренда', value: 'Китай' },
  ];

  const byCategory: Record<string, Spec[]> = {
    tv: [
      { label: 'Диагональ', value: diagonal(product.name) ?? '—' },
      { label: 'Разрешение', value: '4K Ultra HD (3840×2160)' },
      { label: 'Операционная система', value: 'Google TV' },
      { label: 'Частота обновления', value: '60 Гц' },
      { label: 'HDR', value: 'HDR10, HLG' },
      { label: 'Wi-Fi / Bluetooth', value: 'есть / есть' },
    ],
    phone: [
      { label: 'Экран', value: '6.7" AMOLED, 120 Гц' },
      { label: 'Оперативная память', value: memory(product.name).ram ?? '8 ГБ' },
      { label: 'Встроенная память', value: memory(product.name).rom ?? '256 ГБ' },
      { label: 'Основная камера', value: '108 Мп' },
      { label: 'Аккумулятор', value: '5000 мА·ч' },
      { label: 'Операционная система', value: 'Android' },
    ],
    tablet: [
      { label: 'Экран', value: '11" IPS, 90 Гц' },
      { label: 'Оперативная память', value: memory(product.name).ram ?? '6 ГБ' },
      { label: 'Встроенная память', value: memory(product.name).rom ?? '128 ГБ' },
      { label: 'Аккумулятор', value: '8000 мА·ч' },
      { label: 'Операционная система', value: 'Android' },
    ],
    robot: [
      { label: 'Тип', value: 'Робот-пылесос' },
      { label: 'Мощность всасывания', value: 'до 5000 Па' },
      { label: 'Время работы', value: 'до 180 мин' },
      { label: 'Пылесборник', value: '0.4 л' },
      { label: 'Влажная уборка', value: 'да' },
      { label: 'Управление', value: 'приложение Mi Home, голос' },
      { label: 'Навигация', value: 'лазерный лидар (LDS)' },
    ],
    vacuum: [
      { label: 'Тип', value: 'Вертикальный пылесос' },
      { label: 'Мощность всасывания', value: 'до 25 000 Па' },
      { label: 'Время работы', value: 'до 60 мин' },
      { label: 'Пылесборник', value: '0.6 л' },
      { label: 'Фильтр', value: 'HEPA' },
      { label: 'Управление', value: 'кнопочное' },
    ],
    kitchen: [
      { label: 'Объём', value: '6.5 л' },
      { label: 'Мощность', value: '1800 Вт' },
      { label: 'Управление', value: 'сенсорное + приложение' },
      { label: 'Программы', value: '11 автопрограмм' },
      { label: 'Диапазон температур', value: '40–200 °C' },
      { label: 'Таймер', value: 'до 24 ч' },
    ],
    home: [
      { label: 'Тип', value: 'Умное устройство для дома' },
      { label: 'Питание', value: 'встроенный аккумулятор' },
      { label: 'Управление', value: 'приложение Mi Home' },
      { label: 'Материал корпуса', value: 'пластик, стекло' },
    ],
    monitor: [
      { label: 'Диагональ', value: diagonal(product.name) ?? '23.8"' },
      { label: 'Разрешение', value: 'Full HD (1920×1080)' },
      { label: 'Матрица', value: 'IPS' },
      { label: 'Частота обновления', value: '100 Гц' },
      { label: 'Порты', value: 'HDMI, VGA' },
    ],
  };

  return [...(byCategory[product.categorySlug] ?? []), ...common];
}

/** Короткое описание товара — по категории. */
export function getDescription(product: Product): string {
  const real = productDetails[product.slug]?.description;
  if (real) return real;

  const intro: Record<string, string> = {
    tv: 'Большой экран с насыщенными цветами и умной ТВ-платформой — фильмы, сериалы и стриминг в одном устройстве.',
    phone: 'Производительный смартфон с ярким AMOLED-экраном, ёмким аккумулятором и качественной камерой на каждый день.',
    tablet: 'Лёгкий планшет для учёбы, работы и развлечений — большой экран и автономность на весь день.',
    vacuum: 'Умная уборка без вашего участия: пылесос строит карту помещения и сам возвращается на базу.',
    kitchen: 'Готовит вкусно и без лишнего масла — быстрые автопрограммы и точный контроль температуры.',
    home: 'Полезный гаджет для дома, который экономит время и делает быт комфортнее.',
    monitor: 'Чёткое изображение и высокая частота обновления — комфортно для работы и игр.',
  };
  return `${product.name} — ${intro[product.categorySlug] ?? 'умное устройство Xiaomi для дома.'} Официальная продукция ${product.brand} с гарантией и поддержкой в Беларуси. Сравните цены в магазинах-партнёрах и выберите выгодное предложение.`;
}

/** Фирменные фоны для «фотографий» галереи (эмодзи-плейсхолдеры). */
export function getGalleryBackgrounds(categorySlug: string): string[] {
  const base: Record<string, string> = {
    tv: 'var(--color-mauve)',
    phone: 'rgba(182, 255, 97, 0.35)',
    tablet: 'rgba(182, 255, 97, 0.35)',
    vacuum: 'rgba(128, 18, 255, 0.10)',
    kitchen: 'rgba(233, 114, 76, 0.16)',
    home: 'var(--color-mauve)',
    monitor: 'rgba(67, 146, 241, 0.16)',
  };
  const b = base[categorySlug] ?? 'var(--color-mauve)';
  return [
    b,
    'rgba(128, 18, 255, 0.08)',
    'rgba(255, 105, 0, 0.10)',
    'rgba(182, 255, 97, 0.28)',
  ];
}
