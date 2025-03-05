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
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (${device.md}) {
    flex-direction: row;
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
  align-items: center;
  gap: 1rem;
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
  padding: 1.5rem;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const PhoneNumber = styled.div<{ $isLogged: boolean }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text_standard};
  position: relative;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.common.font.sizes.body.xlarge};

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 100px;
    height: 100%;
    transform: translateY(-50%);
    background: linear-gradient(
      to left,
      ${({ theme, $isLogged }) =>
          $isLogged ? 'transparent' : theme.colors.background_standard}
        10%,
      transparent
    );
    pointer-events: none;
  }
  svg {
    color: ${({ theme }) => theme.colors.primary_medium};
  }
`

export const ShowNumbers = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.primary_medium};
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  font-weight: 600;
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};
  white-space: nowrap;

  &:hover {
    opacity: 0.8;
  }
`

export const PhoneContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @supports (gap: 0.5rem) {
    row-gap: 1rem;
  }

  @media (${device.md}) {
    flex-wrap: nowrap;
    row-gap: 0;
  }
`

export const ContactInfo = styled.p`
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};
  color: ${({ theme }) => theme.colors.text_standard};
`

export const ReportLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  color: ${({ theme }) => theme.colors.alert_error};
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const OrganizerImage = styled(Image)`
  border-radius: 50%;
  width: 60px;
  height: 60px;
`

export const OrganizerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`
