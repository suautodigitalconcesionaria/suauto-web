"use client"

import { motion } from "framer-motion"
import BeholdWidget from "@/components/BeholdWidget"
import {
  BsWhatsapp,
  BsInstagram,
  BsTelephone,
  BsEnvelope,
  BsGeoAlt,
  BsClock,
} from "react-icons/bs"
import { SiTiktok } from "react-icons/si"
import { HiArrowRight } from "react-icons/hi"
import {
  whatsappLink,
  BUSINESS_PHONE,
  BUSINESS_EMAIL,
  BUSINESS_HOURS,
  BUSINESS_ADDRESS,
  BUSINESS_INSTAGRAM,
} from "@/lib/config"
import { staggerContainer, fadeInUp, viewportConfig } from "@/lib/animations"

const contactItems = [
  {
    icon: BsWhatsapp,
    label: "WhatsApp",
    value: BUSINESS_PHONE,
    href: whatsappLink(),
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
    cta: "Escribir ahora",
  },
  {
    icon: BsEnvelope,
    label: "Email",
    value: BUSINESS_EMAIL,
    href: `mailto:${BUSINESS_EMAIL}`,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    cta: "Enviar email",
  },
  {
    icon: BsGeoAlt,
    label: "Ubicación",
    value: BUSINESS_ADDRESS,
    href: "#mapa",
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
    cta: "Ver en mapa",
  },
  {
    icon: BsClock,
    label: "Horario",
    value: BUSINESS_HOURS,
    href: null,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
    cta: null,
  },
]


export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-black pt-16">

      {/* Header */}
      <div className="bg-[#0A0A0A] py-14 px-4 border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            className="text-red-500 text-sm font-semibold uppercase tracking-wider mb-2"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          >
            Contacto
          </motion.p>
          <motion.h1
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            Hablemos.
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          >
            La forma más rápida es por WhatsApp. Te respondemos en minutos.
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">

     
        {/* Contact grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
        >
          {contactItems.map((item, i) => (
            <motion.div
              key={i} variants={fadeInUp}
              className={`bg-[#111111] border ${item.border} hover:border-opacity-50 rounded-2xl p-6 transition-all group`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <item.icon className={item.color} size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-white font-semibold text-sm">{item.value}</p>
                  {item.href && item.cta && (
                    <a
                      href={item.href} target="_blank" rel="noopener noreferrer"
                      className={`${item.color} text-xs font-medium mt-2 inline-flex items-center gap-1 hover:underline`}
                    >
                      {item.cta} <HiArrowRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mapa */}
        <motion.div
          id="mapa"
          className="rounded-2xl overflow-hidden border border-white/5 mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportConfig}
        >
          <div className="bg-[#111111] h-72 flex flex-col items-center justify-center gap-4">
            <BsGeoAlt className="text-red-500" size={40} />
            <div className="text-center">
              <p className="text-white font-bold mb-1">General Pico, La Pampa</p>
              <p className="text-gray-500 text-sm mb-2">
                Reemplazá este bloque con el embed de Google Maps
              </p>
              <a
                href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                className="text-red-500 text-sm font-medium hover:underline inline-flex items-center gap-1"
              >
                Ver en Google Maps <HiArrowRight size={12} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Sección Redes Sociales ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig} transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <p className="text-red-500 text-sm font-semibold uppercase tracking-wider mb-2">Redes sociales</p>
            <h2 className="text-3xl font-black text-white">Seguinos y no te perdas nada</h2>
            <p className="text-gray-400 mt-2 text-sm">Publicamos autos nuevos, ofertas y novedades todos los días.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── Card Instagram — feed real con Behold ── */}
            <motion.div
              className="bg-[#111111] border border-white/8 rounded-2xl overflow-hidden flex flex-col"
              whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Header */}
              <div className="p-5 border-b border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 via-pink-500 to-orange-400 p-0.5 flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-[#111] flex items-center justify-center">
                    <BsInstagram className="text-white" size={16} />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">suauto.concesionaria</p>
                  <p className="text-gray-500 text-xs">Instagram</p>
                </div>
                <a
                  href={BUSINESS_INSTAGRAM} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-gradient-to-r from-pink-600 to-orange-500 hover:opacity-90 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                >
                  <BsInstagram size={12} />
                  Seguir
                </a>
              </div>

              {/* Widget real de Behold */}
              <div className="p-3 flex-1">
                <BeholdWidget feedId="ra7GnFgFJMMpXFUPY6A0" />
              </div>

              {/* Footer */}
              <a
                href={BUSINESS_INSTAGRAM} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 text-pink-400 hover:text-pink-300 text-sm font-semibold transition-colors border-t border-white/5 group"
              >
                <BsInstagram size={15} />
                Ver todo el perfil
                <HiArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* ── Card TikTok ── */}
            <motion.div
              className="bg-[#111111] border border-white/8 rounded-2xl overflow-hidden flex flex-col"
              whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-black border border-white/10 flex items-center justify-center flex-shrink-0">
                  <SiTiktok className="text-white" size={26} />
                </div>
                <div>
                  <p className="text-white font-bold">@suauto.concesionaria</p>
                  <p className="text-gray-500 text-xs mt-0.5">Autos, novedades y más 🚗</p>
                </div>
              </div>

              {/* Contenido */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  {[
                    { emoji: "🚗", text: "Recorridos de autos nuevos en stock" },
                    { emoji: "💰", text: "Tips de financiación y precios" },
                    { emoji: "🔧", text: "Detalles técnicos y comparativas" },
                    { emoji: "📍", text: "Novedades desde General Pico" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xl">{item.emoji}</span>
                      <p className="text-gray-300 text-sm">{item.text}</p>
                    </div>
                  ))}
                </div>

                <a
                  href="https://tiktok.com/@suauto.concesionaria"
                  target="_blank" rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black font-bold py-3.5 rounded-xl text-sm transition-all group"
                >
                  <SiTiktok size={16} />
                  Seguirnos en TikTok
                  <HiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

          </div>

         
        </motion.div>

      </div>
    </div>
  )
}
