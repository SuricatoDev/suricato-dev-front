import Image from 'next/image'
import styled from 'styled-components'

import Button from '@/components/common/Button'

import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background_standard};
`

export const Main = styled.main`
  @media (${device.md}) {
    padding: calc(100px + 2rem) 0 calc(53px + 2rem) 0;
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
    grid-template-columns: 10fr 3fr;
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
  padding: 0 1rem 1rem;
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
  background-color: ${({ theme }) => theme.colors.background_light};
  border: 1px solid ${({ theme }) => theme.colors.base_dark32};
  color: ${({ theme }) => theme.colors.text_standard};
`

export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: ${({ theme }) => theme.colors.text_medium};
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};
  font-weight: 600;

  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
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
  background-color: ${({ theme }) => theme.colors.background_light};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  border: 1px solid ${({ theme }) => theme.colors.base_dark32};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const ContactContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 1rem;
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
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};
  color: ${({ theme }) => theme.colors.text_medium};

  ${({ $expanded }) =>
    $expanded
      ? `
    -webkit-line-clamp: initial;
    max-height: none;
  `
      : `
    -webkit-line-clamp: 2;
  `}
`

export const Hint = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background_light};
  border: 1px solid ${({ theme }) => theme.colors.base_dark32};
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
  font-size: ${({ theme }) => theme.common.font.sizes.heading.large};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text_medium};

  @media (${device.md}) {
    font-size: ${({ theme }) => theme.common.font.sizes.heading.xlarge};
  }
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
  color: ${({ theme }) => theme.colors.text_standard};

  svg {
    color: ${({ theme }) => theme.colors.primary_dark};
  }
`
export const ModalContent = styled.div`
  padding: 1rem;
  position: relative;
  color: ${({ theme }) => theme.colors.text_medium};
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
  background-color: ${({ theme }) => theme.colors.background_light};
  width: 100%;
  padding-bottom: 1rem;
`

export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ViewProfileButton = styled(Button)`
  margin-top: 1rem;
  font-weight: 500;
  border-radius: 50px;
  padding: 0;

  span {
    padding: 0.25rem 0.5rem;
    font-size: ${({ theme }) => theme.common.font.sizes.body.medium};
  }
`

export const EventContainer = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: dense;
  width: 100%;
  @media (${device.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const EventItem = styled.div`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.base_dark32};
  background-color: ${({ theme }) => theme.colors.background_light};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: start;
  color: ${({ theme }) => theme.colors.text_standard};

  @media (${device.md}) {
    flex-direction: row;
    align-items: center;
    border: 1px solid
      ${({ theme }) =>
        theme.title === 'dark' ? theme.colors.base_dark32 : 'none'};
  }
`

export const EventSubItem = styled.div`
  .event-subitem-title {
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text_medium};
    font-size: ${({ theme }) => theme.common.font.sizes.body.xsmall};
  }

  .event-subitem-subtitle {
    font-size: ${({ theme }) => theme.common.font.sizes.body.medium};
    font-weight: 600;
  }
`

export const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.common.font.sizes.heading.xxsmall};
  color: ${({ theme }) => theme.colors.text_standard};
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
