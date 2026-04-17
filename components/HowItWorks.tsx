"use client"

import { motion } from "framer-motion"
import { BsSearch, BsWhatsapp, BsKey } from "react-icons/bs"
import { whatsappLink } from "@/lib/config"
import { staggerContainer, fadeInUp, viewportConfig } from "@/lib/animations"

const steps = [
  {
    number: "01",
    icon: BsSearch,
    title: "Elegís el auto",
    description:
      "Navegá el stock, filtrá por lo que necesitás o contanos qué estás buscando. Sin presión.",
  },
  {
    number: "02",
    icon: BsWhatsapp,
    title: "Nos escribís",
    description:
      "Mandás un mensaje por WhatsApp y te respondemos al toque. Sin formularios, sin esperas, sin bots.",
  },
  {
    number: "03",
    icon: BsKey,
    title: "Venís y manejás",
    description:
      "Cerramos los detalles, coordinamos la entrega y te vas con el auto. Simple, rápido, sin sorpresas.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
        >
          <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-2">
            Proceso
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Así de simple es comprar con nosotros.
          </h2>
          <p className="text-gray-400">Tres pasos. Sin complicaciones.</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="relative bg-[#111111] border border-white/5 hover:border-red-600/20 rounded-2xl p-7 text-center transition-all group"
            >
              {/* Number */}
              <div className="text-red-600/20 font-black text-6xl leading-none mb-4 select-none">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 bg-red-600/10 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-red-600/20 transition-colors">
                <step.icon className="text-red-500" size={26} />
              </div>

              <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
        >
          <a
            href={whatsappLink("Hola! Quiero empezar a buscar un auto.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-xl hover:shadow-red-600/30 text-base"
          >
            <BsWhatsapp size={20} />
            Empezá ahora
          </a>
        </motion.div>
      </div>
    </section>
  )
}
