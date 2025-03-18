import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '@/components/common/Input'
import InputMask from 'react-input-mask'
import * as S from './styles'
import {
  AddressData,
  EditableAddress
} from '@/components/common/EditableAddress'
import ErrorMessage from '@/components/common/ErrorMessage'
import Button from '@/components/common/Button'
import Portal from '@/components/common/Portal'
import { X } from '@phosphor-icons/react/dist/ssr/X'
import { passengerFormStep1Schema } from '@/validation/formValidation'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface PassengerFormProps {
  visible: boolean
  onClose: () => void
  caravanaId: string | number
}

interface Step1Values {
  cpf: string
  rg: string
  emergencyContact: string
}

export default function PassengerForm({
  visible,
  onClose,
  caravanaId
}: PassengerFormProps) {
  const { data: session } = useSession()

  const sessionAddressExists = Boolean(
    session?.user?.endereco &&
      session?.user?.numero &&
      session?.user?.bairro &&
      session?.user?.cep &&
      session?.user?.cidade &&
      session?.user?.estado
  )

  const hasAllRequiredData = Boolean(
    session?.user?.cpf && session?.user?.rg && sessionAddressExists
  )

  const [address, setAddress] = useState<AddressData>(
    sessionAddressExists
      ? {
          cep: (session?.user?.cep as string) || '',
          street: (session?.user?.endereco as string) || '',
          neighborhood: (session?.user?.bairro as string) || '',
          city: (session?.user?.cidade as string) || '',
          state: (session?.user?.estado as string) || '',
          complement: (session?.user?.complemento as string) || '',
          number: (session?.user?.numero as string) || ''
        }
      : {
          cep: '',
          street: '',
          neighborhood: '',
          city: '',
          state: '',
          complement: '',
          number: ''
        }
  )

  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(visible)
  const [autoSubmitted, setAutoSubmitted] = useState(false)

  useEffect(() => {
    setIsModalOpen(visible)
  }, [visible])

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<Step1Values>({
    resolver: yupResolver(passengerFormStep1Schema),
    mode: 'all'
  })

  const isAddressComplete = Boolean(
    address.street &&
      address.neighborhood &&
      address.city &&
      address.state &&
      address.number
  )

  const checkExistingReservation = async (
    caravana: string | number,
    passageiro: string | number
  ) => {
    try {
      const res = await axios.get(
        `/api/caravanas/${caravana}/reservas/${passageiro}`
      )

      if (res.status === 200) {
        return true
      }
      return false
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response && axiosError.response.status === 404) {
        return false
      }
      throw error
    }
  }

  const onStep1Submit = (data: Step1Values) => {
    if (sessionAddressExists) {
      onFinalSubmit(data)
    } else {
      setStep(2)
    }
  }

  const onFinalSubmit = async (data: Step1Values) => {
    if (session?.user?.id) {
      const alreadyReserved = await checkExistingReservation(
        caravanaId,
        session.user.id
      )
      if (alreadyReserved) {
        toast.error(
          'Você já reservou essa caravana. Não é possível reservar novamente.'
        )
        onClose()
        return
      }
    }

    const combinedData = { ...data, ...address }

    const registrationPayload = {
      cpf: combinedData.cpf,
      rg: combinedData.rg,
      endereco: combinedData.street,
      numero: combinedData.number,
      ...(combinedData.complement && { complemento: combinedData.complement }),
      bairro: combinedData.neighborhood,
      cidade: combinedData.city,
      estado: combinedData.state,
      passageiro: true
    }

    try {
      setIsLoading(true)

      const response = await axios.post(
        '/api/register-passageiro',
        registrationPayload
      )

      if (response.status === 200) {
        toast.success('Confirmação de dados realizada com sucesso!')

        const inscriptionPayload = {
          passengerId: response.data.id
        }

        const inscriptionResponse = await axios.post(
          `/api/caravanas/${caravanaId}/reservas`,
          inscriptionPayload
        )

        if (inscriptionResponse.status === 200) {
          toast.success('Inscrição na caravana realizada com sucesso!')
        }
      }
    } catch (error) {
      toast.error(
        'Erro ao confirmar os dados ou inscrever na caravana. Tente novamente.'
      )
      console.error('Erro na inscrição:', error)
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

  useEffect(() => {
    if (hasAllRequiredData && !autoSubmitted && session) {
      setAutoSubmitted(true)
      const autoData: Step1Values = {
        cpf: session.user.cpf ?? '',
        rg: session.user.rg ?? '',
        emergencyContact: session.user.telefone_emergencia || ''
      }
      onFinalSubmit(autoData)
    }
  }, [hasAllRequiredData, autoSubmitted, session])

  const handlePrevious = () => {
    setStep(1)
  }

  const handleAddressSave = () => {
    console.log('Endereço salvo', address)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  if (!isModalOpen) return null

  if (hasAllRequiredData) {
    return (
      <Portal>
        <S.ModalOverlay onClick={onClose}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.CloseButtonContainer>
              <S.CloseButton onClick={onClose}>
                <X className="modal-close-btn" size={32} weight="bold" />
              </S.CloseButton>
            </S.CloseButtonContainer>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <p>Inscrevendo, por favor aguarde...</p>
            </div>
          </S.ModalContent>
        </S.ModalOverlay>
      </Portal>
    )
  }

  return (
    <Portal>
      <S.ModalOverlay onClick={onClose}>
        <S.ModalContent onClick={(e) => e.stopPropagation()}>
          <S.CloseButtonContainer>
            <S.CloseButton onClick={onClose}>
              <X className="modal-close-btn" size={32} weight="bold" />
            </S.CloseButton>
          </S.CloseButtonContainer>
          <S.Form
            onSubmit={
              step === 1
                ? handleSubmit(onStep1Submit)
                : (e) => {
                    e.preventDefault()
                    handleSubmit(onFinalSubmit)(e)
                  }
            }
          >
            {step === 1 && (
              <>
                <S.ModalHeader>
                  <S.ModalTitle>Vamos nessa?</S.ModalTitle>
                  <S.ModalSubtitle>
                    Confirme seus dados e vamos em frente com tudo!
                  </S.ModalSubtitle>
                </S.ModalHeader>

                <div>
                  <Controller
                    name="cpf"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <InputMask
                        mask="999.999.999-99"
                        maskChar={null}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      >
                        {(
                          inputProps: React.InputHTMLAttributes<HTMLInputElement>
                        ) => (
                          <Input
                            {...inputProps}
                            type="text"
                            placeholder="Digite seu CPF"
                            label="CPF"
                            $error={errors.cpf ? errors.cpf.message : undefined}
                            $showErrorMessage
                          />
                        )}
                      </InputMask>
                    )}
                  />
                </div>

                <div>
                  <Controller
                    name="rg"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <InputMask
                        mask="99.999.999-*"
                        maskChar={null}
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(e.target.value.toUpperCase())
                        }
                        onBlur={field.onBlur}
                      >
                        {(
                          inputProps: React.InputHTMLAttributes<HTMLInputElement>
                        ) => (
                          <Input
                            {...inputProps}
                            type="text"
                            placeholder="Digite seu RG"
                            label="RG"
                          />
                        )}
                      </InputMask>
                    )}
                  />
                  {errors.rg && <ErrorMessage $error={errors.rg.message} />}
                </div>

                <div>
                  <Controller
                    name="emergencyContact"
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
                        {(
                          inputProps: React.InputHTMLAttributes<HTMLInputElement>
                        ) => (
                          <Input
                            {...inputProps}
                            type="text"
                            placeholder="Digite seu telefone"
                            label="Telefone"
                          />
                        )}
                      </InputMask>
                    )}
                  />
                  {errors.emergencyContact && (
                    <ErrorMessage $error={errors.emergencyContact.message} />
                  )}
                </div>

                <Button
                  fullWidth
                  type="submit"
                  disabled={!isValid}
                  loading={isLoading}
                >
                  Concluir inscrição
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <EditableAddress
                  address={address}
                  setAddress={setAddress}
                  onSave={handleAddressSave}
                  hasButton={false}
                />
                <S.ActionButtons>
                  <Button
                    loading={isLoading}
                    fullWidth
                    type="submit"
                    disabled={!isAddressComplete}
                  >
                    Concluir inscrição
                  </Button>
                  <Button
                    disabled={isLoading}
                    variant="outlined"
                    fullWidth
                    type="button"
                    onClick={handlePrevious}
                  >
                    Voltar
                  </Button>
                </S.ActionButtons>
              </>
            )}
          </S.Form>
        </S.ModalContent>
      </S.ModalOverlay>
    </Portal>
  )
}
