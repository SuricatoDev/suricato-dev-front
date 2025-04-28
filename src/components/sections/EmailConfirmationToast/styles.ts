import styled from 'styled-components'

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 75px;
  right: 16px;
  background-color: ${({ theme }) => theme.colors.primary_medium};
  color: ${({ theme }) => theme.colors.text_ultralight};
  opacity: 0.95;
  padding: 1rem;
  border-radius: 12px 12px 0px 12px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 999999;
  max-width: 250px;
  width: calc(100% - 4rem);
  font-size: 0.875rem;

  p {
    margin: 0;
    line-height: 1.4;
  }
`

export const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -12px;
  left: -12px;
  background-color: ${({ theme }) => theme.colors.background_standard};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  border: none;
  color: ${({ theme }) => theme.colors.primary_medium};
  cursor: pointer;
  display: flex;
  align-items: center;
`
