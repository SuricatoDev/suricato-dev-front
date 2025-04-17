import React, { useEffect, useRef, useState } from 'react'

import { MapPin } from '@phosphor-icons/react/dist/ssr/MapPin'

import * as S from './styles'

type Suggestion = { description: string; placeId: string }

type Props = {
  value: string
  onChange: (value: string) => void
  onSelect: (address: string, latLng: google.maps.LatLngLiteral) => void
}

export default function AddressAutocomplete({
  value,
  onChange,
  onSelect
}: Props) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const service = useRef<google.maps.places.AutocompleteService>()
  const geocoder = useRef<google.maps.Geocoder>()

  useEffect(() => {
    service.current = new window.google.maps.places.AutocompleteService()
    geocoder.current = new window.google.maps.Geocoder()
  }, [])

  useEffect(() => {
    if (value.length > 2) {
      service.current!.getPlacePredictions(
        { input: value, componentRestrictions: { country: 'BR' } },
        (preds) =>
          setSuggestions(
            preds?.map((p) => ({
              description: p.description,
              placeId: p.place_id
            })) || []
          )
      )
    } else {
      setSuggestions([])
    }
  }, [value])

  const handleSelect = (placeId: string, desc: string) => {
    geocoder.current!.geocode({ placeId }, (results, status) => {
      if (status === 'OK' && results?.[0]?.geometry) {
        const loc = results[0].geometry.location
        onSelect(desc, { lat: loc.lat(), lng: loc.lng() })
        onChange(desc)
        setSuggestions([])
      }
    })
  }

  return (
    <S.Container>
      <MapPin size={20} weight="fill" />
      <S.Wrapper>
        <S.Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Insira seu endereço"
        />
        {suggestions.length > 0 && (
          <S.List>
            {suggestions.map((s) => {
              const [place, address] = s.description.split(' - ')
              return (
                <S.Item
                  key={s.placeId}
                  onClick={() => handleSelect(s.placeId, s.description)}
                >
                  <S.Icon>
                    <MapPin size={16} weight="regular" />
                  </S.Icon>
                  <div>
                    <S.PlaceName>{place}</S.PlaceName>
                    {address && <S.PlaceAddress>{address}</S.PlaceAddress>}
                  </div>
                </S.Item>
              )
            })}
          </S.List>
        )}
      </S.Wrapper>
    </S.Container>
  )
}
