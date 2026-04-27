"use client"

import { motion } from "framer-motion"
import { useState, useMemo, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { HiSearch } from "react-icons/hi"
import { fadeInUp, viewportConfig } from "@/lib/animations"
import type { Car } from "@/lib/cars"

interface Props {
  cars: Car[]
}

export default function SearchBar({ cars }: Props) {
  const [category, setCategory] = useState("Todos")
  const [fuel, setFuel] = useState("Todos")
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Opciones dinámicas desde Airtable
  const categories = useMemo(() => {
    const vals = Array.from(new Set(cars.filter(c => c.status !== "vendido").map(c => c.category).filter(Boolean)))
    return ["Todos", ...vals]
  }, [cars])

  const fuels = useMemo(() => {
    const vals = Array.from(new Set(cars.filter(c => c.status !== "vendido").map(c => c.fuel).filter(Boolean)))
    return ["Todos", ...vals]
  }, [cars])

  // Sugerencias de autocompletado
  const filteredSuggestions = useMemo(() => {
    if (!query || query.length < 1) return []
    const q = query.toLowerCase()
    const available = cars.filter(c => c.status !== "vendido")

    // Autos que coinciden con la búsqueda
    const matches = available.filter(c =>
      c.brand.toLowerCase().includes(q) ||
      c.model.toLowerCase().includes(q) ||
      c.version.toLowerCase().includes(q) ||
      `${c.brand} ${c.model}`.toLowerCase().includes(q)
    )

    type Suggestion = { searchTerm: string; display: string; sub: string; isGroup: boolean }
    const result: Suggestion[] = []
    const seenGroups = new Set<string>()

    for (const c of matches) {
      const groupKey = `${c.brand}|${c.model}`
      // ¿Hay más de 1 auto con esta marca+modelo?
      const siblings = matches.filter(x => x.brand === c.brand && x.model === c.model)

      if (siblings.length > 1 && !seenGroups.has(groupKey)) {
        seenGroups.add(groupKey)
        // Primera opción: "Ver todos los Renault Clio"
        result.push({
          searchTerm: `${c.brand} ${c.model}`,
          display: `${c.brand} ${c.model}`,
          sub: `Ver todos (${siblings.length})`,
          isGroup: true,
        })
        // Después cada versión específica
        for (const s of siblings) {
          result.push({
            searchTerm: `${s.brand} ${s.model} ${s.version}`,
            display: `${s.model} ${s.version}`,
            sub: `${s.brand} · ${s.year}`,
            isGroup: false,
          })
        }
      } else if (siblings.length === 1 && !seenGroups.has(groupKey)) {
        seenGroups.add(groupKey)
        result.push({
          searchTerm: `${c.brand} ${c.model}`,
          display: `${c.brand} ${c.model}`,
          sub: c.version,
          isGroup: false,
        })
      }
    }

    return result.slice(0, 8)
  }, [query, cars])

  // Cerrar sugerencias al hacer click afuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleSearch = () => {
    setShowSuggestions(false)
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (category !== "Todos") params.set("cat", category)
    if (fuel !== "Todos") params.set("fuel", fuel)
    router.push(`/stock?${params.toString()}`)
  }

  const handleSelect = (label: string) => {
    setQuery(label)
    setShowSuggestions(false)
    const params = new URLSearchParams()
    params.set("q", label)
    if (category !== "Todos") params.set("cat", category)
    if (fuel !== "Todos") params.set("fuel", fuel)
    router.push(`/stock?${params.toString()}`)
  }

  return (
    <section className="py-14 bg-[#0D0D0D] border-y border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            ¿Qué auto estás buscando?
          </h2>
          <p className="text-gray-400">Usá los filtros o escribinos directo.</p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="bg-[#111111] border border-white/8 rounded-2xl p-4 flex flex-col md:flex-row gap-3"
        >
          {/* Text search con autocompletado */}
          <div className="flex-1 relative" ref={containerRef}>
            <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 z-10" size={18} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Marca, modelo..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => query.length >= 1 && setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch()
                if (e.key === "Escape") setShowSuggestions(false)
              }}
              className="w-full bg-transparent border border-white/10 focus:border-red-600/50 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-3 outline-none transition-colors text-sm"
            />

            {/* Dropdown sugerencias */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden z-50 shadow-xl shadow-black/50">
                {filteredSuggestions.map((s, i) => (
                  <button
                    key={i}
                    onMouseDown={() => handleSelect(s.searchTerm)}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors flex items-center gap-3 ${
                      s.isGroup ? "border-b border-white/5" : "pl-8"
                    }`}
                  >
                    <HiSearch size={13} className="text-gray-500 shrink-0" />
                    <span className="flex flex-col min-w-0">
                      <span className={`font-medium truncate ${s.isGroup ? "text-white" : "text-gray-300"}`}>
                        {s.display}
                      </span>
                      {s.sub && (
                        <span className={`text-xs truncate ${s.isGroup ? "text-red-500" : "text-gray-500"}`}>
                          {s.sub}
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#1A1A1A] border border-white/10 text-gray-300 rounded-xl px-4 py-3 outline-none text-sm cursor-pointer md:w-40"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-[#1A1A1A]">{c === "Todos" ? "Categoría" : c}</option>
            ))}
          </select>

          {/* Fuel filter */}
          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            className="bg-[#1A1A1A] border border-white/10 text-gray-300 rounded-xl px-4 py-3 outline-none text-sm cursor-pointer md:w-36"
          >
            {fuels.map((f) => (
              <option key={f} value={f} className="bg-[#1A1A1A]">{f === "Todos" ? "Combustible" : f}</option>
            ))}
          </select>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-red-600/30 active:scale-95 whitespace-nowrap"
          >
            Buscar autos
          </button>
        </motion.div>
      </div>
    </section>
  )
}
