'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'

const services = [
  {
    num: '01',
    title: 'Compra y venta',
    summary: 'Proceso completo, de principio a firma.',
    detail:
      'Gestiono todo el proceso de compraventa desde el primer contacto hasta la firma en notaría. Negocio en tu nombre para obtener las mejores condiciones posibles, con total transparencia en cada paso.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.2}>
        <path d="M6 22 L20 8 L34 22" />
        <path d="M10 22v10h7v-7h6v7h7V22" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Valoración de inmuebles',
    summary: 'Precio real, sin especulación.',
    detail:
      'Realizo un estudio de mercado riguroso para conocer el valor real de tu propiedad en Almería. Sin compromisos, con total transparencia y datos actualizados de la zona.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.2}>
        <rect x="6" y="10" width="28" height="22" rx="1" />
        <path d="M13 22 l5 5 9-10" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Asesoramiento jurídico',
    summary: 'Contratos y registros revisados.',
    detail:
      'Revisión de contratos, verificación registral y acompañamiento legal en todo el proceso. Tu seguridad jurídica es mi prioridad y me aseguro de que cada documento esté en orden.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.2}>
        <path d="M14 6 h12 v4 H14z" />
        <rect x="8" y="10" width="24" height="26" rx="1" />
        <path d="M14 20 h12 M14 25 h8" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Gestión post-venta',
    summary: 'Contigo también después del cierre.',
    detail:
      'Mi servicio no termina con la firma. Te ayudo con cambios de suministros, reformas y cualquier gestión posterior a la compraventa para que tu transición sea completamente tranquila.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.2}>
        <circle cx="20" cy="20" r="13" />
        <path d="M20 12 v8 l5 4" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Financiación',
    summary: 'La hipoteca que mejor te encaja.',
    detail:
      'Colaboro con las principales entidades bancarias para conseguirte la mejor hipoteca adaptada a tu situación personal y financiera. Te acompaño en el proceso de principio a fin.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.2}>
        <rect x="6" y="12" width="28" height="20" rx="1" />
        <path d="M6 18 h28 M14 24 h4 M22 24 h4" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Inversión internacional',
    summary: 'Compradores de todo el mundo.',
    detail:
      'Asesoramiento especializado para compradores internacionales interesados en la Costa de Almería. Atención personalizada en español, inglés y francés, con conocimiento del mercado local.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.2}>
        <circle cx="20" cy="20" r="13" />
        <path d="M20 7 C14 12 14 28 20 33 M20 7 C26 12 26 28 20 33" />
        <path d="M7 20 h26" />
      </svg>
    ),
  },
]

