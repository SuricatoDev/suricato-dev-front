import { device } from '@/styles/breakpoints'
import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;

  @media (${device.md}) {
    max-width: 568px;
    margin: 2rem auto;
    border-radius: 12px;
    border: 1px solid ${(props) => props.theme.colors.text_light};
  }
`

export const Header = styled.div`
  position: relative;
  padding: 1.5rem;
  border-bottom: 1px solid #ebebeb;
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
  padding: 24px 0;
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
export const NeedHelp = styled.a`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 96px;
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
