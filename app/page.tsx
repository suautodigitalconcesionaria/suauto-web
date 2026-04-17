import { getFeaturedCars } from "@/lib/airtable"
import Hero from "@/components/Hero"
import Stats from "@/components/Stats"
import SearchBar from "@/components/SearchBar"
import FeaturedCars from "@/components/FeaturedCars"
import WhyUs from "@/components/WhyUs"
import Importados from "@/components/Importados"
import HowItWorks from "@/components/HowItWorks"
import Testimonials from "@/components/Testimonials"
import FAQ from "@/components/FAQ"


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
      <Testimonials />
      <FAQ />
   
    </>
  )
}
