import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <span className="font-display text-2xl font-medium text-white">
              Pleno<span className="text-gold">Casa</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-stone-500 max-w-sm">
              Tu inmobiliaria de confianza en la Costa del Sol. 
              Más de 15 años ayudando a familias a encontrar su hogar ideal.
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
              <li>Av. Ramón y Cajal, 12</li>
              <li>Fuengirola, Málaga</li>
              <li className="pt-1">
                <a href="tel:+34952000000" className="hover:text-white transition-colors">+34 952 000 000</a>
              </li>
              <li>
                <a href="mailto:info@plenocasa.es" className="hover:text-white transition-colors">info@plenocasa.es</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-600">
          <span>© {new Date().getFullYear()} PlenoCasa. Todos los derechos reservados.</span>
          <Link href="/admin" className="hover:text-stone-400 transition-colors">Panel Admin</Link>
        </div>
      </div>
    </footer>
  )
}
