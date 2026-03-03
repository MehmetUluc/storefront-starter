'use client'

import { useState } from 'react'
import type { ProductImage } from '@logiteria/commerce-sdk'

interface ProductImagesProps {
  images: ProductImage[]
  productName: string
}

export function ProductImages({ images, productName }: ProductImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedImage = images[selectedIndex]

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-[var(--color-surface-elevated)] rounded-[var(--radius)] flex items-center justify-center text-[var(--color-text-muted)]">
        No images
      </div>
    )
  }

  return (
    <div>
      <div className="aspect-square bg-[var(--color-surface-elevated)] rounded-[var(--radius)] overflow-hidden mb-4">
        <img
          src={selectedImage.url}
          alt={selectedImage.alt || productName}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, idx) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(idx)}
              className={`aspect-square rounded overflow-hidden border-2 transition-colors ${
                idx === selectedIndex ? 'border-[var(--color-primary)]' : 'border-transparent'
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={image.url}
                alt={image.alt || `${productName} ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
