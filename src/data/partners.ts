import { Partner } from '@/types';

/**
 * Партнёрские магазины-ритейлеры (Беларусь).
 * logo — путь к реальному логотипу в /public/partners.
 * color — приблизительный фирменный цвет (для акцентов).
 */
export const partners: Record<string, Partner> = {
  mts: { id: 'mts', name: 'МТС', color: '#E4002B', homepage: 'https://shop.mts.by', logo: '/partners/mts.png' },
  vek21: { id: 'vek21', name: '21vek', color: '#B10DC9', homepage: 'https://www.21vek.by', logo: '/partners/21vek.png' },
  a1: { id: 'a1', name: 'A1', color: '#ED1C24', homepage: 'https://shop.a1.by', logo: '/partners/a1.png' },
  e5: { id: 'e5', name: '5 элемент', color: '#E2231A', homepage: 'https://www.5element.by', logo: '/partners/e5.png' },
  xistore: { id: 'xistore', name: 'Xistore', color: '#FF6900', homepage: 'https://xistore.by', logo: '/partners/xistore.png' },
  nasvyazi: { id: 'nasvyazi', name: 'На связи', color: '#F26722', homepage: 'https://nasvyazi.by', logo: '/partners/nasvyazi.png' },
  beltelecom: { id: 'beltelecom', name: 'Белтелеком', color: '#6C3FA0', homepage: 'https://shop.beltelecom.by', logo: '/partners/beltelecom.png' },
  portativ: { id: 'portativ', name: 'Портатив', color: '#F7941E', homepage: 'https://portativ.by', logo: '/partners/portativ.png' },
  elektrosila: { id: 'elektrosila', name: 'Электросила', color: '#E31E24', homepage: 'https://elektrosila.by', logo: '/partners/elektrosila.png' },
};

export const partnerList: Partner[] = Object.values(partners);
