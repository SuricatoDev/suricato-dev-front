import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useJsApiLoader } from '@react-google-maps/api'

import { CreateAdProvider } from '../../contexts/CreateAdContext'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import StepLocation from './steps/StepLocation'
import HeaderNav from '@/components/sections/HeaderNav'
import FooterNav from '@/components/sections/FooterNav'
import { AddressDataNoApi } from '@/components/common/EditableAddressNoApi'
import Step5 from './steps/Step5'
import Step6 from './steps/Step6'
import { ImageDropzone } from '@/components/common/ImageDropzone'
import Step7 from './steps/Step7'

const Container = styled.div`
  padding: 88px 0 86px;
  position: relative;
  z-index: 0;
  box-sizing: border-box;
`

export default function CreateAd() {
  const [step, setStep] = useState(1)
  const [subStep3, setSubStep3] = useState<1 | 2>(1)
  const [subStep4, setSubStep4] = useState<1 | 2>(1)
  const [origin, setOrigin] = useState<AddressDataNoApi>({
    cep: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    number: ''
  })
  const [destination, setDestination] = useState<AddressDataNoApi>({
    ...origin
  })
  const [canProceed, setCanProceed] = useState(false)
  const totalSteps = 5

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
    language: 'pt',
    region: 'BR'
  })

  useEffect(() => {
    if (step === 1 || step === 2) {
      setCanProceed(true)
    }
    if (step === 3) {
      setCanProceed(subStep3 === 2)
    }
    if (step === 4) {
      setCanProceed(subStep4 === 2)
    }
    if (step === 5) {
      setCanProceed(true)
    }
  }, [step, subStep3, subStep4])

  if (!isLoaded) return null

  const handleNext = () => {
    if (step === 3 && subStep3 === 1) {
      return setSubStep3(2)
    }
    if (step === 4 && subStep4 === 1) {
      return setSubStep4(2)
    }
    if (step < totalSteps) {
      setStep((prev) => prev + 1)
      setSubStep3(1)
      setSubStep4(1)
    } else {
      alert('Concluído!')
    }
  }

  const handleBack = () => {
    if (step === 3 && subStep3 === 2) {
      return setSubStep3(1)
    }
    if (step === 4 && subStep4 === 2) {
      return setSubStep4(1)
    }
    if (step > 1) {
      setStep((prev) => prev - 1)
      setSubStep3(1)
      setSubStep4(1)
    }
  }

  const renderStep = () => {
    if (step === 1) return <Step7 setCanProceed={setCanProceed} />
    if (step === 2) return <Step2 setCanProceed={setCanProceed} />
    if (step === 3) {
      return (
        <StepLocation
          title="De onde a caravana irá partir?"
          subtitle="Endereço público da partida"
          titleStep2="Confirme o endereço de partida"
          subtitleStep2="O endereço da origem será compartilhado publicamente na página da caravana."
          subStep={subStep3}
          setSubStep={setSubStep3}
          address={origin}
          setAddress={setOrigin}
          setCanProceed={setCanProceed}
        />
      )
    }
    if (step === 4) {
      return (
        <StepLocation
          title="Qual o destino da caravana?"
          subtitle="Endereço público do destino"
          titleStep2="Confirme o endereço de destino"
          subtitleStep2="O endereço do destino será compartilhado publicamente na página da caravana."
          subStep={subStep4}
          setSubStep={setSubStep4}
          address={destination}
          setAddress={setDestination}
          setCanProceed={setCanProceed}
        />
      )
    }
    if (step === 5) {
      return <Step5 setCanProceed={setCanProceed} />
    }
  }

  return (
    <CreateAdProvider>
      <HeaderNav />
      <Container>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </Container>
      <FooterNav
        step={step}
        totalSteps={totalSteps}
        onBack={handleBack}
        onNext={handleNext}
        canProceed={canProceed}
      />
    </CreateAdProvider>
  )
}
