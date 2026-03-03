'use client'

import { useAuth } from '@logiteria/commerce-sdk/react'
import Link from 'next/link'

export default function AccountDashboard() {
  const { user } = useAuth()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/account/orders"
          className="p-6 border border-[var(--color-border)] rounded-[var(--radius)] hover:border-[var(--color-primary)] transition-colors"
        >
          <h2 className="font-semibold mb-1">Orders</h2>
          <p className="text-sm text-[var(--color-text-muted)]">View your order history</p>
        </Link>

        <Link
          href="/account/addresses"
          className="p-6 border border-[var(--color-border)] rounded-[var(--radius)] hover:border-[var(--color-primary)] transition-colors"
        >
          <h2 className="font-semibold mb-1">Addresses</h2>
          <p className="text-sm text-[var(--color-text-muted)]">Manage your addresses</p>
        </Link>
      </div>

      {user && (
        <div className="mt-8 p-6 border border-[var(--color-border)] rounded-[var(--radius)]">
          <h2 className="font-semibold mb-4">Profile</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-[var(--color-text-muted)]">Name</dt>
              <dd>{user.first_name} {user.last_name}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-text-muted)]">Email</dt>
              <dd>{user.email}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  )
}
