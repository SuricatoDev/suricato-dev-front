import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useJsApiLoader } from '@react-google-maps/api'

import { CreateAdProvider } from '@/contexts/CreateAdContext'
import Step1 from '@/components/sections/steps/Step1'
import Step2 from '@/components/sections/steps/Step2'
import StepLocation from '@/components/sections/steps/StepLocation'
import HeaderNav from '@/components/sections/HeaderNav'
import FooterNav from '@/components/sections/FooterNav'
import { AddressDataNoApi } from '@/components/common/EditableAddressNoApi'
import Step5 from '@/components/sections/steps/Step5'
import Step6 from '@/components/sections/steps/Step6'
import Step7 from '@/components/sections/steps/Step7'
import Step8 from '@/components/sections/steps/Step8'
import Step9 from '@/components/sections/steps/Step9'
import Step10 from '@/components/sections/steps/Step10'
import Step11 from '@/components/sections/steps/Step11'
import Step12 from '@/components/sections/steps/Step12'
import { useIsOrganizer } from '@/hooks/useIsOrganizer'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import Step3, { Step3Ref } from '@/components/sections/steps/Step3'

const Container = styled.div`
  padding: calc(64px + 1rem) 0 87px;
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  height: calc(100vh);
  overflow-y: auto;
`
type Library = 'places'
const googleMapsLibraries: Library[] = ['places']

export default function CreateAd() {
  const { isOrganizer, loading } = useIsOrganizer()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [subStep4, setSubStep4] = useState<1 | 2>(1)

  const [canProceed, setCanProceed] = useState(false)
  const step3Ref = useRef<Step3Ref>(null)
  const totalSteps = 12

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: googleMapsLibraries,
    language: 'pt',
    region: 'BR'
  })

  useEffect(() => {
    if (step === 1 || step === 2) {
      setCanProceed(true)
    }
    if (step === 4) {
      setCanProceed(subStep4 === 2)
    }
    if (step === 5) {
      setCanProceed(true)
    }
  }, [step, subStep4])

  useEffect(() => {
    if (!loading && !isOrganizer) {
      router.push('/anunciar')
    }
  }, [loading, isOrganizer, router])

  if (!isLoaded || !isOrganizer) return null

  const handleNext = () => {
    if (step === 3) {
      const completed = step3Ref.current?.handleNext()

      if (completed) {
        setStep((prev) => prev + 1)
      }
    }
    if (step === 4 && subStep4 === 1) {
      return setSubStep4(2)
    }
    if (step < totalSteps) {
      setStep((prev) => prev + 1)
      setSubStep4(1)
    } else {
      alert('Concluído!')
    }
  }

  const handleBack = () => {
    if (step === 3) {
      const atStart = step3Ref.current?.handleBack()
      if (atStart) {
        setStep((prev) => prev - 1)
      }
      return
    }
    if (step === 4 && subStep4 === 2) {
      return setSubStep4(1)
    }
    if (step > 1) {
      setStep((prev) => prev - 1)
      setSubStep4(1)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 />
      case 2:
        return <Step2 setCanProceed={setCanProceed} />
      case 3:
        return <Step3 ref={step3Ref} setCanProceed={setCanProceed} />
      case 4:
        return <h1>step4</h1>
      case 5:
        return <Step5 setCanProceed={setCanProceed} />
      case 6:
        return <Step6 setCanProceed={setCanProceed} />
      case 7:
        return <Step7 setCanProceed={setCanProceed} />
      case 8:
        return <Step8 setCanProceed={setCanProceed} />
      case 9:
        return <Step9 setCanProceed={setCanProceed} />
      case 10:
        return <Step10 setCanProceed={setCanProceed} />
      case 11:
        return <Step11 setCanProceed={setCanProceed} />
      case 12:
        return <Step12 setCanProceed={setCanProceed} />
      default:
        return null
    }
  }

  return (
    <CreateAdProvider>
      <HeaderNav />
      <Container>
        <AnimatePresence mode="wait">
          <motion.span
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ height: 'auto' }}
          >
            {renderStep()}
          </motion.span>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login?callbackUrl=/anunciar/novo',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}
