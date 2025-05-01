import React, { useEffect, useState } from 'react'

import { normalizeInput } from '@/utils/normalizer'
import {
  validateCep,
  validateCity,
  validateNeighborhood,
  validateNumber,
  validateState,
  validateStreet
} from '@/validation/validations'
import axios from 'axios'
import InputMask from 'react-input-mask'
import { ValidationError } from 'yup'

import useMediaQuery from '@/hooks/useMediaQuery'

import Button from '@/components/common/Button'
import Input from '@/components/inputs/Input'

import * as S from './styles'

export interface AddressData {
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
  complement: string
  number: string
}

export interface EditableAddressProps {
  address: AddressData
  activeSearch?: boolean
  setAddress: (addr: AddressData) => void
  onSave: () => void
  hasButton?: boolean
  buttonFullWidth?: boolean
  isLoading?: boolean
}

export function EditableAddress({
  address,
  activeSearch = true,
  setAddress,
  onSave,
  isLoading,
  hasButton = true,
  buttonFullWidth = false
}: EditableAddressProps) {
  const isMobile = useMediaQuery()
  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [cepFetched, setCepFetched] = useState(false)

  const [cepError, setCepError] = useState<string | undefined>()
  const [streetError, setStreetError] = useState<string | undefined>()
  const [neighborhoodError, setNeighborhoodError] = useState<
    string | undefined
  >()
  const [cityError, setCityError] = useState<string | undefined>()
  const [stateError, setStateError] = useState<string | undefined>()
  const [numberError, setNumberError] = useState<string | undefined>()

  const [isValid, setIsValid] = useState(false)
  const [autoFilledFields, setAutoFilledFields] = useState<string[]>([])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setAddress({ ...address, [name]: value })

    if (cepError && name !== 'cep') {
      setCepError(undefined)
    }

    if (autoFilledFields.includes(name)) {
      setAutoFilledFields((prev) => prev.filter((field) => field !== name))
    }

    try {
      switch (name) {
        case 'cep':
          await validateCep(value)
          setCepError(undefined)
          break
        case 'street':
          await validateStreet(value)
          setStreetError(undefined)
          break
        case 'neighborhood':
          await validateNeighborhood(value)
          setNeighborhoodError(undefined)
          break
        case 'city':
          await validateCity(value)
          setCityError(undefined)
          break
        case 'state':
          await validateState(value)
          setStateError(undefined)
          break
        case 'number':
          await validateNumber(value)
          setNumberError(undefined)
          break
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        setFieldError(name, err.message)
      }
    }
  }

  useEffect(() => {
    setIsValid(
      !!address.street &&
        !!address.neighborhood &&
        !!address.city &&
        !!address.state &&
        !!address.number &&
        !streetError &&
        !neighborhoodError &&
        !cityError &&
        !stateError &&
        !numberError
    )
  }, [
    address,
    streetError,
    neighborhoodError,
    cityError,
    stateError,
    numberError
  ])

  const setFieldError = (fieldName: string, errorMessage: string) => {
    switch (fieldName) {
      case 'cep':
        setCepError(errorMessage)
        break
      case 'street':
        setStreetError(errorMessage)
        break
      case 'neighborhood':
        setNeighborhoodError(errorMessage)
        break
      case 'city':
        setCityError(errorMessage)
        break
      case 'state':
        setStateError(errorMessage)
        break
      case 'number':
        setNumberError(errorMessage)
        break
    }
  }

  const fetchCep = async () => {
    if (!address.cep || !activeSearch) return

    const numericCep = normalizeInput(address.cep)

    if (numericCep.length !== 8) {
      setCepError('CEP inválido')
      return
    }

    setCepError(undefined)
    setIsLoadingCep(true)

    try {
      const { data } = await axios.get(`/api/cep/${numericCep}`)

      if (data.erro) {
        setCepError('CEP não encontrado. Preencha os campos manualmente.')
        setAddress({
          ...address,
          street: '',
          neighborhood: '',
          city: '',
          state: ''
        })
        setAutoFilledFields([])
        return
      }

      setAddress({
        ...address,
        street: data.logradouro || '',
        neighborhood: data.bairro || '',
        city: data.cidade || '',
        state: data.uf || ''
      })
      setAutoFilledFields(['street', 'neighborhood', 'city', 'state'])
      setCepFetched(true)
    } catch (error) {
      setCepError('Erro ao buscar CEP. Preencha os campos manualmente.')
      setAddress({
        ...address,
        street: '',
        neighborhood: '',
        city: '',
        state: ''
      })
      setAutoFilledFields([])
    } finally {
      setIsLoadingCep(false)
    }
  }

  useEffect(() => {
    const numericCep = address.cep.replace(/\D/g, '')
    if (numericCep.length === 8 && !cepFetched) {
      fetchCep()
    }

    if (numericCep.length < 8) {
      setCepFetched(false)
    }
  }, [address.cep])

  return (
    <>
      <S.Wrapper>
        <S.Row>
          <div>
            <InputMask
              maskChar={null}
              mask="99999-999"
              value={address.cep || ''}
              onChange={handleChange}
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  type="text"
                  name="cep"
                  placeholder="ex. 18013-280"
                  error={cepError}
                  showErrorMessage
                  label="CEP"
                  required
                  loading={isLoadingCep}
                />
              )}
            </InputMask>
          </div>
        </S.Row>
        <S.Row>
          <div>
            <Input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              label="Logradouro"
              required
              placeholder="ex. Av. Eng. Carlos Reinaldo Mendes"
              disabled={autoFilledFields.includes('street')}
              error={streetError}
              showErrorMessage
            />
          </div>
        </S.Row>
        <S.Row>
          <div style={{ flex: 1 }}>
            <Input
              type="text"
              name="number"
              value={address.number}
              onChange={handleChange}
              label="Número"
              placeholder="ex. 2015"
              required
              error={numberError}
              showErrorMessage
            />
          </div>
          <div style={{ flex: 4 }}>
            <Input
              type="text"
              name="complement"
              value={address.complement}
              onChange={handleChange}
              label="Complemento (opcional)"
              placeholder="ex. Bloco A"
            />
          </div>
        </S.Row>
        <S.Row>
          <div>
            <Input
              type="text"
              name="neighborhood"
              label="Bairro"
              placeholder="ex. Além Ponte"
              required
              value={address.neighborhood}
              onChange={handleChange}
              disabled={autoFilledFields.includes('neighborhood')}
              error={neighborhoodError}
              showErrorMessage
            />
          </div>
        </S.Row>
        <S.Row>
          <div>
            <Input
              type="text"
              name="city"
              label="Cidade"
              placeholder="ex. Sorocaba"
              required
              value={address.city}
              onChange={handleChange}
              disabled={autoFilledFields.includes('city')}
              error={cityError}
              showErrorMessage
            />
          </div>
          <div>
            <Input
              type="text"
              name="state"
              label="Estado"
              placeholder="ex. SP"
              maxLength={2}
              required
              value={address.state}
              onChange={handleChange}
              disabled={autoFilledFields.includes('state')}
              error={stateError}
              showErrorMessage
            />
          </div>
        </S.Row>
        {hasButton && (
          <S.Row>
            <div>
              <Button
                fullWidth={isMobile || buttonFullWidth}
                loading={isLoading}
                disabled={!isValid}
                onClick={onSave}
              >
                Salvar
              </Button>
            </div>
          </S.Row>
        )}
      </S.Wrapper>
    </>
  )
}
