'use client'

import { useState } from 'react'
import { useCart } from '@logiteria/commerce-sdk/react'
import type { Product } from '@logiteria/commerce-sdk'

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const isOutOfStock = product.stock_status === 'out_of_stock'

  async function handleAdd() {
    if (isOutOfStock) return

    await addItem({
      product_id: product.id,
      variant_id: null,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      price: product.price,
      compare_at_price: product.compare_at_price,
      quantity,
      image: product.thumbnail || product.images[0]?.url || '',
      variant_label: null,
      variant_values: {},
      stock_status: product.stock_status,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-[var(--color-border)] rounded-[var(--radius)]">
        <button
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          className="px-3 py-2 hover:bg-[var(--color-surface-elevated)] transition-colors"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
        <button
          onClick={() => setQuantity(q => q + 1)}
          className="px-3 py-2 hover:bg-[var(--color-surface-elevated)] transition-colors"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAdd}
        disabled={isOutOfStock}
        className={`flex-1 py-3 px-6 rounded-[var(--radius)] font-medium transition-colors ${
          isOutOfStock
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : added
            ? 'bg-[var(--color-success)] text-white'
            : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]'
        }`}
      >
        {isOutOfStock ? 'Out of Stock' : added ? 'Added!' : 'Add to Cart'}
      </button>
    </div>
  )
}
