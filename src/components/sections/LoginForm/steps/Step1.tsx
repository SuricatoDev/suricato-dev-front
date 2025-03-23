import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import * as S from '../styles'
import Button from '@/components/common/Button'
import InputEmail from '@/components/common/InputEmail'
import InputPassword from '@/components/common/InputPassword'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'



interface Step1Props {
  onNext: () => void
  onClose: () => void
  isModal: boolean
}

export default function Step1({ onNext, isModal, onClose }: Step1Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswordField, setShowPasswordField] = useState(false)
  const {
    control,
    formState: { errors },
    watch,
    setError,
    clearErrors
  } = useFormContext()
  const router = useRouter()
  const emailValue = watch('email')
  const passwordValue = watch('password')
  const isButtonDisabled =
    !emailValue ||
    !!errors.email ||
    (showPasswordField && (!passwordValue || !!errors.password))

  const handleNext = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/login/verificar-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue })
      })

      if (response.status === 200) {
        setShowPasswordField(true)
      } else {
        onNext()
      }
    } catch (error) {
      console.error('Erro na requisição de verificar email:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async () => {
    setIsLoading(true)
    clearErrors('password')

    const result = await signIn('credentials', {
      redirect: false,
      email: emailValue,
      password: passwordValue
    })

    setIsLoading(false)

    if (result?.error) {
      setError('password', {
        type: 'manual',
        message: 'Senha incorreta para o e-mail informado'
      })
    } else {
      if (isModal) {
        onClose()
      }
      const callbackUrl = (router.query.callbackUrl as string) || '/'
      router.push(callbackUrl)
    }
  }

  return (
    <>
      <S.Subtitle>Bem-vindo ao Excursionistas</S.Subtitle>
      <S.MainContent>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: 'O e-mail é obrigatório',
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Formato de e-mail inválido'
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <InputEmail
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              $error={error ? error.message : undefined}
              showDropdown={!isModal}
              placeholder="Digite seu e-mail"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleNext()
                }
              }}
            />
          )}
        />

        {showPasswordField && (
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'A senha é obrigatória'
            }}
            render={({ field, fieldState: { error } }) => (
              <InputPassword
                value={field.value}
                onChange={(e) => {
                  field.onChange(e)
                  clearErrors('password')
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleLogin()
                  }
                }}
                onBlur={field.onBlur}
                placeholder="Digite sua senha"
                $error={error ? error.message : undefined}
                $showStrengthMeter={false}
                $showErrorMessage
              />
            )}
          />
        )}

        <Button
          loading={isLoading}
          disabled={isButtonDisabled}
          onClick={showPasswordField ? handleLogin : handleNext}
          type="button"
        >
          {showPasswordField ? 'Entrar' : 'Continuar'}
        </Button>
      </S.MainContent>
      {}
    </>
  )
}
