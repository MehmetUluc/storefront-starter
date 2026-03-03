import { getProduct, getProducts } from '@logiteria/commerce-sdk/next'
import { ProductImages } from '@/components/product/ProductImages'
import { AddToCartButton } from '@/components/product/AddToCartButton'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Price } from '@/components/shared/Price'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { notFound } from 'next/navigation'

export const revalidate = 300

const STORE_URL = process.env.NEXT_PUBLIC_STORE_URL || ''

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let product
  try {
    product = await getProduct(STORE_URL, slug)
  } catch {
    notFound()
  }

  const relatedProducts = product.categories.length > 0
    ? await getProducts(STORE_URL, { category: product.categories[0]?.slug, per_page: 4 }).catch(() => null)
    : null

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    ...(product.category ? [{ label: product.category.name, href: `/shop?category=${product.category.slug}` }] : []),
    { label: product.name },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbs} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
        <ProductImages images={product.images} productName={product.name} />

        <div>
          {product.brand && (
            <p className="text-sm text-[var(--color-text-muted)] mb-1">{product.brand}</p>
          )}
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center gap-3 mb-6">
            <Price amount={product.price} currency={product.currency} className="text-2xl font-bold" />
            {product.compare_at_price && (
              <Price amount={product.compare_at_price} currency={product.currency} className="line-through text-[var(--color-text-muted)]" />
            )}
            {product.compare_at_price && (
              <span className="bg-[var(--color-error)] text-white text-xs px-2 py-1 rounded">
                {Math.round((1 - product.price / product.compare_at_price) * 100)}% OFF
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6">
            {product.stock_status === 'in_stock' && (
              <span className="text-sm text-[var(--color-success)] font-medium">In Stock</span>
            )}
            {product.stock_status === 'low_stock' && (
              <span className="text-sm text-[var(--color-accent)] font-medium">Low Stock</span>
            )}
            {product.stock_status === 'out_of_stock' && (
              <span className="text-sm text-[var(--color-error)] font-medium">Out of Stock</span>
            )}
            {product.rating_count > 0 && (
              <span className="text-sm text-[var(--color-text-muted)]">
                {product.rating_average.toFixed(1)} ({product.review_count} reviews)
              </span>
            )}
          </div>

          {product.short_description && (
            <p className="text-[var(--color-text-muted)] mb-6">{product.short_description}</p>
          )}

          <AddToCartButton product={product} />

          {product.description && (
            <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
              <h2 className="font-semibold mb-3">Description</h2>
              <div className="text-[var(--color-text-muted)] prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}

          {product.attribute_groups.length > 0 && (
            <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
              <h2 className="font-semibold mb-3">Specifications</h2>
              {product.attribute_groups.map((group) => (
                <div key={group.code} className="mb-4">
                  <h3 className="text-sm font-medium mb-2">{group.label}</h3>
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    {group.attributes.map((attr) => (
                      <div key={attr.code} className="contents">
                        <dt className="text-[var(--color-text-muted)]">{attr.label}</dt>
                        <dd>{String(attr.value ?? '-')}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {relatedProducts && relatedProducts.products.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <ProductGrid products={relatedProducts.products.filter(p => p.id !== product.id).slice(0, 4)} />
        </section>
      )}
    </div>
  )
}
