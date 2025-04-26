import { Caravan } from '@/interfaces/caravan'


export function filterFutureCaravans(
  caravans: Caravan[],
  referenceDate: Date = new Date()
): Caravan[] {
  return caravans.filter((c) => {
    
    const partida = new Date(c.data_partida.replace(' ', 'T'))
    return partida > referenceDate
  })
}
