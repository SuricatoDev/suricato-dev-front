import React, { useEffect, useRef, useState } from 'react'

import { formatExcursionistasSince, formatPhoneNumber } from '@/utils/formats'
import { normalizeInput } from '@/utils/normalizer'
import { validateFullName, validatePhone } from '@/validation/validations'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import InputMask from 'react-input-mask'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ValidationError } from 'yup'

import { CalendarBlank } from '@phosphor-icons/react/dist/ssr/CalendarBlank'
import { Eye } from '@phosphor-icons/react/dist/ssr/Eye'
import { LockKey } from '@phosphor-icons/react/dist/ssr/LockKey'
import { MapPin } from '@phosphor-icons/react/dist/ssr/MapPin'
import { PencilSimple } from '@phosphor-icons/react/dist/ssr/PencilSimple'
import { ShieldCheckered } from '@phosphor-icons/react/dist/ssr/ShieldCheckered'
import { SignOut } from '@phosphor-icons/react/dist/ssr/SignOut'
import { User } from '@phosphor-icons/react/dist/ssr/User'

import useMediaQuery from '@/hooks/useMediaQuery'

import { AccordionItem } from '@/components/common/AccordionItem'
import Button from '@/components/common/Button'
import Divider from '@/components/common/Divider'
import {
  AddressData,
  EditableAddress
} from '@/components/common/EditableAddress'
import ChangeProfilePicModal from '@/components/common/ProfilePictureUploader'
import Tabs, { TabItem } from '@/components/common/Tabs'
import Input from '@/components/inputs/Input'
import PasswordConfirmation from '@/components/inputs/PasswordInputWithConfirmation'
import Footer from '@/components/sections/Footer'
import Header from '@/components/sections/Header'
import MobileHeader from '@/components/sections/MobileHeader'

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

type ProfileTab = 'personal' | 'professional'

