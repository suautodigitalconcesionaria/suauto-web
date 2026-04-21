"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── Coordenadas de ciudades ───────────────────────────────────────────────────
const SUAUTO_COORDS = { lat: -35.6585, lon: -63.7517 }

interface City {
  name: string
  lat: number
  lon: number
  province: string
}

const CITIES: City[] = [
  { name: "San Miguel de Tucumán", lat: -26.8083, lon: -65.2176, province: "Tucumán" },
  { name: "Pres. Roque Sáenz Peña", lat: -26.7833, lon: -60.45, province: "Chaco" },
  { name: "H. Renancó", lat: -34.0333, lon: -64.3833, province: "Córdoba" },
  { name: "Mattaldi", lat: -34.47, lon: -64.175, province: "Córdoba" },
  { name: "Del Campillo", lat: -34.3833, lon: -64.4833, province: "Córdoba" },
  { name: "San Rafael", lat: -34.6177, lon: -68.3301, province: "Mendoza" },
  { name: "San Luis", lat: -33.295, lon: -66.3356, province: "San Luis" },
  { name: "Plottier", lat: -38.9667, lon: -68.2333, province: "Neuquén" },
  { name: "Capital Neuquén", lat: -38.9516, lon: -68.0591, province: "Neuquén" },
  { name: "Gral. Roca", lat: -39.0333, lon: -67.5833, province: "Río Negro" },
  { name: "Villa Regina", lat: -39.1, lon: -67.0667, province: "Río Negro" },
  { name: "Concepción del Uruguay", lat: -32.4833, lon: -58.2333, province: "Entre Ríos" },
  { name: "La Plata", lat: -34.9205, lon: -57.9536, province: "Buenos Aires" },
  { name: "Carhué", lat: -37.1833, lon: -62.75, province: "Buenos Aires" },
  { name: "Hudson", lat: -34.7833, lon: -58.1333, province: "Buenos Aires" },
  { name: "Bahía Blanca", lat: -38.7196, lon: -62.2724, province: "Buenos Aires" },
  { name: "Pigüé", lat: -37.6, lon: -62.4, province: "Buenos Aires" },
  { name: "Salliqueló", lat: -36.75, lon: -62.9667, province: "Buenos Aires" },
  { name: "Casbas", lat: -36.6333, lon: -62.4833, province: "Buenos Aires" },
  { name: "Villa Maza", lat: -37.6, lon: -63.35, province: "Buenos Aires" },
  { name: "Piedritas", lat: -37.23, lon: -63.05, province: "Buenos Aires" },
  { name: "Gral. Villegas", lat: -35.0333, lon: -63.0167, province: "Buenos Aires" },
  { name: "Trenque Lauquen", lat: -35.9667, lon: -62.7333, province: "Buenos Aires" },
  { name: "González Moreno", lat: -35.48, lon: -62.28, province: "Buenos Aires" },
  { name: "Rancul", lat: -35.03, lon: -64.69, province: "La Pampa" },
  { name: "Intendente Alvear", lat: -35.24, lon: -63.57, province: "La Pampa" },
  { name: "Bdo. Larroudé", lat: -35.63, lon: -63.58, province: "La Pampa" },
  { name: "Trenel", lat: -35.67, lon: -64.13, province: "La Pampa" },
  { name: "Eduardo Castex", lat: -35.92, lon: -64.28, province: "La Pampa" },
  { name: "Sarah", lat: -35.74, lon: -64.52, province: "La Pampa" },
  { name: "Lonquimay", lat: -36.46, lon: -64.60, province: "La Pampa" },
  { name: "Parera", lat: -35.14, lon: -64.51, province: "La Pampa" },
  { name: "Ing. Luiggi", lat: -35.43, lon: -64.47, province: "La Pampa" },
  { name: "Dorila", lat: -35.73, lon: -64.07, province: "La Pampa" },
  { name: "Emb. Martini", lat: -36.12, lon: -64.95, province: "La Pampa" },
  { name: "Telén", lat: -36.27, lon: -65.52, province: "La Pampa" },
  { name: "Speluzzi", lat: -35.50, lon: -63.76, province: "La Pampa" },
  { name: "La Maruja", lat: -35.67, lon: -64.97, province: "La Pampa" },
  { name: "Santa Isabel", lat: -36.22, lon: -66.93, province: "La Pampa" },
  { name: "Quemú Quemú", lat: -36.05, lon: -63.57, province: "La Pampa" },
  { name: "Realicó", lat: -35.03, lon: -64.24, province: "La Pampa" },
  { name: "Santa Rosa", lat: -36.62, lon: -64.28, province: "La Pampa" },
  { name: "Victorica", lat: -36.22, lon: -65.43, province: "La Pampa" },
  { name: "Guatraché", lat: -37.67, lon: -63.53, province: "La Pampa" },
  { name: "Puerto San Julián", lat: -49.30, lon: -67.72, province: "Santa Cruz" },
  { name: "El Calafate", lat: -50.34, lon: -72.26, province: "Santa Cruz" },
  { name: "Caleta Olivia", lat: -46.43, lon: -67.52, province: "Santa Cruz" },
  { name: "San Juan", lat: -31.5375, lon: -68.5364, province: "San Juan" },
  { name: "Rufino", lat: -34.2667, lon: -62.7167, province: "Santa Fe" },
  { name: "Villa Mercedes", lat: -33.6833, lon: -65.4667, province: "San Luis" },
  { name: "Unión", lat: -33.2833, lon: -62.3167, province: "Córdoba" },
  { name: "Gral. Alvear", lat: -34.9833, lon: -67.6833, province: "Mendoza" },
  { name: "Bariloche", lat: -41.1335, lon: -71.3103, province: "Río Negro" },
  { name: "Viedma", lat: -40.8135, lon: -62.9967, province: "Río Negro" },
]

