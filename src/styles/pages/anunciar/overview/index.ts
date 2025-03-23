import { device } from '@/styles/breakpoints'
import Image from 'next/image'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 88px 1.5rem 136px;
  height: 100dvh;
  box-sizing: border-box;
  gap: 1.5rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (${device.md}) {
    flex-direction: row;
    align-items: center;
    gap: 3rem;
    justify-content: center;
  }
`

export const TitleContainer = styled.div`
  @media (${device.md}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    width: 50vw;
    max-width: 700px;
  }
`

export const Title = styled.h1`
  font-size: 2.15rem;
  line-height: 2.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text_standard};

  @media (${device.md}) {
    font-size: 3.5rem;
    line-height: unset;
    max-width: 514px;
  }
`

export const InfoContainer = styled.div`
  @media (${device.md}) {
    flex-grow: 0;
    width: 50vw;
    max-width: 600px;
  }
`

export const InfoItem = styled.div`
  display: flex;
`

export const InfoNumber = styled.p`
  padding-right: 12px;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text_standard};

  @media (${device.md}) {
    font-size: 1.375rem;
    line-height: 1.625rem;
  }
`

export const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-right: 12px;

  @media (${device.md}) {
    gap: 0.5rem;
    margin-right: 1em;
  }
`
export const InfoTitle = styled.h2`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text_standard};
  line-height: 1.5rem;
  font-weight: 500;

  @media (${device.md}) {
    font-size: 1.375rem;
    line-height: 1.625rem;
  }
`
export const InfoDescription = styled.p`
  font-size: ${({ theme }) => theme.common.font.sizes.body.medium};
  color: ${({ theme }) => theme.colors.text_foggy};
  line-height: 1.125rem;
  font-weight: 400;

  @media (${device.md}) {
    font-size: 1.125rem;
    line-height: 1.5rem;
  }
`
export const InfoIcon = styled(Image)`
  padding: 8px;
  filter: drop-shadow(0px 8px 4px rgba(0, 0, 0, 0.3));
  width: 76px;
  height: 76px;
  margin-left: auto;

  @media (${device.md}) {
    width: 120px;
    height: 120px;
  }
`

export const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 1rem 1.5rem;
  border-top: 6px solid #ddd;
  display: flex;
  justify-content: end;
  background-color: ${({ theme }) => theme.colors.background_standard};

  @media (${device.md}) {
    padding: 1rem 3rem;
  }
`
