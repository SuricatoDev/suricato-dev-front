import React, { useCallback, useEffect, useState } from 'react'

import { getValidationSchema } from '@/validation/formValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FormProvider, Resolver, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ArrowLeft } from '@phosphor-icons/react/dist/ssr/ArrowLeft'
import { X } from '@phosphor-icons/react/dist/ssr/X'

import { useAuthStatus } from '@/contexts/AuthStatusProvider'

import { LoginFormData, SignupFormData } from './formTypes'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import StepNewPassword from './steps/StepNewPassword'
import StepRecover from './steps/StepRecover'
import StepRecoverToken from './steps/StepRecoverToken'
import * as S from './styles'

type FormData = LoginFormData &
  SignupFormData & {
    token: string
    newPassword: string
    confirmPassword: string
  }

export type MultiStepFormProps = {
  $isModal?: boolean
  isOpen?: boolean
  onClose?: () => void
}

export default function MultiStepForm({
  $isModal = false,
  isOpen: externalIsOpen,
  onClose
}: MultiStepFormProps) {
  const router = useRouter()
  const { isLogged } = useAuthStatus()

  const [step, setStep] = useState(1)
  const [isOpen, setIsOpen] = useState(externalIsOpen ?? false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (externalIsOpen !== undefined) setIsOpen(externalIsOpen)
  }, [externalIsOpen])

  const [formValues, setFormValues] = useState<FormData>({
    email: '',
    password: '',
    contactEmail: '',
    firstName: '',
    lastName: '',
    phone: '',
    birthDate: { day: 0, month: 0, year: 0 },
    token: '',
    newPassword: '',
    confirmPassword: ''
  })

  const methods = useForm<FormData>({
    resolver: yupResolver(
      getValidationSchema(step)
    ) as unknown as Resolver<FormData>,
    mode: 'all',
    defaultValues: formValues
  })

  useEffect(() => {
    setFormValues(methods.getValues())
  }, [methods, step])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    onClose?.()
  }, [onClose])

  useEffect(() => {
    if (!isLogged) return
    const callbackUrl = (router.query.callbackUrl as string) || '/'
    router.replace(`${callbackUrl}?r=${Date.now()}`)
  }, [isLogged, router])

  useEffect(() => {
    if (!$isModal || !isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [$isModal, isOpen, handleClose])

  const handleNext = async () => {
    if (step === 1) {
      const ok = await methods.trigger('email')
      if (ok) setStep(2)
    } else if (step === 2) {
      const ok = await methods.trigger([
        'firstName',
        'lastName',
        'birthDate',
        'contactEmail',
        'password',
        'phone'
      ])

      if (!ok) {
        return
      }

      const v = methods.getValues()
      const payload = {
        nome: `${v.firstName} ${v.lastName}`,
        data_nascimento:
          `${v.birthDate.year}-${String(v.birthDate.month).padStart(2, '0')}` +
          `-${String(v.birthDate.day).padStart(2, '0')}`,
        telefone: v.phone.replace(/\D/g, ''),
        email: v.contactEmail,
        password: v.password
      }

      try {
        setIsLoading(true)
        const res = await fetch('/api/usuarios/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        if (!res.ok) {
          console.error('Erro no cadastro')
          return
        }

        toast.success('Cadastro realizado com sucesso!')

        await signIn('credentials', {
          email: v.contactEmail,
          password: v.password,
          redirect: false,
          callbackUrl: '/'
        })
      } catch {
        setIsLoading(false)
        toast.error('Erro ao cadastrar. Tente novamente.')
      }
      handleClose()
    }
  }

  const handleBack = () => setStep(step - 1)
  const handleRecover = () => setStep(3)
  const handleToToken = () => setStep(4)
  const handleToNewPwd = () => setStep(5)

  useEffect(() => {
    document.body.style.overflowY = $isModal && isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflowY = ''
    }
  }, [$isModal, isOpen])

  if ($isModal && !isOpen) return null

  return (
    <FormProvider {...methods}>
      {$isModal && <S.ModalOverlay onClick={handleClose} />}
      <S.FormContainer $isModal={$isModal} step={step}>
        <S.Header $isModal={$isModal}>
          {step === 1 && (
            <>
              {$isModal ? (
                <S.CloseButton onClick={handleClose}>
                  <X size={24} weight="bold" />
                </S.CloseButton>
              ) : (
                <S.BackButton
                  onClick={() => {
                    router.back()
                  }}
                >
                  <ArrowLeft size={24} weight="bold" />
                </S.BackButton>
              )}
              <S.Title>Entre ou Cadastre-se</S.Title>
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
          {step === 3 && (
            <>
              <S.BackButton onClick={() => setStep(1)}>
                <ArrowLeft size={24} weight="bold" />
              </S.BackButton>
              <S.Title>Recuperar senha</S.Title>
            </>
          )}
          {step === 4 && (
            <>
              <S.BackButton onClick={() => setStep(3)}>
                <ArrowLeft size={24} weight="bold" />
              </S.BackButton>
              <S.Title>Insira o código</S.Title>
            </>
          )}
          {step === 5 && (
            <>
              <S.BackButton onClick={() => setStep(4)}>
                <ArrowLeft size={24} weight="bold" />
              </S.BackButton>
              <S.Title>Nova senha</S.Title>
            </>
          )}
        </S.Header>

        <S.StyledForm onSubmit={(e) => e.preventDefault()}>
          {step === 1 && (
            <Step1
              onNext={handleNext}
              onRecover={handleRecover}
              onClose={handleClose}
              isModal={$isModal}
            />
          )}
          {step === 2 && (
            <Step2
              onNext={handleNext}
              $isModal={$isModal}
              loading={isLoading}
            />
          )}
          {step === 3 && (
            <StepRecover onNext={handleToToken} isModal={$isModal} />
          )}
          {step === 4 && <StepRecoverToken onNext={handleToNewPwd} />}
          {step === 5 && <StepNewPassword onClose={handleClose} />}
        </S.StyledForm>
      </S.FormContainer>
    </FormProvider>
  )
}
