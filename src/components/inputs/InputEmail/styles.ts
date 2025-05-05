import styled from 'styled-components'

interface SuggestionItemProps {
  $isSelected: boolean
}

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: visible;
  z-index: 4;
`

export const InputContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  width: 100%;
  z-index: 0;
  pointer-events: none;
  z-index: 2;
`

export const GhostText = styled.span`
  position: absolute;
  top: calc(50% + 5px);
  transform: translateY(-50%);
  white-space: nowrap;
  color: ${(props) => props.theme.colors.text_standard};
  opacity: 0.4;
  pointer-events: none;
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
  margin: 2px 0 0;
  padding: 0;
  border: 1px solid ${(props) => props.theme.colors.base_dark32};
  background: ${(props) => props.theme.colors.background_light};
  color: ${(props) => props.theme.colors.text_standard};
  width: 100%;
  position: absolute;
  z-index: 3;
  border-radius: 0 0 8px 8px;
`

export const SuggestionItem = styled.li<SuggestionItemProps>`
  padding: 8px;
  cursor: pointer;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.base_dark32 : 'transparent'};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  width: 100%;
  display: block;

  &:hover {
    background-color: ${({ theme }) => theme.colors.base_dark32};
  }
`
