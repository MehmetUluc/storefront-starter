'use client'

import { useState } from 'react'
import { useProducts } from '@logiteria/commerce-sdk/react'
import { ProductGrid } from '@/components/product/ProductGrid'
import { SearchBar } from '@/components/shared/SearchBar'
import { Pagination } from '@/components/shared/Pagination'

export default function ShopPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('created_at')

  const { products, loading, totalPages } = useProducts({
    page,
    per_page: 12,
    sort,
    order: 'desc',
    q: search || undefined,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />
        </div>
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1) }}
          className="px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius)] bg-[var(--color-surface)] text-[var(--color-text)]"
          aria-label="Sort products"
        >
          <option value="created_at">Newest</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-[var(--color-surface-elevated)] rounded-[var(--radius)]" />
              <div className="mt-3 h-4 bg-[var(--color-surface-elevated)] rounded w-3/4" />
              <div className="mt-2 h-4 bg-[var(--color-surface-elevated)] rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[var(--color-text-muted)] text-lg">No products found</p>
        </div>
      ) : (
        <>
          <ProductGrid products={products} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
