'use client'

import { useAuth } from '@logiteria/commerce-sdk/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const navItems = [
  { label: 'Dashboard', href: '/account' },
  { label: 'Orders', href: '/account/orders' },
  { label: 'Addresses', href: '/account/addresses' },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, initialized, user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (initialized && !isAuthenticated) {
      router.push('/auth/login?redirect=' + pathname)
    }
  }, [initialized, isAuthenticated, router, pathname])

  if (!initialized) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-[var(--color-text-muted)]">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="space-y-2">
          <div className="mb-4">
            <p className="font-semibold">{user?.first_name} {user?.last_name}</p>
            <p className="text-sm text-[var(--color-text-muted)]">{user?.email}</p>
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-[var(--radius)] text-sm transition-colors ${
                pathname === item.href
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'hover:bg-[var(--color-surface-elevated)]'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => { logout(); router.push('/') }}
            className="block w-full text-left px-4 py-2 rounded-[var(--radius)] text-sm text-[var(--color-error)] hover:bg-[var(--color-surface-elevated)] transition-colors"
          >
            Sign Out
          </button>
        </aside>

        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  )
}
