import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import * as S from '@/styles/pages/anuncios/steps/step3-4'
import AddressAutocomplete from '@/components/common/AddressAutocomplete'
import Map from '@/components/common/Map'
import Divider from '@/components/common/Divider'
import { EditableAddress } from '@/components/common/EditableAddress'
import { AddressData } from '@/components/common/EditableAddress'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react'
import { CreateAdContext } from '@/contexts/CreateAdContext'

type Step3Props = {
  setCanProceed: (b: boolean) => void
}
export type Step3Ref = {
  handleNext: () => boolean
  handleBack: () => boolean
}

const Step3 = forwardRef<Step3Ref, Step3Props>(({ setCanProceed }, ref) => {
  const { updateFormData } = useContext(CreateAdContext)!

  const [selectedAddress, setSelectedAddress] = useState('')
  const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(
    null
  )

  const [subStep, setSubStep] = useState(1)
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
  }, [subStep, setCanProceed])

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

          const fullAddress: AddressData = {
            cep: get(['postal_code']),
            street: get(['route']),
            neighborhood: get(['administrative_area_level_2', 'sublocality']),
            city: get([
              'administrative_area_level_2',
              'locality',
              'postal_town'
            ]),
            state:
              comps.find((c) =>
                ['administrative_area_level_1'].some((t) => c.types.includes(t))
              )?.short_name || '',
            number: get(['street_number']),
            complement: ''
          }

          setAddress(fullAddress)
          setSubStep(2)

          if (updateFormData) {
            updateFormData('cep_origem', fullAddress.cep)
            updateFormData('endereco_origem', fullAddress.street)
            updateFormData('bairro_origem', fullAddress.neighborhood)
            updateFormData('cidade_origem', fullAddress.city)
            updateFormData('estado_origem', fullAddress.state)
            updateFormData('numero_origem', fullAddress.number)
            updateFormData('complemento_origem', fullAddress.complement)
          }
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
      if (subStep === 2) {
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
                  O endereço da origem será compartilhado publicamente na página
                  da caravana.
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
                  activeSearch={false}
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
})

Step3.displayName = 'Step3'

export default Step3
