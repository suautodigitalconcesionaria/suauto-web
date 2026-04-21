export const runtime = 'edge'

import { notFound } from "next/navigation"
import Link from "next/link"
import {
  BsWhatsapp,
  BsSpeedometer2,
  BsFuelPump,
  BsCalendar3,
  BsPalette,
  BsDoorOpen,
  BsCheckCircleFill,
} from "react-icons/bs"
import { TbManualGearbox } from "react-icons/tb"
import { HiArrowLeft } from "react-icons/hi"
import { getCarById } from "@/lib/airtable"
import { formatPrice } from "@/lib/cars"
import { whatsappLink } from "@/lib/config"
import AutoGallery from "@/components/AutoGallery"
import FinalCTA from "@/components/FinalCTA"

interface Props {
  params: { id: string }
}

export default async function AutoDetailPage({ params }: Props) {
  const car = await getCarById(params.id)
  if (!car) notFound()

  const msg = `Hola! Me interesa el ${car.brand} ${car.model} ${car.version} (${car.year}). ¿Todavía está disponible?`

  const specs = [
    { icon: BsCalendar3, label: "Año", value: String(car.year) },
    { icon: BsSpeedometer2, label: "Kilómetros", value: `${(car.km ?? 0).toLocaleString("es-AR")} km` },
    { icon: BsFuelPump, label: "Combustible", value: car.fuel },
    { icon: TbManualGearbox, label: "Caja", value: car.transmission },
    { icon: BsPalette, label: "Color", value: car.color },
    { icon: BsDoorOpen, label: "Puertas", value: String(car.doors) },
  ]

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <Link
          href="/stock"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors"
        >
          <HiArrowLeft size={16} />
          Volver al stock
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <AutoGallery images={car.images} alt={`${car.brand} ${car.model}`} />

          {/* Info */}
          <div>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">{car.brand}</p>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">
              {car.model}
            </h1>
            <p className="text-gray-400 mb-5">{car.version} · {car.year}</p>

            <div className="text-4xl font-black text-white mb-1">
              {formatPrice(car.price, car.currency)}
            </div>
            <p className="text-gray-500 text-sm mb-7">Precio publicado · Consultá por financiación</p>

            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={whatsappLink(msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black text-base transition-all hover:shadow-xl hover:shadow-red-600/30"
              >
                <BsWhatsapp size={22} />
                Quiero este auto
              </a>
              <a
                href={whatsappLink(`Hola! Quiero saber si tienen financiación para el ${car.brand} ${car.model} ${car.year}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 text-white py-4 rounded-xl font-semibold text-sm transition-all"
              >
                Consultar financiación
              </a>
            </div>

            {/* Specs */}
            <div className="bg-[#111111] border border-white/5 rounded-2xl p-5 mb-5">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Características</h3>
              <div className="grid grid-cols-2 gap-y-4">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <spec.icon className="text-red-500 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-gray-500 text-xs">{spec.label}</p>
                      <p className="text-white text-sm font-semibold">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            {car.features.length > 0 && (
              <div className="bg-[#111111] border border-white/5 rounded-2xl p-5 mb-5">
                <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Equipamiento</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {car.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <BsCheckCircleFill className="text-red-500 flex-shrink-0" size={13} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-[#111111] border border-white/5 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">Descripción</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{car.description}</p>
            </div>
          </div>
        </div>

        {/* Mobile sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-black/95 backdrop-blur-md border-t border-white/5 p-3 z-30">
          <a
            href={whatsappLink(msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-black text-base transition-all w-full"
          >
            <BsWhatsapp size={20} />
            Quiero este auto
          </a>
        </div>
      </div>

      <FinalCTA />
    </div>
  )
}
