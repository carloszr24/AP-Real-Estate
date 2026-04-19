'use client'

import { useEffect, useState } from 'react'
import { Property } from '@/types'
import { PropertyCard } from '@/components/properties/PropertyCard'

interface FeaturedPropertiesGridProps {
  properties: Property[]
}

export function FeaturedPropertiesGrid({ properties }: FeaturedPropertiesGridProps) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMediaChange = () => setReducedMotion(media.matches)
    onMediaChange()
    media.addEventListener('change', onMediaChange)
    return () => media.removeEventListener('change', onMediaChange)
  }, [])

  return (
    <div>
      <div className="overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-1">
        <div className="flex gap-5 md:gap-7 lg:grid lg:grid-cols-3 lg:gap-7">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="snap-start shrink-0 w-[86vw] sm:w-[68vw] md:w-[52%] lg:w-auto lg:min-w-0 animate-fade-up"
              style={{
                animationDelay: reducedMotion ? '0s' : `${index * 0.12}s`,
                opacity: reducedMotion ? 1 : 0,
                animationFillMode: 'forwards',
              }}
            >
              <PropertyCard property={property} variant="featuredMinimal" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
