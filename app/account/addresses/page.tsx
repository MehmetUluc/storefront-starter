'use client'

import { useState, useEffect } from 'react'
import { useCommerceClient } from '@logiteria/commerce-sdk/react'
import type { Address } from '@logiteria/commerce-sdk'

export default function AddressesPage() {
  const client = useCommerceClient()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.customer.addresses()
      .then(setAddresses)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [client])

  if (loading) {
    return <div className="animate-pulse space-y-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="h-32 bg-[var(--color-surface-elevated)] rounded-[var(--radius)]" />
      ))}
    </div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Addresses</h1>

      {addresses.length === 0 ? (
        <p className="text-[var(--color-text-muted)]">No saved addresses.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div key={address.id} className="p-4 border border-[var(--color-border)] rounded-[var(--radius)]">
              {address.is_default && (
                <span className="text-xs font-medium text-[var(--color-primary)] mb-2 block">Default</span>
              )}
              <p className="font-medium">{address.first_name} {address.last_name}</p>
              <p className="text-sm text-[var(--color-text-muted)]">{address.address_line1}</p>
              {address.address_line2 && (
                <p className="text-sm text-[var(--color-text-muted)]">{address.address_line2}</p>
              )}
              <p className="text-sm text-[var(--color-text-muted)]">
                {address.city}, {address.state} {address.postal_code}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">{address.country}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
