import styled from 'styled-components'
import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background_standard};
`

export const Main = styled.main`
  padding-bottom: calc(64px + 1rem);
  @media (${device.md}) {
    padding: calc(100px + 2rem) 0 calc(53px + 2rem) 0;
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
export const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text_standard};
  padding: 2rem 0 1rem 0;

  @media (${device.md}) {
    font-size: 2rem;
  }
`

export const TopActions = styled.div`
  margin: 1rem 0;
`

export const CaravanGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (${device.md}) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 1rem;
  }
  @media (${device.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const Card = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  border: 1px solid transparent;

  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
`

export const CardHeader = styled.div`
  position: relative;
`

export const CardImage = styled.div<{ bg: string }>`
  width: 100%;
  height: 160px;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 80%;
    background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.7));
  }
`

export const CardCategory = styled.span`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: #ff6600;
  color: #fff;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
`

export const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text_standard};
  margin-bottom: 0.25rem;
`

export const CardSubInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.common.font.sizes.body.medium};
  color: ${({ theme }) => theme.colors.text_medium};
`

export const SubInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #eee;
  justify-content: flex-end;
`

export const MenuWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #fff;
  border-radius: 50%;
`

export const MenuToggle = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.25rem;

  &:hover {
    color: #000;
  }
`

export const MenuList = styled.ul`
  position: absolute;
  top: 110%;
  right: 8px;
  background: ${({ theme }) => theme.colors.background_standard};
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 4px 0;
  list-style: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
`

export const MenuItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.common.font.sizes.body.medium};
  color: ${({ theme }) => theme.colors.text_medium};
  padding-bottom: 0.75rem;
`

export const Fallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text_medium};
  font-weight: 500;
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`

export const ModalButtons = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`
