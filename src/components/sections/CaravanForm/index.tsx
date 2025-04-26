/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'

import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { useIsOrganizer } from '@/hooks/useIsOrganizer'

import { ImageItem, useCreateAd } from '@/contexts/CreateAdContext'

import FooterNav from '@/components/sections/FooterNav'
import HeaderNav from '@/components/sections/HeaderNav'

import {
  Step1,
  Step2,
  Step3,
  Step3Ref,
  Step4,
  Step4Ref,
  Step5,
  Step6,
  Step7,
  Step8,
  Step9,
  Step10,
  Step11,
  Step12
} from './steps'

const Container = styled.div`
  padding: calc(64px + 1rem) 0 87px;
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  height: 100vh;
  overflow-y: auto;
`

interface CaravanFormProps {
  mode: 'create' | 'edit'
  caravanId?: string
  initialData?: { imagens: ImageItem[] }
}

export default function CaravanForm({
  mode,
  initialData,
  caravanId
}: CaravanFormProps) {
  const isEditMode = mode === 'edit'
  const { data: session } = useSession()
  const { isOrganizer, loading } = useIsOrganizer()
  const router = useRouter()

  const { formData, updateFormData } = useCreateAd()

  const [step, setStep] = useState(1)
  const totalSteps = 12
  const [canProceed, setCanProceed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const step3Ref = useRef<Step3Ref>(null)
  const step4Ref = useRef<Step4Ref>(null)

  const initialImageIdsRef = useRef<string[]>([])

  useEffect(() => {
    if (isEditMode && initialData?.imagens) {
      initialImageIdsRef.current = initialData.imagens
        .filter((img) => img.id != null)
        .map((img) => String(img.id))
    }
  }, [isEditMode, initialData])

  useEffect(() => {
    const autoProceedSteps = [1, 2, 5]
    setCanProceed(autoProceedSteps.includes(step))
  }, [step])

  useEffect(() => {
    if (!loading && !isOrganizer) {
      router.push('/anuncios')
    }
  }, [loading, isOrganizer, router])

  useEffect(() => {
    if (session?.user) {
      updateFormData('organizador_id', session.user.id)
    }
  }, [])

  if (!isOrganizer) return null

  const handleNext = async () => {
    if (
      (step === 3 && !step3Ref.current?.handleNext()) ||
      (step === 4 && !step4Ref.current?.handleNext())
    ) {
      return
    }

    if (step < totalSteps) {
      setStep((prev) => prev + 1)
      return
    }

    try {
      setIsLoading(true)

      const payload = new FormData()

      const { imagens, ...rest } = formData

      payload.append('dados', JSON.stringify(rest))

      imagens.forEach((img, index) => {
        if (img.file) {
          payload.append(`imagens[${index}]`, img.file)
        } else if (img.id) {
          payload.append(`imagens[${index}]`, img.id.toString())
        }
      })

      if (isEditMode) {
        payload.append('_method', 'PUT')

        await axios.post(`/api/caravanas/editar/${caravanId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })

        toast.success('Edição concluída!')
        setTimeout(() => router.push('/anuncios'), 1000)
      } else {
        await axios.post('/api/caravanas', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })

        toast.success('Caravana criada com sucesso!')
        setTimeout(() => router.push('/anuncios'), 1000)
      }
    } catch (error) {
      console.error(error)
      toast.error('Ocorreu um erro ao salvar, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    if (
      (step === 3 && !step3Ref.current?.handleBack()) ||
      (step === 4 && !step4Ref.current?.handleBack())
    ) {
      return
    }

    if (step > 1) {
      setStep((prev) => prev - 1)
    }
  }

  const steps = (
    setCanProceed: React.Dispatch<React.SetStateAction<boolean>>
  ) => [
    <Step1 key="step1" />,
    <Step2 key="step2" setCanProceed={setCanProceed} />,
    <Step3
      key="step3"
      ref={step3Ref}
      setCanProceed={setCanProceed}
      editMode={isEditMode}
    />,
    <Step4
      key="step4"
      ref={step4Ref}
      setCanProceed={setCanProceed}
      editMode={isEditMode}
    />,
    <Step5 key="step5" setCanProceed={setCanProceed} />,
    <Step6 key="step6" setCanProceed={setCanProceed} />,
    <Step7 key="step7" setCanProceed={setCanProceed} />,
    <Step8 key="step8" setCanProceed={setCanProceed} />,
    <Step9 key="step9" setCanProceed={setCanProceed} />,
    <Step10 key="step10" setCanProceed={setCanProceed} />,
    <Step11 key="step11" setCanProceed={setCanProceed} />,
    <Step12 key="step12" setCanProceed={setCanProceed} />
  ]

  return (
    <>
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
            {steps(setCanProceed)[step - 1]}
          </motion.span>
        </AnimatePresence>
      </Container>
      <FooterNav
        step={step}
        totalSteps={totalSteps}
        onBack={handleBack}
        onNext={handleNext}
        isLoading={isLoading}
        canProceed={canProceed}
      />
    </>
  )
}