export default function ProfileEditPage() {
  const { data: session, update } = useSession()
  const isMobile = useMediaQuery()

  const [activeTab, setActiveTab] = useState<ProfileTab>('personal')

  const [userData, setUserData] = useState(session?.user || {})

  const [fullName, setFullName] = useState(userData?.nome || '')
  const [address, setAddress] = useState<AddressData>(
    userData
      ? {
          cep: userData.cep || '',
          street: userData.endereco || '',
          neighborhood: userData.bairro || '',
          city: userData.cidade || '',
          state: userData.estado || '',
          complement: userData.complemento || '',
          number: userData.numero || ''
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
  const [phoneNumber, setPhoneNumber] = useState(userData?.telefone || '')
  const [emergencyPhone, setEmergencyPhone] = useState(
    userData?.contato_emergencia || ''
  )
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nameError, setNameError] = useState<string | undefined>()
  const [phoneError, setPhoneError] = useState<string | undefined>()
  const [emergencyPhoneError, setEmergencyPhoneError] = useState<
    string | undefined
  >()
  const [isLoading, setIsLoading] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [profilePic, setProfilePic] = useState<string | null>(
    userData?.foto_perfil || null
  )

  const [profilePicUpdateLoading, setProfilePicUpdateLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    setProfilePic(userData?.foto_perfil || '')
  }, [userData?.foto_perfil])

  const excursionistasSince = userData?.created_at
    ? formatExcursionistasSince(userData.created_at)
    : null

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [businessPhone, setBusinessPhone] = useState(
    session?.user?.organizador?.telefone_comercial || ''
  )

  const [businessTradeName, setBusinessTradeName] = useState(
    session?.user?.organizadorData?.nome_fantasia || ''
  )

  const userName = session?.user?.nome ?? ''
  const userEmail = session?.user?.email ?? ''

  const [businessPhoneError, setBusinessPhoneError] = useState<string>()
  const [businessAddress, setBusinessAddress] = useState<AddressData>({
    cep: session?.user?.organizadorData?.cep || '',
    street: session?.user?.organizadorData?.endereco || '',
    neighborhood: session?.user?.organizadorData?.bairro || '',
    city: session?.user?.organizadorData?.cidade || '',
    state: session?.user?.organizadorData?.estado || '',
    complement: session?.user?.organizadorData?.complemento || '',
    number: session?.user?.organizadorData?.numero || ''
  })

  useEffect(() => {
    if (session?.user) {
      setUserData(session?.user)
      setFullName(session?.user?.nome || '')
      setPhoneNumber(session?.user?.telefone || '')
      setEmergencyPhone(session?.user?.passageiroData?.contato_emergencia || '')
      setAddress({
        cep: session?.user?.passageiroData?.cep || '',
        street: session?.user?.passageiroData?.endereco || '',
        neighborhood: session?.user?.passageiroData?.bairro || '',
        city: session?.user?.passageiroData?.cidade || '',
        state: session?.user?.passageiroData?.estado || '',
        complement: session?.user?.passageiroData?.complemento || '',
        number: session?.user?.passageiroData?.numero || ''
      })

      if (session?.user?.organizador) {
        setBusinessPhone(session.user.organizadorData.telefone_comercial || '')
        setBusinessAddress({
          cep: session.user.organizadorData.cep || '',
          street: session.user.organizadorData.endereco || '',
          neighborhood: session.user.organizadorData.bairro || '',
          city: session.user.organizadorData.cidade || '',
          state: session.user.organizadorData.estado || '',
          complement: session.user.organizadorData.complemento || '',
          number: session.user.organizadorData.numero || ''
        })

        setBusinessTradeName(session.user.organizadorData.nome_fantasia || '')
      }
    }
  }, [session])

  const tabs: TabItem<ProfileTab>[] = [
    { key: 'personal', label: 'Pessoal' },
    {
      key: 'professional',
      label: 'Profissional',
      disabled: !userData?.organizadorData
    }
  ]

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

  const handleSaveProfilePic = async (croppedFile: File) => {
    const formData = new FormData()
    formData.append('foto_perfil', croppedFile)

    try {
      setProfilePicUpdateLoading(true)
      await axios.post('/api/usuarios/update-foto-perfil/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setProfilePic(URL.createObjectURL(croppedFile))
      toast.success('Foto de perfil atualizada com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar a foto de perfil.')
    } finally {
      setShowModal(false)
      setSelectedImage(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      setProfilePicUpdateLoading(false)
      await update()
    }
  }

  const handleCancel = () => {
    setShowModal(false)
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setEditingField(null)
  }

  const toggleEditing = (field: string) => {
    if (editingField === field) {
      setEditingField(null)
    } else {
      setEditingField(field)
    }
  }

  async function saveField(field: string, value: unknown) {
    let payload: Record<string, unknown> = {}

    switch (field) {
      case 'name':
        payload = { nome: value }
        break
      case 'address': {
        const addr = value as AddressPayload
        payload = {
          passageiro: {
            endereco: addr.street,
            numero: addr.number,
            ...(addr.complement && { complemento: addr.complement }),
            bairro: addr.neighborhood,
            cep: normalizeInput(addr.cep),
            cidade: addr.city,
            estado: addr.state
          }
        }
        break
      }

      case 'phone':
        payload = { telefone: normalizeInput(value as string) }
        break

      case 'password':
        payload = { password: value }
        break

      case 'emergencyPhone':
        payload = {
          passageiro: {
            contato_emergencia: normalizeInput(value as string)
          }
        }
        break

      case 'profilePic':
        payload = { foto_perfil: value }
        break

      case 'telefone_comercial':
        payload = {
          organizador: {
            telefone_comercial: normalizeInput(value as string)
          }
        }
        break

      case 'organizador_endereco': {
        const addr = value as AddressData
        payload = {
          organizador: {
            endereco: addr.street,
            numero: addr.number,
            ...(addr.complement && { complemento: addr.complement }),
            bairro: addr.neighborhood,
            cep: normalizeInput(addr.cep),
            cidade: addr.city,
            estado: addr.state
          }
        }
        break
      }

      case 'nome_fantasia':
        payload = { organizador: { nome_fantasia: value } }
        break

      default:
        return
    }

    try {
      setIsLoading(true)
      const response = await axios.put('/api/usuarios/users', payload, {
        headers: { 'Content-Type': 'application/json' }
      })
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar o campo:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (field: string) => {
    if (!field || !userData) return

    const previousData = { ...userData }

    let newUserData = { ...userData }

    switch (field) {
      case 'address':
        newUserData = {
          ...newUserData,
          passageiroData: {
            endereco: address.street,
            numero: address.number,
            complemento: address.complement,
            bairro: address.neighborhood,
            cep: normalizeInput(address.cep),
            cidade: address.city,
            estado: address.state
          }
        }
        break

      case 'name':
        newUserData.nome = fullName
        break

      case 'phone':
        newUserData.telefone = normalizeInput(phoneNumber)
        break

      case 'emergencyPhone':
        newUserData.passageiroData.contato_emergencia =
          normalizeInput(emergencyPhone)
        break

      case 'password':
        break

      case 'telefone_comercial':
        newUserData.organizadorData.telefone_comercial =
          normalizeInput(businessPhone)
        break

      case 'organizador_endereco':
        newUserData = {
          ...newUserData,
          organizadorData: {
            endereco: address.street,
            numero: address.number,
            complemento: address.complement,
            bairro: address.neighborhood,
            cep: normalizeInput(address.cep),
            cidade: address.city,
            estado: address.state
          }
        }
        break

      case 'nome_fantasia':
        newUserData.organizadorData.nome_fantasia = businessTradeName
        break

      default:
        return
    }

    setUserData(newUserData)

    try {
      switch (field) {
        case 'address':
          await saveField(field, address)
          break

        case 'name':
          await validateFullName(fullName)
          await saveField(field, fullName)
          break

        case 'phone':
          await validatePhone(phoneNumber)
          await saveField(field, phoneNumber)
          break

        case 'emergencyPhone':
          await validatePhone(emergencyPhone)
          await saveField(field, emergencyPhone)
          break

        case 'password':
          await saveField(field, newPassword)
          setNewPassword('')
          setConfirmPassword('')
          break

        case 'organizador_endereco':
          await saveField(field, businessAddress)
          break

        case 'telefone_comercial':
          validatePhone(businessPhone)
          await saveField(field, businessPhone)
          break

        case 'nome_fantasia':
          await saveField(field, businessTradeName)
          break

        default:
          return
      }

      toast.success('Dados atualizados com sucesso!')

      setEditingField(null)
      await update()
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)

      setUserData(previousData)

      toast.error('Erro ao atualizar. Tente novamente.')
    }
  }

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true)

      await axios.delete('/api/usuarios/users')

      toast.success('Conta excluída com sucesso!')

      signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Erro ao excluir conta:', error)

      toast.error('Erro ao excluir a conta.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTabChange = (key: ProfileTab) => {
    setActiveTab(key)
    setEditingField(null)
  }

  if (!session) return null

  return (
    <>
      <Head>
        <title>Minha Conta - Excursionistas</title>
        <meta
          name="description"
          content="Gerencie suas informações pessoais e profissionais."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <S.Wrapper>
        <Header variant="simple" />
        <S.Main>
          <div className="container">
            <MobileHeader>Meu perfil</MobileHeader>
            <S.ProfileHeader>
              <S.ProfilePicWrapper onClick={handleFileClick}>
                <S.ProfilePicContainer>
                  {profilePic ? (
                    <S.ProfilePic>
                      <Image
                        src={profilePic}
                        alt="Foto de perfil"
                        fill
                        style={{ objectFit: 'cover' }}
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
                <S.ProfileName>{userData?.nome || 'Usuário'}</S.ProfileName>
                <S.ProfileInfoItem>
                  {excursionistasSince && (
                    <>
                      <CalendarBlank size={18} weight="bold" />
                      <p>{excursionistasSince}</p>
                    </>
                  )}
                </S.ProfileInfoItem>
                {userData?.passageiroData?.bairro &&
                  userData?.passageiroData?.cidade &&
                  userData?.passageiroData?.estado && (
                    <S.ProfileInfoItem>
                      <MapPin size={18} weight="bold" />
                      <p>
                        {userData.passageiroData.bairro},{' '}
                        {userData.passageiroData.cidade}/
                        {userData.passageiroData.estado}
                      </p>
                    </S.ProfileInfoItem>
                  )}
              </S.ProfileInfo>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".webp,.png,.jpg,.jpeg,.avif"
                onChange={handleFileChange}
              />
            </S.ProfileHeader>

            <S.SpacingMobile>
              <S.ContentWrapper>
                <S.MainColumn>
                  {userData?.organizadorData && (
                    <Tabs
                      items={tabs}
                      activeKey={activeTab}
                      onChange={handleTabChange}
                    />
                  )}
                  {activeTab === 'personal' && (
                    <>
                      <S.Header>
                        <h1>Informações Pessoais</h1>
                      </S.Header>
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
                                {userData?.nome ?? 'Não fornecido'}
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
                                error={nameError || undefined}
                                showErrorMessage
                              />
                            </div>
                            <Button
                              fullWidth={isMobile}
                              disabled={!!nameError}
                              onClick={() => handleSave('name')}
                              loading={isLoading}
                            >
                              Salvar
                            </Button>
                          </S.Spacing>
                        </AccordionItem>
                      </div>

                      <Divider marginY="24px" />

                      <div>
                        <S.Row
                          $disabled={
                            (editingField && editingField !== 'phone') || false
                          }
                        >
                          <div>
                            <span className="label">Número de telefone</span>
                            {editingField === 'phone' ? (
                              <span className="value">
                                Insira um número válido
                              </span>
                            ) : (
                              <span className="value">
                                {userData?.telefone
                                  ? formatPhoneNumber(userData.telefone)
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
                                maskChar={null}
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
                                    error={phoneError || undefined}
                                    showErrorMessage
                                  />
                                )}
                              </InputMask>
                            </div>
                            <Button
                              fullWidth={isMobile}
                              disabled={!!phoneError}
                              onClick={() => handleSave('phone')}
                              loading={isLoading}
                            >
                              Salvar
                            </Button>
                          </S.Spacing>
                        </AccordionItem>
                      </div>
                      <Divider marginY="24px" />
                      {!!userData?.passageiro && !!userData?.passageiroData && (
                        <React.Fragment>
                          <div>
                            <S.Row
                              $disabled={
                                (editingField && editingField !== 'address') ||
                                false
                              }
                            >
                              <div>
                                <span className="label">Endereço</span>
                                {editingField === 'address' ? (
                                  <span className="value">
                                    Use um endereço válido
                                  </span>
                                ) : (
                                  <span className="value">
                                    {userData?.passageiroData?.endereco &&
                                    userData?.passageiroData?.bairro &&
                                    userData?.passageiroData?.cidade &&
                                    userData?.passageiroData?.estado &&
                                    userData?.passageiroData?.numero
                                      ? `${userData.passageiroData.endereco}, ${userData.passageiroData.numero}. ${userData.passageiroData.bairro}, ${userData.passageiroData.cidade} - ${userData.passageiroData.estado}`
                                      : 'Não fornecido'}
                                  </span>
                                )}
                              </div>
                              <S.EditLink
                                onClick={() => toggleEditing('address')}
                              >
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
                          <Divider marginY="24px" />

                          <div>
                            <S.Row
                              $disabled={
                                (editingField &&
                                  editingField !== 'emergencyPhone') ||
                                false
                              }
                            >
                              <div>
                                <span className="label">
                                  Contato de Emergência
                                </span>
                                {editingField === 'emergencyPhone' ? (
                                  <span className="value">
                                    Informe um telefone válido
                                  </span>
                                ) : (
                                  <span className="value">
                                    {userData?.passageiroData
                                      ?.contato_emergencia
                                      ? formatPhoneNumber(
                                          userData.passageiroData
                                            .contato_emergencia
                                        )
                                      : 'Não fornecido'}
                                  </span>
                                )}
                              </div>
                              <S.EditLink
                                onClick={() => toggleEditing('emergencyPhone')}
                              >
                                {editingField === 'emergencyPhone'
                                  ? 'Cancelar'
                                  : emergencyPhone
                                    ? 'Editar'
                                    : 'Adicionar'}
                              </S.EditLink>
                            </S.Row>

                            <AccordionItem
                              isOpen={editingField === 'emergencyPhone'}
                            >
                              <S.Spacing>
                                <div style={{ width: '100%' }}>
                                  <InputMask
                                    maskChar={null}
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
                                    onBlur={(e) =>
                                      setEmergencyPhone(e.target.value)
                                    }
                                  >
                                    {() => (
                                      <Input
                                        placeholder="Telefone de Emergência"
                                        label="Telefone de Emergência"
                                        error={emergencyPhoneError || undefined}
                                        showErrorMessage
                                      />
                                    )}
                                  </InputMask>
                                </div>
                                <Button
                                  fullWidth={isMobile}
                                  disabled={!!emergencyPhoneError}
                                  onClick={() => handleSave('emergencyPhone')}
                                  loading={isLoading}
                                >
                                  Salvar
                                </Button>
                              </S.Spacing>
                            </AccordionItem>
                          </div>
                          <Divider marginY="24px" />
                        </React.Fragment>
                      )}
                      <div>
                        <S.Row
                          $disabled={
                            (editingField && editingField !== 'password') ||
                            false
                          }
                        >
                          <div>
                            <span className="label">Senha</span>
                            {editingField === 'password' ? (
                              <span className="value">
                                Digite sua nova senha
                              </span>
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
                            <PasswordConfirmation
                              newPassword={newPassword}
                              confirmPassword={confirmPassword}
                              onNewPasswordChange={(e) =>
                                setNewPassword(e.target.value)
                              }
                              onConfirmPasswordChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              userName={userName}
                              userEmail={userEmail}
                            />
                            <Button
                              fullWidth={isMobile}
                              disabled={
                                !newPassword ||
                                !confirmPassword ||
                                newPassword !== confirmPassword
                              }
                              onClick={() => handleSave('password')}
                              loading={isLoading}
                            >
                              Salvar
                            </Button>
                          </S.Spacing>
                        </AccordionItem>
                      </div>

                      <Divider marginY="24px" />

                      <div>
                        <S.Row
                          $disabled={
                            (editingField &&
                              editingField !== 'deleteAccount') ||
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
                              <span className="value">
                                Deseja excluir sua conta?
                              </span>
                            )}
                          </div>
                          <S.EditLink
                            onClick={() => toggleEditing('deleteAccount')}
                          >
                            {editingField === 'deleteAccount'
                              ? 'Cancelar'
                              : 'Excluir conta'}
                          </S.EditLink>
                        </S.Row>

                        <AccordionItem
                          isOpen={editingField === 'deleteAccount'}
                        >
                          <S.Spacing>
                            <Button
                              onClick={handleDeleteAccount}
                              variant="danger"
                              loading={isLoading}
                              disabled={isLoading}
                            >
                              Excluir conta
                            </Button>
                          </S.Spacing>
                        </AccordionItem>
                      </div>

                      <Divider marginY="24px" />

                      <S.LogoutContainer>
                        <Button
                          fullWidth
                          onClick={() => {
                            signOut({ callbackUrl: '/' })
                          }}
                          variant="danger"
                          icon={
                            <SignOut
                              size={24}
                              weight="bold"
                              style={{ transform: 'scaleX(-1)' }}
                            />
                          }
                        >
                          Sair da conta
                        </Button>
                      </S.LogoutContainer>
                    </>
                  )}
                  {activeTab === 'professional' && (
                    <>
                      <S.Header>
                        <h1>Informações Profissionais</h1>
                      </S.Header>

                      <div>
                        <S.Row
                          $disabled={
                            (editingField &&
                              editingField !== 'nome_fantasia') ||
                            false
                          }
                        >
                          <div>
                            <span className="label">Nome Fantasia</span>
                            {editingField === 'nome_fantasia' ? (
                              <span className="value">
                                Informe o Nome Fantasia
                              </span>
                            ) : (
                              <span className="value">
                                {userData.organizadorData?.nome_fantasia ||
                                  'Não fornecido'}
                              </span>
                            )}
                          </div>
                          <S.EditLink
                            onClick={() => toggleEditing('nome_fantasia')}
                          >
                            {editingField === 'nome_fantasia'
                              ? 'Cancelar'
                              : businessTradeName
                                ? 'Editar'
                                : 'Adicionar'}
                          </S.EditLink>
                        </S.Row>
                        <AccordionItem
                          isOpen={editingField === 'nome_fantasia'}
                        >
                          <S.Spacing>
                            <Input
                              placeholder="Nome Fantasia"
                              label="Nome Fantasia"
                              value={businessTradeName}
                              onChange={(e) =>
                                setBusinessTradeName(e.target.value)
                              }
                            />
                            <Button
                              fullWidth={isMobile}
                              onClick={() => handleSave('nome_fantasia')}
                              loading={isLoading}
                            >
                              Salvar
                            </Button>
                          </S.Spacing>
                        </AccordionItem>
                      </div>

                      <Divider marginY="24px" />

                      <div>
                        <S.Row
                          $disabled={
                            (editingField &&
                              editingField !== 'telefone_comercial') ||
                            false
                          }
                        >
                          <div>
                            <span className="label">Telefone Comercial</span>
                            {editingField === 'telefone_comercial' ? (
                              <span className="value">
                                Informe um telefone válido
                              </span>
                            ) : (
                              <span className="value">
                                {userData?.organizadorData?.telefone_comercial
                                  ? formatPhoneNumber(
                                      userData.organizadorData
                                        .telefone_comercial
                                    )
                                  : 'Não fornecido'}
                              </span>
                            )}
                          </div>
                          <S.EditLink
                            onClick={() => toggleEditing('telefone_comercial')}
                          >
                            {editingField === 'telefone_comercial'
                              ? 'Cancelar'
                              : businessPhone
                                ? 'Editar'
                                : 'Adicionar'}
                          </S.EditLink>
                        </S.Row>
                        <AccordionItem
                          isOpen={editingField === 'telefone_comercial'}
                        >
                          <S.Spacing>
                            <div style={{ width: '100%' }}>
                              <InputMask
                                mask="(99) 99999-9999"
                                maskChar={null}
                                value={businessPhone}
                                onChange={async (e) => {
                                  const value = e.target.value
                                  setBusinessPhone(value)

                                  try {
                                    await validatePhone(value)
                                    setBusinessPhoneError(undefined)
                                  } catch (err) {
                                    if (err instanceof ValidationError) {
                                      setBusinessPhoneError(err.message)
                                    }
                                  }
                                }}
                              >
                                {() => (
                                  <Input
                                    placeholder="Telefone Comercial"
                                    label="Telefone Comercial"
                                    error={businessPhoneError}
                                    showErrorMessage
                                  />
                                )}
                              </InputMask>
                            </div>

                            <Button
                              fullWidth={isMobile}
                              disabled={!!businessPhoneError}
                              onClick={() => handleSave('telefone_comercial')}
                              loading={isLoading}
                            >
                              Salvar
                            </Button>
                          </S.Spacing>
                        </AccordionItem>
                      </div>

                      <Divider marginY="24px" />

                      <div>
                        <S.Row
                          $disabled={
                            (editingField &&
                              editingField !== 'organizador_endereco') ||
                            false
                          }
                        >
                          <div>
                            <span className="label">Endereço Comercial</span>
                            <span className="value">
                              {userData.organizadorData?.endereco
                                ? `${userData.organizadorData.endereco}, ${userData.organizadorData.numero}. ` +
                                  `${userData.organizadorData.bairro}, ${userData.organizadorData.cidade} – ${userData.organizadorData.estado}`
                                : 'Não fornecido'}
                            </span>
                          </div>
                          <S.EditLink
                            onClick={() =>
                              toggleEditing('organizador_endereco')
                            }
                          >
                            {editingField === 'organizador_endereco'
                              ? 'Cancelar'
                              : userData.organizadorData?.endereco
                                ? 'Editar'
                                : 'Adicionar'}
                          </S.EditLink>
                        </S.Row>
                        <AccordionItem
                          isOpen={editingField === 'organizador_endereco'}
                        >
                          <S.Spacing>
                            <EditableAddress
                              address={businessAddress}
                              setAddress={setBusinessAddress}
                              activeSearch={
                                editingField === 'organizador_endereco'
                              }
                              onSave={() => handleSave('organizador_endereco')}
                              isLoading={isLoading}
                            />
                          </S.Spacing>
                        </AccordionItem>
                      </div>
                    </>
                  )}
                </S.MainColumn>

                <S.SideColumn>
                  <S.SideBlock>
                    <S.SideBlockTitle>
                      <ShieldCheckered size={42} weight="duotone" />
                      <h3>
                        Por que minhas informações não são mostradas aqui?
                      </h3>
                    </S.SideBlockTitle>
                    <p>
                      Outras pessoas veem informações limitadas do seu perfil
                      para proteger a sua privacidade.
                    </p>
                    <Divider marginY="16px" />
                    <S.SideBlockTitle>
                      <LockKey size={42} weight="duotone" />
                      <h3>Quais informações podem ser editadas?</h3>
                    </S.SideBlockTitle>
                    <p>
                      É possível editar informações de contato e detalhes
                      pessoais.
                    </p>
                    <Divider marginY="16px" />
                    <S.SideBlockTitle>
                      <Eye size={42} weight="duotone" />
                      <h3>
                        Quais informações são compartilhadas com outras pessoas?
                      </h3>
                    </S.SideBlockTitle>
                    <p>
                      O Excursionistas só libera informações de contato caso
                      você esteja anunciando uma caravana.
                    </p>
                  </S.SideBlock>
                </S.SideColumn>
              </S.ContentWrapper>
            </S.SpacingMobile>
          </div>
          <Footer />{' '}
        </S.Main>

        <ChangeProfilePicModal
          isOpen={showModal}
          imageSrc={selectedImage || profilePic || ''}
          onClose={handleCancel}
          onSave={handleSaveProfilePic}
          isLoading={profilePicUpdateLoading}
        />
      </S.Wrapper>
    </>
  )
}
