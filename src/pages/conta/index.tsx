import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import InputMask from 'react-input-mask'
import { getSession, signOut, useSession } from 'next-auth/react'
import { ValidationError } from 'yup'

import { CaretLeft } from '@phosphor-icons/react/dist/ssr/CaretLeft'
import { Eye } from '@phosphor-icons/react/dist/ssr/Eye'
import { LockKey } from '@phosphor-icons/react/dist/ssr/LockKey'
import { ShieldCheckered } from '@phosphor-icons/react/dist/ssr/ShieldCheckered'
import { PencilSimple } from '@phosphor-icons/react/dist/ssr/PencilSimple'
import { CalendarBlank } from '@phosphor-icons/react/dist/ssr/CalendarBlank'
import { MapPin } from '@phosphor-icons/react/dist/ssr/MapPin'
import { User } from '@phosphor-icons/react/dist/ssr/User'

import { AccordionItem } from '@/components/common/AccordionItem'
import Button from '@/components/common/Button'
import ChangeProfilePicModal from '@/components/common/ProfilePictureUploader'
import Divider from '@/components/common/Divider'
import {
  EditableAddress,
  AddressData
} from '@/components/common/EditableAddress'
import Header from '@/components/sections/Header'
import Input from '@/components/common/Input'
import InputPassword from '@/components/common/InputPassword'

import { formatExcursionistasSince, formatPhoneNumber } from '@/utils/formats'
import { normalizeInput } from '@/utils/normalizer'
import { validateFullName, validatePhone } from '@/validation/validations'

import * as S from '@/styles/pages/conta'

interface AddressPayload {
  street: string
  number: string
  complement?: string
  neighborhood: string
  cep: string
  city: string
  state: string
}

type UpdateFieldValue = AddressPayload | string

