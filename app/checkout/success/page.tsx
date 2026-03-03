import Link from 'next/link'

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-[var(--color-success)] rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
      <p className="text-[var(--color-text-muted)] mb-8">
        Thank you for your purchase. You will receive an email confirmation shortly.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/shop"
          className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-[var(--radius)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/account/orders"
          className="border border-[var(--color-border)] px-6 py-3 rounded-[var(--radius)] font-medium hover:bg-[var(--color-surface-elevated)] transition-colors"
        >
          View Orders
        </Link>
      </div>
    </div>
  )
}
