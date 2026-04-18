"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { BsWhatsapp, BsCheckCircleFill } from "react-icons/bs"
import { whatsappLink } from "@/lib/config"
import { fadeInUp, slideInLeft, slideInRight, viewportConfig } from "@/lib/animations"

const benefits = [
  "Búsqueda personalizada del auto que querés",
  "Gestión completa de la importación",
  "Asesoramiento en todo el proceso",
  "Transparencia total en costos y tiempos",
]

export default function Importados() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&q=80"
          alt="Autos importados premium"
          fill
          className="object-cover object-center opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      {/* Red glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-600/15 border border-red-600/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-red-400 text-sm font-semibold uppercase tracking-wider">
                Servicio exclusivo
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
              ¿Buscás algo
              <br />
              <span className="text-red-600">distinto?</span>
            </h2>

            <p className="text-xl text-gray-300 mb-3 font-medium">
              Te conseguimos autos importados a pedido. Sin vueltas.
            </p>

            <p className="text-gray-400 leading-relaxed mb-8">
              Si tenés en mente un modelo específico —uno que no está en Argentina o que es difícil
              de conseguir— lo buscamos por vos. Importamos, gestionamos y te lo entregamos listo para manejar.
            </p>

            {/* Benefits */}
            <motion.ul className="space-y-3 mb-10">
              {benefits.map((b, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportConfig}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <BsCheckCircleFill className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
                  <span>{b}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                href={whatsappLink("Hola! Estoy buscando un auto importado. ¿Me pueden ayudar?")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-7 py-4 rounded-xl font-bold text-base transition-all hover:shadow-2xl hover:shadow-red-600/40"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BsWhatsapp size={20} />
                Quiero un importado
              </motion.a>
             
            </div>
          </motion.div>

          {/* Right: Image showcase */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="relative"
          >
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/importados.webp"
                alt="Auto importado premium"
                className="rounded-3xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />

              {/* Floating card */}
              <motion.div
                className="absolute bottom-5 left-5 right-5 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ delay: 0.5 }}
              >
                <p className="text-white font-bold text-sm mb-1">
                  "Conseguimos lo que nadie tiene en Argentina"
                </p>
                <p className="text-gray-400 text-xs">
                  BMW, Mercedes, Audi, Porsche y más — a pedido, con gestión completa.
                </p>
              </motion.div>
            </div>

            {/* Red accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-red-600/30 rounded-2xl pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-red-600/20 rounded-xl blur-xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
