"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { staggerContainer, fadeInUp, viewportConfig } from "@/lib/animations"

const stats = [
  { value: 500, suffix: "+", label: "Autos vendidos", description: "en todo el país" },
  { value: 45, suffix: "", label: "En stock ahora", description: "listos para entregar" },
  { value: 20, suffix: "", label: "Años en el mercado", description: "de experiencia real" },
  { value: 4.9, suffix: "★", label: "Rating de clientes", description: "en Google" },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const steps = 50
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Number(current.toFixed(1)))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref}>
      {Number.isInteger(value) ? Math.floor(count) : count.toFixed(1)}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="py-16 bg-[#0D0D0D] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="flex flex-col items-center text-center"
            >
              <div className="text-4xl sm:text-5xl font-black text-white mb-1">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-red-500 font-bold text-sm mb-0.5">{stat.label}</div>
              <div className="text-gray-500 text-xs">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
