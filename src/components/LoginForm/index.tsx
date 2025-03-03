import React, { useState, useEffect, useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import { LoginFormData, SignupFormData } from './formTypes'
import * as S from './styles'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr/ArrowLeft'
import { getValidationSchema } from '@/validation/formValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { X } from '@phosphor-icons/react/dist/ssr/X'

export type MultiStepFormProps = {
  $isModal?: boolean
  $isOpen?: boolean
  onClose?: () => void
}

export default function MultiStepForm({
  $isModal = false,
  $isOpen: externalIsOpen,
  onClose
}: MultiStepFormProps) {
  const router = useRouter()
  const [step, setStep] = useState<number>(1)

  const [isOpen, setIsOpen] = useState<boolean>(externalIsOpen ?? false)

  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen)
    }
  }, [externalIsOpen])

  const [formValues, setFormValues] = useState<LoginFormData | SignupFormData>({
    email: '',
    password: '',
    contactEmail: '',
    firstName: '',
    lastName: '',
    birthDate: { day: 0, month: 0, year: 0 }
  })

  const methods = useForm<LoginFormData | SignupFormData>({
    resolver: yupResolver(getValidationSchema(step)),
    mode: 'all',
    defaultValues: formValues
  })

  useEffect(() => {
    setFormValues(methods.getValues())
  }, [methods, step])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    if (onClose) onClose()
  }, [onClose])

  useEffect(() => {
    if (!$isModal || !isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [$isModal, isOpen, handleClose])

  const handleNext = async () => {
    if (step === 1) {
      const isValid = await methods.trigger('email')
      if (isValid) {
        setStep(2)
      }
    } else if (step === 2) {
      const isValid = await methods.trigger([
        'firstName',
        'lastName',
        'birthDate',
        'contactEmail',
        'password'
      ])
      if (isValid) {
        console.log(methods.getValues())
        handleClose()
        router.push('/')
      }
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  useEffect(() => {
    if ($isModal && isOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = ''
    }

    return () => {
      document.body.style.overflowY = ''
    }
  }, [$isModal, isOpen])

  if ($isModal && !isOpen) return null

  return (
    <FormProvider {...methods}>
      {$isModal && <S.ModalOverlay onClick={handleClose} />}
      <S.FormContainer $isModal={$isModal}>
        <S.Header $isModal={$isModal}>
          {step === 1 && (
            <>
              {$isModal && (
                <S.CloseButton onClick={handleClose}>
                  <X size={24} weight="bold" />
                </S.CloseButton>
              )}
              <S.Title>Entrar ou cadastrar-se</S.Title>
            </>
          )}
          {step === 2 && (
            <>
              <S.BackButton onClick={handleBack}>
                <ArrowLeft size={24} weight="bold" />
              </S.BackButton>
              <S.Title>Concluir cadastro</S.Title>
            </>
          )}
        </S.Header>
        <S.StyledForm>
          {step === 1 && <Step1 onNext={handleNext} />}
          {step === 2 && <Step2 onNext={handleNext} $isModal={$isModal} />}
        </S.StyledForm>
      </S.FormContainer>
    </FormProvider>
  )
}
