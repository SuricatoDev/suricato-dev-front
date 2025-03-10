import React, { useRef, useState } from 'react'
import * as S from '@/styles/pages/conta'
import { CaretLeft } from '@phosphor-icons/react/dist/ssr/CaretLeft'
import { useRouter } from 'next/router'
import Header from '@/components/sections/Header'
import ChangeProfilePicModal from '@/components/ProfilePictureUploader'
import Image from 'next/image'
import Divider from '@/components/common/Divider'
import { Eye } from '@phosphor-icons/react/dist/ssr/Eye'
import { LockKey } from '@phosphor-icons/react/dist/ssr/LockKey'
import { ShieldCheckered } from '@phosphor-icons/react/dist/ssr/ShieldCheckered'
import { PencilSimple } from '@phosphor-icons/react/dist/ssr/PencilSimple'
import { CalendarBlank } from '@phosphor-icons/react/dist/ssr/CalendarBlank'
import { MapPin } from '@phosphor-icons/react/dist/ssr/MapPin'
import { User } from '@phosphor-icons/react/dist/ssr/User'

export default function ProfileEditPage() {
  const router = useRouter()

  const [profilePic, setProfilePic] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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

  const handleSave = (croppedImage: string) => {
    setProfilePic(croppedImage)
    setShowModal(false)
  }

  const handleCancel = () => {
    setShowModal(false)
    setSelectedImage(null)
  }

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
              <S.ProfileName>João da Silva</S.ProfileName>

              <S.ProfileInfoItem>
                <CalendarBlank size={18} weight="bold" />
                <p>No Excursionistas desde Abril de 2022</p>
              </S.ProfileInfoItem>
              <S.ProfileInfoItem>
                <MapPin size={18} weight="bold" />
                <p>Vila Assis, Sorocaba - SP</p>
              </S.ProfileInfoItem>
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
                <S.Row>
                  <div>
                    <span className="label">Nome legal</span>
                    <span className="value">João da Silva</span>
                  </div>
                  <a className="editLink" href="#">
                    Editar
                  </a>
                </S.Row>
                <Divider $marginY="24px" />

                <S.Row>
                  <div>
                    <span className="label">Endereço de email</span>
                    <span className="value">g***@hotmail.com</span>
                  </div>
                  <a className="editLink" href="#">
                    Editar
                  </a>
                </S.Row>
                <Divider $marginY="24px" />

                <S.Row>
                  <div>
                    <span className="label">Números de telefone</span>
                    <span className="value">Não fornecido</span>
                  </div>
                  <a className="editLink" href="#">
                    Adicionar
                  </a>
                </S.Row>
                <Divider $marginY="24px" />

                <S.Row>
                  <div>
                    <span className="label">Endereço</span>
                    <span className="value">Não fornecido</span>
                  </div>
                  <a className="editLink" href="#">
                    Adicionar
                  </a>
                </S.Row>
                <Divider $marginY="24px" />

                <S.Row>
                  <div>
                    <span className="label">Contato de emergência</span>
                    <span className="value">Não fornecido</span>
                  </div>
                  <a className="editLink" href="#">
                    Adicionar
                  </a>
                </S.Row>
                <Divider $marginY="24px" />
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
        onSave={handleSave}
      />
    </S.Wrapper>
  )
}
