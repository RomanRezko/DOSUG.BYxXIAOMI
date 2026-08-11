import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 mb-2">
      <ol className="flex flex-wrap items-center gap-1.5 text-[12px]">
        <li>
          <Link href="/" className="text-[#999] hover:text-[#d32f2f] transition-colors">
            Главная
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <span className="text-[#ccc]">/</span>
            {item.href ? (
              <Link href={item.href} className="text-[#999] hover:text-[#d32f2f] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#666]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
