import { getProducts, getCollections } from '@logiteria/commerce-sdk/next'
import { ProductGrid } from '@/components/product/ProductGrid'
import Link from 'next/link'

export const revalidate = 60

const STORE_URL = process.env.NEXT_PUBLIC_STORE_URL || ''

export default async function HomePage() {
  const [productsData, collections] = await Promise.all([
    getProducts(STORE_URL, { per_page: 8, sort: 'created_at', order: 'desc' }).catch(() => null),
    getCollections(STORE_URL).catch(() => []),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--color-surface-elevated)] py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to our Store</h1>
        <p className="text-[var(--color-text-muted)] text-lg mb-8 max-w-2xl mx-auto">
          Discover our curated collection of premium products
        </p>
        <Link
          href="/shop"
          className="inline-block bg-[var(--color-primary)] text-white px-8 py-3 rounded-[var(--radius)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      {productsData && productsData.products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Link href="/shop" className="text-sm font-medium hover:underline">
              View All
            </Link>
          </div>
          <ProductGrid products={productsData.products} />
        </section>
      )}

      {/* Collections */}
      {collections.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="group block rounded-[var(--radius)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-primary)] transition-colors"
              >
                {collection.image && (
                  <div className="aspect-video bg-[var(--color-surface-elevated)] overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold">{collection.name}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    {collection.product_count} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
