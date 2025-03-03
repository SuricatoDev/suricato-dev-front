import React from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import * as S from '../styles'
import Input from '@/components/common/Input'
import Label from '@/components/common/Label'
import BirthDateInput from '@/components/common/BirthDateInput'
import InputEmail from '@/components/common/InputEmail'
import InputPassword from '@/components/common/InputPassword'
import Button from '@/components/common/Button'
import Divider from '@/components/common/Divider'

interface Step1Props {
  onNext: () => void
  onPrev: () => void
}

export default function Step2({ onNext, onPrev }: Step1Props) {
  const { control } = useFormContext()

  const firstName = useWatch({ control, name: 'firstName' }) || ''
  const contactEmail = useWatch({ control, name: 'contactEmail' }) || ''

  return (
    <S.Step2MainContent>
      <div>
        <div>
          <Label>Nome Completo</Label>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Nome no documento de identificação"
                $borderRadiusBottom="0"
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Sobrenome no documento de identificação"
                $borderRadiusTop="0"
                $borderTop="none"
              />
            )}
          />
        </div>
        <S.LegalText>
          Certifique-se de que seja igual ao nome completo no seu documento de
          identificação oficial.
        </S.LegalText>
      </div>
      <div>
        <Label>Data de Nascimento</Label>
        <Controller
          name="birthDate"
          control={control}
          defaultValue={{ day: '', month: '', year: '' }}
          render={({ field: { onChange, value, onBlur } }) => (
            <BirthDateInput
              minAge={18}
              onChange={onChange}
              defaultDay={value?.day || ''}
              defaultMonth={value?.month || ''}
              defaultYear={value?.year || ''}
              onBlur={onBlur}
            />
          )}
        />
        <S.LegalText>
          Para se cadastrar, você precisa ter pelo menos 18 anos. A data do seu
          aniversário não será compartilhada com outros usuários do
          Excursionistas.
        </S.LegalText>
      </div>
      <div>
        <Label>Informações de contato</Label>
        <Controller
          name="contactEmail"
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
        <S.LegalText>
          Nossas comunicações serão enviadas para você por email.
        </S.LegalText>
      </div>
      <div>
        <Label>Senha</Label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputPassword
              {...field}
              placeholder="Digite sua senha"
              userName={firstName}
              userEmail={contactEmail}
            />
          )}
        />
      </div>
      <S.PolicyText>
        <p>
          Ao selecionar <b>Concordar e continuar</b>, eu concordo com os{' '}
          <a href="#">Termos de Serviço</a> e reconheço a{' '}
          <a href="#">Política de Privacidade</a>.
        </p>
      </S.PolicyText>

      <Button onClick={onPrev} variant="contained">
        Concordar e continuar
      </Button>

      <Divider />
      <S.NeedHelp href="#">Precisa de ajuda?</S.NeedHelp>
    </S.Step2MainContent>
  )
}
