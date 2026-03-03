'use client'

import { useCart } from '@logiteria/commerce-sdk/react'
import { CartItemRow } from '@/components/cart/CartItem'
import { CartSummary } from '@/components/cart/CartSummary'
import Link from 'next/link'

export default function CartPage() {
  const { cart, items, itemCount, updateQuantity, removeItem } = useCart()

  if (!cart || items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-[var(--color-text-muted)] mb-8">Add some products to get started</p>
        <Link
          href="/shop"
          className="inline-block bg-[var(--color-primary)] text-white px-8 py-3 rounded-[var(--radius)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cart ({itemCount} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </div>
        <CartSummary />
      </div>
    </div>
  )
}
