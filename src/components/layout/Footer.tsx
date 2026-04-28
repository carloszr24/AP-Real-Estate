import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const mapsHref = 'https://maps.google.com/?q=Av.+Virgen+de+Fatima,+3,+Local+Bajo,+11405+Jerez+de+la+Frontera,+Cadiz'
  const phoneHref = 'tel:+34635872927'
  const emailHref = 'mailto:carloszr2005@gmail.com'
  const whatsappHref = 'https://wa.me/34635872927'
  const instagramHref = 'https://www.instagram.com/ventableinmobiliaria/'
  const tiktokHref = 'https://www.tiktok.com/@ventableinmobiliaria?lang=es'
  const facebookHref = 'https://www.facebook.com/people/Ventable-Servicios-Inmobiliarios-y-Financieros/61586977362097/'

  return (
    <footer className="mt-24 border-t border-white/15 bg-brand-primary text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/images/ventable-logo.png"
                alt="Ventable logo"
                width={520}
                height={150}
                className="h-24 w-auto md:h-28"
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
                <a href={emailHref} className="transition-colors hover:text-white/80">carloszr2005@gmail.com</a>
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
            <div className="mt-5 flex items-center gap-3">
              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Ventable"
                className="text-white/80 transition-colors hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 1.9A3.9 3.9 0 0 0 3.9 7.8v8.4a3.9 3.9 0 0 0 3.9 3.9h8.4a3.9 3.9 0 0 0 3.9-3.9V7.8a3.9 3.9 0 0 0-3.9-3.9H7.8Zm8.9 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.9a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Z" />
                </svg>
              </a>
              <a
                href={tiktokHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Ventable"
                className="text-white/80 transition-colors hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M14.57 2h2.76a4.9 4.9 0 0 0 3.4 3.4v2.8a7.5 7.5 0 0 1-3.38-.83v6.2A7.17 7.17 0 1 1 10.2 6.4v2.91a4.27 4.27 0 1 0 4.37 4.26V2Z" />
                </svg>
              </a>
              <a
                href={facebookHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Ventable"
                className="text-white/80 transition-colors hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 22v-8h2.8l.4-3.2h-3.2V8.8c0-.9.2-1.6 1.5-1.6h1.8V4.3c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.4v2.2H7v3.2h2.9v8h3.6Z" />
                </svg>
              </a>
            </div>
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
