import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { BR_STATES, getCitiesByState } from '@/constants/location'
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
import Select, { SelectOption } from '@/components/inputs/Select'

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
  setAddress: (addr: AddressData) => void
  onSave: () => void
  activeSearch?: boolean
  disableFields?: boolean
  isLoading?: boolean
  hasButton?: boolean
  buttonFullWidth?: boolean
}

export function EditableAddress({
  address,
  setAddress,
  onSave,
  activeSearch = true,
  disableFields = true,
  isLoading,
  hasButton = true,
  buttonFullWidth = false
}: EditableAddressProps) {
  const isMobile = useMediaQuery()

  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [cepFetched, setCepFetched] = useState(false)

  const [autoFilledFields, setAutoFilledFields] = useState<string[]>([])

  const [cepError, setCepError] = useState<string>()
  const [streetError, setStreetError] = useState<string>()
  const [neighborhoodError, setNeighborhoodError] = useState<string>()
  const [cityError, setCityError] = useState<string>()
  const [stateError, setStateError] = useState<string>()
  const [numberError, setNumberError] = useState<string>()

  const [isValid, setIsValid] = useState(false)

  const manualCepRef = useRef(false)

  const stateOptions: SelectOption[] = BR_STATES
  const cityOptions: SelectOption[] = address.state
    ? getCitiesByState(address.state)
    : []

  const setFieldError = (field: string, msg: string | undefined) => {
    switch (field) {
      case 'cep':
        setCepError(msg)
        break
      case 'street':
        setStreetError(msg)
        break
      case 'neighborhood':
        setNeighborhoodError(msg)
        break
      case 'city':
        setCityError(msg)
        break
      case 'state':
        setStateError(msg)
        break
      case 'number':
        setNumberError(msg)
        break
    }
  }

  type FieldEvent =
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLSelectElement>

  const handleChange = async (e: FieldEvent) => {
    const { name, value } = e.target

    if (name === 'cep') {
      manualCepRef.current = true
      setCepFetched(false)
    }

    if (name === 'state') {
      setAddress({ ...address, state: value, city: '' })
      setFieldError('state', undefined)
      setFieldError('city', undefined)
    } else {
      setAddress({ ...address, [name]: value })
      setFieldError(name, undefined)
    }

    if (autoFilledFields.includes(name)) {
      setAutoFilledFields((prev) => prev.filter((f) => f !== name))
    }

    try {
      switch (name) {
        case 'cep':
          await validateCep(value)
          break
        case 'street':
          await validateStreet(value)
          break
        case 'neighborhood':
          await validateNeighborhood(value)
          break
        case 'city':
          await validateCity(value)
          break
        case 'state':
          await validateState(value)
          break
        case 'number':
          await validateNumber(value)
          break
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        setFieldError(name, err.message)
      }
    }
  }

  useEffect(() => {
    const numericCep = address.cep.replace(/\D/g, '')
    const isCepValid = numericCep.length === 8 && !cepError

    setIsValid(
      isCepValid &&
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
    address.cep,
    address.street,
    address.neighborhood,
    address.city,
    address.state,
    address.number,
    cepError,
    streetError,
    neighborhoodError,
    cityError,
    stateError,
    numberError
  ])

  const fetchCep = async () => {
    const numeric = normalizeInput(address.cep)
    if (numeric.length !== 8) {
      setCepError('CEP inválido')
      return
    }

    setIsLoadingCep(true)
    setCepError(undefined)

    try {
      const { data } = await axios.get(`/api/cep/${numeric}`)
      if (data.erro) {
        setCepError('CEP não encontrado. Preencha manualmente.')
        setAddress({
          ...address,
          street: '',
          neighborhood: '',
          city: '',
          state: ''
        })
        setAutoFilledFields([])
      } else {
        setAddress({
          ...address,
          street: data.logradouro || '',
          neighborhood: data.bairro || '',
          city: data.cidade || '',
          state: data.uf || '',
          number: ''
        })

        setAutoFilledFields(['street', 'neighborhood', 'city', 'state'])
        setCepFetched(true)

        try {
          await validateNumber('')
          setFieldError('number', undefined)
        } catch (err) {
          if (err instanceof ValidationError) {
            setFieldError('number', err.message)
          }
        }
      }
    } catch {
      setCepError('Erro ao buscar CEP. Preencha manualmente.')
      setAutoFilledFields([])
    } finally {
      setIsLoadingCep(false)
    }
  }

  useEffect(() => {
    if (!activeSearch || !manualCepRef.current) return

    const numeric = address.cep.replace(/\D/g, '')
    if (numeric.length === 8 && !cepFetched) {
      fetchCep()
    } else if (numeric.length < 8) {
      setCepFetched(false)
    }
  }, [address.cep, activeSearch, cepFetched])

  return (
    <S.Wrapper>
      <S.Row>
        <div>
          <InputMask
            mask="99999-999"
            maskChar={null}
            value={address.cep}
            onChange={handleChange}
          >
            {(...inputProps) => (
              <Input
                {...inputProps[0]}
                name="cep"
                label="CEP"
                placeholder="ex. 18013-280"
                required
                error={cepError}
                showErrorMessage
                loading={isLoadingCep}
              />
            )}
          </InputMask>
        </div>
      </S.Row>

      <S.Row>
        <div>
          <Input
            name="street"
            label="Logradouro"
            placeholder="ex. Av. Eng. Carlos Reinaldo Mendes"
            value={address.street}
            onChange={handleChange}
            disabled={autoFilledFields.includes('street') && disableFields}
            error={streetError}
            showErrorMessage
          />
        </div>
      </S.Row>

      <S.Row>
        <div>
          <Input
            name="number"
            label="Número"
            placeholder="ex. 2015"
            value={address.number}
            onChange={handleChange}
            error={numberError}
            showErrorMessage
          />
        </div>
        <div>
          <Input
            name="complement"
            label="Complemento (opcional)"
            placeholder="Bloco A"
            value={address.complement}
            onChange={handleChange}
          />
        </div>
      </S.Row>

      <S.Row>
        <div>
          <Input
            name="neighborhood"
            label="Bairro"
            placeholder="ex. Centro"
            value={address.neighborhood}
            onChange={handleChange}
            disabled={
              autoFilledFields.includes('neighborhood') && disableFields
            }
            error={neighborhoodError}
            showErrorMessage
          />
        </div>
      </S.Row>

      <S.Row>
        <div>
          <Select
            name="state"
            label="Estado"
            placeholder="Selecione o estado"
            options={stateOptions}
            value={address.state}
            onChange={handleChange}
            disabled={autoFilledFields.includes('state') && disableFields}
            error={stateError}
            showErrorMessage
          />
        </div>
        <div>
          <Select
            name="city"
            label="Cidade"
            placeholder={
              address.state ? 'Selecione a cidade' : 'Escolha o estado primeiro'
            }
            options={cityOptions}
            value={address.city}
            onChange={handleChange}
            disabled={!address.state && disableFields}
            error={cityError}
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
  )
}
