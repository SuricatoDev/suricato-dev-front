import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

export const ToggleButton = styled.button`
  position: absolute;
  right: 16px;
  top: 2px;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text_medium};
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  margin-right: calc(-1rem + 3px);
  background-color: ${(props) => props.theme.colors.background_standard};
  border-radius: 0 8px 8px 0;
  height: 52px;
`

export const Requirements = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Validation = styled.div<{ $isValid: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) =>
    props.$isValid
      ? props.theme.colors.alert_success
      : props.theme.colors.alert_error};
`
