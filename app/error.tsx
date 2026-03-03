'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="text-[var(--color-text-muted)] mb-8">{error.message}</p>
      <button
        onClick={reset}
        className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-[var(--radius)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}
