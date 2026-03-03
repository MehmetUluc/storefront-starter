'use client'

import { useState, useEffect } from 'react'
import { useCommerceClient } from '@logiteria/commerce-sdk/react'
import { Price } from '@/components/shared/Price'
import { Badge } from '@/components/shared/Badge'
import type { Order } from '@logiteria/commerce-sdk'

export default function OrdersPage() {
  const client = useCommerceClient()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.customer.orders({ per_page: 20 })
      .then(data => setOrders(data.orders))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [client])

  if (loading) {
    return <div className="animate-pulse space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-20 bg-[var(--color-surface-elevated)] rounded-[var(--radius)]" />
      ))}
    </div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      {orders.length === 0 ? (
        <p className="text-[var(--color-text-muted)]">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 border border-[var(--color-border)] rounded-[var(--radius)]">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium">#{order.order_number}</span>
                  <span className="text-sm text-[var(--color-text-muted)] ml-3">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
                <Badge variant={order.status === 'delivered' ? 'success' : order.status === 'cancelled' ? 'error' : 'default'}>
                  {order.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">{order.items.length} items</span>
                <Price amount={order.total} currency={order.currency} className="font-medium" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
