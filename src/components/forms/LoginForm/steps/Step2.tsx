import React, { useEffect } from 'react'

import Link from 'next/link'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import InputMask from 'react-input-mask'

import Button from '@/components/common/Button'
import Divider from '@/components/common/Divider'
import ErrorMessage from '@/components/common/ErrorMessage'
import Label from '@/components/common/Label'
import Input from '@/components/inputs/Input'
import InputBirthDate from '@/components/inputs/InputBirthDate'
import InputEmail from '@/components/inputs/InputEmail'
import InputPassword from '@/components/inputs/InputPassword'

import * as S from '../styles'

interface Step2Props {
  onNext: () => void
  $isModal?: boolean
  loading?: boolean
}

export default function Step2({
  onNext,
  $isModal = false,
  loading
}: Step2Props) {
  const {
    control,
    formState: { errors },
    setValue,
    watch
  } = useFormContext()

  const firstName = useWatch({ control, name: 'firstName' }) || ''
  const contactEmail = useWatch({ control, name: 'contactEmail' }) || ''

  const firstNameValue = watch('firstName')
  const lastNameValue = watch('lastName')
  const contactEmailValue = watch('contactEmail')
  const emailValue = useWatch({
    control,
    name: 'email',
    defaultValue: ''
  })

  const passwordValue = watch('password')
  const birthDateValue = watch('birthDate')
  const phoneValue = watch('phone')

  useEffect(() => {
    if (emailValue) {
      setValue('contactEmail', emailValue, { shouldValidate: true })
    }
  }, [emailValue, setValue])

  const isButtonDisabled =
    !firstNameValue ||
    !lastNameValue ||
    !contactEmailValue ||
    !passwordValue ||
    !birthDateValue.day ||
    !birthDateValue.month ||
    !birthDateValue.year ||
    !phoneValue ||
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
                borderRadiusBottom="0"
                label="Nome"
                error={error ? error.message : undefined}
                showErrorMessage={false}
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
                label="Sobrenome"
                borderRadiusTop="0"
                borderTop="none"
                error={error ? error.message : undefined}
                showErrorMessage={false}
              />
            )}
          />
          <ErrorMessage error={nameErrorMessage} />
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
            <InputBirthDate
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
      <S.ContactInformations>
        <div>
          <Label>Informações de contato</Label>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'O número de celular é obrigatório'
            }}
            defaultValue=""
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <InputMask
                maskChar={null}
                mask="(99) 99999-9999"
                inputMode="tel"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                {() => (
                  <Input
                    placeholder="Celular"
                    label="Celular"
                    inputMode="tel"
                    error={error ? error.message : undefined}
                    showErrorMessage
                    ref={ref}
                  />
                )}
              </InputMask>
            )}
          />
        </div>
        <div>
          <Controller
            name="contactEmail"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputEmail
                value={field.value || emailValue}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={error ? error.message : undefined}
              />
            )}
          />
          <S.LegalText>
            Nossas comunicações serão enviadas para você por email.
          </S.LegalText>
        </div>
      </S.ContactInformations>
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
              error={error ? error.message : undefined}
              showErrorMessage={false}
            />
          )}
        />
      </div>
      <S.PolicyText>
        <p>
          Ao clicar em <b>Concordar e continuar</b>, eu concordo com os{' '}
          <a href="/termos-de-uso.pdf" download>
            Termos de Uso
          </a>{' '}
          e reconheço a{' '}
          <a href="/politica-de-privacidade.pdf" download>
            Política de Privacidade
          </a>
          .
        </p>
      </S.PolicyText>
      <Button
        type="submit"
        disabled={isButtonDisabled || loading}
        onClick={onNext}
        variant="contained"
        loading={loading}
      >
        Concordar e continuar
      </Button>
      <Divider />
      <S.NeedHelp $isModal={$isModal}>
        <Link href="/central-de-ajuda">Precisa de ajuda?</Link>
      </S.NeedHelp>
    </S.Step2MainContent>
  )
}
