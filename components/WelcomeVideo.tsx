"use client"

import { useEffect, useRef, useState } from "react"
import { HiArrowRight } from "react-icons/hi"

// ── Rutas de los videos ───────────────────────────────────────────────
const VIDEO_DESKTOP = "/welcome.mp4"         // horizontal 16:9
const VIDEO_MOBILE  = "/welcome-mobile.mp4"  // vertical   9:16
// ─────────────────────────────────────────────────────────────────────

export default function WelcomeVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Detectar si es mobile (< 768px)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const VIDEO_SRC = isMobile ? VIDEO_MOBILE : VIDEO_DESKTOP

  // El video espera a que el loader termine (z-index 9999 → video en 9998)
  // Para eso escuchamos el evento customizado que dispara el LoadingScreen.
  const [loaderDone, setLoaderDone] = useState(false)
  const [visible, setVisible]       = useState(true)
  const [fading, setFading]         = useState(false)
  const [showSkip, setShowSkip]     = useState(false)

  // ── Escuchar cuándo el loader termina ────────────────────────────
  useEffect(() => {
    const handler = () => setLoaderDone(true)
    window.addEventListener("suauto:loaderDone", handler, { once: true })
    return () => window.removeEventListener("suauto:loaderDone", handler)
  }, [])

  // ── Cuando el loader termina, arrancar el video ──────────────────
  useEffect(() => {
    if (!loaderDone) return
    videoRef.current?.play().catch(() => {
      // Si el navegador bloquea autoplay, mostramos el botón saltar directo
      setShowSkip(true)
    })
    // Mostrar botón "Saltar" después de 1.5s
    const t = setTimeout(() => setShowSkip(true), 1500)
    return () => clearTimeout(t)
  }, [loaderDone])

  // ── Fade out y desmontaje ────────────────────────────────────────
  const dismiss = () => {
    setFading(true)
    setTimeout(() => setVisible(false), 800)
  }

  if (!visible) return null

  // Mientras el loader no terminó, el componente existe pero es invisible
  // (z-index más bajo que el loader, así queda tapado)
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        background: "#000",
        opacity: !loaderDone ? 0 : fading ? 0 : 1,
        transition: "opacity 0.8s ease",
        pointerEvents: !loaderDone || fading ? "none" : "all",
      }}
    >
      {/* ── Placeholder cuando no hay video ─────────────────────── */}
      {!VIDEO_SRC ? (
        <div style={{
          width: "100%", height: "100%",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "#0f0f0f", color: "#555",
          fontFamily: "system-ui, sans-serif",
          gap: 12,
        }}>
          <span style={{ fontSize: 48 }}>🎬</span>
          <p style={{ fontSize: 14, letterSpacing: ".08em" }}>VIDEO DE BIENVENIDA</p>
          <p style={{ fontSize: 12, color: "#333" }}>
            Colocá tu video en <code style={{ color: "#dc2626" }}>/public/welcome.mp4</code>
          </p>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          onEnded={dismiss}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {/* ── Botón saltar ─────────────────────────────────────────── */}
      <button
        onClick={dismiss}
        style={{
          position: "absolute",
          bottom: 32, right: 32,
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: 12,
          fontSize: 14, fontWeight: 700,
          cursor: "pointer",
          fontFamily: "system-ui, sans-serif",
          transition: "opacity 0.3s, transform 0.3s",
          opacity: showSkip ? 1 : 0,
          transform: showSkip ? "translateY(0)" : "translateY(8px)",
          pointerEvents: showSkip ? "all" : "none",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(220,38,38,0.6)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
      >
        Saltar <HiArrowRight size={15} />
      </button>
    </div>
  )
}
