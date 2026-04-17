"use client"

import { motion } from "framer-motion"
import { BsWhatsapp, BsShieldCheck, BsCash, BsStarFill } from "react-icons/bs"
import { whatsappLink } from "@/lib/config"
import { staggerContainer, fadeInUp, viewportConfig } from "@/lib/animations"

const benefits = [
  {
    icon: BsWhatsapp,
    title: "Respondemos al toque",
    description:
      "Escribís y te atendemos en minutos. Persona real, no un bot. Sin formularios que nadie lee.",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    icon: BsShieldCheck,
    title: "Transparencia total",
    description:
      "Te decimos el estado real del auto, sin sorpresas. El historial, los service, todo. Sin letra chica.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: BsCash,
    title: "Financiación accesible",
    description:
      "Te buscamos la mejor opción de crédito según tu situación. Sin burocracia innecesaria.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    icon: BsStarFill,
    title: "Trato humano",
    description:
      "No somos una concesionaria fría. Somos de General Pico y tratamos a cada cliente como si fuera conocido.",
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
]

export default function WhyUs() {
  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
        >
          <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-2">
            Por qué elegirnos
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            No somos cualquier concesionaria.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Somos de General Pico. Conocemos a nuestros clientes. Eso hace la diferencia.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="flex gap-4 bg-[#111111] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all group"
            >
              <div className={`flex-shrink-0 w-12 h-12 ${b.bg} rounded-xl flex items-center justify-center`}>
                <b.icon className={`${b.color}`} size={22} />
              </div>
              <div>
                <h3 className="text-white font-bold text-base mb-1.5">{b.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        
      </div>
    </section>
  )
}
