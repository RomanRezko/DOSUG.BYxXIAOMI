'use client';

import { useEffect } from 'react';

/**
 * Каталог переехал на главную. Старый адрес /tovary — клиентский редирект на /
 * (серверный redirect() несовместим со статическим экспортом).
 */
export default function TovaryRedirectPage() {
  useEffect(() => {
    window.location.replace('/');
  }, []);
  return null;
}
