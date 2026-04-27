"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const hide = () => {
      setFading(true)
      setTimeout(() => {
        setVisible(false)
        // Avisa al WelcomeVideo que el loader terminó
        window.dispatchEvent(new CustomEvent("suauto:loaderDone"))
      }, 500)
    }
    if (document.readyState === "complete") {
      setTimeout(hide, 600)
    } else {
      window.addEventListener("load", () => setTimeout(hide, 600), { once: true })
    }
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#0f0f0f",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      transition: "opacity 0.5s ease",
      opacity: fading ? 0 : 1,
      pointerEvents: fading ? "none" : "all",
    }}>
      <style>{`
        @keyframes speedLineRight {
          0%   { transform: translateX(0);     opacity: .8; }
          100% { transform: translateX(80px);  opacity: 0; }
        }
        @keyframes smokeRight {
          0%   { transform: translate(0, 0) scale(1);        opacity: .45; }
          100% { transform: translate(34px, -22px) scale(2.5); opacity: 0; }
        }
        @keyframes road {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-96px); }
        }
        @keyframes progress {
          0%   { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes pulseLogo {
          0%,100% { opacity: 1; }
          50%     { opacity: .55; }
        }
        @keyframes floatCar {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-5px); }
        }
      `}</style>

      {/* Logo */}
      <div style={{
        marginBottom: 32,
        fontSize: 30, fontWeight: 900,
        letterSpacing: "-.02em", color: "#fff",
        animation: "pulseLogo 1.8s ease-in-out infinite",
        fontFamily: "system-ui, sans-serif",
      }}>
        <span style={{ color: "#dc2626" }}>Su</span>Auto
      </div>

      {/* Escena */}
      <div style={{ position: "relative", width: "min(560px, 90vw)", height: 220 }}>

        {/* Líneas de velocidad */}
        {([
          { top: 50, w: 55, dur: .52 },
          { top: 70, w: 35, dur: .60 },
          { top: 90, w: 48, dur: .56 },
          { top: 108, w: 26, dur: .65 },
          { top: 62, w: 18, dur: .48 },
        ]).map((l, i) => (
          <div key={i} style={{
            position: "absolute",
            right: 0,
            top: l.top,
            height: 2, width: l.w,
            background: "linear-gradient(270deg, #dc2626, transparent)",
            borderRadius: 2,
            animation: `speedLineRight ${l.dur}s linear infinite`,
            animationDelay: `${i * 0.1}s`,
          }} />
        ))}

        {/* Humo de escape */}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{
            position: "absolute",
            right: 48, top: 125,
            width: 10, height: 10,
            borderRadius: "50%",
            background: "rgba(160,160,160,0.5)",
            animation: `smokeRight 1.1s ease-out infinite`,
            animationDelay: `${i * 0.28}s`,
          }} />
        ))}

        {/* Foto del auto */}
        <div style={{
          position: "absolute", left: 0, top: 0,
          width: "100%", height: "100%",
          animation: "floatCar 2.5s ease-in-out infinite",
          display: "flex", alignItems: "flex-end", justifyContent: "center",
        }}>
          {/* Resplandor rojo debajo */}
          <div style={{
            position: "absolute", bottom: -4, left: "10%",
            width: "80%", height: 18,
            background: "radial-gradient(ellipse, rgba(220,38,38,.3) 0%, transparent 70%)",
            filter: "blur(6px)",
          }} />
          <img
            src="/car-loading.png"
            alt="Auto"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center bottom",
              filter: "drop-shadow(0 10px 28px rgba(220,38,38,.3))",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Ruta animada */}
      <div style={{
        width: "min(560px, 90vw)", height: 6,
        background: "#151515",
        borderRadius: 3,
        overflow: "hidden",
        marginTop: 0,
        position: "relative",
      }}>
        <div style={{
          position: "absolute", top: "40%", left: 0,
          display: "flex", gap: 20,
          animation: "road .55s linear infinite",
        }}>
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} style={{
              width: 36, height: 2,
              background: "#dc2626",
              borderRadius: 1, opacity: .4,
            }} />
          ))}
        </div>
      </div>

      {/* Barra de progreso */}
      <div style={{
        marginTop: 28, width: 240, height: 3,
        background: "#1f1f1f", borderRadius: 99, overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg, #dc2626, #ef4444)",
          borderRadius: 99,
          animation: "progress 1.8s ease-in-out forwards",
        }} />
      </div>

      <p style={{
        marginTop: 10, color: "#374151",
        fontSize: 11, letterSpacing: ".1em",
        textTransform: "uppercase",
        fontFamily: "system-ui, sans-serif",
      }}>
        Cargando...
      </p>
    </div>
  )
}
