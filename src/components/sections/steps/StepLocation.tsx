import React, { useEffect, useState } from 'react'
import * as S from '@/styles/pages/anunciar/steps/stepLocation'
import AddressAutocomplete from '@/components/common/AddressAutocomplete'
import Map from '@/components/common/Map'
import Divider from '@/components/common/Divider'
import { EditableAddressNoApi } from '@/components/common/EditableAddressNoApi'
import { AddressDataNoApi } from '@/components/common/EditableAddressNoApi'
import { AnimatePresence, motion } from 'framer-motion'

type StepLocationProps = {
  title: string
  subtitle: string
  titleStep2: string
  subtitleStep2: string
  setCanProceed: (b: boolean) => void
  subStep: 1 | 2
  setSubStep: (s: 1 | 2) => void
  address: AddressDataNoApi
  setAddress: (a: AddressDataNoApi) => void
}

export default function StepLocation({
  title,
  subtitle,
  titleStep2,
  subtitleStep2,
  setCanProceed,
  subStep,
  setSubStep,
  address,
  setAddress
}: StepLocationProps) {
  const [selectedAddress, setSelectedAddress] = useState('')
  const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(
    null
  )

  useEffect(() => {
    if (subStep === 2) {
      const { street, neighborhood, city, state, number } = address
      const isValid =
        Boolean(street.trim()) &&
        Boolean(neighborhood.trim()) &&
        Boolean(city.trim()) &&
        Boolean(state.trim()) &&
        Boolean(number.trim())
      setCanProceed(isValid)
    } else {
      setCanProceed(false)
    }
  }, [address, subStep, setCanProceed])

  const handleSelect = (text: string, latLng: google.maps.LatLngLiteral) => {
    setSelectedAddress(text)
    setLocation(latLng)
    new window.google.maps.Geocoder().geocode(
      { location: latLng, language: 'pt', region: 'BR' },
      (results, status) => {
        if (status === 'OK' && results?.[0]) {
          const comps = results[0].address_components
          const get = (types: string[]) =>
            comps.find((c) => types.some((t) => c.types.includes(t)))
              ?.long_name || ''
          setAddress({
            cep: get(['postal_code']),
            street: get(['route']),
            neighborhood: get(['administrative_area_level_2', 'sublocality']),
            city: get([
              'administrative_area_level_2',
              'locality',
              'postal_town'
            ]),
            state: get(['administrative_area_level_1']),
            number: get(['street_number'])
          })
          setSubStep(2)
        }
      }
    )
  }

  return (
    <S.Container>
      <AnimatePresence mode="wait">
        {subStep === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <S.Heading
              as={motion.div}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <S.Title>{title}</S.Title>
              <S.Subtitle>{subtitle}</S.Subtitle>
            </S.Heading>
            <S.MapContainer
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <S.SearchWrapper>
                <AddressAutocomplete
                  value={selectedAddress}
                  onChange={setSelectedAddress}
                  onSelect={handleSelect}
                />
              </S.SearchWrapper>
              <S.MapWrapper>
                <Map
                  center={location ?? { lat: -14.235, lng: -51.9253 }}
                  zoom={location ? 15 : 4}
                />
              </S.MapWrapper>
            </S.MapContainer>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <S.ContainerSubStep2>
              <S.Heading
                withoutPadding
                as={motion.div}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <S.Title>{titleStep2}</S.Title>
                <S.Subtitle>{subtitleStep2}</S.Subtitle>
              </S.Heading>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <EditableAddressNoApi
                  address={address}
                  setAddress={setAddress}
                  hasButton={false}
                  onSave={() => setCanProceed(true)}
                />
              </motion.div>
              <Divider $marginY="16px" />
              <S.MapWrapper
                borderRadius
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Map center={location!} zoom={15} height="250px" />
              </S.MapWrapper>
            </S.ContainerSubStep2>
          </motion.div>
        )}
      </AnimatePresence>
    </S.Container>
  )
}
