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
import ErrorMessage from '@/components/common/ErrorMessage'

interface Step2Props {
  onNext: () => void
  $isModal?: boolean
}

export default function Step2({ onNext, $isModal = false }: Step2Props) {
  const {
    control,
    formState: { errors },
    watch
  } = useFormContext()

  const firstName = useWatch({ control, name: 'firstName' }) || ''
  const contactEmail = useWatch({ control, name: 'contactEmail' }) || ''

  const firstNameValue = watch('firstName')
  const lastNameValue = watch('lastName')
  const contactEmailValue = watch('contactEmail')
  const passwordValue = watch('password')
  const birthDateValue = watch('birthDate')

  const isButtonDisabled =
    !firstNameValue ||
    !lastNameValue ||
    !contactEmailValue ||
    !passwordValue ||
    !birthDateValue.day ||
    !birthDateValue.month ||
    !birthDateValue.year ||
    Object.keys(errors).length > 0

  const nameErrorMessage =
    (errors.firstName?.message as string | undefined) ||
    (errors.lastName?.message as string | undefined) ||
    undefined

  return (
    <S.Step2MainContent>
      <div>
        <div>
          <Label>Nome Completo</Label>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Nome no documento de identificação"
                $borderRadiusBottom="0"
                $error={error ? error.message : undefined}
                $showErrorMessage={false}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Sobrenome no documento de identificação"
                $borderRadiusTop="0"
                $borderTop="none"
                $error={error ? error.message : undefined}
                $showErrorMessage={false}
              />
            )}
          />
          <ErrorMessage $error={nameErrorMessage} />
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
          render={({ field }) => (
            <BirthDateInput
              minAge={18}
              onChange={field.onChange}
              defaultDay={field.value?.day || ''}
              defaultMonth={field.value?.month || ''}
              defaultYear={field.value?.year || ''}
              onBlur={field.onBlur}
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
          render={({ field, fieldState: { error } }) => (
            <InputEmail
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              $error={error ? error.message : undefined}
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
          render={({ field, fieldState: { error } }) => (
            <InputPassword
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Digite sua senha"
              userName={firstName}
              userEmail={contactEmail}
              $error={error ? error.message : undefined}
              $showErrorMessage={false}
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
      <Button
        type="button"
        disabled={isButtonDisabled}
        onClick={onNext}
        variant="contained"
      >
        Concordar e continuar
      </Button>
      <Divider />
      <S.NeedHelp $isModal={$isModal} href="#">
        Precisa de ajuda?
      </S.NeedHelp>
    </S.Step2MainContent>
  )
}
