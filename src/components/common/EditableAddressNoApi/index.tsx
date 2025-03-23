import React, { useState, useEffect } from 'react'
import Input from '@/components/common/Input'
import * as S from './styles'
import InputMask from 'react-input-mask'
import {
  validateCep,
  validateCity,
  validateNeighborhood,
  validateNumber,
  validateState,
  validateStreet
} from '@/validation/validations'
import { ValidationError } from 'yup'
import Button from '@/components/common/Button'
import useMediaQuery from '@/hooks/useMediaQuery'

export interface AddressDataNoApi {
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
  number: string
}

interface EditableAddressNoApiProps {
  address: AddressDataNoApi
  setAddress: (addr: AddressDataNoApi) => void
  onSave: () => void
  hasButton?: boolean
  isLoading?: boolean
}

export const EditableAddressNoApi: React.FC<EditableAddressNoApiProps> = ({
  address,
  setAddress,
  onSave,
  isLoading,
  hasButton = true
}) => {
  const isMobile = useMediaQuery()
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [isValid, setIsValid] = useState(false)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setAddress({ ...address, [name]: value })
    setErrors((prev) => ({ ...prev, [name]: undefined }))

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
        setErrors((prev) => ({ ...prev, [name]: err.message }))
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
        Object.values(errors).every((e) => !e)
    )
  }, [address, errors])

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
            {(props) => (
              <Input
                {...props}
                name="cep"
                label="CEP"
                placeholder="ex. 18013-280"
                required
                $error={errors.cep}
                $showErrorMessage
              />
            )}
          </InputMask>
        </div>
      </S.Row>

      <S.Row>
        <div>
          <Input
            name="street"
            value={address.street}
            onChange={handleChange}
            label="Logradouro"
            required
            placeholder="ex. Rua Exemplo"
            $error={errors.street}
            $showErrorMessage
          />
        </div>
      </S.Row>

      <S.Row>
        <div>
          <Input
            name="number"
            value={address.number}
            onChange={handleChange}
            label="Número"
            required
            placeholder="ex. 123"
            $error={errors.number}
            $showErrorMessage
          />
        </div>
      </S.Row>

      <S.Row>
        <div>
          <Input
            name="neighborhood"
            value={address.neighborhood}
            onChange={handleChange}
            label="Bairro"
            required
            placeholder="ex. Centro"
            $error={errors.neighborhood}
            $showErrorMessage
          />
        </div>
        <div>
          <Input
            name="city"
            value={address.city}
            onChange={handleChange}
            label="Cidade"
            required
            placeholder="ex. São Paulo"
            $error={errors.city}
            $showErrorMessage
          />
        </div>
        <div>
          <Input
            name="state"
            value={address.state}
            onChange={handleChange}
            label="Estado"
            required
            placeholder="ex. SP"
            $error={errors.state}
            $showErrorMessage
          />
        </div>
      </S.Row>

      {hasButton && (
        <div>
          <S.Row>
            <Button
              fullWidth={isMobile}
              loading={isLoading}
              disabled={!isValid}
              onClick={onSave}
            >
              Salvar
            </Button>
          </S.Row>
        </div>
      )}
    </S.Wrapper>
  )
}
