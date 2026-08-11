import Image from 'next/image';
import Link from 'next/link';
import type { Venue } from '@/types';

interface VenueCardProps {
  venue: Venue;
  variant?: 'default' | 'compact' | 'list';
}

function getTodayWorkingHours(workingHours: Record<string, string>): string {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const today = days[new Date().getDay()];
  return workingHours[today] || 'Уточняйте';
}

export function VenueCard({ venue, variant = 'default' }: VenueCardProps) {
  const todayHours = getTodayWorkingHours(venue.workingHours);
  const venueUrl = `/katalog/${venue.categorySlug}/${venue.subcategorySlug}/${venue.slug}`;
  const isOpen = !todayHours.toLowerCase().includes('выходной');

  // Компактный вариант для сайдбара
  if (variant === 'compact') {
    return (
      <Link href={venueUrl} className="block group">
        <article className="flex gap-3 py-3 border-b border-[#f0f0f0] last:border-0">
          <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
            <Image
              src={venue.images[0]}
              alt={venue.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[13px] font-medium text-[#333] leading-tight line-clamp-1 group-hover:text-[#d32f2f] transition-colors">
              {venue.name}
            </h3>
            {venue.rating > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[#f5a623] text-[11px]">★</span>
                <span className="text-[12px] font-medium text-[#333]">{venue.rating.toFixed(1)}</span>
              </div>
            )}
            <p className="text-[11px] text-[#999] mt-1 truncate">{venue.address}</p>
          </div>
        </article>
      </Link>
    );
  }

  // Списочный вид для каталога (как на dosug.by)
  if (variant === 'list') {
    return (
      <Link href={venueUrl} className="block group">
        <article className="card overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="relative w-full sm:w-[180px] h-[140px] sm:h-[160px] flex-shrink-0">
              <Image
                src={venue.images[0]}
                alt={venue.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 180px"
              />
              {venue.cuisines && venue.cuisines.length > 0 && (
                <span className="absolute top-2 left-2 tag tag--small">
                  {venue.cuisines[0]}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold text-[#333] group-hover:text-[#d32f2f] transition-colors line-clamp-1">
                    {venue.name}
                  </h3>
                  <p className="text-[12px] text-[#999] mt-0.5">{venue.subcategory}</p>
                </div>
                {venue.rating > 0 && (
                  <div className="flex items-center gap-1 bg-[#fff8e6] px-2 py-1 rounded flex-shrink-0">
                    <span className="text-[#f5a623] text-sm">★</span>
                    <span className="font-semibold text-[13px] text-[#333]">{venue.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {/* Info rows */}
              <div className="mt-3 space-y-1.5">
                {/* Address */}
                <div className="flex items-center gap-2 text-[12px] text-[#666]">
                  <svg className="w-3.5 h-3.5 text-[#999] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{venue.address}</span>
                </div>

                {/* Working hours */}
                <div className="flex items-center gap-2 text-[12px]">
                  <svg className="w-3.5 h-3.5 text-[#999] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className={isOpen ? 'text-[#4caf50]' : 'text-[#d32f2f]'}>
                    {isOpen ? 'Открыто' : 'Закрыто'}: {todayHours}
                  </span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2 text-[12px] text-[#666]">
                  <svg className="w-3.5 h-3.5 text-[#999] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{venue.phones[0]}</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {venue.features.slice(0, 3).map((feature) => (
                  <span key={feature} className="text-[10px] px-2 py-0.5 bg-[#f5f5f5] text-[#666] rounded">
                    {feature}
                  </span>
                ))}
                {venue.features.length > 3 && (
                  <span className="text-[10px] px-2 py-0.5 bg-[#f5f5f5] text-[#999] rounded">
                    +{venue.features.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Стандартный вид (карточка)
  return (
    <Link href={venueUrl} className="block group">
      <article className="card overflow-hidden">
        <div className="relative h-[160px]">
          <Image
            src={venue.images[0]}
            alt={venue.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {venue.cuisines && venue.cuisines.length > 0 && (
            <span className="absolute top-2 left-2 tag tag--small">
              {venue.cuisines[0]}
            </span>
          )}
          {venue.rating > 0 && (
            <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/60 text-white px-1.5 py-0.5 rounded text-[11px]">
              <span className="text-[#f5a623]">★</span>
              <span className="font-medium">{venue.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="text-[14px] font-medium text-[#333] line-clamp-1 group-hover:text-[#d32f2f] transition-colors">
            {venue.name}
          </h3>

          <div className="flex items-center gap-1.5 mt-2 text-[12px] text-[#666]">
            <svg className="w-3.5 h-3.5 text-[#999]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{venue.address}</span>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#f0f0f0]">
            <span className={`text-[11px] ${isOpen ? 'text-[#4caf50]' : 'text-[#d32f2f]'}`}>
              {isOpen ? 'Открыто' : 'Закрыто'}
            </span>
            <span className="text-[11px] text-[#999]">{todayHours}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
