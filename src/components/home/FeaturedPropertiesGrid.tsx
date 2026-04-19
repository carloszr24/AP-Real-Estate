import { Property } from '@/types'
import { PropertyCard } from '@/components/properties/PropertyCard'

interface FeaturedPropertiesGridProps {
  properties: Property[]
}

/** Sin animación ni opacity inline: evita tarjetas invisibles tras hidratación (SSR + opacity:0 + animate). */
export function FeaturedPropertiesGrid({ properties }: FeaturedPropertiesGridProps) {
  return (
    <div>
      <div className="overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-1">
        <div className="flex gap-5 md:gap-7 lg:grid lg:grid-cols-3 lg:gap-7">
          {properties.map((property) => (
            <div
              key={property.id}
              className="snap-start shrink-0 w-[86vw] sm:w-[68vw] md:w-[52%] lg:w-auto lg:min-w-0"
            >
              <PropertyCard property={property} variant="featuredMinimal" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
