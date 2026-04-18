import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#DC2626",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          fontWeight: 900,
          fontSize: 14,
          color: "white",
          letterSpacing: "-0.5px",
        }}
      >
        SA
      </div>
    ),
    { ...size }
  )
}
