import React, { useState } from 'react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import { LoginFormData } from './formTypes'
import * as S from './styles'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr/ArrowLeft'

const MultiStepForm: React.FC = () => {
  const methods = useForm<LoginFormData>({
    defaultValues: {
      email: ''
    }
  })

  const [step, setStep] = useState<number>(1)

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    if (step < 2) {
      setStep(step + 1)
    } else {
      console.log('Dados do formulário:', data)
    }
  }

  const handleNext = () => {
    methods.handleSubmit(onSubmit)()
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
          {step === 2 && <Step2 onNext={handleNext} onPrev={handleBack} />}
        </S.StyledForm>
      </S.FormContainer>
    </FormProvider>
  )
}

export default MultiStepForm
