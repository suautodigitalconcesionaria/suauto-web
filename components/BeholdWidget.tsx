"use client"

import { useEffect, useRef } from "react"

export default function BeholdWidget({ feedId }: { feedId: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const mounted = useRef(false)

  useEffect(() => {
    // Evitar doble montaje en StrictMode de React
    if (mounted.current || !ref.current) return
    mounted.current = true

    try {
      const widget = document.createElement("behold-widget")
      widget.setAttribute("feed-id", feedId)
      ref.current.innerHTML = ""
      ref.current.appendChild(widget)

      if (!document.querySelector('script[src="https://w.behold.so/widget.js"]')) {
        const script = document.createElement("script")
        script.src = "https://w.behold.so/widget.js"
        script.type = "module"
        script.async = true
        document.head.appendChild(script)
      }
    } catch (e) {
      // Widget de Behold falló silenciosamente
    }

    return () => {
      mounted.current = false
    }
  }, [feedId])

  return <div ref={ref} className="w-full" />
}
