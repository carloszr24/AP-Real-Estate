import Link from 'next/link'

export function Footer() {
  const mapsHref = 'https://maps.google.com/?q=Carretera+de+Alicun+28,+Pl.+Archivo+de+Indias,+4,+04740+Roquetas+de+Mar,+Almeria'
  const phoneHref = 'tel:+34672804286'
  const emailHref = 'mailto:alessandra.maggi@remax.es'
  const facebookHref = 'https://www.facebook.com/alemaggiasesorainmobiliaria#'
  const instagramHref = 'https://www.instagram.com/p/DW62W2ojFHo/'
  const whatsappHref = 'https://wa.me/34672804286'

  return (
    <footer className="bg-stone-100 text-stone-700 mt-24 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <p className="font-display text-2xl text-stone-900">Alessandra Maggi</p>
            <p className="mt-4 text-sm leading-relaxed text-stone-600 max-w-sm">
              Agente inmobiliaria en Almería. Asesoramiento personalizado para compra, venta e
              inversión en Roquetas de Mar y alrededores.
            </p>
          </div>
          <div>
            <h4 className="text-stone-900 text-xs tracking-widest uppercase mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/propiedades" className="hover:text-stone-900 transition-colors">Propiedades</Link></li>
              <li><Link href="/sobre-nosotros" className="hover:text-stone-900 transition-colors">Sobre mi</Link></li>
              <li><Link href="/contacto" className="hover:text-stone-900 transition-colors">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-stone-900 text-xs tracking-widest uppercase mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-900 transition-colors"
                >
                  Carretera de Alicún 28, Pl. Archivo de Indias, 4, 04740 Roquetas de Mar, Almería
                </a>
              </li>
              <li>
                <a href={phoneHref} className="hover:text-stone-900 transition-colors">672 80 42 86</a>
              </li>
              <li>
                <a href={emailHref} className="hover:text-stone-900 transition-colors">alessandra.maggi@remax.es</a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-900 transition-colors"
                >
                  WhatsApp: +34 672 80 42 86
                </a>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-4">
                  <a
                    href={facebookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-500 hover:text-[#1877F2] transition-colors"
                    aria-label="Facebook Alessandra Maggi"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.85c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
                    </svg>
                  </a>
                  <a
                    href={instagramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-500 hover:text-[#E1306C] transition-colors"
                    aria-label="Instagram Alessandra Maggi"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm8.37 1.73H7.88A4.15 4.15 0 0 0 3.73 7.88v8.24a4.15 4.15 0 0 0 4.15 4.15h8.24a4.15 4.15 0 0 0 4.15-4.15V7.88a4.15 4.15 0 0 0-4.15-4.15ZM12 7.3A4.7 4.7 0 1 1 7.3 12 4.7 4.7 0 0 1 12 7.3Zm0 1.74A2.96 2.96 0 1 0 14.96 12 2.96 2.96 0 0 0 12 9.04Zm4.89-2.87a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z" />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <span>© {new Date().getFullYear()} Alessandra Maggi. Todos los derechos reservados.</span>
          <Link href="/admin" className="hover:text-stone-900 transition-colors">Panel Admin</Link>
        </div>
      </div>
    </footer>
  )
}
