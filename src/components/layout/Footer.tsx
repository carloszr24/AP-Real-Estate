import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const mapsHref = 'https://maps.google.com/?q=Av.+Virgen+de+Fatima,+3,+Local+Bajo,+11405+Jerez+de+la+Frontera,+Cadiz'
  const phoneHref = 'tel:+34635872927'
  const emailHref = 'mailto:ventableinmobiliaria@gmail.com'
  const whatsappHref = 'https://wa.me/34635872927'

  return (
    <footer className="mt-24 border-t border-white/15 bg-brand-primary text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/images/ventable-logo.png"
                alt="Ventable logo"
                width={360}
                height={104}
                className="h-16 w-auto md:h-20"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
              Asesoramiento personalizado para compra, venta e inversion en Jerez de la Frontera y alrededores.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-white">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/propiedades" className="transition-colors hover:text-white/80">Propiedades</Link></li>
              <li><Link href="/sobre-nosotros" className="transition-colors hover:text-white/80">Sobre nosotros</Link></li>
              <li><Link href="/contacto" className="transition-colors hover:text-white/80">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-white">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white/80"
                >
                  Av. Virgen de Fátima, 3, Local Bajo, 11405 Jerez de la Frontera, Cádiz
                </a>
              </li>
              <li>
                <a href={phoneHref} className="transition-colors hover:text-white/80">635 87 29 27</a>
              </li>
              <li>
                <a href={emailHref} className="transition-colors hover:text-white/80">ventableinmobiliaria@gmail.com</a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white/80"
                >
                  WhatsApp: +34 635 87 29 27
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-6 text-xs text-white/70 md:flex-row">
          <span>© {new Date().getFullYear()} Ventable Inmobiliaria. Todos los derechos reservados.</span>
          <Link href="/admin" className="transition-colors hover:text-white">Panel Admin</Link>
        </div>
      </div>
    </footer>
  )
}
