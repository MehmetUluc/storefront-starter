import { getCollections } from '@logiteria/commerce-sdk/next'
import Link from 'next/link'

export const revalidate = 300

const STORE_URL = process.env.NEXT_PUBLIC_STORE_URL || ''

export default async function CollectionsPage() {
  const collections = await getCollections(STORE_URL).catch(() => [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Collections</h1>
      {collections.length === 0 ? (
        <p className="text-[var(--color-text-muted)]">No collections available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group block rounded-[var(--radius)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-primary)] transition-colors"
            >
              {collection.image ? (
                <div className="aspect-video bg-[var(--color-surface-elevated)] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-[var(--color-surface-elevated)] flex items-center justify-center">
                  <span className="text-[var(--color-text-muted)]">No image</span>
                </div>
              )}
              <div className="p-4">
                <h2 className="font-semibold text-lg">{collection.name}</h2>
                {collection.description && (
                  <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">{collection.description}</p>
                )}
                <p className="text-sm text-[var(--color-text-muted)] mt-2">{collection.product_count} products</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
