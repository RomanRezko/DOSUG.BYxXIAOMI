import Image from 'next/image';
import Link from 'next/link';
import type { Event } from '@/types';

interface EventCardProps {
  event: Event;
}

function formatEventDate(dateString: string): { day: string; month: string; time: string } {
  const date = new Date(dateString);
  const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

  return {
    day: date.getDate().toString(),
    month: months[date.getMonth()],
    time: date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
  };
}

export function EventCard({ event }: EventCardProps) {
  const eventUrl = `/afisha/${event.slug}`;
  const dateInfo = formatEventDate(event.startDate);

  return (
    <Link href={eventUrl} className="block group">
      <article className="card overflow-hidden">
        <div className="relative h-[200px]">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Age restriction badge */}
          {event.ageRestriction && (
            <div className="absolute top-2 right-2 bg-[#d32f2f] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              {event.ageRestriction}
            </div>
          )}

          {/* Category badge */}
          <div className="absolute bottom-2 left-2">
            <span className="tag tag--small">{event.category}</span>
          </div>
        </div>

        <div className="p-3">
          <h3 className="text-[14px] font-medium text-[#333] line-clamp-2 leading-snug group-hover:text-[#d32f2f] transition-colors">
            {event.title}
          </h3>

          <div className="flex items-center gap-1.5 mt-2 text-[12px] text-[#666]">
            <svg className="w-3.5 h-3.5 text-[#999]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.venue}</span>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#f0f0f0]">
            <div className="flex items-center gap-1 text-[12px] text-[#666]">
              <span className="font-medium text-[#333]">{dateInfo.day} {dateInfo.month}</span>
              <span className="text-[#999]">в {dateInfo.time}</span>
            </div>
            {event.price && (
              <span className="text-[12px] font-bold text-[#d32f2f]">{event.price}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
