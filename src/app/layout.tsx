import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'Pleno Casa | Inmobiliaria en la Costa del Sol',
  description: 'Encuentra tu hogar ideal en la Costa del Sol. Pisos, casas, villas y locales en Marbella, Fuengirola, Mijas y Benalmádena.',
  keywords: 'inmobiliaria, costa del sol, marbella, fuengirola, casas, pisos, villas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${sans.variable} ${cormorant.variable}`}>
      <body className="bg-white text-stone-900 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
