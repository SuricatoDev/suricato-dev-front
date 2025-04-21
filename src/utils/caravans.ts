import { Caravan } from '@/interfaces/caravan'

/**
 * Retorna apenas as caravanas cuja data_partida seja maior que a data de referência.
 * @param caravans lista completa de caravanas
 * @param referenceDate data contra a qual comparar (por padrão now)
 */
export function filterFutureCaravans(
  caravans: Caravan[],
  referenceDate: Date = new Date()
): Caravan[] {
  return caravans.filter((c) => {
    // transforma "YYYY-MM-DD HH:mm:ss" em ISO
    const partida = new Date(c.data_partida.replace(' ', 'T'))
    return partida > referenceDate
  })
}
