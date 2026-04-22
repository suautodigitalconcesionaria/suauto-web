"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { HiSearch } from "react-icons/hi"
import { BsWhatsapp, BsSliders } from "react-icons/bs"
import { HiX } from "react-icons/hi"
import type { Car } from "@/lib/cars"
import { whatsappLink } from "@/lib/config"
import CarCard from "./CarCard"
import { staggerContainer, viewportConfig } from "@/lib/animations"

const TRANSMISSIONS = ["Todos", "Manual", "Automático"]
const TYPES = ["Todos", "Usado", "Nuevo"]

interface Props {
  cars: Car[]
}

export default function StockClient({ cars }: Props) {
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get("q") ?? "")
  const [category, setCategory] = useState(() => {
    const cat = searchParams.get("cat")
    if (!cat) return "Todos"
    return CATEGORIES.find(c => c.toLowerCase() === cat.toLowerCase()) ?? "Todos"
  })
  const [fuel, setFuel] = useState(() => {
    const f = searchParams.get("fuel")
    if (!f) return "Todos"
    return FUELS.find(fu => fu.toLowerCase() === f.toLowerCase()) ?? "Todos"
  })
  const [transmission, setTransmission] = useState("Todos")
  const [type, setType] = useState("Todos")
  const [sortBy, setSortBy] = useState("default")
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Opciones dinámicas según los datos reales de Airtable
  const CATEGORIES = useMemo(() => {
    const vals = Array.from(new Set(cars.map(c => c.category).filter(Boolean)))
    return ["Todos", ...vals]
  }, [cars])

  const FUELS = useMemo(() => {
    const vals = Array.from(new Set(cars.map(c => c.fuel).filter(Boolean)))
    return ["Todos", ...vals]
  }, [cars])

  const filtered = useMemo(() => {
    let result = [...cars]

    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        c =>
          c.brand.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.version.toLowerCase().includes(q)
      )
    }

    if (category !== "Todos") {
      result = result.filter(c => c.category === category)
    }

    if (fuel !== "Todos") result = result.filter(c => c.fuel === fuel)
    if (transmission !== "Todos") result = result.filter(c => c.transmission === transmission)

    if (type !== "Todos") {
      const t = type.toLowerCase()
      result = result.filter(c => c.type === t || (t === "stock" && c.type === "stock"))
    }

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price)
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price)
    if (sortBy === "year-desc") result.sort((a, b) => b.year - a.year)
    if (sortBy === "km-asc") result.sort((a, b) => a.km - b.km)

    return result
  }, [cars, query, category, fuel, transmission, type, sortBy])

  return (
    <>
      {/* Filtros sticky */}
      <div className="bg-[#0D0D0D] border-b border-white/5 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">

          {/* Fila principal: búsqueda + botón filtros (mobile) / todos los filtros (desktop) */}
          <div className="flex gap-2">
            {/* Búsqueda */}
            <div className="relative flex-1">
              <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={17} />
              <input
                type="text"
                placeholder="Marca o modelo..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full bg-[#111111] border border-white/10 focus:border-red-600/40 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 outline-none transition-colors text-sm"
              />
            </div>

            {/* Filtros desktop */}
            <div className="hidden md:flex gap-2">
              {[
                { value: type, setter: setType, options: TYPES, label: "Tipo" },
                { value: category, setter: setCategory, options: CATEGORIES, label: "Categoría" },
                { value: fuel, setter: setFuel, options: FUELS, label: "Combustible" },
                { value: transmission, setter: setTransmission, options: TRANSMISSIONS, label: "Caja" },
              ].map(({ value, setter, options, label }) => (
                <select
                  key={label}
                  value={value}
                  onChange={e => setter(e.target.value)}
                  className="bg-[#111111] border border-white/10 text-gray-300 rounded-xl px-3 py-2.5 outline-none text-sm cursor-pointer"
                >
                  <option value="Todos" className="bg-[#111111]">{label}</option>
                  {options.filter(o => o !== "Todos").map(o => (
                    <option key={o} value={o} className="bg-[#111111]">{o}</option>
                  ))}
                </select>
              ))}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-[#111111] border border-white/10 text-gray-300 rounded-xl px-3 py-2.5 outline-none text-sm cursor-pointer"
              >
                <option value="default" className="bg-[#111111]">Ordenar</option>
                <option value="price-asc" className="bg-[#111111]">Precio ↑</option>
                <option value="price-desc" className="bg-[#111111]">Precio ↓</option>
                <option value="year-desc" className="bg-[#111111]">Más nuevos</option>
                <option value="km-asc" className="bg-[#111111]">Menos km</option>
              </select>
            </div>

            {/* Botón filtros mobile */}
            <button
              className="md:hidden flex items-center gap-2 bg-[#111111] border border-white/10 text-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              {filtersOpen ? <HiX size={17} /> : <BsSliders size={15} />}
              Filtros
            </button>
          </div>

          {/* Panel filtros mobile colapsable */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden md:hidden"
              >
                <div className="grid grid-cols-2 gap-2 pt-3">
                  {[
                    { value: type, setter: setType, options: TYPES, label: "Tipo" },
                    { value: category, setter: setCategory, options: CATEGORIES, label: "Categoría" },
                    { value: fuel, setter: setFuel, options: FUELS, label: "Combustible" },
                    { value: transmission, setter: setTransmission, options: TRANSMISSIONS, label: "Caja" },
                  ].map(({ value, setter, options, label }) => (
                    <select
                      key={label}
                      value={value}
                      onChange={e => setter(e.target.value)}
                      className="bg-[#111111] border border-white/10 text-gray-300 rounded-xl px-3 py-2.5 outline-none text-sm cursor-pointer"
                    >
                      <option value="Todos" className="bg-[#111111]">{label}</option>
                      {options.filter(o => o !== "Todos").map(o => (
                        <option key={o} value={o} className="bg-[#111111]">{o}</option>
                      ))}
                    </select>
                  ))}
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="col-span-2 bg-[#111111] border border-white/10 text-gray-300 rounded-xl px-3 py-2.5 outline-none text-sm cursor-pointer"
                  >
                    <option value="default" className="bg-[#111111]">Ordenar</option>
                    <option value="price-asc" className="bg-[#111111]">Precio ↑</option>
                    <option value="price-desc" className="bg-[#111111]">Precio ↓</option>
                    <option value="year-desc" className="bg-[#111111]">Más nuevos</option>
                    <option value="km-asc" className="bg-[#111111]">Menos km</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Resultados */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-7">
          <p className="text-gray-400 text-sm">
            <span className="text-white font-bold text-base">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "auto encontrado" : "autos encontrados"}
          </p>
        </div>

        {filtered.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filtered.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="text-white font-bold text-xl mb-2">No encontramos resultados</h3>
            <p className="text-gray-400 mb-6">
              Probá con otros filtros o escribinos, que lo buscamos por vos.
            </p>
            <a
              href={whatsappLink("Hola! Estoy buscando un auto y no lo encuentro en el stock. ¿Me pueden ayudar?")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all"
            >
              <BsWhatsapp size={18} />
              Decinos qué buscás
            </a>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="mt-14 text-center bg-[#111111] border border-white/5 rounded-2xl p-8">
            <p className="text-white font-bold text-lg mb-2">¿No encontrás lo que buscás?</p>
            <p className="text-gray-400 text-sm mb-5">
              Escribinos y lo conseguimos. Tenemos acceso a todo el mercado.
            </p>
            <a
              href={whatsappLink("Hola! Estoy buscando un auto que no veo en el stock. ¿Me pueden ayudar?")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-7 py-3.5 rounded-xl font-bold transition-all"
            >
              <BsWhatsapp size={18} />
              Mostrame más opciones
            </a>
          </div>
        )}
      </div>
    </>
  )
}
