"use client"

import { motion } from "framer-motion"
import { BsWhatsapp } from "react-icons/bs"
import { whatsappLink } from "@/lib/config"

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl shadow-green-500/40 w-14 h-14 transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 220, damping: 20 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.93 }}
    >
      <BsWhatsapp size={28} />
    </motion.a>
  )
}
