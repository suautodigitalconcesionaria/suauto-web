"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { HiSearch } from "react-icons/hi"
import { fadeInUp, viewportConfig } from "@/lib/animations"

const categories = ["Todos", "Pickup", "SUV", "Sedán", "Hatchback"]
const fuels = ["Todos", "Nafta", "Diesel", "GNC"]

export default function SearchBar() {
  const [category, setCategory] = useState("Todos")
  const [fuel, setFuel] = useState("Todos")
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (category !== "Todos") params.set("cat", category.toLowerCase())
    if (fuel !== "Todos") params.set("fuel", fuel.toLowerCase())
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
          {/* Text search */}
          <div className="flex-1 relative">
            <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Marca, modelo..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full bg-transparent border border-white/10 focus:border-red-600/50 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-3 outline-none transition-colors text-sm"
            />
          </div>

          {/* Category filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#1A1A1A] border border-white/10 text-gray-300 rounded-xl px-4 py-3 outline-none text-sm cursor-pointer md:w-40"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-[#1A1A1A]">{c}</option>
            ))}
          </select>

          {/* Fuel filter */}
          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            className="bg-[#1A1A1A] border border-white/10 text-gray-300 rounded-xl px-4 py-3 outline-none text-sm cursor-pointer md:w-36"
          >
            {fuels.map((f) => (
              <option key={f} value={f} className="bg-[#1A1A1A]">{f}</option>
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
