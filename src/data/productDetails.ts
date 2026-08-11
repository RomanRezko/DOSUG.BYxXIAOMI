import type { Spec } from '@/lib/productContent';

export interface ProductDetails {
  /** Реальные фото товара (пути в /public) */
  images?: string[];
  /** Артикул производителя */
  article?: string;
  /** Код товара */
  code?: string;
  country?: string;
  description?: string;
  /** Реальные характеристики (переопределяют сгенерированные) */
  specs?: Spec[];
  /** Комплектация */
  includes?: string[];
  warrantyMonths?: number;
  /** Бонусные баллы за покупку */
  bonusPoints?: number;
  /** Рассрочка, руб./мес */
  installmentMonthly?: number;
  availability?: 'in_stock' | 'order' | 'out';
}

/**
 * Расширенные данные по конкретным товарам (по slug).
 * Реальные данные робота-пылесоса S40 EU взяты с карточки 21vek.by.
 * У остальных товаров используются сгенерированные характеристики.
 */
export const productDetails: Record<string, ProductDetails> = {
  'robotvacuums40eubhr084aeu_xiaomi_10013612': {
    images: [
      '/products/s40/m1.jpg',
      '/products/s40/m2.jpg',
      '/products/s40/m3.jpg',
      '/products/s40/m4.jpg',
      '/products/s40/m5.jpg',
    ],
    article: 'BHR084AEU',
    code: '10013612',
    country: 'Китай',
    description:
      'Робот-пылесос Xiaomi Robot Vacuum S40 EU — мощная сухая и влажная уборка с лазерной навигацией. ' +
      'Сила всасывания до 10 000 Па легко собирает пыль, шерсть и мусор с ковров и твёрдых полов, а лазерный ' +
      'лидар (LDS) строит точную карту помещения и планирует маршрут без пропусков. Ёмкий аккумулятор на ' +
      '5200 мА·ч обеспечивает до 180 минут работы, а датчики лестниц и виртуальные стены не дают пылесосу ' +
      'упасть или заехать в запретную зону. Управляйте уборкой из приложения или голосом через Google Home ' +
      'и Amazon Alexa, настраивайте расписание и мощность под каждую комнату.',
    specs: [
      { label: 'Тип', value: 'Робот-пылесос' },
      { label: 'Цвет', value: 'белый' },
      { label: 'Сила всасывания', value: '10 000 Па' },
      { label: 'Номинальная мощность', value: '70 Вт' },
      { label: 'Навигация', value: 'лазерная (LDS)' },
      { label: 'Построение карты', value: 'да' },
      { label: 'Влажная уборка', value: 'да (протирка, полировка)' },
      { label: 'Пылесборник', value: '520 мл' },
      { label: 'Резервуар для воды', value: '270 мл' },
      { label: 'Аккумулятор', value: '5200 мА·ч, 14.4 В' },
      { label: 'Время работы', value: 'до 180 мин' },
      { label: 'Датчик лестниц', value: 'есть' },
      { label: 'Виртуальная стена', value: 'есть' },
      { label: 'Управление', value: 'приложение, голос (Google Home, Alexa)' },
      { label: 'Уборка по расписанию', value: 'есть' },
      { label: 'Преодолеваемый порог', value: 'до 20 мм' },
      { label: 'Диаметр / высота', value: '340 / 98 мм' },
      { label: 'Вес', value: '4120 г' },
      { label: 'Габариты базы', value: '130 × 121 × 95 мм' },
    ],
    includes: [
      'Робот-пылесос',
      'Док-станция для зарядки',
      'Боковая щётка',
      'Салфетка для влажной уборки',
      'Адаптер питания',
      'Инструкция и гарантийный талон',
    ],
    warrantyMonths: 12,
    bonusPoints: 27,
    installmentMonthly: 64.92,
    availability: 'in_stock',
  },
};
