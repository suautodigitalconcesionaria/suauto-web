"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { BsWhatsapp, BsSpeedometer2, BsFuelPump } from "react-icons/bs"
import { TbManualGearbox } from "react-icons/tb"
import type { Car } from "@/lib/cars"
import { formatPrice } from "@/lib/cars"
import { whatsappLink } from "@/lib/config"
import { scaleIn } from "@/lib/animations"

interface Props {
  car: Car
}

export default function CarCard({ car }: Props) {
  const isSold = car.status === "vendido"
  const msg = `Hola! Me interesa el ${car.brand} ${car.model} ${car.version} (${car.year}). ¿Podés darme más info?`

  return (
    <motion.div
      variants={scaleIn}
      className="group relative bg-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-red-600/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          fill
          className={`object-cover object-center transition-transform duration-500 group-hover:scale-105 ${isSold ? "grayscale opacity-60" : ""}`}
          style={{ objectPosition: "center 60%" }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />

        {/* Overlay vendido */}
        {isSold && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-600 text-white text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-widest rotate-[-8deg] shadow-lg">
              Vendido
            </span>
          </div>
        )}

        {/* Year badge */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg">
          {car.year}
        </div>

        {/* Category badge */}
        {!isSold && (
          <div className="absolute top-3 right-3 bg-red-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-lg capitalize">
            {car.category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-3">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">{car.brand}</p>
          <h3 className="text-white font-bold text-lg leading-tight">
            {car.model}{" "}
            <span className="text-gray-400 font-normal text-sm">{car.version}</span>
          </h3>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-4 text-gray-400 text-xs mb-4">
          <span className="flex items-center gap-1">
            <BsSpeedometer2 size={13} />
            {(car.km ?? 0).toLocaleString("es-AR")} km
          </span>
          <span className="flex items-center gap-1">
            <BsFuelPump size={13} />
            {car.fuel}
          </span>
          <span className="flex items-center gap-1">
            <TbManualGearbox size={14} />
            {car.transmission}
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-black text-white">
            {formatPrice(car.price, car.currency)}
          </p>
          <p className="text-gray-500 text-xs mt-0.5">Precio publicado</p>
        </div>

        {/* Actions */}
        {isSold ? (
          <div className="flex items-center justify-center py-2.5 rounded-xl bg-white/5 border border-white/10">
            <p className="text-gray-500 text-sm font-semibold">Este auto ya fue vendido</p>
          </div>
        ) : (
          <div className="flex gap-2">
            <a
              href={whatsappLink(msg)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
            >
              <BsWhatsapp size={16} />
              Quiero este auto
            </a>
            <Link
              href={`/auto/${car.id}`}
              className="px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-colors text-sm font-medium flex items-center"
            >
              Ver más
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  )
}
