import styled from 'styled-components'

export const Wrapper = styled.div<{ visible: boolean }>`
  @keyframes slideIn {
    0% {
      transform: translate(-50%, 100%);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    0% {
      transform: translate(-50%, 0);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, 100%);
      opacity: 0;
    }
  }

  position: fixed;
  bottom: 20px;
  left: 50%;
  background-color: ${(props) => props.theme.colors.primary.bg};
  color: ${(props) => props.theme.colors.primary.text};
  font-weight: ${(props) => props.theme.common.font.weight.semibold};
  text-align: center;
  font-size: ${(props) => props.theme.common.font.sizes.body.medium};
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 999999;
  animation: ${(props) => (props.visible ? 'slideIn' : 'slideOut')} 0.15s
    ease-out forwards;
  max-width: 200px;
  width: 100%;
`
