import React, { useEffect, useRef, useState } from 'react'

import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'

import * as S from '../styles'

interface StepRecoverTokenProps {
  onNext: () => void
}

export default function StepRecoverToken({ onNext }: StepRecoverTokenProps) {
  const { control, trigger, setError, clearErrors } = useFormContext()
  const [isValidating, setIsValidating] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  const token = useWatch({ control, name: 'token' }) as string
  const email = useWatch({ control, name: 'email' }) as string

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [secondsLeft])

  const handleNext = async () => {
    const valid = await trigger('token')
    if (!valid) return

    clearErrors('token')
    setIsValidating(true)
    try {
      const res = await fetch('/api/recuperacao-de-senha/validar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: token })
      })
      if (!res.ok) {
        setError('token', {
          type: 'manual',
          message: 'Código inválido. Verifique e tente novamente.'
        })
        return
      }
      onNext()
    } catch {
      setError('token', {
        type: 'manual',
        message: 'Erro ao validar código. Tente novamente.'
      })
    } finally {
      setIsValidating(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    try {
      const res = await fetch('/api/recuperacao-de-senha/obter-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (!res.ok) throw new Error()
      toast.success('Código reenviado para o seu e-mail.')
      clearErrors('token')
      inputsRef.current[0]?.focus()
      setSecondsLeft(60)
    } catch {
      toast.error('Falha ao reenviar o código. Tente novamente.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <>
      <S.Subtitle style={{ textAlign: 'center' }}>
        Insira o código de 6 dígitos enviado por e-mail
      </S.Subtitle>
      <S.MainContent>
        <Controller
          name="token"
          control={control}
          defaultValue=""
          rules={{
            required: 'Código obrigatório',
            minLength: { value: 6, message: 'Digite os 6 dígitos' }
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            const handleInput =
              (idx: number) => (e: React.FormEvent<HTMLInputElement>) => {
                const input = (e.target as HTMLInputElement).value.replace(
                  /\D/g,
                  ''
                )

                if (!input) return

                const arr = value.split('').slice(0, 6)

                arr[idx] = input[input.length - 1]

                onChange(arr.join(''))

                setTimeout(() => {
                  if (inputsRef.current[idx + 1]) {
                    inputsRef.current[idx + 1]?.focus()
                    inputsRef.current[idx + 1]?.select()
                  }
                }, 0)
              }
            const handleKeyDown =
              (idx: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
                const arr = value.split('').slice(0, 6)

                if (e.key === 'Backspace') {
                  e.preventDefault()

                  if (value[idx]) {
                    arr[idx] = ''
                    onChange(arr.join(''))
                  } else if (inputsRef.current[idx - 1]) {
                    inputsRef.current[idx - 1]?.focus()
                    const arrPrev = value.split('').slice(0, 6)
                    arrPrev[idx - 1] = ''
                    onChange(arrPrev.join(''))
                  }
                }

                if (e.key === 'ArrowLeft' && inputsRef.current[idx - 1]) {
                  e.preventDefault()
                  inputsRef.current[idx - 1]?.focus()
                }

                if (e.key === 'ArrowRight' && inputsRef.current[idx + 1]) {
                  e.preventDefault()
                  inputsRef.current[idx + 1]?.focus()
                }

                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
                  e.preventDefault()
                  e.currentTarget.select()
                }
              }

            const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
              e.preventDefault()
              const pastedData = e.clipboardData
                .getData('Text')
                .replace(/\D/g, '')

              if (pastedData) {
                const arr = pastedData.split('').slice(0, 6)
                const newVal = arr.join('')
                onChange(newVal)

                const nextIndex = arr.length - 1
                inputsRef.current[nextIndex]?.focus()
                inputsRef.current[nextIndex]?.select()
              }
            }

            return (
              <div>
                <S.OtpContainer>
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <S.OtpField
                      key={idx}
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      value={value[idx] || ''}
                      onInput={handleInput(idx)}
                      onKeyDown={handleKeyDown(idx)}
                      onPaste={handlePaste}
                      ref={(el) => {
                        inputsRef.current[idx] = el
                      }}
                      error={!!error}
                      disabled={isValidating}
                    />
                  ))}
                </S.OtpContainer>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem'
                  }}
                >
                  {error && <ErrorMessage error={error.message} />}
                </div>
              </div>
            )
          }}
        />

        <Button
          variant="ghost"
          fullWidth={false}
          type="button"
          loading={isResending}
          disabled={isResending || secondsLeft > 0}
          onClick={handleResend}
        >
          {secondsLeft > 0
            ? `Reenviar código em ${secondsLeft}s`
            : 'Reenviar código'}
        </Button>

        <Button
          fullWidth={false}
          type="button"
          loading={isValidating}
          disabled={token.length < 6 || isValidating}
          onClick={handleNext}
        >
          Continuar
        </Button>
      </S.MainContent>
    </>
  )
}
