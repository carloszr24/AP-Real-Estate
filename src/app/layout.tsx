import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export const metadata: Metadata = {
  title: 'Alessandra Maggi | Agente inmobiliaria en Almería',
  description: 'Servicio inmobiliario personalizado en Almería y Roquetas de Mar para compra, venta e inversión.',
  keywords: 'alessandra maggi, agente inmobiliaria, almería, roquetas de mar, pisos, casas, venta, compra',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={sans.variable}>
      <body className="bg-white text-stone-900 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
