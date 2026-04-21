import { getAllCars } from "@/lib/airtable"
import StockClient from "@/components/StockClient"

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default async function StockPage() {
  const cars = await getAllCars()

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="bg-[#0A0A0A] py-10 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-500 text-sm font-semibold uppercase tracking-wider mb-1">Stock</p>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Todos los autos disponibles
          </h1>
          <p className="text-gray-400 mt-2">
            {cars.length} autos disponibles. Si te gusta uno, escribinos al toque.
          </p>
        </div>
      </div>
      <StockClient cars={cars} />
    </div>
  )
}
