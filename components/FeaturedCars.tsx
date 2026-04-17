"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { HiArrowRight } from "react-icons/hi"
import type { Car } from "@/lib/cars"
import { staggerContainer, fadeInUp, viewportConfig } from "@/lib/animations"
import CarCard from "./CarCard"

export default function FeaturedCars({ cars }: { cars: Car[] }) {
  return (
    <section className="py-20 bg-black" id="stock">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
        >
          <div>
            <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-2">
              Stock disponible
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Autos destacados
            </h2>
            <p className="text-gray-400 mt-2">
              Los más buscados. Si te gusta uno, escribinos ahora.
            </p>
          </div>
          <Link
            href="/stock"
            className="flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold transition-colors group shrink-0"
          >
            Ver todo el stock
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
        >
          <Link
            href="/stock"
            className="inline-flex items-center gap-2 border border-white/15 hover:border-red-600/50 text-white hover:text-red-400 px-8 py-3.5 rounded-xl font-semibold transition-all"
          >
            Ver todos los autos disponibles
            <HiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
