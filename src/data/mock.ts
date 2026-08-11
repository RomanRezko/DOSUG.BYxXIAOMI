import { Venue, News, Event, Category, MenuItem } from '@/types';

export const categories: Category[] = [
  { id: '1', slug: 'eda', name: 'Еда', icon: '🍽️' },
  { id: '2', slug: 'razvlecheniya', name: 'Развлечения', icon: '🎭' },
  { id: '3', slug: 'aktivnyj-otdyh', name: 'Активный отдых', icon: '🏃' },
  { id: '4', slug: 'krasota-i-zdorove', name: 'Красота и здоровье', icon: '💆' },
];

export const subcategories: Category[] = [
  { id: '11', slug: 'restoranyi', name: 'Рестораны', parentSlug: 'eda', count: 59 },
  { id: '12', slug: 'kafe', name: 'Кафе', parentSlug: 'eda', count: 124 },
  { id: '13', slug: 'bary', name: 'Бары', parentSlug: 'eda', count: 87 },
  { id: '14', slug: 'sushi-bary', name: 'Суши-бары', parentSlug: 'eda', count: 34 },
  { id: '15', slug: 'piczeriji', name: 'Пиццерии', parentSlug: 'eda', count: 45 },
  { id: '21', slug: 'kinoteatry', name: 'Кинотеатры', parentSlug: 'razvlecheniya', count: 12 },
  { id: '22', slug: 'teatry', name: 'Театры', parentSlug: 'razvlecheniya', count: 8 },
  { id: '23', slug: 'kluby', name: 'Ночные клубы', parentSlug: 'razvlecheniya', count: 23 },
];

export const menuItems: MenuItem[] = [
  { label: 'Новости', href: '/news' },
  {
    label: 'Каталог заведений',
    href: '/katalog',
    children: [
      {
        label: 'Еда',
        href: '/katalog/eda',
        children: [
          { label: 'Рестораны', href: '/katalog/eda/restoranyi' },
          { label: 'Кафе', href: '/katalog/eda/kafe' },
          { label: 'Бары', href: '/katalog/eda/bary' },
          { label: 'Суши-бары', href: '/katalog/eda/sushi-bary' },
        ],
      },
      {
        label: 'Развлечения',
        href: '/katalog/razvlecheniya',
        children: [
          { label: 'Кинотеатры', href: '/katalog/razvlecheniya/kinoteatry' },
          { label: 'Театры', href: '/katalog/razvlecheniya/teatry' },
          { label: 'Ночные клубы', href: '/katalog/razvlecheniya/kluby' },
        ],
      },
    ],
  },
  { label: 'Афиша', href: '/afisha' },
];

