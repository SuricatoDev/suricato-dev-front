import { createContext, useContext } from 'react'

import { useJsApiLoader } from '@react-google-maps/api'

const googleMapsLibraries: 'places'[] = ['places']

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
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: googleMapsLibraries,
    language: 'pt',
    region: 'BR'
  })

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  )
}

export const useGoogleMaps = () => useContext(GoogleMapsContext)
