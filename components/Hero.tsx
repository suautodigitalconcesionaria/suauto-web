"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { BsWhatsapp, BsChevronDown } from "react-icons/bs"
import { whatsappLink } from "@/lib/config"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
          alt="Auto premium"
          fill
          className="object-cover object-center opacity-35"
          priority
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Left accent line */}
      <motion.div
        className="absolute left-0 top-1/4 w-1 h-32 bg-red-600 rounded-r-full"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
      />

      {/* Decorative red circle blur */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-96 h-96 bg-red-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 rounded-full px-4 py-1.5 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 text-sm font-semibold">General Pico, La Pampa</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-5"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            El auto que
            <br />
            buscás está
            <br />
            <span className="text-red-600">acá.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed max-w-lg"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Elegís, nos escribís por WhatsApp y lo resolvemos en minutos.
            Sin vueltas, sin formularios, sin esperas.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <a
              href={whatsappLink("Hola! Quiero consultar sobre un auto. ¿Qué tienen disponible?")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all hover:shadow-2xl hover:shadow-red-600/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <BsWhatsapp size={22} className="group-hover:scale-110 transition-transform" />
              Hablanos por WhatsApp
            </a>
            <Link
              href="/stock"
              className="flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all backdrop-blur-sm"
            >
              Ver autos disponibles
            </Link>
          </motion.div>

          {/* Social proof line */}
          <motion.div
            className="mt-10 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex -space-x-2">
              {["A", "M", "C", "L"].map((letter, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-black flex items-center justify-center text-xs font-bold text-white"
                >
                  {letter}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-400 text-xs">+500 clientes satisfechos en todo el país</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <span className="text-xs uppercase tracking-[0.2em] font-medium">Scrolleá</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <BsChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
