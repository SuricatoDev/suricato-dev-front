import React from 'react'

import { GoogleMap, MarkerF } from '@react-google-maps/api'

type MapProps = {
  center: google.maps.LatLngLiteral
  zoom?: number
  width?: string
  height?: string
}

export default function Map({
  center,
  zoom = 15,
  width = '100%',
  height = 'calc(100dvh - 239px)'
}: MapProps) {
  return (
    <GoogleMap
      mapContainerStyle={{ width, height }}
      center={center}
      zoom={zoom}
      options={{
        disableDefaultUI: true,
        clickableIcons: false
      }}
    >
      {zoom > 5 && <MarkerF position={center} />}
    </GoogleMap>
  )
}
