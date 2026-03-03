'use client'

import Link from 'next/link'
import { useAuth } from '@logiteria/commerce-sdk/react'

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const { isAuthenticated } = useAuth()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 w-72 bg-[var(--color-surface)] p-6">
        <button onClick={onClose} className="absolute top-4 right-4 p-2" aria-label="Close menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="mt-8 space-y-4">
          <Link href="/shop" onClick={onClose} className="block text-lg font-medium">Shop</Link>
          <Link href="/collections" onClick={onClose} className="block text-lg font-medium">Collections</Link>
          <hr className="border-[var(--color-border)]" />
          {isAuthenticated ? (
            <>
              <Link href="/account" onClick={onClose} className="block text-lg font-medium">Account</Link>
              <Link href="/account/orders" onClick={onClose} className="block text-lg font-medium">Orders</Link>
            </>
          ) : (
            <>
              <Link href="/auth/login" onClick={onClose} className="block text-lg font-medium">Sign In</Link>
              <Link href="/auth/register" onClick={onClose} className="block text-lg font-medium">Register</Link>
            </>
          )}
        </nav>
      </div>
    </div>
  )
}
