import { getCollection, getProducts } from '@logiteria/commerce-sdk/next'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { notFound } from 'next/navigation'

export const revalidate = 300

const STORE_URL = process.env.NEXT_PUBLIC_STORE_URL || ''

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let collection
  try {
    collection = await getCollection(STORE_URL, slug)
  } catch {
    notFound()
  }

  const productsData = await getProducts(STORE_URL, { collection: slug, per_page: 24 }).catch(() => null)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
        { label: collection.name },
      ]} />

      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-bold">{collection.name}</h1>
        {collection.description && (
          <p className="text-[var(--color-text-muted)] mt-2">{collection.description}</p>
        )}
      </div>

      {productsData && productsData.products.length > 0 ? (
        <ProductGrid products={productsData.products} />
      ) : (
        <p className="text-[var(--color-text-muted)]">No products in this collection</p>
      )}
    </div>
  )
}
