import { useCallback, useEffect, useState } from 'react'

import { Caravan } from '@/interfaces/caravan'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { useAuthStatus } from '@/contexts/AuthStatusProvider'

export function useFavorites() {
  const { isLogged } = useAuthStatus()
  const [favoritesIds, setFavoritesIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [favoriteCaravans, setFavoriteCaravans] = useState<Caravan[]>([])

  const fetchFavorites = useCallback(async () => {
    if (!isLogged) return

    try {
      setLoading(true)
      const res = await axios.get('/api/favoritos/listar')
      const caravanas = res.data.data
      setFavoriteCaravans(caravanas)
      setFavoritesIds(
        caravanas.map((c: { id: string | number }) => String(c.id))
      )
    } catch (err) {
      console.error('Erro ao buscar favoritos', err)
    } finally {
      setLoading(false)
    }
  }, [isLogged])

  const toggleFavorite = useCallback(
    async (caravanId: string, newValue: boolean, caravanName: string) => {
      try {
        await axios({
          url: `/api/favoritos/${caravanId}`,
          method: newValue ? 'POST' : 'DELETE'
        })

        setFavoritesIds((prev) =>
          newValue
            ? [...prev, caravanId]
            : prev.filter((id) => id !== caravanId)
        )

        setFavoriteCaravans((prev) =>
          newValue
            ? prev
            : prev.filter((caravana) => String(caravana.id) !== caravanId)
        )

        toast.success(
          newValue
            ? `Caravana "${caravanName}" adicionada aos favoritos!`
            : `Caravana "${caravanName}" removida dos favoritos!`
        )
      } catch (err: unknown) {
        const error = err as AxiosError<{ message: string }>
        const msg =
          error?.response?.data?.message || 'Erro ao favoritar/desfavoritar'
        toast.error(msg)
        console.error('Erro ao favoritar/desfavoritar', err)
      }
    },
    []
  )

  const isFavorited = useCallback(
    (caravanId: string) => favoritesIds.includes(caravanId),
    [favoritesIds]
  )

  useEffect(() => {
    if (!isLogged) return
    fetchFavorites()
  }, [fetchFavorites])

  return {
    favoriteCaravans,
    favoritesIds,
    isFavorited,
    toggleFavorite,
    fetchFavorites,
    loading
  }
}
