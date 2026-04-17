"use client"

import { motion } from "framer-motion"
import { BsWhatsapp } from "react-icons/bs"
import { whatsappLink } from "@/lib/config"
import { viewportConfig } from "@/lib/animations"

export default function FinalCTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Background red glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-red-600/10 rounded-full blur-3xl" />
      </div>

      {/* Top border line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
        >
          <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-4">
            ¿Qué estás esperando?
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
            ¿Te gustó alguno?
            <br />
            <span className="text-red-600">Escribinos ahora.</span>
          </h2>

          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Te respondemos al toque y resolvemos todo en minutos.
            No das vueltas, no perdés tiempo.
          </p>

          <motion.a
            href={whatsappLink("Hola! Estuve viendo sus autos y quiero consultar.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-2xl text-xl font-black transition-all shadow-2xl shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5 active:translate-y-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <BsWhatsapp size={26} />
            Ir a WhatsApp
          </motion.a>

          <p className="mt-5 text-gray-600 text-sm">
            Lunes a Sábado de 9:00 a 18:00 · General Pico, La Pampa
          </p>
        </motion.div>
      </div>
    </section>
  )
}
