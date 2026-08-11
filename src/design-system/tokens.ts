/**
 * DOSUG.BY — Design Tokens
 * Источник: «Гайд по оформлению профиля Instagram» (брендбук DOSUG.BY).
 * Значения синхронизированы с CSS-переменными в src/app/globals.css.
 *
 * Пантоны/RGB/CMYK приведены для печати из брендбука (стр. 3–4).
 */

export const brandColors = {
  /** Основной фирменный фиолетовый. Pantone 2368, RGB 128,18,255, CMYK 68,78,0,0 */
  violet: '#8012FF',
  /** Акцентный лайм. Pantone 374, RGB 182,255,97, CMYK 30,0,84,0 */
  greenYellow: '#B6FF61',
  /** Светло-лиловый (фоны, плашки). Pantone 263, RGB 222,192,241, CMYK 13,26,0,0 */
  mauve: '#DEC0F1',
  /** Тёмно-фиолетовый (текст, тёмные фоны). Pantone 3581, RGB 18,13,49, CMYK 90,90,48,65 */
  russianViolet: '#120D31',
  /** Жжёная сиена (акцент). Pantone 1645, RGB 233,114,76, CMYK 5,69,75,0 */
  burntSienna: '#E9724C',
} as const;

/** Дополнительные цвета — альтернатива основной палитре для разнообразия (стр. 4). */
export const additionalColors = {
  red: '#FF1053',
  blue: '#4392F1',
  orange: '#FCB97D',
  turquoise: '#50C5B7',
  sage: '#629677',
  teal: '#156064',
} as const;

/** Служебные оттенки (не из брендбука) — состояния и нейтральные тона. */
export const neutralColors = {
  violetDark: '#6A0FD6', // hover/pressed для основного фиолетового
  white: '#FFFFFF',
  backgroundAlt: '#F8F6FC',
  textMuted: '#6B6B8D',
} as const;

export const colors = {
  ...brandColors,
  ...additionalColors,
  ...neutralColors,
} as const;

export const fonts = {
  /** Заголовки. Начертания: Regular / Medium / Bold. */
  heading: "'Unbounded', system-ui, sans-serif",
  /**
   * Основной текст. По брендбуку — Random Grotesque Standart
   * (Book / Medium / Semibold / Bold). Random Grotesque — коммерческий
   * шрифт вне Google Fonts, поэтому в вебе используется Inter как замена.
   */
  body: "'Inter', system-ui, sans-serif",
} as const;

/**
 * Типографическая шкала.
 * Брендбук задаёт размеры для Instagram-макета 1080px (H1 128 / H2 96 / H3 72;
 * основной текст 56 / 48; текст в плашках 45–75). Ниже — веб-шкала,
 * сохраняющая те же пропорции и адаптивная через clamp().
 */
export const fontSize = {
  display: 'clamp(48px, 8vw, 96px)',
  h1: 'clamp(32px, 5vw, 56px)',
  h2: 'clamp(24px, 4vw, 40px)',
  h3: 'clamp(20px, 3vw, 28px)',
  h4: 'clamp(16px, 2.5vw, 22px)',
  xl: '22px',
  lg: '18px',
  base: '16px',
  sm: '14px',
  xs: '12px',
} as const;

/** Оригинальные размеры Instagram-макета (1080px), для соцсетей/баннеров. */
export const instagramFontSize = {
  h1: 128,
  h2: 96,
  h3: 72,
  body1: 56,
  body2: 48,
  plashkaMin: 45,
  plashkaMax: 75,
} as const;

/** Небольшая коррекция межбуквенного интервала (брендбук: ± до 2%). */
export const letterSpacing = {
  tight: '-0.02em',
  normal: '0',
} as const;

export const spacing = {
  xs: '8px',
  sm: '16px',
  md: '24px',
  lg: '40px',
  xl: '64px',
  '2xl': '96px',
} as const;

export const radius = {
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  full: '9999px',
} as const;

export const shadow = {
  sm: '0 2px 8px rgba(18, 13, 49, 0.06)',
  md: '0 4px 24px rgba(18, 13, 49, 0.1)',
  lg: '0 8px 48px rgba(18, 13, 49, 0.14)',
} as const;

/**
 * Проверенные контрастные пары «фон → текст» (брендбук стр. 5–6).
 * Использовать для плашек и крупного текста.
 */
export const contrastPairs = [
  { bg: brandColors.violet, text: neutralColors.white },
  { bg: brandColors.violet, text: brandColors.greenYellow },
  { bg: brandColors.greenYellow, text: brandColors.russianViolet },
  { bg: brandColors.greenYellow, text: brandColors.violet },
  { bg: brandColors.mauve, text: brandColors.russianViolet },
  { bg: brandColors.mauve, text: brandColors.violet },
  { bg: brandColors.burntSienna, text: brandColors.russianViolet },
  { bg: brandColors.burntSienna, text: neutralColors.white },
  { bg: additionalColors.red, text: neutralColors.white },
  { bg: additionalColors.red, text: brandColors.greenYellow },
  { bg: additionalColors.blue, text: neutralColors.white },
  { bg: additionalColors.blue, text: brandColors.greenYellow },
  { bg: brandColors.russianViolet, text: neutralColors.white },
  { bg: brandColors.russianViolet, text: brandColors.greenYellow },
  { bg: additionalColors.teal, text: neutralColors.white },
  { bg: additionalColors.teal, text: brandColors.greenYellow },
] as const;

export const tokens = {
  colors,
  fonts,
  fontSize,
  instagramFontSize,
  letterSpacing,
  spacing,
  radius,
  shadow,
  contrastPairs,
} as const;

export default tokens;
