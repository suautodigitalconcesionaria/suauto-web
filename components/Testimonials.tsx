"use client"

import { motion } from "framer-motion"
import { BsStarFill, BsWhatsapp } from "react-icons/bs"
import { whatsappLink } from "@/lib/config"
import { staggerContainer, scaleIn, viewportConfig } from "@/lib/animations"

const testimonials = [
  {
    name: "Martín G.",
    city: "General Pico",
    avatar: "M",
    rating: 5,
    text: "Compré mi Hilux acá y la experiencia fue increíble. Me respondieron el mismo día, me explicaron todo sin apurarme y cerramos en dos días. Recomiendo totalmente.",
    car: "Toyota Hilux 2023",
  },
  {
    name: "Laura R.",
    city: "Realicó, La Pampa",
    avatar: "L",
    rating: 5,
    text: "Estaba dudando entre dos autos y me ayudaron a decidir sin presionarme para nada. Nada que ver a otras concesionarias donde te apuran. ¡Gracias!",
    car: "VW T-Cross 2022",
  },
  {
    name: "Carlos V.",
    city: "Santa Rosa",
    avatar: "C",
    rating: 5,
    text: "Me consiguieron un auto importado que no encontraba en ningún lado. Gestionaron todo, yo solo fui a buscarlo. Excelente servicio, muy transparentes en todo.",
    car: "BMW X3 (importado)",
  },
  {
    name: "Natalia M.",
    city: "General Pico",
    avatar: "N",
    rating: 5,
    text: "El trato fue de diez. Me asesoraron para la financiación y conseguimos una cuota que me cerraba perfecto. Sin letra chica. Los recomiendo sin dudarlo.",
    car: "Jeep Renegade 2023",
  },
  {
    name: "Diego P.",
    city: "Victorica, La Pampa",
    avatar: "D",
    rating: 5,
    text: "Rápido, honesto y sin vueltas. Tres palabras que los definen. El auto estaba tal cual como lo describieron. Un placer hacer negocios así.",
    car: "Ford Ranger 2022",
  },
  {
    name: "Sofía L.",
    city: "General Pico",
    avatar: "S",
    rating: 5,
    text: "Primera vez que compraba un auto sola y me guiaron en todo. Me explicaron cada detalle, me dejaron pensar y no me apuraron. ¡Super recomendado!",
    car: "Peugeot 208 GT 2023",
  },
]

export default function Testimonials() {
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
            Testimonios
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Lo que dicen nuestros clientes.
          </h2>
          <p className="text-gray-400">Sin filtros. Lo que le dicen a sus amigos.</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className="bg-[#111111] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <BsStarFill key={s} className="text-yellow-400" size={14} />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.city} · {t.car}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

       
      </div>
    </section>
  )
}
