import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`

interface WrapperProps {
  $columns: number
  $gap: string
}

export const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  gap: ${(props) => props.$gap};
  width: 100%;
  height: 100%;
`

interface SkeletonItemProps {
  width: string
  height: string
  radius?: string
}

export const SkeletonItem = styled.div<SkeletonItemProps>`
  background-color: #e0e0e0;
  animation: ${pulse} 1.5s infinite ease-in-out;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.radius};
`