export default function ProfileEditPage() {
  const router = useRouter()
  const { data: session, update } = useSession()

  const [fullName, setFullName] = useState(session?.user?.nome || '')

  const [editingField, setEditingField] = useState<string | null>(null)

  const [profilePic, setProfilePic] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [address, setAddress] = useState<AddressData>(
    session?.user
      ? {
          cep: session.user.cep || '',
          street: session.user.endereco || '',
          neighborhood: session.user.bairro || '',
          city: session.user.cidade || '',
          state: session.user.estado || '',
          complement: session.user.complemento || '',
          number: session.user.numero || ''
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

  const [phoneNumber, setPhoneNumber] = useState(session?.user?.telefone || '')
  const [emergencyPhone, setEmergencyPhone] = useState(
    session?.user?.telefone_emergencia || ''
  )
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | undefined>()

  const [nameError, setNameError] = useState<string | undefined>()
  const [phoneError, setPhoneError] = useState<string | undefined>()
  const [emergencyPhoneError, setEmergencyPhoneError] = useState<
    string | undefined
  >()
  const [isLoading, setIsLoading] = useState(false)

  const excursionistasSince = session?.user?.created_at
    ? formatExcursionistasSince(session?.user?.created_at)
    : null

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result as string)
        setShowModal(true)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSaveProfilePic = (croppedImage: string) => {
    setProfilePic(croppedImage)
    setShowModal(false)
  }

  const handleCancel = () => {
    setShowModal(false)
    setSelectedImage(null)
    setEditingField(null)
  }

  const toggleEditing = (field: string) => {
    if (editingField === field) {
      setEditingField(null)
    } else {
      setEditingField(field)
    }
  }

  async function saveField(
    field: 'name' | 'address' | 'phone' | 'emergencyPhone' | 'password',
    value: UpdateFieldValue
  ) {
    let payload: Record<string, unknown> = {}

    switch (field) {
      case 'name':
        payload = { nome: value }
        break
      case 'address':
        {
          const address = value as AddressPayload
          payload = {
            endereco: address.street,
            numero: address.number,
            ...(address.complement && { complemento: address.complement }),
            bairro: address.neighborhood,
            cep: normalizeInput(address.cep),
            cidade: address.city,
            estado: address.state
          }
        }
        break
      case 'phone':
        payload = { telefone: normalizeInput(value as string) }
        break
      case 'password':
        payload = { senha: value }
        break
      case 'emergencyPhone':
        payload = { telefone_emergencia: normalizeInput(value as string) }
        break
      default:
        return
    }

    try {
      setIsLoading(true)
      const response = await axios.put('/api/usuarios/', payload, {
        headers: { 'Content-Type': 'application/json' }
      })

      return response.data
    } catch (error) {
      console.error('Erro ao atualizar o campo:', error)
      throw error
    } finally {
      setIsLoading(false)
      setTimeout(() => {
        setEditingField(null)
      }, 50)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true)
      await axios.delete('/api/usuarios/')
      signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Erro ao excluir conta:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (field: string) => {
    try {
      if (!field || !session) return

      let updatedUserData

      switch (field) {
        case 'address':
          updatedUserData = await saveField(field, address)
          break
        case 'name':
          await validateFullName(fullName)
          updatedUserData = await saveField(field, fullName)
          break
        case 'phone':
          await validatePhone(phoneNumber)
          updatedUserData = await saveField(field, phoneNumber)
          break
        case 'password':
          if (
            !newPassword ||
            !confirmPassword ||
            newPassword !== confirmPassword
          ) {
            setPasswordError('As senhas devem coincidir.')
            return
          }

          updatedUserData = await saveField(field, newPassword)
          setNewPassword('')
          setConfirmPassword('')
          break

        default:
          return
      }

      if (updatedUserData && updatedUserData.data) {
        await update({
          user: {
            ...session.user,
            ...updatedUserData.data
          }
        })
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
    }
  }

  useEffect(() => {
    if (newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        setPasswordError('As senhas não coincidem.')
      } else {
        setPasswordError(undefined)
      }
    }
  }, [newPassword, confirmPassword])

  if (!session) return null
  return (
    <S.Wrapper>
      <Header $variant="simple" />
      <S.Main>
        <div className="container">
          <S.HeaderMobile onClick={() => router.back()}>
            <CaretLeft size={32} />
          </S.HeaderMobile>

          <S.ProfileHeader>
            <S.ProfilePicWrapper onClick={handleFileClick}>
              <S.ProfilePicContainer>
                {profilePic ? (
                  <S.ProfilePic>
                    <Image
                      src={profilePic}
                      alt="Foto de perfil"
                      layout="fill"
                      objectFit="cover"
                    />
                  </S.ProfilePic>
                ) : (
                  <S.PlaceholderPic>
                    <User size={'70%'} />
                  </S.PlaceholderPic>
                )}
              </S.ProfilePicContainer>
              <S.EditIcon>
                <PencilSimple size={18} weight="bold" />
              </S.EditIcon>
            </S.ProfilePicWrapper>
            <S.ProfileInfo>
              <S.ProfileName>{session?.user.nome || 'Usuário'}</S.ProfileName>
              <S.ProfileInfoItem>
                {excursionistasSince && (
                  <>
                    <CalendarBlank size={18} weight="bold" />
                    <p>{excursionistasSince}</p>
                  </>
                )}
              </S.ProfileInfoItem>
              {session.user.bairro &&
                session.user.cidade &&
                session.user.estado && (
                  <S.ProfileInfoItem>
                    <MapPin size={18} weight="bold" />
                    <p>
                      {session.user.bairro}, {session.user.cidade} -{' '}
                      {session.user.estado}
                    </p>
                  </S.ProfileInfoItem>
                )}
            </S.ProfileInfo>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </S.ProfileHeader>

          <S.SpacingMobile>
            <S.Header>
              <h1>Informações pessoais</h1>
            </S.Header>

            <S.ContentWrapper>
              <S.MainColumn>
                <div>
                  <S.Row
                    $disabled={
                      (editingField && editingField !== 'name') || false
                    }
                  >
                    <div>
                      <span className="label">Nome completo</span>
                      {editingField === 'name' ? (
                        <span className="value">Digite seu nome</span>
                      ) : (
                        <span className="value">
                          {session.user.nome ?? 'Não fornecido'}
                        </span>
                      )}
                    </div>
                    <S.EditLink onClick={() => toggleEditing('name')}>
                      {editingField === 'name'
                        ? 'Cancelar'
                        : fullName
                          ? 'Editar'
                          : 'Adicionar'}
                    </S.EditLink>
                  </S.Row>

                  <AccordionItem isOpen={editingField === 'name'}>
                    <S.Spacing>
                      <div style={{ width: '100%' }}>
                        <Input
                          placeholder="Nome completo"
                          label="Nome completo"
                          value={fullName}
                          onChange={async (e) => {
                            const value = e.target.value
                            setFullName(value)

                            try {
                              await validateFullName(value)
                              setNameError(undefined)
                            } catch (err) {
                              if (err instanceof ValidationError) {
                                setNameError(err.message)
                              }
                            }
                          }}
                          $error={nameError || undefined}
                          $showErrorMessage
                        />
                      </div>
                      <Button
                        disabled={!nameError ? false : true}
                        onClick={() => handleSave('name')}
                        loading={isLoading}
                      >
                        Salvar
                      </Button>
                    </S.Spacing>
                  </AccordionItem>
                </div>

                <Divider $marginY="24px" />

                <div>
                  <S.Row
                    $disabled={
                      (editingField && editingField !== 'phone') || false
                    }
                  >
                    <div>
                      <span className="label">Número de telefone</span>
                      {editingField === 'phone' ? (
                        <span className="value">Insira um número válido</span>
                      ) : (
                        <span className="value">
                          {session.user.telefone
                            ? formatPhoneNumber(session.user.telefone)
                            : 'Não fornecido'}
                        </span>
                      )}
                    </div>
                    <S.EditLink onClick={() => toggleEditing('phone')}>
                      {editingField === 'phone'
                        ? 'Cancelar'
                        : phoneNumber
                          ? 'Editar'
                          : 'Adicionar'}
                    </S.EditLink>
                  </S.Row>

                  <AccordionItem isOpen={editingField === 'phone'}>
                    <S.Spacing>
                      <div style={{ width: '100%' }}>
                        <InputMask
                          mask="(99) 99999-9999"
                          value={phoneNumber}
                          onChange={async (e) => {
                            const value = e.target.value
                            setPhoneNumber(value)

                            try {
                              await validatePhone(value)
                              setPhoneError(undefined)
                            } catch (err) {
                              if (err instanceof ValidationError) {
                                setPhoneError(err.message)
                              }
                            }
                          }}
                          onBlur={(e) => setPhoneNumber(e.target.value)}
                        >
                          {() => (
                            <Input
                              placeholder="Celular"
                              label="Celular"
                              $error={phoneError || undefined}
                              $showErrorMessage
                            />
                          )}
                        </InputMask>
                      </div>
                      <Button
                        disabled={!phoneError ? false : true}
                        onClick={() => handleSave('phone')}
                        loading={isLoading}
                      >
                        Salvar
                      </Button>
                    </S.Spacing>
                  </AccordionItem>
                </div>

                <Divider $marginY="24px" />

                <div>
                  <S.Row
                    $disabled={
                      (editingField && editingField !== 'address') || false
                    }
                  >
                    <div>
                      <span className="label">Endereço</span>
                      {editingField === 'address' ? (
                        <span className="value">Use um endereço válido</span>
                      ) : (
                        <span className="value">
                          {session.user.endereco &&
                          session.user.bairro &&
                          session.user.cidade &&
                          session.user.estado &&
                          session.user.numero
                            ? `${session.user.endereco}, ${session.user.numero}. ${session.user.bairro}, ${session.user.cidade} - ${session.user.estado}`
                            : 'Não fornecido'}
                        </span>
                      )}
                    </div>
                    <S.EditLink onClick={() => toggleEditing('address')}>
                      {editingField === 'address'
                        ? 'Cancelar'
                        : address.cep
                          ? 'Editar'
                          : 'Adicionar'}
                    </S.EditLink>
                  </S.Row>
                  <AccordionItem isOpen={editingField === 'address'}>
                    <S.Spacing>
                      <div style={{ width: '100%' }}>
                        <EditableAddress
                          address={address}
                          setAddress={setAddress}
                          activeSearch={editingField === 'address'}
                          onSave={() => handleSave('address')}
                          isLoading={isLoading}
                        />
                      </div>
                    </S.Spacing>
                  </AccordionItem>
                </div>
                <Divider $marginY="24px" />

                <div>
                  <S.Row
                    $disabled={
                      (editingField && editingField !== 'emergencyPhone') ||
                      false
                    }
                  >
                    <div>
                      <span className="label">Contato de Emergência</span>
                      {editingField === 'emergencyPhone' ? (
                        <span className="value">
                          Informe um telefone válido
                        </span>
                      ) : (
                        <span className="value">
                          {emergencyPhone ? emergencyPhone : 'Não fornecido'}
                        </span>
                      )}
                    </div>
                    <S.EditLink onClick={() => toggleEditing('emergencyPhone')}>
                      {editingField === 'emergencyPhone'
                        ? 'Cancelar'
                        : emergencyPhone
                          ? 'Editar'
                          : 'Adicionar'}
                    </S.EditLink>
                  </S.Row>

                  <AccordionItem isOpen={editingField === 'emergencyPhone'}>
                    <S.Spacing>
                      <div style={{ width: '100%' }}>
                        <InputMask
                          mask="(99) 99999-9999"
                          value={emergencyPhone}
                          onChange={async (e) => {
                            const value = e.target.value
                            setEmergencyPhone(value)

                            try {
                              await validatePhone(value)
                              setEmergencyPhoneError(undefined)
                            } catch (err) {
                              if (err instanceof ValidationError) {
                                setEmergencyPhoneError(err.message)
                              }
                            }
                          }}
                          onBlur={(e) => setEmergencyPhone(e.target.value)}
                        >
                          {() => (
                            <Input
                              placeholder="Telefone de Emergência"
                              label="Telefone de Emergência"
                              $error={emergencyPhoneError || undefined}
                              $showErrorMessage
                            />
                          )}
                        </InputMask>
                      </div>
                      <Button
                        disabled={!emergencyPhoneError ? false : true}
                        onClick={() => handleSave('emergencyPhone')}
                        loading={isLoading}
                      >
                        Salvar
                      </Button>
                    </S.Spacing>
                  </AccordionItem>
                </div>

                <Divider $marginY="24px" />
                <div>
                  <S.Row
                    $disabled={
                      (editingField && editingField !== 'password') || false
                    }
                  >
                    <div>
                      <span className="label">Senha</span>
                      {editingField === 'password' ? (
                        <span className="value">Digite sua nova senha</span>
                      ) : (
                        <span className="value">********</span>
                      )}
                    </div>
                    <S.EditLink onClick={() => toggleEditing('password')}>
                      {editingField === 'password'
                        ? 'Cancelar'
                        : 'Alterar senha'}
                    </S.EditLink>
                  </S.Row>

                  <AccordionItem isOpen={editingField === 'password'}>
                    <S.Spacing>
                      <div style={{ width: '100%' }}>
                        <InputPassword
                          type="password"
                          placeholder="Nova senha"
                          label="Nova senha"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          $error={passwordError}
                          $showErrorMessage
                        />
                      </div>
                      <div style={{ width: '100%' }}>
                        <InputPassword
                          type="password"
                          placeholder="Confirme a nova senha"
                          label="Confirmação de senha"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          $error={passwordError}
                          $showStrengthMeter={false}
                          $showErrorMessage
                        />
                      </div>
                      <Button
                        disabled={
                          !newPassword ||
                          !confirmPassword ||
                          passwordError !== undefined
                        }
                        onClick={() => handleSave('password')}
                        loading={isLoading}
                      >
                        Salvar
                      </Button>
                    </S.Spacing>
                  </AccordionItem>
                </div>
                <Divider $marginY="24px" />
                <div>
                  <S.Row
                    $disabled={
                      (editingField && editingField !== 'deleteAccount') ||
                      false
                    }
                  >
                    <div>
                      <span className="label">Excluir conta</span>
                      {editingField === 'deleteAccount' ? (
                        <span className="value">
                          Tem certeza? Essa ação é irreversível
                        </span>
                      ) : (
                        <span className="value">Deseja excluir sua conta?</span>
                      )}
                    </div>
                    <S.EditLink onClick={() => toggleEditing('deleteAccount')}>
                      {editingField === 'deleteAccount'
                        ? 'Cancelar'
                        : 'Excluir conta'}
                    </S.EditLink>
                  </S.Row>

                  <AccordionItem isOpen={editingField === 'deleteAccount'}>
                    <S.Spacing>
                      <Button onClick={handleDeleteAccount} variant="danger">
                        Excluir conta
                      </Button>
                    </S.Spacing>
                  </AccordionItem>
                </div>
              </S.MainColumn>

              <S.SideColumn>
                <S.SideBlock>
                  <S.SideBlockTitle>
                    <ShieldCheckered size={42} weight="duotone" />
                    <h3>Por que minhas informações não são mostradas aqui?</h3>
                  </S.SideBlockTitle>
                  <p>
                    Outras pessoas veem informações limitadas do seu perfil para
                    proteger a sua privacidade.
                  </p>
                  <Divider $marginY="16px" />
                  <S.SideBlockTitle>
                    <LockKey size={42} weight="duotone" />
                    <h3>Quais informações podem ser editadas?</h3>
                  </S.SideBlockTitle>
                  <p>
                    É possível editar informações de contato e detalhes
                    pessoais.
                  </p>
                  <Divider $marginY="16px" />
                  <S.SideBlockTitle>
                    <Eye size={42} weight="duotone" />
                    <h3>
                      Quais informações são compartilhadas com outras pessoas?
                    </h3>
                  </S.SideBlockTitle>
                  <p>
                    O Excursionistas só libera informações de contato caso você
                    esteja anunciando uma caravana.
                  </p>
                </S.SideBlock>
              </S.SideColumn>
            </S.ContentWrapper>
          </S.SpacingMobile>
        </div>
      </S.Main>

      <ChangeProfilePicModal
        $isOpen={showModal}
        imageSrc={selectedImage}
        onClose={handleCancel}
        onSave={handleSaveProfilePic}
      />
    </S.Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}
