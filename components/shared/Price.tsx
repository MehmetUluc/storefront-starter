import { formatPrice } from '@/lib/utils'

interface PriceProps {
  amount: number
  currency?: string
  className?: string
}

export function Price({ amount, currency = 'USD', className = '' }: PriceProps) {
  return <span className={className}>{formatPrice(amount, currency)}</span>
}
