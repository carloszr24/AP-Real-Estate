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

const team = [
  {
    name: 'María González',
    role: 'Directora comercial',
    img: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400',
  },
  {
    name: 'Carlos Fernández',
    role: 'Agente senior',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
  },
  {
    name: 'Laura Martínez',
    role: 'Asesora jurídica',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
  },
]

export default function SobreNosotrosPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-stone-950 text-white py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Quiénes somos</p>
            <h1 className="font-display text-5xl md:text-6xl font-light leading-tight mb-6">
              Más de 15 años<br />
              <span className="italic">transformando sueños</span><br />
              en hogares
            </h1>
            <p className="text-stone-400 text-lg font-light leading-relaxed">
              Somos un equipo de agentes inmobiliarios en Almería con una misión clara:
              ofrecer un servicio cercano, honesto y completamente orientado al cliente.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/imagen-nosotros.jpg"
              alt="Oficina AP Real Estate Services"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { value: 'Transparencia', desc: 'Información clara y honesta en cada paso del proceso.' },
            { value: 'Proximidad', desc: 'Te acompañamos personalmente desde el primer contacto.' },
            { value: 'Resultados', desc: 'Más del 95% de nuestros clientes nos recomiendan.' },
          ].map((item) => (
            <div key={item.value} className="p-8">
              <div className="w-1 h-8 bg-gold mx-auto mb-6" />
              <h3 className="font-display text-2xl font-light text-stone-900 mb-3">{item.value}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-stone-50 py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Lo que hacemos</p>
            <h2 className="section-title">Nuestros servicios</h2>
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

      {/* Team */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">El equipo</p>
          <h2 className="section-title">Personas que te ayudan</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {team.map((person) => (
            <div key={person.name} className="text-center">
              <div className="relative aspect-square overflow-hidden mb-4 max-w-[180px] mx-auto">
                <Image
                  src={person.img}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium text-stone-900">{person.name}</h3>
              <p className="text-stone-400 text-sm mt-1">{person.role}</p>
            </div>
          ))}
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
