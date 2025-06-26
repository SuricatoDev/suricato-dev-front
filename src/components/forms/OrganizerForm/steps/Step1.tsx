import React, { useState } from 'react'

import axios from 'axios'
import { Controller, useFormContext } from 'react-hook-form'
import InputMask from 'react-input-mask'

import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'
import Input from '@/components/inputs/Input'

import * as S from '../styles'

interface Step1Props {
  onNext: () => void
  onClose: () => void
}

export default function Step1({ onNext }: Step1Props) {
  const {
    control,
    setValue,
    formState: { isValid }
  } = useFormContext()

  const [isLoadingCnpj, setIsLoadingCnpj] = useState(false)

  const [hasFetched, setHasFetched] = useState(false)
  const [cnpjError, setCnpjError] = useState<string | undefined>()
  const [prevCnpj, setPrevCnpj] = useState('')

  const handleCnpjChange = async (
    value: string,
    onChange: (value: string) => void
  ) => {
    setCnpjError(undefined)
    onChange(value)
    const cnpjDigits = value.replace(/\D/g, '')

    if (cnpjDigits !== prevCnpj) {
      setPrevCnpj(cnpjDigits)
      setHasFetched(false)
    }

    if (cnpjDigits.length === 14 && !hasFetched) {
      setHasFetched(true)
      setIsLoadingCnpj(true)
      try {
        setCnpjError(undefined)
        const { data } = await axios.get(`/api/cnpj/${cnpjDigits}`)

        if (!data) {
          console.error('Erro ao buscar dados do CNPJ, preencha')
          return
        }

        setValue('razao_social', data.dados.razao_social || '', {
          shouldValidate: true
        })
        setValue('nome_fantasia', data.dados.nome_fantasia || '', {
          shouldValidate: true
        })
        setValue('inscricao_estadual', data.dados.inscricao_estadual || '', {
          shouldValidate: true
        })
        setValue('inscricao_municipal', data.dados.inscricao_municipal || '', {
          shouldValidate: true
        })
        setValue('cep', data.dados.cep || '')
        setValue('numero', data.dados.numero || '')
        setValue('complemento', data.dados.complemento || '')
        setValue('telefone_comercial', data.dados.ddd_telefone_1 || '', {
          shouldValidate: true
        })
      } catch (error) {
        setCnpjError(
          'Erro ao buscar dados do CNPJ, preencha os campos manualmente'
        )
        console.error('Erro ao buscar dados do CNPJ', error)
      } finally {
        setIsLoadingCnpj(false)
      }
    }
  }

  return (
    <>
      <S.Subtitle>Dados da Empresa</S.Subtitle>
      <S.MainContent>
        <div>
          <Controller
            name="cnpj"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <InputMask
                mask="99.999.999/9999-99"
                maskChar={null}
                value={field.value}
                onChange={(e) =>
                  handleCnpjChange(e.target.value, field.onChange)
                }
                onBlur={field.onBlur}
              >
                {() => (
                  <Input
                    placeholder="Digite o CNPJ"
                    label="CNPJ*"
                    required
                    loading={isLoadingCnpj}
                    error={error ? error.message : cnpjError ?? ''}
                    showErrorMessage
                  />
                )}
              </InputMask>
            )}
          />
        </div>
        <div>
          <Controller
            name="razao_social"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <Input
                placeholder="Digite a razão social da empresa"
                label="Razão Social*"
                required
                maxLength={200}
                disabled={isLoadingCnpj}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={error ? error.message : undefined}
                showErrorMessage
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="nome_fantasia"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <Input
                placeholder="Digite o nome fantasia da empresa"
                label="Nome Fantasia"
                disabled={isLoadingCnpj}
                maxLength={200}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={error ? error.message : undefined}
                showErrorMessage
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="inscricao_estadual"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <Input
                placeholder="Digite a inscrição estadual"
                label="Inscrição Estadual"
                disabled={isLoadingCnpj}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={error ? error.message : undefined}
                showErrorMessage
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="inscricao_municipal"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <Input
                placeholder="Digite a inscrição municipal"
                label="Inscrição Municipal"
                value={field.value}
                disabled={isLoadingCnpj}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={error ? error.message : undefined}
                showErrorMessage
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="telefone_comercial"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => {
              const rawValue = field.value || ''
              const digits = rawValue.replace(/\D/g, '')

              const phoneMask =
                digits.length >= 3 && digits[2] === '9'
                  ? '(99) 99999-9999'
                  : '(99) 9999-9999'

              return (
                <InputMask
                  mask={phoneMask}
                  maskChar={null}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    const unmaskedValue = e.target.value.replace(/\D/g, '')
                    field.onChange(unmaskedValue)
                  }}
                >
                  {(inputProps) => (
                    <Input
                      {...inputProps}
                      placeholder="Digite o telefone comercial"
                      label="Telefone Comercial*"
                      required
                      error={error ? error.message : undefined}
                      showErrorMessage
                    />
                  )}
                </InputMask>
              )
            }}
          />
        </div>
        <S.CheckboxWrapper>
          <Controller
            name="cadastur"
            control={control}
            defaultValue={false}
            render={({ field, fieldState: { error } }) => (
              <>
                <S.StyledCheckboxLabel>
                  <S.StyledCheckbox
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <span>
                    A empresa possui cadastro no{' '}
                    <a
                      href="https://cadastur.turismo.gov.br/hotsite/#!/public/sou-prestador/inicio"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Cadastur
                    </a>
                    ?
                  </span>
                </S.StyledCheckboxLabel>
                {error && <ErrorMessage error={error.message} />}
              </>
            )}
          />
        </S.CheckboxWrapper>
        <Button
          type="button"
          onClick={onNext}
          loading={isLoadingCnpj}
          disabled={!isValid || isLoadingCnpj}
        >
          Próximo
        </Button>
      </S.MainContent>
    </>
  )
}
