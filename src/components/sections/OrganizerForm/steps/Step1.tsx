import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import * as S from '../styles'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import InputMask from 'react-input-mask'
import ErrorMessage from '@/components/common/ErrorMessage'
import axios from 'axios'

interface Step1Props {
  onNext: () => void
  onClose: () => void
}

export default function Step1({ onNext }: Step1Props) {
  const {
    control,
    setValue,
    formState: { errors, isValid }
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

        if (data.error) {
          console.error('Erro ao buscar dados do CNPJ, preencha')
          return
        }

        setValue('razao_social', data.razao_social || '', {
          shouldValidate: true
        })
        setValue('nome_fantasia', data.nome_fantasia || '', {
          shouldValidate: true
        })
        setValue('inscricao_estadual', data.inscricao_estadual || '', {
          shouldValidate: true
        })
        setValue('inscricao_municipal', data.inscricao_municipal || '', {
          shouldValidate: true
        })
        setValue('cep', data.cep || '')
        setValue('numero', data.numero || '')
        setValue('complemento', data.complemento || '')
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
                    $loading={isLoadingCnpj}
                    $error={error ? error.message : cnpjError ?? ''}
                    $showErrorMessage
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
                disabled={isLoadingCnpj}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                $error={error ? error.message : undefined}
                $showErrorMessage
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
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                $error={error ? error.message : undefined}
                $showErrorMessage
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
                $error={error ? error.message : undefined}
                $showErrorMessage
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
                $error={error ? error.message : undefined}
                $showErrorMessage
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="telefone_comercial"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputMask
                mask="(99) 99999-9999"
                maskChar={null}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                  <Input
                    {...inputProps}
                    type="phone"
                    placeholder="Digite o telefone comercial"
                    label="Telefone Comercial"
                    required
                  />
                )}
              </InputMask>
            )}
          />
        </div>

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
