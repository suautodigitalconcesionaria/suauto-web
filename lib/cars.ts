export interface Car {
  id: string
  brand: string
  model: string
  version: string
  year: number
  price: number
  currency: "USD" | "ARS"
  km: number
  fuel: "Nafta" | "Diesel" | "GNC" | "Híbrido" | "Eléctrico"
  transmission: "Manual" | "Automático"
  color: string
  doors: number
  category: "sedan" | "suv" | "pickup" | "hatchback" | "coupe"
  images: string[]
  featured: boolean
  description: string
  features: string[]
  type?: "usado" | "nuevo" | "stock"
  status?: string
}

export const cars: Car[] = [
  {
    id: "1",
    brand: "Toyota",
    model: "Hilux",
    version: "SRV 4x4 AT",
    year: 2023,
    price: 48000,
    currency: "USD",
    km: 18000,
    fuel: "Diesel",
    transmission: "Automático",
    color: "Blanco Perlado",
    doors: 4,
    category: "pickup",
    images: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    ],
    featured: true,
    description: "Hilux en estado impecable, full equipo, service al día. La pickup más vendida del país, y la más confiable.",
    features: ["4x4", "Cuero", "Pantalla táctil", "Cámara trasera", "Control crucero", "Service al día"],
  },
  {
    id: "2",
    brand: "Volkswagen",
    model: "Amarok",
    version: "V6 Highline 4x4",
    year: 2022,
    price: 42000,
    currency: "USD",
    km: 35000,
    fuel: "Diesel",
    transmission: "Automático",
    color: "Negro",
    doors: 4,
    category: "pickup",
    images: [
      "https://images.unsplash.com/photo-1570733117311-d990c3816c47?w=800&q=80",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
    ],
    featured: true,
    description: "La pickup más potente del segmento. V6 biturbo que devora kilómetros sin esfuerzo.",
    features: ["V6 Biturbo", "4x4 permanente", "Cuero", "Techo panorámico", "Faros LED", "Llantas 20\""],
  },
  {
    id: "3",
    brand: "Toyota",
    model: "Corolla",
    version: "XEI 2.0 CVT",
    year: 2022,
    price: 28000,
    currency: "USD",
    km: 22000,
    fuel: "Nafta",
    transmission: "Automático",
    color: "Gris Plata",
    doors: 4,
    category: "sedan",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    ],
    featured: true,
    description: "El sedán más confiable del mercado. Impecable, económico y con todo lo que necesitás.",
    features: ["CVT", "Cuero", "Apple CarPlay", "Android Auto", "Sensores de estacionamiento", "Cámara 360°"],
  },
  {
    id: "4",
    brand: "Ford",
    model: "Ranger",
    version: "XLS 4x4 MT",
    year: 2023,
    price: 38000,
    currency: "USD",
    km: 12000,
    fuel: "Diesel",
    transmission: "Manual",
    color: "Azul Racing",
    doors: 4,
    category: "pickup",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    featured: true,
    description: "Ranger casi nueva, para los que necesitan trabajo y comodidad sin sacrificar nada.",
    features: ["4x4", "Tracción trasera", "Control de tracción", "Airbags", "Bluetooth", "Sensores"],
  },
  {
    id: "5",
    brand: "Honda",
    model: "Civic",
    version: "EX 1.5T CVT",
    year: 2021,
    price: 22000,
    currency: "USD",
    km: 45000,
    fuel: "Nafta",
    transmission: "Automático",
    color: "Rojo",
    doors: 4,
    category: "sedan",
    images: [
      "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800&q=80",
    ],
    featured: false,
    description: "Civic turbo, económico y muy equipado. Perfecto para el día a día.",
    features: ["Turbo 1.5", "Honda Sensing", "Apple CarPlay", "Cuero", "Sunroof", "LED"],
  },
  {
    id: "6",
    brand: "Jeep",
    model: "Renegade",
    version: "Longitude 1.8 AT",
    year: 2023,
    price: 30000,
    currency: "USD",
    km: 8000,
    fuel: "Nafta",
    transmission: "Automático",
    color: "Naranja",
    doors: 4,
    category: "suv",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    ],
    featured: true,
    description: "Renegade prácticamente nuevo, garantía de fábrica vigente. El SUV con más personalidad.",
    features: ["Pantalla 8.4\"", "Cámara trasera", "Keyless Entry", "Start/Stop", "Climatizador", "Llantas 17\""],
  },
  {
    id: "7",
    brand: "Toyota",
    model: "SW4",
    version: "SRX 7 asientos 4x4",
    year: 2022,
    price: 55000,
    currency: "USD",
    km: 28000,
    fuel: "Diesel",
    transmission: "Automático",
    color: "Blanco Perlado",
    doors: 4,
    category: "suv",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    ],
    featured: false,
    description: "SW4 7 asientos, todo terreno y familiar en uno. El más completo del segmento.",
    features: ["7 asientos", "4x4 Full time", "Suspensión neumática", "Cuero", "Pantalla 9\"", "JBL Audio"],
  },
  {
    id: "8",
    brand: "Volkswagen",
    model: "T-Cross",
    version: "Highline 1.4 TSI AT",
    year: 2023,
    price: 26000,
    currency: "USD",
    km: 15000,
    fuel: "Nafta",
    transmission: "Automático",
    color: "Gris Platino",
    doors: 4,
    category: "suv",
    images: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    ],
    featured: false,
    description: "T-Cross moderna y completa, ideal para la ciudad y escapadas.",
    features: ["Turbo 1.4", "DSG 7 vel.", "Virtual Cockpit", "App Connect", "Faros LED", "Llantas 17\""],
  },
  {
    id: "9",
    brand: "Chevrolet",
    model: "S10",
    version: "High Country 4x4 AT",
    year: 2022,
    price: 36000,
    currency: "USD",
    km: 32000,
    fuel: "Diesel",
    transmission: "Automático",
    color: "Gris Carbón",
    doors: 4,
    category: "pickup",
    images: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
    ],
    featured: false,
    description: "S10 High Country, la top de la gama. Lujo y potencia en una pickup.",
    features: ["High Country", "4x4", "Cuero premium", "Bose Audio", "Techo corredizo", "HUD"],
  },
  {
    id: "10",
    brand: "Renault",
    model: "Duster",
    version: "Intens 4x4 2.0",
    year: 2023,
    price: 20000,
    currency: "USD",
    km: 10000,
    fuel: "Nafta",
    transmission: "Manual",
    color: "Gris Cashmere",
    doors: 4,
    category: "suv",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    featured: false,
    description: "Duster 4x4, el SUV más accesible con tracción total. Ideal para campo y ciudad.",
    features: ["4x4", "Media Nav 7\"", "Cámara trasera", "Control crucero", "Aire acond.", "USB/Bluetooth"],
  },
  {
    id: "11",
    brand: "Nissan",
    model: "Frontier",
    version: "Pro-4X 4x4 AT",
    year: 2022,
    price: 40000,
    currency: "USD",
    km: 25000,
    fuel: "Diesel",
    transmission: "Automático",
    color: "Blanco Ártico",
    doors: 4,
    category: "pickup",
    images: [
      "https://images.unsplash.com/photo-1570733117311-d990c3816c47?w=800&q=80",
    ],
    featured: false,
    description: "Frontier Pro-4X, lista para cualquier terreno. Off-road de verdad.",
    features: ["Pro-4X", "4x4 Select", "Diferencial trasero", "Cuero", "NissanConnect", "Llantas 17\" negras"],
  },
  {
    id: "12",
    brand: "Peugeot",
    model: "208",
    version: "GT 1.2 PureTech AT",
    year: 2023,
    price: 16000,
    currency: "USD",
    km: 18000,
    fuel: "Nafta",
    transmission: "Automático",
    color: "Rojo Elixir",
    doors: 4,
    category: "hatchback",
    images: [
      "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800&q=80",
    ],
    featured: false,
    description: "208 GT top de gama, el hatch más elegante del mercado. Consumo increíble.",
    features: ["i-Cockpit 10\"", "Cuero", "Park Assist", "Mirror Link", "Faros Full LED", "Volante cuero"],
  },
]

export const featuredCars = cars.filter((c) => c.featured)

export function getCarById(id: string): Car | undefined {
  return cars.find((c) => c.id === id)
}

export function formatPrice(price: number, currency: "USD" | "ARS"): string {
  const p = Number(price ?? 0)
  if (currency === "USD") {
    return `USD ${p.toLocaleString("es-AR")}`
  }
  return `$ ${p.toLocaleString("es-AR")}`
}
