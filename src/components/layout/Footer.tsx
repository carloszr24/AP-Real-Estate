import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <span className="font-display text-2xl font-medium text-white">
              AP <span className="text-gold">Real Estate</span> Services
            </span>
            <p className="mt-4 text-sm leading-relaxed text-stone-500 max-w-sm">
              Gestionamos arrendamientos y ventas de viviendas propias y de particulares en Almería.
            </p>
          </div>
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/propiedades" className="hover:text-white transition-colors">Propiedades</Link></li>
              <li><Link href="/sobre-nosotros" className="hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>Av. de la Estación, 25, 7º 3 B</li>
              <li>04005 Almería</li>
              <li className="pt-1">
                <a href="tel:+34950790217" className="hover:text-white transition-colors">950 79 02 17</a>
              </li>
              <li>
                <a href="mailto:adm.ap.servicios.inmobiliarios@gmail.com" className="hover:text-white transition-colors">adm.ap.servicios.inmobiliarios@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-600">
          <span>© {new Date().getFullYear()} AP Real Estate Services. Todos los derechos reservados.</span>
          <Link href="/admin" className="hover:text-stone-400 transition-colors">Panel Admin</Link>
        </div>
      </div>
    </footer>
  )
}
