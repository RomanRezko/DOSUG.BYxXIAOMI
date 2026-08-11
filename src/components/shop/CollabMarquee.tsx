import { Fragment } from 'react';
import { products } from '@/data/products';
import { partnerList, partners } from '@/data/partners';
import { DosugSmile } from '@/components/layout/DosugSmile';

/** Статистика каталога для бегущей строки (считается один раз при рендере) */
function buildMessages(): string[] {
  let maxDiscount = 0;
  let maxSaving = 0;
  let minPrice = Infinity;

  for (const p of products) {
    const prices = (p.offers ?? [])
      .filter((o) => partners[o.partnerId])
      .map((o) => o.price);
    const min = prices.length ? Math.min(...prices) : p.price;
    minPrice = Math.min(minPrice, min);
    if (p.oldPrice && p.oldPrice > min) {
      maxDiscount = Math.max(maxDiscount, Math.round((1 - min / p.oldPrice) * 100));
      maxSaving = Math.max(maxSaving, p.oldPrice - min);
    }
  }

  const rub = (v: number) => v.toLocaleString('ru-RU') + ' р.';

  return [
    'DOSUG.BY × XIAOMI',
    `${products.length} товаров Xiaomi в каталоге`,
    `Скидки до −${maxDiscount}%`,
    `Сравниваем цены в ${partnerList.length} магазинах`,
    `Выгода до ${rub(maxSaving)}`,
    `Умная техника от ${rub(minPrice)}`,
    'Только оригинал · гарантия 24 мес.',
  ];
}

function MarqueeRun({ messages }: { messages: string[] }) {
  return (
    <span className="flex items-center">
      {messages.map((m, i) => (
        <Fragment key={i}>
          <span className="text-[13px] font-semibold uppercase tracking-wider whitespace-nowrap">
            {m}
          </span>
          <DosugSmile size={16} color="var(--color-russian-violet)" className="mx-3 shrink-0" />
        </Fragment>
      ))}
    </span>
  );
}

/**
 * Бегущая строка DOSUG.BY × Xiaomi.
 * Оранжевый градиент, замедленная анимация. Сообщения — с реальными цифрами
 * каталога (кол-во товаров, макс. скидка, число магазинов, выгода). Декоративная.
 */
export function CollabMarquee() {
  const messages = buildMessages();
  return (
    <div className="marquee-mask marquee-mask--gradient py-2.5 text-white" aria-hidden="true">
      <div className="marquee">
        {Array.from({ length: 2 }).map((_, half) => (
          <span key={half} className="flex items-center">
            {Array.from({ length: 3 }).map((__, r) => (
              <MarqueeRun key={r} messages={messages} />
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
