import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[var(--color-surface-elevated)] border-t border-[var(--color-border)] mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Shop</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li><Link href="/shop" className="hover:text-[var(--color-text)]">All Products</Link></li>
              <li><Link href="/collections" className="hover:text-[var(--color-text)]">Collections</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Account</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li><Link href="/auth/login" className="hover:text-[var(--color-text)]">Sign In</Link></li>
              <li><Link href="/auth/register" className="hover:text-[var(--color-text)]">Register</Link></li>
              <li><Link href="/account/orders" className="hover:text-[var(--color-text)]">Orders</Link></li>
            </ul>
          </div>
          <div className="col-span-2">
            <h3 className="font-semibold mb-3">About</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Powered by Logiteria Commerce. A headless commerce platform for modern storefronts.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[var(--color-border)] text-center text-sm text-[var(--color-text-muted)]">
          Powered by Logiteria Commerce
        </div>
      </div>
    </footer>
  )
}
