"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BsChevronDown, BsWhatsapp } from "react-icons/bs"
import { whatsappLink } from "@/lib/config"
import { viewportConfig } from "@/lib/animations"

const faqs = [
  {
    q: "¿Puedo financiar el auto?",
    a: "Sí. Trabajamos con varias opciones de financiación. Dependiendo de tu situación, te buscamos el crédito que mejor te cierre. Escribinos y te asesoramos sin compromiso.",
  },
  {
    q: "¿Los autos tienen revisión mecánica?",
    a: "Todos los autos que ofrecemos pasan por una inspección antes de publicarse. Te mostramos el estado real del vehículo, sin ocultar nada.",
  },
  {
    q: "¿Aceptan autos usados como parte de pago?",
    a: "Sí, evaluamos tu auto y lo tomamos como parte de pago. Escribinos con la info del vehículo y te damos una valuación rápida.",
  },
  {
    q: "¿Hacen envíos o solo entregan en General Pico?",
    a: "Entregamos en General Pico y coordinamos la logística para toda La Pampa y zonas cercanas. Consultanos según tu ubicación.",
  },
  {
    q: "¿Cómo puedo reservar un auto?",
    a: "Simple: escribinos por WhatsApp, cerramos los detalles y coordinamos la seña para reservarlo. En menos de una hora puede estar apartado para vos.",
  },
  {
    q: "¿Consiguen autos que no están en el stock?",
    a: "Sí. Si tenés en mente un modelo específico que no está en nuestro stock, lo buscamos. También gestionamos importaciones a pedido. Decinos qué querés y arrancamos.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-white/5 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-white/3 transition-colors"
      >
        <span className="text-white font-semibold text-sm">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <BsChevronDown className="text-gray-400" size={16} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-5 pb-4 border-t border-white/5">
              <p className="text-gray-400 text-sm leading-relaxed pt-3">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
        >
          <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Preguntas frecuentes.
          </h2>
          <p className="text-gray-400">Si no encontrás tu respuesta acá, escribinos directamente.</p>
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
        >
          <p className="text-gray-400 mb-4 text-sm">¿Tenés otra pregunta?</p>
          <a
            href={whatsappLink("Hola! Tengo una consulta.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-red-600/40 hover:bg-red-600/10 text-red-400 hover:text-red-300 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
          >
            <BsWhatsapp size={18} />
            Preguntanos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
