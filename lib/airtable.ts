import type { Car } from './cars'

const TOKEN = process.env.AIRTABLE_TOKEN!
const BASE = process.env.AIRTABLE_BASE_ID!

// ─── Tipos internos de Airtable ───────────────────────────────────────────────

interface AirtableAttachment {
  id: string
  url: string
  thumbnails?: {
    large?: { url: string }
    full?: { url: string }
  }
}

interface RawFields {
  Marca?: string
  Modelo?: string
  Version?: string
  'Año'?: number
  Kilometraje?: number
  Precio?: number
  Color?: string
  Combustible?: string
  Transmision?: string
  Estado?: string
  Destacado?: boolean
  Descripcion?: string
  Fotos?: AirtableAttachment[]
  Categoria?: string
}

interface AirtableRecord {
  id: string
  fields: RawFields
}

interface AirtableResponse {
  records: AirtableRecord[]
  offset?: string
}

// ─── Fetch con paginación ─────────────────────────────────────────────────────

async function fetchTable(tableName: string): Promise<AirtableRecord[]> {
  const records: AirtableRecord[] = []
  let offset: string | undefined

  do {
    const params = new URLSearchParams({
      filterByFormula: '{Estado}="disponible"',
    })
    if (offset) params.set('offset', offset)

    const res = await fetch(
      `https://api.airtable.com/v0/${BASE}/${encodeURIComponent(tableName)}?${params}`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
        next: { revalidate: 300 }, // refresca cada 5 minutos
      }
    )

    if (!res.ok) {
      const errText = await res.text()
      console.error(`[Airtable] Error en tabla "${tableName}":`, errText)
      // Si el campo Estado no existe en esta tabla, la saltamos sin romper el build
      break
    }

    const data: AirtableResponse = await res.json()
    records.push(...data.records)
    offset = data.offset
  } while (offset)

  return records
}

// ─── Normalización de campos ──────────────────────────────────────────────────

function normalizeFuel(val?: string): Car['fuel'] {
  if (!val) return 'Nafta'
  const v = val.toLowerCase()
  if (v.includes('diesel')) return 'Diesel'
  if (v.includes('gnc') || v.includes('gas natural')) return 'GNC'
  if (v.includes('híb') || v.includes('hib')) return 'Híbrido'
  if (v.includes('eléc') || v.includes('elec')) return 'Eléctrico'
  return 'Nafta'
}

function normalizeTransmission(val?: string): Car['transmission'] {
  if (!val) return 'Manual'
  return val.toLowerCase().includes('auto') ? 'Automático' : 'Manual'
}

function normalizeCategory(cat?: string, model?: string): Car['category'] {
  const source = (cat ?? model ?? '').toLowerCase()
  if (['hilux', 'ranger', 'amarok', 'frontier', 's10', 'l200', 'maverick', 'kangoo', 'pickup'].some(p => source.includes(p))) return 'pickup'
  if (['sw4', 'renegade', 'duster', 't-cross', 'captur', 'koleos', 'stepway', 'suran', 'suv', 'crossover'].some(p => source.includes(p))) return 'suv'
  if (['clio', 'gol', 'polo', 'etios', '208', '207', 'onix', 'corsa', 'fiesta', 'sandero', 'hatch'].some(p => source.includes(p))) return 'hatchback'
  return 'sedan'
}

// ─── Mapeo de registro a Car ──────────────────────────────────────────────────

function mapRecord(record: AirtableRecord, type: 'usado' | 'nuevo' | 'stock'): Car {
  const f = record.fields
  const images = (f.Fotos ?? []).map(a => a.thumbnails?.large?.url ?? a.url)

  return {
    id: record.id,
    brand: f.Marca ?? '',
    model: f.Modelo ?? '',
    version: f.Version ?? '',
    year: f['Año'] ?? 0,
    price: Number(f.Precio ?? 0),
    currency: 'ARS',
    km: Number(f.Kilometraje ?? 0),
    fuel: normalizeFuel(f.Combustible),
    transmission: normalizeTransmission(f.Transmision),
    color: f.Color ?? '',
    doors: 4,
    category: normalizeCategory(f.Categoria, f.Modelo),
    images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80'],
    featured: f.Destacado ?? false,
    description: f.Descripcion ?? '',
    features: [],
    type,
    status: f.Estado ?? 'disponible',
  }
}

// ─── API pública ──────────────────────────────────────────────────────────────

export async function getAllCars(): Promise<Car[]> {
  const [usados, nuevos, stock] = await Promise.all([
    fetchTable('Usados').then(r => r.map(rec => mapRecord(rec, 'usado'))),
    fetchTable('Nuevos').then(r => r.map(rec => mapRecord(rec, 'nuevo'))),
    fetchTable('Stock').then(r => r.map(rec => mapRecord(rec, 'stock'))),
  ])
  return [...usados, ...nuevos, ...stock]
}

export async function getFeaturedCars(): Promise<Car[]> {
  const all = await getAllCars()
  return all.filter(c => c.featured)
}

export async function getCarById(id: string): Promise<Car | null> {
  for (const [table, type] of [
    ['Usados', 'usado'],
    ['Nuevos', 'nuevo'],
    ['Stock', 'stock'],
  ] as const) {
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE}/${encodeURIComponent(table)}/${id}`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
        next: { revalidate: 300 },
      }
    )
    if (res.ok) {
      const record: AirtableRecord = await res.json()
      return mapRecord(record, type)
    }
  }
  return null
}
