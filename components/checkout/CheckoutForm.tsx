'use client'

import { AddressForm } from './AddressForm'

interface CheckoutFormProps {
  placing: boolean
  onSubmit: () => void
}

export function CheckoutForm({ placing, onSubmit }: CheckoutFormProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
        <AddressForm prefix="shipping" />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Payment</h2>
        <div className="p-4 border border-[var(--color-border)] rounded-[var(--radius)]">
          <p className="text-sm text-[var(--color-text-muted)]">
            Payment integration coming soon. This is a starter template.
          </p>
        </div>
      </section>

      <button
        type="submit"
        disabled={placing}
        className="w-full bg-[var(--color-primary)] text-white py-3 rounded-[var(--radius)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50"
      >
        {placing ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  )
}
