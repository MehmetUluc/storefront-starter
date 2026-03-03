import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-[var(--color-text-muted)] text-lg mb-8">Page not found</p>
      <Link
        href="/"
        className="inline-block bg-[var(--color-primary)] text-white px-6 py-3 rounded-[var(--radius)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}
