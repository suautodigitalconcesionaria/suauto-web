export const runtime = 'edge'

export async function GET() {
  const token = process.env.AIRTABLE_TOKEN
  const base = process.env.AIRTABLE_BASE_ID

  // Probar llamada real a Airtable
  let airtableStatus = 'not_tested'
  let airtableError = ''
  let recordCount = 0

  if (token && base) {
    try {
      const res = await fetch(
        `https://api.airtable.com/v0/${base}/Usados?maxRecords=1`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.ok) {
        const data: any = await res.json()
        airtableStatus = 'ok'
        recordCount = data.records?.length ?? 0
      } else {
        airtableStatus = `error_${res.status}`
        airtableError = await res.text()
      }
    } catch (e: any) {
      airtableStatus = 'fetch_failed'
      airtableError = e.message
    }
  }

  return Response.json({
    hasToken: !!token,
    tokenPrefix: token ? token.substring(0, 10) + '...' : 'MISSING',
    hasBase: !!base,
    baseValue: base ?? 'MISSING',
    airtableStatus,
    airtableError,
    recordCount,
  })
}
