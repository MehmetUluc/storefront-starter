'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart, useAuth } from '@logiteria/commerce-sdk/react'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { MobileNav } from '@/components/layout/MobileNav'

export function Header() {
  const { itemCount } = useCart()
  const { isAuthenticated } = useAuth()
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              className="md:hidden p-2 -ml-2"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link href="/" className="text-xl font-bold">Store</Link>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/shop" className="hover:text-[var(--color-primary)] transition-colors">Shop</Link>
              <Link href="/collections" className="hover:text-[var(--color-primary)] transition-colors">Collections</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={isAuthenticated ? '/account' : '/auth/login'}
              className="hidden sm:block text-sm hover:text-[var(--color-primary)] transition-colors"
            >
              {isAuthenticated ? 'Account' : 'Sign In'}
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2"
              aria-label={`Cart (${itemCount} items)`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  )
}