export const venues: Venue[] = [
  {
    id: '1',
    slug: 'kompaniya',
    name: 'Компания',
    category: 'Еда',
    categorySlug: 'eda',
    subcategory: 'Рестораны',
    subcategorySlug: 'restoranyi',
    description: 'Ресторан современной славянской кухни «Компания» — это место, где можно насладиться высоким уровнем обслуживания и вкусной едой. Заведение предлагает блюда авторской, русской и европейской кухни, приготовленные из свежих продуктов по уникальным рецептам шеф-повара.',
    address: 'ул. Октябрьская, 19',
    city: 'Минск',
    district: 'Центральный',
    metro: 'Немига',
    latitude: 53.9045,
    longitude: 27.5535,
    phones: ['+375 (44) 553-77-00', '+375 (29) 553-77-00'],
    website: 'kompaniya.by',
    workingHours: {
      mon: '12:00 - 00:00',
      tue: '12:00 - 00:00',
      wed: '12:00 - 00:00',
      thu: '12:00 - 00:00',
      fri: '12:00 - 02:00',
      sat: '12:00 - 02:00',
      sun: '12:00 - 00:00',
    },
    cuisines: ['Авторская', 'Русская', 'Европейская'],
    features: ['Живая музыка', 'Бар', 'Банкеты', 'Танцпол', 'Летняя веранда', 'Wi-Fi'],
    priceRange: 3,
    rating: 4.4,
    reviewCount: 127,
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    ],
    legalInfo: 'ООО «Вкусинвест» УНП: 193601460',
    createdAt: '2024-01-15',
    updatedAt: '2026-01-27',
  },
  {
    id: '2',
    slug: 'neft',
    name: 'NEFT',
    category: 'Еда',
    categorySlug: 'eda',
    subcategory: 'Рестораны',
    subcategorySlug: 'restoranyi',
    description: 'NEFT — современный ресторан в самом сердце Минска. Уникальная атмосфера, авторская кухня и широкий выбор напитков. Идеальное место для деловых встреч и романтических ужинов.',
    address: 'ул. Аранская, 8',
    city: 'Минск',
    district: 'Центральный',
    latitude: 53.9012,
    longitude: 27.5489,
    phones: ['+375 (29) 123-45-67'],
    website: 'neftminsk.by',
    workingHours: {
      mon: 'Круглосуточно',
      tue: 'Круглосуточно',
      wed: 'Круглосуточно',
      thu: 'Круглосуточно',
      fri: 'Круглосуточно',
      sat: 'Круглосуточно',
      sun: 'Круглосуточно',
    },
    cuisines: ['Европейская', 'Авторская'],
    features: ['Живая музыка', 'Бар', 'Банкеты', 'Парковка', 'Wi-Fi'],
    priceRange: 4,
    rating: 4.7,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
    ],
    legalInfo: 'ООО «НЕФТ» УНП: 192456789',
    createdAt: '2024-02-10',
    updatedAt: '2026-01-25',
  },
  {
    id: '3',
    slug: 'sorrento',
    name: 'Сорренто',
    category: 'Еда',
    categorySlug: 'eda',
    subcategory: 'Рестораны',
    subcategorySlug: 'restoranyi',
    description: 'Итальянский ресторан «Сорренто» предлагает гостям окунуться в атмосферу солнечной Италии. Пицца из дровяной печи, свежая паста и изысканные вина.',
    address: 'пр-т Независимости, 58',
    city: 'Минск',
    district: 'Советский',
    metro: 'Площадь Якуба Коласа',
    latitude: 53.9156,
    longitude: 27.5867,
    phones: ['+375 (17) 234-56-78'],
    website: 'sorrento.by',
    workingHours: {
      mon: '11:00 - 23:00',
      tue: '11:00 - 23:00',
      wed: '11:00 - 23:00',
      thu: '11:00 - 23:00',
      fri: '11:00 - 00:00',
      sat: '11:00 - 00:00',
      sun: '11:00 - 23:00',
    },
    cuisines: ['Итальянская'],
    features: ['Детская комната', 'Летняя веранда', 'Wi-Fi', 'Банкеты'],
    priceRange: 3,
    rating: 4.5,
    reviewCount: 203,
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800',
    ],
    createdAt: '2024-03-01',
    updatedAt: '2026-01-20',
  },
  {
    id: '4',
    slug: 'brasserie',
    name: 'Brasserie',
    category: 'Еда',
    categorySlug: 'eda',
    subcategory: 'Рестораны',
    subcategorySlug: 'restoranyi',
    description: 'Французская брассери в центре Минска. Классические французские блюда, отличное вино и уютная атмосфера парижского кафе.',
    address: 'ул. Карла Маркса, 10',
    city: 'Минск',
    district: 'Центральный',
    metro: 'Площадь Ленина',
    latitude: 53.8967,
    longitude: 27.5505,
    phones: ['+375 (29) 876-54-32'],
    workingHours: {
      mon: '10:00 - 22:00',
      tue: '10:00 - 22:00',
      wed: '10:00 - 22:00',
      thu: '10:00 - 22:00',
      fri: '10:00 - 23:00',
      sat: '10:00 - 23:00',
      sun: '10:00 - 22:00',
    },
    cuisines: ['Французская', 'Европейская'],
    features: ['Завтраки', 'Wi-Fi', 'Летняя веранда'],
    priceRange: 3,
    rating: 4.3,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800',
    ],
    createdAt: '2024-01-20',
    updatedAt: '2026-01-18',
  },
  {
    id: '5',
    slug: 'vasilki',
    name: 'Васильки',
    category: 'Еда',
    categorySlug: 'eda',
    subcategory: 'Рестораны',
    subcategorySlug: 'restoranyi',
    description: 'Сеть ресторанов белорусской кухни «Васильки». Традиционные драники, мачанка, колдуны и другие национальные блюда в современном исполнении.',
    address: 'пр-т Победителей, 17',
    city: 'Минск',
    district: 'Центральный',
    metro: 'Немига',
    latitude: 53.9089,
    longitude: 27.5423,
    phones: ['+375 (17) 203-94-94'],
    website: 'vasilki.by',
    workingHours: {
      mon: '09:00 - 23:00',
      tue: '09:00 - 23:00',
      wed: '09:00 - 23:00',
      thu: '09:00 - 23:00',
      fri: '09:00 - 00:00',
      sat: '09:00 - 00:00',
      sun: '09:00 - 23:00',
    },
    cuisines: ['Белорусская'],
    features: ['Детское меню', 'Wi-Fi', 'Парковка', 'Банкеты'],
    priceRange: 2,
    rating: 4.6,
    reviewCount: 412,
    images: [
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
    ],
    createdAt: '2023-12-01',
    updatedAt: '2026-01-28',
  },
  {
    id: '6',
    slug: 'pena-dnej',
    name: 'Пена Дней',
    category: 'Еда',
    categorySlug: 'eda',
    subcategory: 'Рестораны',
    subcategorySlug: 'restoranyi',
    description: 'Гастропаб «Пена Дней» — место для ценителей крафтового пива и качественной кухни. Авторские бургеры, стейки и большой выбор пенного.',
    address: 'ул. Зыбицкая, 6',
    city: 'Минск',
    district: 'Центральный',
    metro: 'Немига',
    latitude: 53.9023,
    longitude: 27.5567,
    phones: ['+375 (44) 777-88-99'],
    workingHours: {
      mon: '12:00 - 02:00',
      tue: '12:00 - 02:00',
      wed: '12:00 - 02:00',
      thu: '12:00 - 02:00',
      fri: '12:00 - 04:00',
      sat: '12:00 - 04:00',
      sun: '12:00 - 02:00',
    },
    cuisines: ['Авторская', 'Американская'],
    features: ['Крафтовое пиво', 'Спортивные трансляции', 'Wi-Fi'],
    priceRange: 2,
    rating: 4.8,
    reviewCount: 278,
    images: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
    ],
    createdAt: '2024-04-15',
    updatedAt: '2026-01-26',
  },
];

