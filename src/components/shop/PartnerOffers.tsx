import type { PartnerOffer } from '@/types';
import { partnerList, partners } from '@/data/partners';
import { DosugSmile } from '@/components/layout/DosugSmile';

interface PartnerOffersProps {
  offers?: PartnerOffer[];
  /** Компактный вид (меньше логотипы и отступы) */
  compact?: boolean;
  /** Заголовок над списком */
  title?: string;
}

function formatPrice(value: number): string {
  return value.toLocaleString('ru-RU') + ' р.';
}

/**
 * Сравнение цен по всем магазинам-партнёрам.
 * Показываются ВСЕ партнёры (столбиком): напротив каждого — его цена и ссылка,
 * либо «нет в наличии». Самая низкая цена подсвечена («выгодно»).
 * Так пользователь сразу оценивает все предложения, а высота карточки
 * всегда одинаковая (число строк постоянно).
 */
export function PartnerOffers({ offers, compact = false, title = 'Цены в магазинах' }: PartnerOffersProps) {
  const byPartner = new Map((offers ?? []).map((o) => [o.partnerId, o]));
  const availablePrices = (offers ?? [])
    .filter((o) => partners[o.partnerId])
    .map((o) => o.price);
  const bestPrice = availablePrices.length ? Math.min(...availablePrices) : null;

  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-muted)] mb-1.5">
        {title}
      </p>
      <ul className={`offer-list${compact ? ' offer-list--compact' : ''}`}>
        {partnerList.map((partner) => {
          const offer = byPartner.get(partner.id);
          const isBest = offer != null && offer.price === bestPrice;

          const logo = (
            <span className={`offer-logo${offer ? '' : ' offer-logo--muted'}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={partner.logo} alt={partner.name} loading="lazy" />
            </span>
          );

          if (!offer) {
            return (
              <li key={partner.id} className="offer-row offer-row--out">
                {logo}
                <span className="offer-mid" />
                <span className="offer-na">нет в наличии</span>
              </li>
            );
          }

          return (
            <li key={partner.id}>
              <a
                href={offer.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={`offer-row offer-row--link${isBest ? ' offer-row--best' : ''}`}
                aria-label={`${partner.name}: ${formatPrice(offer.price)}${isBest ? ', лучшая цена' : ''} — откроется в новой вкладке`}
              >
                {logo}
                <span className="offer-mid">
                  {isBest && (
                    <span className="has-tip" tabIndex={0} aria-label="Лучшая цена">
                      <DosugSmile
                        size={20}
                        color="var(--color-price-best)"
                        eyeColor="#fff"
                        eyeStroke="var(--color-price-best)"
                        eyeStrokeWidth={1.4}
                      />
                      <span className="has-tip__pop" role="tooltip">Лучшая цена</span>
                    </span>
                  )}
                </span>
                <span className="offer-price">{formatPrice(offer.price)}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
