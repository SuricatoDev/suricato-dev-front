import React, { useState, useEffect, useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import {
  OrganizerFormData,
  OrganizerFormDataStep1,
  OrganizerFormDataStep2
} from './formTypes'
import * as S from './styles'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr/ArrowLeft'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { X } from '@phosphor-icons/react/dist/ssr/X'
import { getOrganizerValidationSchema } from '@/validation/formOrganizerValidation'
import { ObjectSchema } from 'yup'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

export type MultiStepFormProps = {
  $isModal?: boolean
  $isOpen?: boolean
  onClose?: () => void
}

export default function OrganizerForm({
  $isModal = false,
  $isOpen: externalIsOpen,
  onClose
}: MultiStepFormProps) {
  const router = useRouter()
  const { update } = useSession()
  const [step, setStep] = useState<number>(1)
  const [isOpen, setIsOpen] = useState<boolean>(externalIsOpen ?? false)

  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen)
    }
  }, [externalIsOpen])

  const [formValues, setFormValues] = useState<
    OrganizerFormDataStep1 | OrganizerFormDataStep2
  >({
    razao_social: '',
    cnpj: '',
    inscricao_estadual: '',
    inscricao_municipal: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: ''
  })

  const methods = useForm<OrganizerFormDataStep1 | OrganizerFormDataStep2>({
    resolver: yupResolver(
      (step === 1
        ? getOrganizerValidationSchema(1)
        : getOrganizerValidationSchema(2)) as ObjectSchema<
        OrganizerFormDataStep1 | OrganizerFormDataStep2
      >
    ),
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
    if ($isModal && isOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = ''
    }
    return () => {
      document.body.style.overflowY = ''
    }
  }, [$isModal, isOpen])

  const handleNext = async () => {
    if (step === 1) {
      const isValid = await methods.trigger([
        'razao_social',
        'cnpj',
        'inscricao_estadual',
        'inscricao_municipal'
      ])
      if (isValid) {
        setStep(2)
      }
    } else if (step === 2) {
      const isValid = await methods.trigger([
        'endereco',
        'numero',
        'bairro',
        'cep',
        'cidade',
        'estado'
      ])
      if (isValid) {
        const values = methods.getValues() as OrganizerFormData
        const payload = {
          razao_social: values.razao_social,
          cnpj: values.cnpj.replace(/\D/g, ''),
          inscricao_estadual: values.inscricao_estadual,
          inscricao_municipal: values.inscricao_municipal,
          endereco: values.endereco,
          cadastur: '1',
          numero: values.numero,
          complemento: values.complemento,
          bairro: values.bairro,
          cep: values.cep,
          cidade: values.cidade,
          estado: values.estado,
          organizador: true
        }
        try {
          const res = await fetch(`/api/register-organizador/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })

          if (!res.ok) {
            console.error('Erro no cadastro do organizador')
            return
          }
          toast.success('Empresa cadastrada com sucesso!')
          await update()
        } catch (error) {
          const err = error as AxiosError
          toast.error('Erro na requisição: ' + err.message)
        }
        handleClose()
        const callbackUrl = router.query.callbackUrl as string

        if (!callbackUrl || $isModal) {
          return
        }

        router.push(callbackUrl)
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      return setStep(step - 1)
    }

    return router.back()
  }

  if ($isModal && !isOpen) return null

  return (
    <FormProvider {...methods}>
      {$isModal && <S.ModalOverlay onClick={handleClose} />}
      <S.FormContainer $isModal={$isModal}>
        <S.Header $isModal={$isModal}>
          <S.BackButton onClick={handleBack}>
            <ArrowLeft size={24} weight="bold" />
          </S.BackButton>
          {step === 1 && (
            <>
              {$isModal && (
                <S.CloseButton onClick={handleClose}>
                  <X size={24} weight="bold" />
                </S.CloseButton>
              )}
              <S.Title>Cadastre sua Empresa</S.Title>
            </>
          )}
          {step === 2 && (
            <>
              <S.BackButton onClick={handleBack}>
                <ArrowLeft size={24} weight="bold" />
              </S.BackButton>
              <S.Title>Informe o Endereço</S.Title>
            </>
          )}
        </S.Header>
        <S.StyledForm
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          {step === 1 && <Step1 onNext={handleNext} onClose={handleClose} />}
          {step === 2 && <Step2 onNext={handleNext} />}
        </S.StyledForm>
      </S.FormContainer>
    </FormProvider>
  )
}