export const news: News[] = [
  {
    id: '1',
    slug: 'flydubai-vozvraschartsya-v-minsk-s-1-fevralya-regulyarnye-reysy-v-dubai',
    title: 'FlyDubai возвращается в Минск: с 1 февраля — регулярные рейсы в Дубай',
    excerpt: 'Авиакомпания FlyDubai возобновляет регулярное авиасообщение между Минском и Дубаем. Рейсы будут выполняться 4 раза в неделю.',
    content: `
      <p>Авиакомпания FlyDubai возобновляет регулярное авиасообщение между Минском и Дубаем с 1 февраля 2026 года. Рейсы будут выполняться 4 раза в неделю: по понедельникам, средам, пятницам и воскресеньям.</p>

      <p>Вылет из Минска запланирован на 23:55, прибытие в Дубай — в 06:25 по местному времени. Обратный рейс отправляется из Дубая в 18:40 и прибывает в Минск в 23:25.</p>

      <h2>Детали рейса</h2>
      <ul>
        <li>Номер рейса: FZ 724/725</li>
        <li>Тип воздушного судна: Boeing 737 MAX 8</li>
        <li>Время в пути: примерно 5 часов 30 минут</li>
      </ul>

      <p>Билеты уже доступны для бронирования на официальном сайте авиакомпании и у туристических агентств.</p>
    `,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    category: 'Путешествия',
    categorySlug: 'puteshestviya',
    tags: ['авиа', 'Дубай', 'FlyDubai'],
    author: 'Dosug.by',
    publishedAt: '2026-01-30',
    updatedAt: '2026-01-30',
  },
  {
    id: '2',
    slug: 'v-minske-otkroetsya-restoran-sorrento',
    title: 'В Минске откроется ресторан «Сорренто» от кулинарного альянса',
    excerpt: 'Новый итальянский ресторан откроется в центре города уже в феврале. Гостей ждет авторская кухня и уникальный интерьер.',
    content: `
      <p>В феврале 2026 года в Минске откроется новый итальянский ресторан «Сорренто» от известного кулинарного альянса. Заведение расположится на проспекте Независимости.</p>

      <p>Ресторан предложит гостям блюда традиционной итальянской кухни: пиццу из дровяной печи, свежую пасту ручной работы, ризотто и изысканные десерты.</p>
    `,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    category: 'Рестораны',
    categorySlug: 'restoranyi',
    tags: ['открытие', 'рестораны', 'итальянская кухня'],
    author: 'Dosug.by',
    publishedAt: '2026-01-27',
    updatedAt: '2026-01-27',
  },
  {
    id: '3',
    slug: 'novogodniye-yarmarki-minska-2026',
    title: 'Новогодние ярмарки Минска: где погулять в праздники',
    excerpt: 'Собрали лучшие новогодние локации столицы: от классических ярмарок до новых арт-пространств.',
    content: `
      <p>Новогодние праздники — отличный повод выбраться на прогулку по Минску и посетить праздничные ярмарки.</p>
    `,
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=800',
    category: 'События',
    categorySlug: 'sobytiya',
    tags: ['Новый год', 'ярмарки', 'праздники'],
    author: 'Dosug.by',
    publishedAt: '2026-01-25',
    updatedAt: '2026-01-25',
  },
  {
    id: '4',
    slug: 'top-10-kvizov-minska',
    title: 'ТОП-10 квизов Минска: где проверить свои знания',
    excerpt: 'Интеллектуальные игры набирают популярность. Рассказываем о лучших квизах столицы.',
    content: `
      <p>Квизы стали одним из самых популярных видов досуга в Минске.</p>
    `,
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800',
    category: 'Развлечения',
    categorySlug: 'razvlecheniya',
    tags: ['квизы', 'развлечения', 'ТОП'],
    author: 'Dosug.by',
    publishedAt: '2026-01-22',
    updatedAt: '2026-01-22',
  },
];

