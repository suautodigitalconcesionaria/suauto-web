"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BsWhatsapp, BsCheckCircleFill, BsInfoCircle } from "react-icons/bs"
import { whatsappLink } from "@/lib/config"
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations"

// ─── Datos del Centro Prendario ────────────────────────────────────────────────

const LINEAS = [
  {
    titulo: "2026 / 2016",
    cuotas: [
      { plazo: 12, coef: 126.97 },
      { plazo: 15, coef: 110.90 },
      { plazo: 18, coef: 100.56 },
      { plazo: 24, coef:  86.86 },
      { plazo: 30, coef:  80.24 },
      { plazo: 36, coef:  76.36 },
      { plazo: 48, coef:  72.44 },
    ],
  },
  {
    titulo: "2015 / 2013",
    cuotas: [
      { plazo: 12, coef: 137.35 },
      { plazo: 15, coef: 121.66 },
      { plazo: 18, coef: 108.32 },
      { plazo: 24, coef:  94.71 },
      { plazo: 30, coef:  88.54 },
      { plazo: 36, coef:  85.05 },
    ],
  },
  {
    titulo: "UVA — 0KM / 2016",
    cuotas: [
      { plazo: 12, coef: 115.03 },
      { plazo: 15, coef:  98.60 },
      { plazo: 18, coef:  87.86 },
      { plazo: 24, coef:  74.92 },
      { plazo: 30, coef:  67.63 },
      { plazo: 36, coef:  63.13 },
      { plazo: 48, coef:  58.23 },
    ],
  },
]

const MAXIMOS = [
  { modelos: "2026 al 2021", porcentaje: 0.60 },
  { modelos: "2020 al 2016", porcentaje: 0.60 },
  { modelos: "2015 al 2013", porcentaje: 0.55 },
]

const benefits = [
  "Evaluamos tu situación sin burocracia",
  "Gestionamos el crédito por vos",
  "Sin letra chica ni cargos ocultos",
  "Respuesta rápida — sin semanas de espera",
  "Opciones para monotributistas y relación de dependencia",
  "Posibilidad de tomar tu auto como parte de pago",
]

const banks = ["Banco Nación", "Banco Provincia", "Santander", "BBVA", "Macro", "Galicia", "Credicuotas"]

// ─── Formateador ───────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  `$ ${n.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

// ─── Calculadora prendaria ─────────────────────────────────────────────────────

