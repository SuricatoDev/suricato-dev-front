import styled from 'styled-components'

interface InputProps {
  $dropdownOpen: boolean
}

interface SuggestionItemProps {
  isSelected: boolean
}

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: visible;
`

export const InputContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`

export const InputStyled = styled.input<InputProps>`
  width: 100%;
  padding: 8px;
  font-size: ${(props) => props.theme.common.font.sizes.body.large};
  background: transparent;
  color: black;
  position: relative;
  z-index: 2;
  border: 1px solid ${(props) => props.theme.colors.text_light};
  border-radius: ${({ $dropdownOpen }) =>
    $dropdownOpen ? '8px 8px 0 0' : '8px'};
  min-height: 56px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const GhostText = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.4);
  pointer-events: none;
  z-index: 1;
  font-size: ${(props) => props.theme.common.font.sizes.body.large};
`

export const HiddenSpan = styled.span`
  position: absolute;
  top: -9999px;
  left: -9999px;
  white-space: nowrap;
  font-size: ${(props) => props.theme.common.font.sizes.body.large};
`

export const SuggestionsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid ${(props) => props.theme.colors.base_dark16};
  background: ${(props) => props.theme.colors.background_standard};
  width: 100%;
  position: absolute;
  z-index: 3;
  border-radius: 0 0 8px 8px;
`

export const SuggestionItem = styled.li<SuggestionItemProps>`
  padding: 8px;
  cursor: pointer;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.base_dark8 : 'transparent'};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  width: 100%;
  display: block;

  &:hover {
    background-color: ${({ theme }) => theme.colors.base_dark8};
  }
`