export const events: Event[] = [
  {
    id: '1',
    slug: 'koncert-bi-2',
    title: 'Концерт группы Би-2',
    description: 'Легендарная российская рок-группа с программой лучших хитов',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    venue: 'Минск-Арена',
    address: 'пр-т Победителей, 111',
    startDate: '2026-02-15T19:00:00',
    price: 'от 50 BYN',
    ageRestriction: '16+',
    category: 'Концерты',
  },
  {
    id: '2',
    slug: 'balet-lebedinoe-ozero',
    title: 'Балет «Лебединое озеро»',
    description: 'Классический балет П.И. Чайковского в исполнении Большого театра Беларуси',
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800',
    venue: 'Большой театр',
    address: 'пл. Парижской Коммуны, 1',
    startDate: '2026-02-10T18:30:00',
    price: 'от 30 BYN',
    ageRestriction: '6+',
    category: 'Театр',
  },
  {
    id: '3',
    slug: 'film-avatar-3',
    title: 'Аватар 3',
    description: 'Продолжение эпической саги Джеймса Кэмерона',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
    venue: 'Silver Screen',
    address: 'пр-т Дзержинского, 104',
    startDate: '2026-02-01T10:00:00',
    price: 'от 15 BYN',
    ageRestriction: '12+',
    category: 'Кино',
  },
];

export function getVenueBySlug(slug: string): Venue | undefined {
  return venues.find(v => v.slug === slug);
}

export function getVenuesByCategory(categorySlug: string, subcategorySlug?: string): Venue[] {
  return venues.filter(v => {
    if (subcategorySlug) {
      return v.categorySlug === categorySlug && v.subcategorySlug === subcategorySlug;
    }
    return v.categorySlug === categorySlug;
  });
}

export function getNewsBySlug(slug: string): News | undefined {
  return news.find(n => n.slug === slug);
}

export function getLatestNews(limit: number = 4): News[] {
  return [...news].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, limit);
}

export function getLatestEvents(limit: number = 3): Event[] {
  return [...events].sort((a, b) =>
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  ).slice(0, limit);
}
