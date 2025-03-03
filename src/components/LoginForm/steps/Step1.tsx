import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import * as S from '../styles'
import Button from '@/components/common/Button'
import Divider from '@/components/common/Divider'
import { GoogleIcon, FacebookIcon } from '@/components/common/Icons'
import InputEmail from '@/components/common/InputEmail'

interface Step1Props {
  onNext: () => void
}

export default function Step1({ onNext }: Step1Props) {
  const { control } = useFormContext()

  return (
    <>
      <S.Subtitle>Bem-vindo ao Excursionistas</S.Subtitle>
      <S.MainContent>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputEmail
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        <Button onClick={onNext} type="button">
          Continuar
        </Button>
      </S.MainContent>
      <Divider $marginY="16px">ou</Divider>
      <S.SocialButtons>
        <Button variant="outlined" icon={<GoogleIcon />}>
          Continuar com Google
        </Button>
        <Button variant="outlined" icon={<FacebookIcon />}>
          Continuar com Facebook
        </Button>
      </S.SocialButtons>
    </>
  )
}
