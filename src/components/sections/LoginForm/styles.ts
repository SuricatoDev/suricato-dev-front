import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

import { MultiStepFormProps } from '.'

type ModalProps = Pick<MultiStepFormProps, '$isModal'>

export const FormContainer = styled.div<ModalProps>`
  position: relative;
  width: 100%;
  height: auto;
  min-height: ${(props) => (props.$isModal ? 'unset' : '500px')};
  background-color: ${(props) => props.theme.colors.background_standard};

  position: ${(props) => (props.$isModal ? 'fixed' : 'relative')};
  bottom: ${(props) => (props.$isModal ? '0' : 'unset')};
  left: ${(props) => (props.$isModal ? '50%' : 'unset')};
  max-height: calc(100% - 1rem);

  transform: ${(props) => (props.$isModal ? 'translate(-50%, 0%)' : 'none')};
  z-index: ${(props) => (props.$isModal ? '99999' : 'unset')};
  border-radius: ${(props) => (props.$isModal ? '8px 8px 0 0' : '0')};
  overflow-y: auto;
  @media (${device.md}) {
    max-height: calc(100% - 2rem);
    bottom: unset;
    top: ${(props) => (props.$isModal ? '50%' : 'unset')};
    transform: ${(props) =>
      props.$isModal ? 'translate(-50%, -50%)' : 'none'};
    max-width: 568px;
    margin: ${(props) => (props.$isModal ? '0 auto' : '2rem auto')};
    border-radius: 9px;
  }
`

export const Header = styled.div<ModalProps>`
  position: ${(props) => (props.$isModal ? 'sticky' : 'relative')};
  top: ${(props) => (props.$isModal ? '0' : 'unset')};
  padding: 1.5rem;
  border-bottom: 1px solid #ebebeb;
  background-color: ${(props) => props.theme.colors.background_standard};
  z-index: 9;
  border-radius: 8px 8px 0 0;
`

export const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: ${(props) => props.theme.common.font.sizes.heading.xxxsmall};
  color: ${(props) => props.theme.colors.text_standard};
`

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`

export const Subtitle = styled.p`
  font-size: ${(props) => props.theme.common.font.sizes.heading.xxsmall};
  color: ${(props) => props.theme.colors.text_standard};
  font-weight: 600;
`

export const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid ${(props) => props.theme.colors.text_light};
  border-radius: 8px;
  min-height: 56px;
  font-size: ${(props) => props.theme.common.font.sizes.body.large};
`

export const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 24px;
`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 24px 0 0;
`

export const LegalText = styled.p`
  font-size: ${(props) => props.theme.common.font.sizes.body.xsmall};
  color: ${(props) => props.theme.colors.text_light};
  margin-top: 8px;
  line-height: 1rem;
`

export const Step2MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const PolicyText = styled.div`
  font-size: ${(props) => props.theme.common.font.sizes.body.xsmall};
  color: ${(props) => props.theme.colors.text_medium};
  line-height: 1rem;
  font-weight: 500;

  a {
    text-decoration: underline;
    color: rgb(0, 76, 196);
    font-weight: 600;
  }
`
export const NeedHelp = styled.a<ModalProps>`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: ${(props) => (props.$isModal ? '1rem' : '96px')};
  text-decoration: underline;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text_medium};
  font-size: ${(props) => props.theme.common.font.sizes.body.medium};
`

export const BackButton = styled.button`
  position: absolute;
  border: none;
  background-color: transparent;
  display: flex;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text_medium};
  transition: opacity ${(props) => props.theme.common.transition.default};

  &:hover {
    opacity: 0.7;
  }
`

export const ModalOverlay = styled.div<ModalProps>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9999;
`

export const CloseButton = styled.button<ModalProps>`
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1em;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text_medium};
`

export const ContactInformations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
