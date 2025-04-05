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
  const { data: session, update } = useSession()

  const [localUser, setLocalUser] = useState(session?.user || {})

  useEffect(() => {
    if (session && session.user) {
      setLocalUser(session.user)
    }
  }, [session])

  const sessionAddressExists = Boolean(
    localUser?.endereco &&
      localUser?.numero &&
      localUser?.bairro &&
      localUser?.cep &&
      localUser?.cidade &&
      localUser?.estado
  )

  const hasAllRequiredData = Boolean(
    localUser?.cpf && localUser?.rg && sessionAddressExists
  )

  const [address, setAddress] = useState<AddressData>(
    sessionAddressExists
      ? {
          cep: (localUser?.cep as string) || '',
          street: (localUser?.endereco as string) || '',
          neighborhood: (localUser?.bairro as string) || '',
          city: (localUser?.cidade as string) || '',
          state: (localUser?.estado as string) || '',
          complement: (localUser?.complemento as string) || '',
          number: (localUser?.numero as string) || ''
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
    address?.street !== '' &&
      address?.neighborhood !== '' &&
      address?.city !== '' &&
      address?.state !== '' &&
      address?.number !== '' &&
      address?.cep !== ''
  )

  const checkExistingReservation = async (
    caravana: string | number,
    passageiro: string | number
  ) => {
    try {
      const res = await axios.get(
        `/api/reservas/${caravana}/reservas/${passageiro}`
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
    if (localUser?.id) {
      const alreadyReserved = await checkExistingReservation(
        caravanaId,
        localUser.id
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
      cep: combinedData.cep,
      contato_emergencia: combinedData.emergencyContact,
      passageiro: true
    }

    try {
      setIsLoading(true)

      const response = await axios.post('/api/passageiro', registrationPayload)

      if (response.status === 200) {
        await update({})
        toast.success('Confirmação de dados realizada com sucesso!')

        const inscriptionPayload = {
          passengerId: response.data.id
        }

        const inscriptionResponse = await axios.post(
          `/api/reservas/${caravanaId}/reservas`,
          inscriptionPayload
        )

        if (inscriptionResponse.status === 200) {
          await update({})
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
        cpf: localUser.cpf ?? '',
        rg: localUser.rg ?? '',
        emergencyContact: localUser.passageiroData?.contato_emergencia || ''
      }
      onFinalSubmit(autoData)
    }
  }, [hasAllRequiredData, autoSubmitted, session, localUser])

  const handlePrevious = () => {
    setStep(1)
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
                            type="phone"
                            placeholder="Digite o contato de emergência"
                            label="Contato de emergência"
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
                  {sessionAddressExists ? 'Concluir inscrição' : 'Próximo'}
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <EditableAddress
                  address={address}
                  setAddress={setAddress}
                  onSave={() => {}}
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
