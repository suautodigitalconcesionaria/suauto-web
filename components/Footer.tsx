import Link from "next/link"
import { BsWhatsapp, BsInstagram, BsTelephone, BsEnvelope, BsGeoAlt, BsClock } from "react-icons/bs"
import { SiTiktok } from "react-icons/si"
import { whatsappLink, BUSINESS_PHONE, BUSINESS_EMAIL, BUSINESS_HOURS, BUSINESS_CITY, BUSINESS_INSTAGRAM } from "@/lib/config"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/stock", label: "Stock de autos" },
  { href: "/financiacion", label: "Financiación" },
  { href: "/contacto", label: "Contacto" },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-black text-white">
                Su<span className="text-red-600">Auto</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Tu concesionaria de confianza en General Pico.
              Autos usados, financiación y autos importados a pedido.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500/15 hover:bg-green-500/25 border border-green-500/30 text-green-400 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
            >
              <BsWhatsapp size={16} />
              Hablame por WhatsApp
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Páginas</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                <BsGeoAlt className="mt-0.5 text-red-500 flex-shrink-0" size={15} />
                <span>{BUSINESS_CITY}, Argentina</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 text-sm">
                <BsTelephone className="text-red-500 flex-shrink-0" size={14} />
                <span>{BUSINESS_PHONE}</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 text-sm">
                <BsEnvelope className="text-red-500 flex-shrink-0" size={14} />
                <span>{BUSINESS_EMAIL}</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 text-sm">
                <BsClock className="text-red-500 flex-shrink-0" size={14} />
                <span>{BUSINESS_HOURS}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Redes</h4>
            <div className="flex flex-col gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-gray-400 hover:text-green-400 text-sm transition-colors"
              >
                <BsWhatsapp size={16} />
                WhatsApp
              </a>
              <a
                href={BUSINESS_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-gray-400 hover:text-pink-400 text-sm transition-colors"
              >
                <BsInstagram size={16} />
                Instagram
              </a>
              <a
                href="https://tiktok.com/@suauto.concesionaria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <SiTiktok size={16} />
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-600 text-xs">
          <p>© {new Date().getFullYear()} SuAuto. Todos los derechos reservados.</p>
          <p>General Pico, La Pampa, Argentina</p>
        </div>
      </div>
    </footer>
  )
}
