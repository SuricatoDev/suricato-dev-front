import styled from 'styled-components'
import { device } from '@/styles/breakpoints'
import backgroundProfile from '@/assets/images/background-profile.jpg'

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background_standard};
`

export const Main = styled.main`
  padding-bottom: calc(64px + 1rem);
  @media (${device.md}) {
    padding: calc(100px + 2rem) 0 calc(53px + 2rem) 0;
  }
`

export const HeaderMobile = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;
  z-index: 999;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  background-color: ${({ theme }) => theme.colors.background_standard};
  color: ${({ theme }) => theme.colors.text_standard};

  @media (${device.md}) {
    display: none;
  }
`

export const Header = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: ${({ theme }) => theme.common.font.sizes.heading.medium};
    color: ${({ theme }) => theme.colors.text_standard};
    font-weight: bold;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (${device.md}) {
    flex-direction: row;
    gap: 4rem;
  }
`

export const MainColumn = styled.div`
  flex: 1;
  margin-bottom: 2rem;

  @media (${device.md}) {
    margin-bottom: 0;
  }
`

export const SideColumn = styled.aside`
  width: 100%;

  @media (${device.md}) {
    width: 300px;
    flex-shrink: 0;
  }
`

export const Row = styled.div<{ $disabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  .label {
    display: block;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text_standard};
  }

  .value {
    display: block;
    margin-top: 0.25rem;
    font-size: ${({ theme }) => theme.common.font.sizes.body.medium};
    color: ${({ theme }) => theme.colors.text_medium};
  }
`

export const EditLink = styled.button`
  color: ${({ theme }) => theme.colors.text_standard};
  text-decoration: none;
  font-weight: 500;
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};
  margin-left: 1rem;
  transition: color 0.2s ease;
  text-decoration: underline;
  cursor: pointer;
  border: none;
  background: none;

  &:hover {
    color: ${({ theme }) => theme.colors.text_medium};
  }
`

export const SideBlock = styled.div`
  background: ${({ theme }) => theme.colors.background_standard};
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text_standard};

  h3 {
    margin-top: 0;
    font-size: ${({ theme }) => theme.common.font.sizes.body.large};
    font-weight: bold;
    margin-bottom: 0.75rem;
    line-height: 1.2;
    text-align: center;
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.common.font.sizes.body.medium};
    color: ${({ theme }) => theme.colors.text_medium};
    line-height: 1.4;
    text-align: center;
  }

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    color: ${({ theme }) => theme.colors.primary_medium};
    margin: 0 auto;
  }

  @media (${device.md}) {
    h3,
    p {
      text-align: left;
    }
  }
`

export const SideBlockTitle = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
`

export const ProfilePicPreview = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 1px solid #ddd;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const Label = styled.label`
  background-color: ${({ theme }) => theme.colors.primary_medium};
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.text_ultralight};
  font-size: ${({ theme }) => theme.common.font.sizes.body.medium};
  font-weight: bold;
  border-radius: 8px;
  transition: background-color ${({ theme }) => theme.common.transition.default};
  width: max-content;

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_light};
  }
`

export const SpacingMobile = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (${device.md}) {
    padding: 0;
  }
`

export const ProfileHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1rem;
  flex-direction: column;
  margin-bottom: 1.5rem;
  background-image: url(${backgroundProfile.src});
  background-size: cover;
  background-position: bottom;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    border-radius: inherit;
    z-index: -1;
  }

  @media (${device.md}) {
    padding: 3rem 2rem;
    border-radius: 8px;
    flex-direction: row;
  }
`
export const ProfilePicWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
  transition: filter ${({ theme }) => theme.common.transition.default};
  &:hover {
    filter: brightness(0.8);
  }
`

export const ProfilePicContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.text_ultralight};
  border: 3px solid #fff;
`
export const ProfilePic = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export const PlaceholderPic = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ddd;
  color: ${({ theme }) => theme.colors.base_dark88};
  width: 100%;
  height: 100%;
`

export const EditIcon = styled.div`
  position: absolute;
  bottom: 3px;
  right: 3px;
  background: ${({ theme }) => theme.colors.text_ultralight};
  padding: 4px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.base_dark88};
  transition: filter ${({ theme }) => theme.common.transition.default};
  pointer-events: none;
  display: flex;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  border: 1px solid transparent;

  ${ProfilePicWrapper}:hover & {
    filter: brightness(0.8);
    pointer-events: auto;
    border: 1px solid #ddd;
  }
`

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  @media (${device.md}) {
    text-align: left;
  }
`

export const ProfileInfoItem = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text_ultralight};
  font-size: ${({ theme }) => theme.common.font.sizes.body.xsmall};
  gap: 0.5rem;
  justify-content: center;

  @media (${device.md}) {
    justify-content: flex-start;
  }
`

export const ProfileName = styled.p`
  font-size: ${({ theme }) => theme.common.font.sizes.heading.xxsmall};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text_ultralight};
`

export const Spacing = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: start;
`

export const LogoutContainer = styled.div`
  padding: 1rem 0;
  @media (${device.md}) {
    display: none;
  }
`
