import { createContext, useContext, useEffect, useState } from 'react'

import { Loader } from '@googlemaps/js-api-loader'

const GOOGLE_MAPS_LIBRARIES: 'places'[] = ['places']

type GoogleMapsContextType = {
  isLoaded: boolean
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false
})

export const GoogleMapsProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const triggerLoad = () => {
      setShouldLoad(true)
      cleanup()
    }

    const cleanup = () => {
      window.removeEventListener('scroll', triggerLoad)
      window.removeEventListener('click', triggerLoad)
      window.removeEventListener('touchstart', triggerLoad)
      clearTimeout(timer)
    }

    window.addEventListener('scroll', triggerLoad, { once: true })
    window.addEventListener('click', triggerLoad, { once: true })
    window.addEventListener('touchstart', triggerLoad, { once: true })

    const timer = window.setTimeout(triggerLoad, 5000)

    return cleanup
  }, [])

  useEffect(() => {
    if (!shouldLoad) return

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      libraries: GOOGLE_MAPS_LIBRARIES,
      language: 'pt',
      region: 'BR'
    })

    loader
      .load()
      .then(() => setIsLoaded(true))
      .catch((err) => {
        console.error('Erro ao carregar Google Maps:', err)
      })
  }, [shouldLoad])

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  )
}

export const useGoogleMaps = () => useContext(GoogleMapsContext)
