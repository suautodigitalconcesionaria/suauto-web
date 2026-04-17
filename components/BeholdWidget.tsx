"use client"

import { useEffect, useRef } from "react"

export default function BeholdWidget({ feedId }: { feedId: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Crear el web component directamente en el DOM (React 18 no pasa bien atributos con guiones)
    const widget = document.createElement("behold-widget")
    widget.setAttribute("feed-id", feedId)
    ref.current.innerHTML = ""
    ref.current.appendChild(widget)

    // Cargar el script de Behold si no está ya cargado
    if (!document.querySelector('script[src="https://w.behold.so/widget.js"]')) {
      const script = document.createElement("script")
      script.src = "https://w.behold.so/widget.js"
      script.type = "module"
      document.head.appendChild(script)
    }
  }, [feedId])

  return <div ref={ref} className="w-full" />
}