function CalculadoraPrendaria() {
  const [montos, setMontos] = useState<Record<number, string>>({ 0: "", 1: "", 2: "" })
  const [valoresMax, setValoresMax] = useState<Record<number, string>>({ 0: "", 1: "", 2: "" })

  const cuota = (linea: number, coef: number) => {
    const m = parseFloat(montos[linea]?.replace(/\./g, "").replace(",", ".") || "0")
    if (!m || isNaN(m)) return "-"
    return fmt((m / 1000) * coef)
  }

  const maximo = (idx: number) => {
    const v = parseFloat(valoresMax[idx]?.replace(/\./g, "").replace(",", ".") || "0")
    if (!v || isNaN(v)) return "-"
    return fmt(v * MAXIMOS[idx].porcentaje)
  }

  const whatsappMsg = () => {
    const partes = LINEAS.map((l, i) => {
      const m = montos[i]
      if (!m) return null
      return `${l.titulo}: $${m}`
    }).filter(Boolean).join(" | ")
    return `Hola! Quiero consultar financiación prendaria. ${partes ? `Montos: ${partes}.` : ""}`
  }

  return (
    <div className="space-y-6">

      {/* Aviso plazo 48 meses */}
      <div className="flex items-start gap-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3">
        <BsInfoCircle className="text-blue-400 mt-0.5 flex-shrink-0" size={15} />
        <p className="text-blue-300 text-sm font-medium">
          Solo en modelos 2026/2021 se extiende el plazo a 48 meses
        </p>
      </div>

      {/* Porcentajes de financiación */}
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { label: "2026–2021", pct: "60%" },
          { label: "2020–2016", pct: "60%" },
          { label: "2015–2013", pct: "55%" },
        ].map((item) => (
          <div key={item.label} className="bg-[#111] border border-white/5 rounded-xl p-3">
            <p className="text-gray-500 text-xs mb-1">{item.label}</p>
            <p className="text-red-400 font-black text-xl">{item.pct}</p>
            <p className="text-gray-600 text-xs">de financiación</p>
          </div>
        ))}
      </div>

      {/* Tres líneas de crédito */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LINEAS.map((linea, li) => (
          <div key={li} className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-red-600 px-4 py-3">
              <p className="text-white font-black text-sm tracking-wide">{linea.titulo}</p>
            </div>

            {/* Input monto */}
            <div className="px-4 pt-4 pb-2">
              <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                Monto a financiar
              </label>
              <input
                type="number"
                placeholder="Ej: 5000000"
                value={montos[li]}
                onChange={(e) => setMontos({ ...montos, [li]: e.target.value })}
                className="w-full bg-black/40 border border-white/10 focus:border-red-600/50 text-white placeholder-gray-600 rounded-xl px-3 py-2.5 outline-none text-sm transition-colors"
              />
            </div>

            {/* Tabla */}
            <div className="px-2 pb-3">
              <div className="grid grid-cols-3 gap-0 text-xs">
                {/* Header tabla */}
                <div className="bg-red-600/80 px-2 py-1.5 text-white font-bold text-center rounded-tl-lg">PLAZO</div>
                <div className="bg-red-600/80 px-2 py-1.5 text-white font-bold text-center">COEF/$1000</div>
                <div className="bg-red-600/80 px-2 py-1.5 text-white font-bold text-center rounded-tr-lg">CUOTA</div>

                {linea.cuotas.map((row, ri) => (
                  <>
                    <div
                      key={`p${ri}`}
                      className={`px-2 py-2 text-center font-semibold border-b border-white/5 ${
                        montos[li] && !isNaN(parseFloat(montos[li])) ? "text-white" : "text-gray-500"
                      } ${ri % 2 === 0 ? "bg-white/2" : ""}`}
                    >
                      {row.plazo}
                    </div>
                    <div
                      key={`c${ri}`}
                      className={`px-2 py-2 text-center border-b border-white/5 text-gray-400 ${ri % 2 === 0 ? "bg-white/2" : ""}`}
                    >
                      {row.coef.toFixed(2)}
                    </div>
                    <div
                      key={`m${ri}`}
                      className={`px-2 py-2 text-center border-b border-white/5 font-bold text-sm ${
                        montos[li] && !isNaN(parseFloat(montos[li]))
                          ? "text-red-400"
                          : "text-gray-600"
                      } ${ri % 2 === 0 ? "bg-white/2" : ""}`}
                    >
                      {cuota(li, row.coef)}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA WhatsApp */}
      <a
        href={whatsappLink(whatsappMsg())}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-base transition-all hover:shadow-xl hover:shadow-red-600/30"
      >
        <BsWhatsapp size={20} />
        Consultar por esta financiación
      </a>

      <p className="text-gray-600 text-xs text-center">
        * Calculadora Centro Prendario. Los valores son orientativos y pueden variar.
      </p>
    </div>
  )
}

// ─── Página ────────────────────────────────────────────────────────────────────

export default function FinanciacionPage() {
  return (
    <div className="min-h-screen bg-black pt-16">

      {/* Header */}
      <div className="bg-[#0A0A0A] py-14 px-4 border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            className="text-red-500 text-sm font-semibold uppercase tracking-wider mb-2"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          >
            Financiación
          </motion.p>
          <motion.h1
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            Tu auto en cuotas,
            <span className="text-red-600"> sin vueltas.</span>
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          >
            Calculá tu cuota al instante con los valores reales del Centro Prendario.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">

          {/* Columna izquierda: info */}
          <motion.div
            className="lg:col-span-1 lg:sticky lg:top-24"
            variants={staggerContainer} initial="hidden" animate="visible"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <h2 className="text-xl font-black text-white mb-4">¿Cómo lo gestionamos?</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                No te mandamos a un banco solo. Te acompañamos en todo: evaluamos tu situación,
                buscamos la mejor tasa y cerramos el crédito por vos.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-8">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Beneficios</h3>
              <ul className="space-y-3">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                    <BsCheckCircleFill className="text-red-500 mt-0.5 flex-shrink-0" size={14} />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">Entidades</h3>
              <div className="flex flex-wrap gap-2">
                {banks.map((b) => (
                  <span key={b} className="bg-[#111111] border border-white/8 text-gray-400 text-xs px-3 py-1.5 rounded-lg">
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Columna derecha: calculadora */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            <CalculadoraPrendaria />
          </motion.div>
        </div>

        {/* CTA final */}
        <motion.div
          className="mt-16 text-center bg-[#111111] border border-white/5 rounded-2xl p-10"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportConfig}
        >
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            ¿Querés saber si calificás?
          </h2>
          <p className="text-gray-400 mb-6">
            Escribinos, contanos tu situación y te respondemos sin rodeos.
          </p>
          <a
            href={whatsappLink("Hola! Quiero consultar si puedo financiar un auto.")}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-black text-base transition-all hover:shadow-xl hover:shadow-red-600/30"
          >
            <BsWhatsapp size={20} />
            Consultar por financiación
          </a>
        </motion.div>
      </div>
    </div>
  )
}
