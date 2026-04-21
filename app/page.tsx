import { getFeaturedCars } from "@/lib/airtable"
import dynamicImport from "next/dynamic"

export const dynamic = 'force-dynamic'
export const runtime = 'edge'
import Hero from "@/components/Hero"
import Stats from "@/components/Stats"
import SearchBar from "@/components/SearchBar"
import FeaturedCars from "@/components/FeaturedCars"
import WhyUs from "@/components/WhyUs"
import Importados from "@/components/Importados"
import HowItWorks from "@/components/HowItWorks"
import FAQ from "@/components/FAQ"

const ArgentinaMap = dynamicImport(() => import("@/components/ArgentinaMap"), { ssr: false })

export const revalidate = 300

export default async function HomePage() {
  const featuredCars = await getFeaturedCars()

  return (
    <>
      <Hero />
      <Stats />
      <SearchBar />
      <FeaturedCars cars={featuredCars} />
      <WhyUs />
      <Importados />
      <HowItWorks />
      <ArgentinaMap />
      <FAQ />
    </>
  )
}
