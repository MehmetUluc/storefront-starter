import type { CartItem } from '@logiteria/commerce-sdk'
import { Price } from '@/components/shared/Price'

interface CartItemRowProps {
  item: CartItem
  compact?: boolean
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

export function CartItemRow({ item, compact, onUpdateQuantity, onRemove }: CartItemRowProps) {
  return (
    <div className={`flex gap-4 ${compact ? '' : 'p-4 border border-[var(--color-border)] rounded-[var(--radius)]'}`}>
      <div className={`${compact ? 'w-16 h-16' : 'w-24 h-24'} bg-[var(--color-surface-elevated)] rounded overflow-hidden flex-shrink-0`}>
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-[var(--color-text-muted)]">No image</div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className={`font-medium ${compact ? 'text-sm' : ''} truncate`}>{item.name}</h3>
        {item.variant_label && (
          <p className="text-xs text-[var(--color-text-muted)]">{item.variant_label}</p>
        )}
        <Price amount={item.price} className="text-sm mt-1" />

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              className="w-7 h-7 border border-[var(--color-border)] rounded text-sm hover:bg-[var(--color-surface-elevated)]"
              aria-label="Decrease"
            >
              -
            </button>
            <span className="text-sm w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="w-7 h-7 border border-[var(--color-border)] rounded text-sm hover:bg-[var(--color-surface-elevated)]"
              aria-label="Increase"
            >
              +
            </button>
          </div>
          <button
            onClick={onRemove}
            className="text-sm text-[var(--color-error)] hover:underline"
            aria-label={`Remove ${item.name}`}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
