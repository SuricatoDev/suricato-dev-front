import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import { LoginFormData } from './formTypes'
import * as S from './styles'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr/ArrowLeft'
import { validationSchema } from '@/validation/formValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

export default function MultiStepForm() {
  const router = useRouter()

  const methods = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      contactEmail: '',
      password: '',
      firstName: '',
      lastName: '',
      birthDate: { day: 0, month: 0, year: 0 }
    }
  })

  const [step, setStep] = useState<number>(1)

  const handleNext = async () => {
    if (step === 1) {
      const isValid = await methods.trigger('email')
      if (isValid) {
        setStep(step + 1)
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
        router.push('/')
      }
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  return (
    <FormProvider {...methods}>
      <S.FormContainer>
        <S.Header>
          {step === 1 && <S.Title>Entrar ou cadastrar-se</S.Title>}
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
          {step === 2 && <Step2 onNext={handleNext} />}
        </S.StyledForm>
      </S.FormContainer>
    </FormProvider>
  )
}
