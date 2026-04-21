// ⚠️ REEMPLAZAR con el número real de WhatsApp (sin +, con código de país)
// Argentina (+54) + área General Pico (2302) + número
export const WHATSAPP_NUMBER = "549230244148"

export const BUSINESS_NAME = "SuAuto"
export const BUSINESS_CITY = "General Pico, La Pampa"
export const BUSINESS_ADDRESS = "Calle 10, N°341. General Pico, La Pampa, Argentina"
export const BUSINESS_PHONE = "+54 9 2302 44-1482"
export const BUSINESS_EMAIL = "suautodigitalconcesionaria@gmail.com"
export const BUSINESS_HOURS = "Lunes a Sábado de 8:15 a 12:15hs y 16:30 a 20:30hs"
export const BUSINESS_INSTAGRAM = "https://instagram.com/suauto.concesionaria"
export const BUSINESS_TIKTOK = "https://tiktok.com/@suauto.concesionaria"

export function whatsappLink(message?: string): string {
  const msg = message ?? "Hola! Quiero consultar sobre un auto de SuAuto."
  return `https://wa.me/${+5492302441482}?text=${encodeURIComponent(msg)}`
}
