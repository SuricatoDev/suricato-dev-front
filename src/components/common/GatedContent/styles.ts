import styled from 'styled-components'

export const GatedContainer = styled.div`
  position: relative;
`

export const OverlayWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 8px;
`

export const Overlay = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s ease;
  z-index: 1;
  border: 1px solid #dddddd;
  border-radius: 8px;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #fff;
    animation: mirroEffect 3s ease-in-out infinite;
  }

  &:hover {
    span {
      color: ${({ theme }) => theme.colors.primary_dark};
    }
    span svg {
      color: ${({ theme }) => theme.colors.primary_dark};
      transform: scale(1.1);
    }
  }

  span {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text_medium};
    transition: color ${({ theme }) => theme.common.transition.default};

    svg {
      transition:
        color ${({ theme }) => theme.common.transition.default},
        transform ${({ theme }) => theme.common.transition.default};
    }
  }

  @keyframes mirroEffect {
    0% {
      transform: scale(0) rotate(45deg);
      opacity: 0;
    }
    80% {
      transform: scale(0) rotate(45deg);
      opacity: 0.5;
    }
    81% {
      transform: scale(4) rotate(45deg);
      opacity: 1;
    }
    100% {
      transform: scale(50) rotate(45deg);
      opacity: 0;
    }
  }
`
