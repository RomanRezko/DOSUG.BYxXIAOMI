import { redirect } from 'next/navigation';

/**
 * Сайт работает как поддомен-каталог Xiaomi: главная страница — /tovary.
 * Корень перенаправляет на каталог.
 */
export default function HomePage() {
  redirect('/tovary');
}
