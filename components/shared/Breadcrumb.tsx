import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-text-muted)]">
      <ol className="flex items-center gap-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {idx > 0 && <span>/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-[var(--color-text)]">{item.label}</Link>
            ) : (
              <span className="text-[var(--color-text)]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
