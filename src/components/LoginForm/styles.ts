import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 300px;
  margin: auto;
  border-radius: 12px;
  border: 1px solid #b0b0b0 !important;
`

export const Header = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #ebebeb;
`

export const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: ${(props) => props.theme.common.font.sizes.heading.xxxsmall};
`

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`

export const Subtitle = styled.p`
  font-size: ${(props) => props.theme.common.font.sizes.heading.xsmall};
`

export const StyledInput = styled.input`
  margin-top: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const StyledSelect = styled.select`
  margin-top: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const StyledButton = styled.button`
  margin-top: 10px;
  padding: 8px;
  background-color: #ff385c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e31c58;
  }
`

export const Divider = styled.div`
  margin-top: 20px;
  text-align: center;
`
