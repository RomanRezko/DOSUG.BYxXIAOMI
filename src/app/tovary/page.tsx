import { redirect } from 'next/navigation';

/** Каталог переехал на главную. Старый адрес /tovary — редирект на /. */
export default function TovaryRedirectPage() {
  redirect('/');
}