const PROVINCE_COUNT = new Set(CITIES.map((c) => c.province)).size

// ─── Conversión lat/lon → coordenadas SVG ─────────────────────────────────────
function toSVG(lat: number, lon: number): [number, number] {
  const x = 610 + (lon + 58.38) * 20.66
  const y = 349 - (lat + 34.61) * 28.5
  return [x, y]
}

// ─── Tipos para paths del SVG ──────────────────────────────────────────────────
interface ProvincePath {
  id: string
  name: string
  d: string
}

// ─── Componente principal ──────────────────────────────────────────────────────
export default function ArgentinaMap() {
  const [provinces, setProvinces] = useState<ProvincePath[]>([])
  const [tooltip, setTooltip] = useState<{ title: string; subtitle?: string } | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    fetch("/argentina.svg")
      .then((r) => r.text())
      .then((svgText) => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(svgText, "image/svg+xml")
        const paths = doc.querySelectorAll("path[id][name]")
        const data: ProvincePath[] = Array.from(paths).map((p) => ({
          id: p.getAttribute("id") || "",
          name: p.getAttribute("name") || "",
          d: p.getAttribute("d") || "",
        }))
        setProvinces(data)
        setTimeout(() => setReady(true), 100)
      })
      .catch(() => {})
  }, [])

  const suautoSVG = toSVG(SUAUTO_COORDS.lat, SUAUTO_COORDS.lon)

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Glows ambientales */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[700px] bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-48 h-48 bg-red-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* ── Columna izquierda: info ───────────────────────────────────── */}
          <motion.div
            className="lg:col-span-2 lg:sticky lg:top-24 flex flex-col gap-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div>
              <p className="text-red-500 text-sm font-semibold uppercase tracking-wider mb-2">
                Alcance nacional
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
                Llegamos a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                  todo el país
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Desde General Pico, La Pampa, vendimos autos en{" "}
                <span className="text-white font-semibold">{CITIES.length} destinos</span>{" "}
                a lo largo y ancho de Argentina.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-3"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {[
                { value: CITIES.length.toString(), label: "Destinos" },
                { value: PROVINCE_COUNT.toString(), label: "Provincias" },
                { value: "100%", label: "Confianza" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#111111] border border-white/5 rounded-2xl p-4 text-center"
                >
                  <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-red-600 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Nota al pie */}
            <motion.p
              className="text-gray-600 text-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Desde General Pico, La Pampa — llegamos a donde estés.
            </motion.p>
          </motion.div>

          {/* ── Columna derecha: mapa ─────────────────────────────────────── */}
          <motion.div
            className="lg:col-span-3 relative"
            onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative rounded-3xl overflow-hidden border border-red-600/10 bg-[#0a0a0a] shadow-2xl shadow-black/60">
              {/* Grid de fondo */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: ready ? 1 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <svg
                  viewBox="0 0 1000 1000"
                  className="w-full h-auto"
                  style={{ maxHeight: "85vh" }}
                >
                  <defs>
                    <filter id="glow-city">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glow-suauto">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Provincias */}
                  {provinces.map((prov) => (
                    <path
                      key={prov.id}
                      d={prov.d}
                      fill="#1a1a1a"
                      stroke="#ffffff22"
                      strokeWidth={1}
                      style={{ cursor: "default", transition: "fill 0.2s" }}
                      onMouseEnter={(e) => {
                        ;(e.target as SVGPathElement).style.fill = "#2a2a2a"
                        setTooltip({ title: prov.name, subtitle: "Provincia" })
                      }}
                      onMouseLeave={(e) => {
                        ;(e.target as SVGPathElement).style.fill = "#1a1a1a"
                        setTooltip(null)
                      }}
                    />
                  ))}

                  {/* Líneas desde SuAuto a cada ciudad */}
                  {ready && CITIES.map((city, i) => {
                    const [cx, cy] = toSVG(city.lat, city.lon)
                    return (
                      <motion.line
                        key={`line-${i}`}
                        x1={suautoSVG[0]}
                        y1={suautoSVG[1]}
                        x2={cx}
                        y2={cy}
                        stroke="#ef4444"
                        strokeWidth={0.4}
                        strokeOpacity={0.2}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          pathLength: { delay: 0.5 + i * 0.03, duration: 1, ease: "easeOut" },
                          opacity: { delay: 0.5 + i * 0.03, duration: 0.3 },
                        }}
                      />
                    )
                  })}

                  {/* Puntos de ciudades */}
                  {ready && CITIES.map((city, i) => {
                    const [cx, cy] = toSVG(city.lat, city.lon)
                    return (
                      <g
                        key={`city-${i}`}
                        onMouseEnter={() => setTooltip({ title: city.name, subtitle: city.province })}
                        onMouseLeave={() => setTooltip(null)}
                        style={{ cursor: "pointer" }}
                      >
                        {/* Anillo pulsante */}
                        <motion.circle
                          cx={cx} cy={cy} r={5}
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth={0.6}
                          animate={{ r: [4, 10], opacity: [0.6, 0] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: (i % 12) * 0.2, ease: "easeOut" }}
                        />
                        {/* Punto */}
                        <motion.circle
                          cx={cx} cy={cy} r={2.8}
                          fill="#ef4444"
                          filter="url(#glow-city)"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3 + i * 0.03, duration: 0.4, ease: "backOut" }}
                          style={{ transformOrigin: `${cx}px ${cy}px` }}
                        />
                      </g>
                    )
                  })}

                  {/* SuAuto marker */}
                  {ready && (
                    <g
                      onMouseEnter={() => setTooltip({ title: "SuAuto", subtitle: "General Pico, La Pampa" })}
                      onMouseLeave={() => setTooltip(null)}
                      style={{ cursor: "pointer" }}
                    >
                      <motion.circle
                        cx={suautoSVG[0]} cy={suautoSVG[1]} r={10}
                        fill="none" stroke="#ef4444" strokeWidth={0.7}
                        animate={{ r: [7, 18], opacity: [0.6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      />
                      <motion.circle
                        cx={suautoSVG[0]} cy={suautoSVG[1]} r={7}
                        fill="none" stroke="#ef4444" strokeWidth={0.9}
                        animate={{ r: [5, 13], opacity: [0.7, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6, ease: "easeOut" }}
                      />
                      <circle cx={suautoSVG[0]} cy={suautoSVG[1]} r={4.5} fill="#ef4444" filter="url(#glow-suauto)" />
                      <rect x={suautoSVG[0] - 20} y={suautoSVG[1] - 24} width={40} height={12} rx={3} fill="#ef4444" fillOpacity={0.92} />
                      <text
                        x={suautoSVG[0]} y={suautoSVG[1] - 15}
                        textAnchor="middle"
                        fill="white"
                        fontSize={7}
                        fontWeight="bold"
                        fontFamily="system-ui, sans-serif"
                        style={{ pointerEvents: "none" }}
                      >
                        SuAuto
                      </text>
                    </g>
                  )}
                </svg>
              </motion.div>

              {/* Skeleton mientras carga */}
              {!ready && (
                <div className="flex items-center justify-center h-[60vh]">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">Cargando mapa...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {tooltip && (
                <motion.div
                  className="fixed z-50 pointer-events-none"
                  style={{ left: mousePos.x + 14, top: mousePos.y - 56 }}
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.12 }}
                >
                  <div className="bg-[#0a0a0a]/95 backdrop-blur-md border border-red-500/30 rounded-xl px-4 py-2.5 shadow-xl">
                    <p className="text-white text-sm font-bold">{tooltip.title}</p>
                    {tooltip.subtitle && (
                      <p className="text-red-400 text-xs mt-0.5">{tooltip.subtitle}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
