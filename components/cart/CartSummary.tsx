'use client'

import { useCart } from '@logiteria/commerce-sdk/react'
import { Price } from '@/components/shared/Price'

export function CartSummary() {
  const { subtotal, cart } = useCart()

  return (
    <div className="p-6 border border-[var(--color-border)] rounded-[var(--radius)] h-fit">
      <h2 className="font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[var(--color-text-muted)]">Subtotal</span>
          <Price amount={subtotal} />
        </div>
        {cart?.shipping !== undefined && cart.shipping > 0 && (
          <div className="flex justify-between">
            <span className="text-[var(--color-text-muted)]">Shipping</span>
            <Price amount={cart.shipping} />
          </div>
        )}
        {cart?.tax !== undefined && cart.tax > 0 && (
          <div className="flex justify-between">
            <span className="text-[var(--color-text-muted)]">Tax</span>
            <Price amount={cart.tax} />
          </div>
        )}
        {cart?.discount !== undefined && cart.discount > 0 && (
          <div className="flex justify-between text-[var(--color-success)]">
            <span>Discount</span>
            <span>-<Price amount={cart.discount} /></span>
          </div>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex justify-between font-semibold">
        <span>Total</span>
        <Price amount={cart?.total ?? subtotal} />
      </div>
    </div>
  )
}
