import Link from 'next/link'
import type { Product } from '@logiteria/commerce-sdk'
import { Price } from '@/components/shared/Price'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images.find(i => i.is_primary) ?? product.images[0]

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="aspect-square bg-[var(--color-surface-elevated)] rounded-[var(--radius)] overflow-hidden mb-3 relative">
        {image ? (
          <img
            src={image.url}
            alt={image.alt || product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)]">
            No image
          </div>
        )}
        {product.compare_at_price && (
          <span className="absolute top-2 right-2 bg-[var(--color-error)] text-white text-xs px-2 py-1 rounded">
            Sale
          </span>
        )}
      </div>
      <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
        {product.name}
      </h3>
      <div className="flex items-center gap-2 mt-1">
        <Price amount={product.price} currency={product.currency} className="text-sm font-semibold" />
        {product.compare_at_price && (
          <Price amount={product.compare_at_price} currency={product.currency} className="text-xs line-through text-[var(--color-text-muted)]" />
        )}
      </div>
    </Link>
  )
}
