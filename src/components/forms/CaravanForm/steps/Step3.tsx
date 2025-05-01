import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { CreateAdContext } from '@/contexts/CreateAdContext'

import AddressAutocomplete from '@/components/common/AddressAutocomplete'
import Divider from '@/components/common/Divider'
import {
  AddressData,
  EditableAddress
} from '@/components/common/EditableAddress'
import Map from '@/components/common/Map'

import * as S from '@/styles/pages/anuncios/steps/step3-4'

type Step3Props = {
  setCanProceed: (b: boolean) => void
  editMode?: boolean
}
export type Step3Ref = {
  handleNext: () => boolean
  handleBack: () => boolean
}

const Step3 = forwardRef<Step3Ref, Step3Props>(
  ({ setCanProceed, editMode = false }, ref) => {
    const { formData, updateFormData } = useContext(CreateAdContext)!

    const initialAddress =
      formData.endereco_origem &&
      formData.bairro_origem &&
      formData.cidade_origem &&
      formData.numero_origem &&
      formData.estado_origem
        ? `${formData.endereco_origem}, ${formData.bairro_origem}, ${formData.cidade_origem} - ${formData.estado_origem}`
        : ''

    const canSkip = editMode && initialAddress.length > 0

    const [selectedAddress, setSelectedAddress] = useState(initialAddress)
    const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(
      null
    )
    const [subStep, setSubStep] = useState<number>(canSkip ? 2 : 1)

    const [address, setAddress] = useState<AddressData>({
      cep: '',
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      complement: '',
      number: ''
    })

    useEffect(() => {
      if (canSkip && window.google?.maps) {
        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode(
          { address: initialAddress, region: 'BR' },
          (results, status) => {
            if (status === 'OK' && results?.[0]) {
              const loc = results[0].geometry.location.toJSON()
              setLocation(loc)

              const fullAddr: AddressData = {
                cep: formData.cep_origem || '',
                street: formData.endereco_origem!,
                neighborhood: formData.bairro_origem!,
                city: formData.cidade_origem!,
                state: formData.estado_origem!,
                number: formData.numero_origem!,
                complement: formData.complemento_origem || ''
              }
              setAddress(fullAddr)
              setCanProceed(true)
            }
          }
        )
      }
    }, [])

    useEffect(() => {
      if (subStep === 2 && (!canSkip || editMode)) {
        const { street, neighborhood, city, state, number } = address
        const isValid =
          Boolean(street.trim()) &&
          Boolean(neighborhood.trim()) &&
          Boolean(city.trim()) &&
          Boolean(state.trim()) &&
          Boolean(number.trim())
        setCanProceed(isValid)
      } else {
        setCanProceed(subStep === 2 && canSkip)
      }
    }, [subStep, address, canSkip])

    const handleSelect = (text: string, latLng: google.maps.LatLngLiteral) => {
      setSelectedAddress(text)
      setLocation(latLng)

      new window.google.maps.Geocoder().geocode(
        { location: latLng, language: 'pt', region: 'BR' },
        (results, status) => {
          if (status === 'OK' && results?.[0]) {
            const comps = results[0].address_components
            const getComp = (types: string[]) =>
              comps.find((c) => types.some((t) => c.types.includes(t)))
                ?.long_name || ''

            const fullAddress: AddressData = {
              cep: getComp(['postal_code']),
              street: getComp(['route']),
              neighborhood: getComp([
                'administrative_area_level_2',
                'sublocality'
              ]),
              city: getComp([
                'administrative_area_level_2',
                'locality',
                'postal_town'
              ]),
              state:
                comps.find((c) =>
                  c.types.includes('administrative_area_level_1')
                )?.short_name || '',
              number: getComp(['street_number']),
              complement: ''
            }

            setAddress(fullAddress)
            setSubStep(2)

            updateFormData('cep_origem', fullAddress.cep)
            updateFormData('endereco_origem', fullAddress.street)
            updateFormData('bairro_origem', fullAddress.neighborhood)
            updateFormData('cidade_origem', fullAddress.city)
            updateFormData('estado_origem', fullAddress.state)
            updateFormData('numero_origem', fullAddress.number)
            updateFormData('complemento_origem', fullAddress.complement)
          }
        }
      )
    }

    useImperativeHandle(ref, () => ({
      handleNext: () => {
        if (subStep === 1) {
          setSubStep(2)
          return false
        }
        return true
      },
      handleBack: () => {
        if (subStep === 2 && !canSkip) {
          setSubStep(1)
          return false
        }
        return true
      }
    }))

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
                <S.Title>De onde a caravana irá partir?</S.Title>
                <S.Subtitle>Endereço público da partida</S.Subtitle>
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
                  <S.Title>Confirme o endereço de partida</S.Title>
                  <S.Subtitle>
                    O endereço será compartilhado publicamente na página da
                    caravana.
                  </S.Subtitle>
                </S.Heading>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <EditableAddress
                    address={address}
                    setAddress={setAddress}
                    hasButton={false}
                    onSave={() => setCanProceed(true)}
                    activeSearch={editMode}
                  />
                </motion.div>
                <Divider marginY="16px" />
                <S.MapWrapper
                  borderRadius
                  as={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {location && (
                    <Map center={location} zoom={15} height="250px" />
                  )}
                </S.MapWrapper>
              </S.ContainerSubStep2>
            </motion.div>
          )}
        </AnimatePresence>
      </S.Container>
    )
  }
)

Step3.displayName = 'Step3'
export default Step3
