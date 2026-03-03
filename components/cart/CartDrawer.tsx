'use client'

import { useCart } from '@logiteria/commerce-sdk/react'
import { CartItemRow } from './CartItem'
import { Price } from '@/components/shared/Price'
import Link from 'next/link'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-[var(--color-surface)] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <h2 className="text-lg font-semibold">Cart ({itemCount})</h2>
          <button onClick={onClose} className="p-2" aria-label="Close cart">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[var(--color-text-muted)]">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  compact
                  onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>
            <div className="p-4 border-t border-[var(--color-border)]">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal</span>
                <Price amount={subtotal} className="font-semibold" />
              </div>
              <Link
                href="/cart"
                onClick={onClose}
                className="block w-full text-center border border-[var(--color-border)] py-3 rounded-[var(--radius)] font-medium mb-2 hover:bg-[var(--color-surface-elevated)] transition-colors"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full text-center bg-[var(--color-primary)] text-white py-3 rounded-[var(--radius)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
