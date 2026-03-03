'use client'

import { useState } from 'react'
import { useCart, useAuth } from '@logiteria/commerce-sdk/react'
import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import { CartSummary } from '@/components/cart/CartSummary'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { cart, items, clear } = useCart()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [placing, setPlacing] = useState(false)

  if (!cart || items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/shop" className="text-[var(--color-primary)] hover:underline">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {!isAuthenticated && (
        <div className="mb-6 p-4 bg-[var(--color-surface-elevated)] rounded-[var(--radius)] border border-[var(--color-border)]">
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/auth/login?redirect=/checkout" className="font-medium hover:underline">
              Sign in
            </Link>{' '}
            for a faster checkout.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm
            placing={placing}
            onSubmit={async () => {
              setPlacing(true)
              // In a real implementation, this would call client.checkout.placeOrder()
              // For the starter template, we simulate a successful order
              setTimeout(() => {
                clear()
                router.push('/checkout/success')
              }, 1500)
            }}
          />
        </div>
        <CartSummary />
      </div>
    </div>
  )
}
