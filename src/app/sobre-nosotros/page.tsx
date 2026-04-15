import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    icon: '🏠',
    title: 'Compra y venta',
    desc: 'Gestionamos todo el proceso de compraventa, desde la búsqueda hasta la firma en notaría. Negociamos en tu nombre para obtener las mejores condiciones.',
  },
  {
    icon: '📊',
    title: 'Valoración de inmuebles',
    desc: 'Estudio de mercado riguroso para conocer el precio real de tu propiedad. Sin compromisos, con total transparencia.',
  },
  {
    icon: '💼',
    title: 'Asesoramiento jurídico',
    desc: 'Revisión de contratos, verificación registral y acompañamiento legal en todo el proceso. Tu seguridad es nuestra prioridad.',
  },
  {
    icon: '🔑',
    title: 'Gestión post-venta',
    desc: 'Nuestro servicio no termina con la firma. Te ayudamos con cambios de suministros, reformas y cualquier gestión posterior.',
  },
  {
    icon: '🏦',
    title: 'Financiación',
    desc: 'Colaboramos con las principales entidades bancarias para conseguirte la mejor hipoteca adaptada a tu situación.',
  },
  {
    icon: '🌐',
    title: 'Inversión internacional',
    desc: 'Asesoramiento especializado para compradores internacionales. Servicios en español, inglés y francés.',
  },
]

export default function SobreNosotrosPage() {
  return (
    <div className="pt-16">
      {/* Services */}
      <section className="bg-stone-50 py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Servicios</p>
            <h1 className="section-title">Servicios inmobiliarios en Almería</h1>
            <p className="text-stone-500 text-sm md:text-base max-w-3xl mx-auto mt-6 leading-relaxed">
              Te acompaño de forma cercana y personalizada para comprar, vender o invertir con
              seguridad en Roquetas de Mar y toda Almería.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white p-8 border border-stone-100 hover:border-gold transition-colors duration-300 group"
              >
                <span className="text-3xl mb-5 block">{service.icon}</span>
                <h3 className="font-medium text-stone-900 mb-3 group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre mi */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end">
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Sobre mi</p>
              <h2 className="section-title mb-8">Trayectoria de Alessandra Maggi</h2>
              <div className="space-y-5 text-stone-600 leading-relaxed">
                <p>
                  Soy agente inmobiliaria especializada en la zona de Almería, con una
                  trayectoria centrada en ofrecer un servicio humano, directo y transparente.
                </p>
                <p>
                  Trabajo cada operación de principio a fin: análisis realista del mercado,
                  estrategia de comercialización y negociación enfocada a proteger tus intereses.
                </p>
                <p>
                  Mi compromiso es que tomes decisiones con confianza y claridad, acompañándote
                  personalmente en cada paso hasta el cierre.
                </p>
              </div>
            </div>
            <div className="relative w-full max-w-[430px] ml-auto">
              <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 border border-stone-200" />
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                <Image
                  src="/images/alessandra-maggi.png"
                  alt="Alessandra Maggi, agente inmobiliaria en Almería"
                  fill
                  className="object-cover object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-950 text-white py-20 px-6 md:px-10 text-center">
        <h2 className="font-display text-4xl font-light mb-6">¿Hablamos?</h2>
        <p className="text-stone-400 mb-10 max-w-md mx-auto">
          Cuéntanos tu situación y encontraremos la mejor solución para ti.
        </p>
        <Link href="/contacto" className="btn-gold px-10 py-4 text-sm">
          Contactar ahora
        </Link>
      </section>
    </div>
  )
}
