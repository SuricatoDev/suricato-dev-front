import React, { useEffect, useState } from 'react'

import { signIn } from 'next-auth/react'
import { Controller, useFormContext } from 'react-hook-form'

import Button from '@/components/common/Button'
import InputEmail from '@/components/common/InputEmail'
import InputPassword from '@/components/common/InputPassword'

import * as S from '../styles'

interface Step1Props {
  onNext: () => void
  onRecover: () => void
  onClose: () => void
  isModal: boolean
}

export default function Step1({
  onNext,
  onRecover,
  isModal,
  onClose
}: Step1Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswordField, setShowPasswordField] = useState(false)
  const {
    control,
    formState: { errors },
    watch,
    setError,
    clearErrors
  } = useFormContext()

  const emailValue = watch('email')
  const passwordValue = watch('password')
  const isButtonDisabled =
    !emailValue ||
    !!errors.email ||
    (showPasswordField && (!passwordValue || !!errors.password))

  const [validatedEmail, setValidatedEmail] = useState<string | null>(null)
  useEffect(() => {
    if (validatedEmail && emailValue !== validatedEmail) {
      setShowPasswordField(false)
    }
  }, [emailValue, validatedEmail])

  const handleNext = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/autenticacao/verificar-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue })
      })
      if (res.status === 200) {
        setShowPasswordField(true)
        setValidatedEmail(emailValue)
      } else {
        onNext()
      }
    } catch (err) {
      console.error(err)
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
    } else if (isModal) {
      onClose()
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
              $error={error?.message}
              placeholder="Digite seu e-mail"
              showDropdown={!isModal}
              onKeyDown={(e) =>
                e.key === 'Enter' && (e.preventDefault(), handleNext())
              }
            />
          )}
        />

        {showPasswordField && (
          <>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'A senha é obrigatória' }}
              render={({ field, fieldState: { error } }) => (
                <InputPassword
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e)
                    clearErrors('password')
                  }}
                  onBlur={field.onBlur}
                  placeholder="Digite sua senha"
                  $error={error?.message}
                  $showStrengthMeter={false}
                  $showErrorMessage={true}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && (e.preventDefault(), handleLogin())
                  }
                />
              )}
            />
            <Button variant="ghost" onClick={onRecover} type="button">
              Esqueci minha senha
            </Button>
            <Button
              loading={isLoading}
              disabled={isButtonDisabled}
              onClick={handleLogin}
              type="button"
            >
              Entrar
            </Button>
          </>
        )}

        {!showPasswordField && (
          <Button
            loading={isLoading}
            disabled={isButtonDisabled}
            onClick={handleNext}
            type="button"
          >
            Continuar
          </Button>
        )}
      </S.MainContent>
    </>
  )
}
