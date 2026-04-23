export const runtime = 'edge'

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import LoadingScreen from "@/components/LoadingScreen"
import WelcomeVideo from "@/components/WelcomeVideo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SuAuto | Autos en General Pico, La Pampa",
  description:
    "Concesionaria de autos en General Pico, La Pampa. Autos usados, financiación y autos importados a pedido. Contactanos por WhatsApp.",
  keywords: "autos usados, concesionaria, General Pico, La Pampa, financiación, importados, pickup, suv",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "SuAuto | Autos en General Pico",
    description: "Autos usados, financiación y autos importados a pedido. Atención inmediata por WhatsApp.",
    locale: "es_AR",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <LoadingScreen />
        <WelcomeVideo />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
