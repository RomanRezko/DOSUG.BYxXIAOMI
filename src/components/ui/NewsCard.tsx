import Image from 'next/image';
import Link from 'next/link';
import type { News } from '@/types';

interface NewsCardProps {
  news: News;
  variant?: 'default' | 'horizontal' | 'featured' | 'compact';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function NewsCard({ news, variant = 'default' }: NewsCardProps) {
  const newsUrl = `/news/${news.slug}`;

  // Компактный горизонтальный вариант для сайдбара
  if (variant === 'horizontal') {
    return (
      <Link href={newsUrl} className="block group">
        <article className="flex gap-3 py-3 border-b border-gray-100 last:border-0">
          <div className="relative w-20 h-16 flex-shrink-0 rounded overflow-hidden">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[13px] font-medium text-[#333] leading-tight line-clamp-2 group-hover:text-[#d32f2f] transition-colors">
              {news.title}
            </h3>
            <time className="text-[11px] text-[#999] mt-1 block">
              {formatDate(news.publishedAt)}
            </time>
          </div>
        </article>
      </Link>
    );
  }

  // Большая карточка с изображением на весь блок
  if (variant === 'featured') {
    return (
      <Link href={newsUrl} className="block group">
        <article className="card relative h-[280px] overflow-hidden">
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Категория и дата */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="tag">{news.category}</span>
            <span className="text-[11px] text-white/80 bg-black/40 px-2 py-1 rounded">
              {formatDate(news.publishedAt)}
            </span>
          </div>

          {/* Заголовок */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-[15px] font-semibold text-white leading-snug line-clamp-3 group-hover:text-[#ef5350] transition-colors">
              {news.title}
            </h3>
          </div>
        </article>
      </Link>
    );
  }

  // Компактный вариант без excerpt
  if (variant === 'compact') {
    return (
      <Link href={newsUrl} className="block group">
        <article className="card overflow-hidden">
          <div className="relative h-[140px]">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            {/* Дата в углу */}
            <span className="absolute top-2 right-2 text-[10px] text-white bg-black/50 px-2 py-0.5 rounded">
              {formatDate(news.publishedAt)}
            </span>
          </div>
          <div className="p-3">
            <span className="tag tag--small">{news.category}</span>
            <h3 className="text-[13px] font-medium text-[#333] mt-2 leading-tight line-clamp-2 group-hover:text-[#d32f2f] transition-colors">
              {news.title}
            </h3>
          </div>
        </article>
      </Link>
    );
  }

  // Стандартный вариант - как на dosug.by
  return (
    <Link href={newsUrl} className="block group">
      <article className="card overflow-hidden">
        <div className="relative h-[180px]">
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {/* Дата в правом верхнем углу */}
          <span className="absolute top-2 right-2 text-[11px] text-white bg-black/50 px-2 py-1 rounded">
            {formatDate(news.publishedAt)}
          </span>
        </div>
        <div className="p-3">
          <span className="tag">{news.category}</span>
          <h3 className="text-[14px] font-medium text-[#333] mt-2 leading-snug line-clamp-2 group-hover:text-[#d32f2f] transition-colors">
            {news.title}
          </h3>
        </div>
      </article>
    </Link>
  );
}
