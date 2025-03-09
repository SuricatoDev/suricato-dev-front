import { device } from '@/styles/breakpoints'
import Image from 'next/image'
import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background_standard};
`

export const Main = styled.main`
  padding-bottom: calc(64px + 1rem);
  @media (${device.md}) {
    padding: calc(100px + 1rem) 0 150px 0;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (${device.md}) {
    grid-template-columns: 10fr 4fr;
    align-items: start;
  }

  > :first-child {
    flex: 1;
  }

  > :last-child {
    flex: 0;
  }
`

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text_standard};
  }

  @media (${device.md}) {
    h1 {
      font-size: 2rem;
      color: ${({ theme }) => theme.colors.text_standard};
    }
  }
`

export const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text_standard};

  @media (${device.md}) {
    font-size: 2rem;
  }
`

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (${device.md}) {
    grid-column: 2;
    align-self: start;
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

export const Organizer = styled.div`
  display: flex;
  gap: 1rem;
`

export const OrganizerImage = styled(Image)`
  border-radius: 50%;
  width: 60px;
  height: 60px;
`

export const OrganizerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
`
export const OrganizerVerified = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${({ theme }) => theme.common.font.sizes.body.xxsmall};
  text-transform: uppercase;

  svg {
    color: ${({ theme }) => theme.colors.alert_success};
  }
`

export const OrganizerName = styled.p`
  font-size: ${({ theme }) => theme.common.font.sizes.heading.xxsmall};
  font-weight: 600;
`

export const OrganizerFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const OrganizerFooterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text_medium};
  font-size: ${({ theme }) => theme.common.font.sizes.body.xsmall};
`

export const OrganizerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background_standard};
  border: 1px solid #dddddd;
  color: ${({ theme }) => theme.colors.text_standard};
`

export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: ${({ theme }) => theme.colors.text_standard};
  font-size: 1.25rem;
  font-weight: 500;
`

export const ImagesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  @media (${device.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
  }
`

export const MoreImages = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
`

export const ContactCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const PhoneNumber = styled.div<{ $isLogged: boolean }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text_standard};
  position: relative;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.common.font.sizes.body.xlarge};

  p {
    font-size: 1rem;
  }

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.93) 10%,
      transparent 100%
    );
    background: linear-gradient(
      to left,
      ${({ $isLogged }) =>
        $isLogged
          ? 'transparent'
          : 'rgba(255, 255, 255, 0.93) 10%, transparent 100%'},
      transparent
    );
    pointer-events: none;
  }
  svg {
    color: ${({ theme }) => theme.colors.primary_dark};
  }
`

export const ShowNumbers = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.primary_dark};
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  font-weight: 600;
  font-size: ${({ theme }) => theme.common.font.sizes.body.xsmall};
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`

export const ContactContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 1rem;

  .whatsapp-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
    background-color: #24a148;
    border: 1px solid #24a148;

    &:hover {
      background-color: #197b35;
      border-color: #197b35;
    }
  }
`

export const WhatsappContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  height: 1rem;
`

export const ContactInfo = styled.p`
  font-size: ${({ theme }) => theme.common.font.sizes.body.medium};
  color: ${({ theme }) => theme.colors.text_standard};
`

export const ReportLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  color: ${({ theme }) => theme.colors.alert_error};
  font-size: ${({ theme }) => theme.common.font.sizes.body.medium};
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const PhoneContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.primary_dark};
    font-size: ${({ theme }) => theme.common.font.sizes.body.large};
    font-weight: 600;
    cursor: pointer;
    text-align: start;
    width: fit-content;

    &:hover {
      text-decoration: underline;
    }
  }
`

export const Description = styled.p<{ $expanded?: boolean }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: ${({ $expanded }) => ($expanded ? 'unset' : '2')};
  transition: -webkit-line-clamp 0.3s ease;
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};
`

export const Hint = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background_standard};
  border: 1px solid #dddddd;
  color: ${({ theme }) => theme.colors.text_medium};

  .hint {
    &-title {
      font-weight: 600;
      font-size: 1.125rem;
    }
    &-description {
      font-size: ${({ theme }) => theme.common.font.sizes.body.medium};
    }
    &-button {
      background: none;
      border: none;
      color: ${({ theme }) => theme.colors.primary_dark};
      font-weight: 600;
      cursor: pointer;
      text-align: start;
      width: fit-content;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`

export const Price = styled.p`
  font-size: ${({ theme }) => theme.common.font.sizes.heading.xlarge};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text_medium};
`

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  svg {
    color: ${({ theme }) => theme.colors.primary_dark};
  }
`
export const ModalContent = styled.div`
  padding: 1rem;
  position: relative;
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: ${({ theme }) => theme.common.font.sizes.body.large};
  }
`

export const ModalButton = styled.div`
  position: sticky;
  bottom: 0;
  padding: 1rem 1rem 0;
  background-color: ${({ theme }) => theme.colors.background_standard};
  width: 100%;
  padding-bottom: 1rem;
`

export const MapTitle = styled.h2`
  font-size: ${({ theme }) => theme.common.font.sizes.heading.xxsmall};
  color: ${({ theme }) => theme.colors.text_standard};
`

export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
`
