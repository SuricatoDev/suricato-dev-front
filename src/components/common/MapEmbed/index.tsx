import * as S from './styles'
interface MapEmbedProps {
  location: string
}

export default function MapEmbed({ location }: MapEmbedProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(location)}`

  return (
    <S.MapContainer>
      <iframe
        title="Local do evento"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapSrc}
        allowFullScreen
      />
    </S.MapContainer>
  )
}
