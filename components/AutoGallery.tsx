"use client"

import { useState } from "react"
import Image from "next/image"

interface Props {
  images: string[]
  alt: string
}

export default function AutoGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-3">
        <Image
          src={images[active]}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                active === i ? "border-red-600" : "border-transparent opacity-60 hover:opacity-80"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
