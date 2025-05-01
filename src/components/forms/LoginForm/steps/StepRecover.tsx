import React, { useState } from 'react'

import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import Button from '@/components/common/Button'
import InputEmail from '@/components/inputs/InputEmail'

import * as S from '../styles'

interface StepRecoverProps {
  onNext: () => void
  isModal: boolean
}

export default function StepRecover({ onNext, isModal }: StepRecoverProps) {
  const { control } = useFormContext()
  const emailValue = useWatch({ control, name: 'email' }) as string
  const [isLoading, setIsLoading] = useState(false)

  const handleSendLink = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/recuperacao-de-senha/obter-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue })
      })
      if (!res.ok) throw new Error()
      toast.success('Código recuperação enviado. Verifique seu e-mail.')
      onNext()
    } catch {
      toast.error('Erro ao enviar link. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <S.Subtitle>Confirme seu e-mail</S.Subtitle>
      <S.MainContent>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputEmail {...field} disabled showDropdown={!isModal} />
          )}
        />
        <Button
          loading={isLoading}
          disabled={!emailValue}
          onClick={handleSendLink}
          type="button"
        >
          Receber código
        </Button>
      </S.MainContent>
    </>
  )
}
