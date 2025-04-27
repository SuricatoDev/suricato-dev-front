import { useState } from 'react'

import { checkPasswordStrength } from '@/utils/validations'
import axios, { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import Button from '@/components/common/Button'
import PasswordConfirmation from '@/components/common/PasswordConfirmation'

import * as S from '../styles'

interface StepNewPasswordProps {
  onClose: () => void
}

export default function StepNewPassword({ onClose }: StepNewPasswordProps) {
  const { control, getValues, setValue } = useFormContext()
  const [isLoading, setIsLoading] = useState(false)

  const newPassword = useWatch({ control, name: 'newPassword' }) as string
  const confirmPassword = useWatch({
    control,
    name: 'confirmPassword'
  }) as string
  const email = useWatch({ control, name: 'email' }) as string
  const token = useWatch({ control, name: 'token' }) as string
  const firstName = useWatch({ control, name: 'firstName' }) as string

  const strength = checkPasswordStrength(newPassword, firstName, email)
  const hasMinLength = newPassword.length >= 8
  const hasNumberOrSymbol = /\d|[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
  const containsUserData =
    (firstName &&
      newPassword.toLowerCase().includes(firstName.toLowerCase())) ||
    (email &&
      newPassword.toLowerCase().includes(email.split('@')[0].toLowerCase()))
  const notContainsUserData = !containsUserData
  const passwordsMatch = newPassword === confirmPassword

  const isValid =
    strength &&
    hasMinLength &&
    hasNumberOrSymbol &&
    notContainsUserData &&
    passwordsMatch

  const handleReset = async () => {
    if (!isValid) return
    setIsLoading(true)
    try {
      const { newPassword: pwd } = getValues()
      const response = await axios.post<{ message: string }>(
        '/api/recuperacao-de-senha/nova-senha',
        {
          email,
          code: token,
          password: pwd
        }
      )
      toast.success(response.data.message ?? 'Senha redefinida com sucesso!')

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password: pwd
      })

      if (result?.error) {
        toast.error(
          'Não foi possível logar automaticamente. Faça login manualmente.'
        )
      }

      onClose()
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>
      console.error(error.response?.data.message)
      toast.error(error.response?.data.message ?? 'Erro ao redefinir senha.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <S.Subtitle>Escolha sua nova senha</S.Subtitle>
      <S.MainContent>
        <PasswordConfirmation
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          userName={firstName}
          userEmail={email}
          onNewPasswordChange={(e) => setValue('newPassword', e.target.value)}
          onConfirmPasswordChange={(e) =>
            setValue('confirmPassword', e.target.value)
          }
        />

        <Button
          type="button"
          loading={isLoading}
          disabled={!isValid}
          onClick={handleReset}
        >
          Redefinir senha
        </Button>
      </S.MainContent>
    </>
  )
}
