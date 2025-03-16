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

type ProfileState = {
  fullName: string
  phoneNumber: string
  emergencyPhone: string
  newPassword: string
  confirmPassword: string
  address: AddressData
  profilePic: string | null
  selectedImage: string | null
  editingField: string | null
  isLoading: boolean
  passwordError?: string
  nameError?: string
  phoneError?: string
  emergencyPhoneError?: string
}

type Action =
  | { type: 'SET_FIELD'; field: keyof ProfileState; value: any }
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'RESET_EDITING' }

function reducer(state: ProfileState, action: Action): ProfileState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'SET_LOADING':
      return { ...state, isLoading: action.value }
    case 'RESET_EDITING':
      return { ...state, editingField: null, isLoading: false }
    default:
      return state
  }
}

export default function ProfileEditPage() {
  const router = useRouter()
  const { data: session, update } = useSession()

  const initialState: ProfileState = {
    fullName: session?.user?.nome || '',
    phoneNumber: session?.user?.telefone || '',
    emergencyPhone: session?.user?.telefone_emergencia || '',
    newPassword: '',
    confirmPassword: '',
    profilePic: null,
    selectedImage: null,
    editingField: null,
    isLoading: false,
    address: session?.user
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
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = () => {
        dispatch({
          type: 'SET_FIELD',
          field: 'selectedImage',
          value: reader.result as string
        })
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const toggleEditing = (field: string) => {
    dispatch({
      type: 'SET_FIELD',
      field: 'editingField',
      value: state.editingField === field ? null : field
    })
  }

  const handleSave = async (field: keyof ProfileState) => {
    try {
      dispatch({ type: 'SET_LOADING', value: true })

      let payload = {}
      if (field === 'fullName') {
        await validateFullName(state.fullName)
        payload = { nome: state.fullName }
      } else if (field === 'phoneNumber') {
        await validatePhone(state.phoneNumber)
        payload = { telefone: normalizeInput(state.phoneNumber) }
      } else if (field === 'emergencyPhone') {
        await validatePhone(state.emergencyPhone)
        payload = { telefone_emergencia: normalizeInput(state.emergencyPhone) }
      } else if (field === 'password') {
        if (
          !state.newPassword ||
          !state.confirmPassword ||
          state.newPassword !== state.confirmPassword
        ) {
          dispatch({
            type: 'SET_FIELD',
            field: 'passwordError',
            value: 'As senhas devem coincidir.'
          })
          return
        }
        payload = { senha: state.newPassword }
        dispatch({ type: 'SET_FIELD', field: 'newPassword', value: '' })
        dispatch({ type: 'SET_FIELD', field: 'confirmPassword', value: '' })
      }

      const response = await axios.put('/api/usuarios/', payload)
      if (response.data) {
        await update({
          user: {
            ...session?.user,
            ...response.data
          }
        })
      }

      dispatch({ type: 'RESET_EDITING' })
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
    } finally {
      dispatch({ type: 'SET_LOADING', value: false })
    }
  }
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
