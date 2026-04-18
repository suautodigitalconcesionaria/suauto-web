import { ImageResponse } from "next/og"
import { readFileSync } from "fs"
import { join } from "path"

export const size = { width: 64, height: 64 }
export const contentType = "image/png"

export default function Icon() {
  const logoBuffer = readFileSync(join(process.cwd(), "public/logo.png"))
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          background: "#DC2626",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
        }}
      >
        <img
          src={logoBase64}
          style={{ width: 48, height: 48, objectFit: "contain" }}
        />
      </div>
    ),
    { ...size }
  )
}
