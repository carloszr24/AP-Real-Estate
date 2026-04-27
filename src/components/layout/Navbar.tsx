'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ValoracionGratuitaModal } from '@/components/home/ValoracionGratuitaModal'

const links = [
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/sobre-nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  if (pathname.startsWith('/admin')) return null

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-[#1d335c]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="relative flex items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/ventable-logo.png"
              alt="Ventable logo"
              width={230}
              height={66}
              priority
              className="h-12 w-auto md:h-14"
            />
          </Link>

          <div className="hidden md:flex items-center gap-7 ml-auto">
            {/* Desktop nav */}
            <nav className="flex items-center gap-7">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-200',
                    pathname === link.href
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <ValoracionGratuitaModal
              triggerLabel="Valoración gratuita"
              triggerClassName="rounded-none bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-brand-primary transition-colors duration-200 hover:bg-white/90"
            />
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden ml-auto p-2 text-white"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <div className="w-5 space-y-1.5">
              <span className={cn('block h-px bg-white transition-all duration-300', open && 'rotate-45 translate-y-2')} />
              <span className={cn('block h-px bg-white transition-all duration-300', open && 'opacity-0')} />
              <span className={cn('block h-px bg-white transition-all duration-300', open && '-rotate-45 -translate-y-2')} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden space-y-4 border-t border-white/20 bg-brand-primary px-6 py-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-1 text-sm text-white/85 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <ValoracionGratuitaModal
            triggerLabel="Valoración gratuita"
            triggerClassName="mt-4 w-full rounded-none bg-white px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.12em] text-brand-primary transition-colors duration-200 hover:bg-white/90"
          />
        </div>
      )}
    </header>
  )
}