export default function SobreNosotrosPage() {
  const [active, setActive] = useState(0)
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false })
  const zoneRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent) {
    const rect = zoneRef.current?.getBoundingClientRect()
    if (!rect) return
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true })
  }

  return (
    <div className="pt-16">
      {/* ── Servicios ── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-14">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Servicios</p>
            <h1 className="section-title max-w-xl">Servicios inmobiliarios en Almería</h1>
            <p className="text-stone-500 text-base mt-5 max-w-xl leading-relaxed">
              Te acompaño de forma cercana y personalizada para comprar, vender o invertir
              con seguridad en Roquetas de Mar y toda Almería.
            </p>
          </div>

          {/* Accordion + Panel */}
          <div
            ref={zoneRef}
            className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 border border-stone-100 cursor-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setCursor((c) => ({ ...c, visible: false }))}
          >
            {/* Custom cursor dot */}
            {cursor.visible && (
              <span
                className="pointer-events-none absolute z-50 w-10 h-10 rounded-full bg-gold/20 border border-gold -translate-x-1/2 -translate-y-1/2 transition-none"
                style={{ left: cursor.x, top: cursor.y }}
              />
            )}

            {/* Left: list */}
            <div className="divide-y divide-stone-100 border-r border-stone-100">
              {services.map((s, i) => (
                <button
                  key={s.num}
                  onClick={() => setActive(i)}
                  className={`w-full text-left px-8 py-7 flex items-center gap-6 group transition-colors duration-200 ${
                    active === i ? 'bg-stone-50' : 'hover:bg-stone-50/60'
                  }`}
                >
                  {/* Active bar */}
                  <span
                    className={`shrink-0 w-0.5 h-8 transition-all duration-300 ${
                      active === i ? 'bg-gold' : 'bg-transparent'
                    }`}
                  />
                  <span
                    className={`text-xs font-mono tabular-nums transition-colors duration-200 ${
                      active === i ? 'text-gold' : 'text-stone-300 group-hover:text-stone-400'
                    }`}
                  >
                    {s.num}
                  </span>
                  <div>
                    <p
                      className={`text-base font-medium transition-colors duration-200 ${
                        active === i ? 'text-stone-900' : 'text-stone-600 group-hover:text-stone-800'
                      }`}
                    >
                      {s.title}
                    </p>
                    <p className="text-sm text-stone-400 mt-0.5">{s.summary}</p>
                  </div>
                  {/* Arrow */}
                  <span
                    className={`ml-auto shrink-0 transition-transform duration-200 ${
                      active === i ? 'translate-x-0 text-gold' : '-translate-x-1 text-stone-200 group-hover:text-stone-400'
                    }`}
                  >
                    →
                  </span>
                </button>
              ))}
            </div>

            {/* Right: detail panel */}
            <div className="flex flex-col justify-between p-10 lg:p-14 min-h-[360px] bg-stone-50">
              <div key={active} className="animate-fade-in">
                <div className="text-stone-300 mb-8">{services[active].icon}</div>
                <p className="text-gold text-xs tracking-[0.28em] uppercase mb-3">{services[active].num}</p>
                <h2 className="text-2xl md:text-3xl font-display font-light text-stone-900 mb-5">
                  {services[active].title}
                </h2>
                <p className="text-stone-600 text-base leading-relaxed max-w-sm">
                  {services[active].detail}
                </p>
              </div>
              <Link
                href="/contacto"
                className="mt-10 self-start btn-primary text-xs px-7 py-3"
              >
                Contactar →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sobre mí ── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end">
            {/* Left: text + RE/MAX badge */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Alessandra Maggi</p>
                <h2 className="section-title mb-2">Sobre mí</h2>
                <p className="text-stone-500 text-base md:text-lg font-medium mb-8">Agente asociada RE/MAX en Almería</p>

                <div className="space-y-6 text-stone-600 text-lg leading-relaxed mb-10">
                  <p>
                    Soy agente inmobiliaria especializada en Almería, y mi forma de trabajar se basa
                    en la cercanía, la transparencia y una visión estratégica de cada operación.
                    Mi prioridad es que cada cliente se sienta acompañado con claridad y confianza
                    desde el primer contacto.
                  </p>
                  <p>
                    Trabajo cada proceso de principio a fin: análisis realista del mercado, estrategia
                    de comercialización y negociación orientada a proteger tus intereses y maximizar
                    el valor de cada decisión.
                  </p>
                  <p>
                    Como agente asociada RE/MAX, he reforzado mi método con formación específica en
                    comercialización y cierre, captación en exclusiva, trabajo con compradores y el
                    modelo profesional del agente inmobiliario RE/MAX. Ese enfoque me permite ofrecer
                    un servicio sólido, personalizado y enfocado en resultados.
                  </p>
                </div>

                {/* RE/MAX badge */}
                <div className="mt-6">
                  <a
                    href="https://www.remax.es/buscador-de-agentes/almeria/roquetas-de-mar/todos/alessandra-maggi-18639/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/images/remax.certified-agent.png"
                      alt="RE/MAX Certified Agent"
                      width={240}
                      height={120}
                      className="h-auto w-56 object-contain hover:opacity-80 transition-opacity"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: photo */}
            <div className="relative w-full max-w-[680px] ml-auto">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/alessandra-maggi.png"
                  alt="Alessandra Maggi, agente inmobiliaria en Almería"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
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
