import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 56px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background_standard};
`

export const SelectWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  height: 56px;

  label {
    position: absolute;
    top: 8px;
    left: 12px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text_foggy};
    pointer-events: none;
  }

  svg {
    position: absolute;
    right: 12px;
  }

  #dia {
    border-radius: 8px 0 0 8px;
  }

  #mes {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }

  #ano {
    border-radius: 0 8px 8px 0;
  }

  svg {
    color: ${({ theme }) => theme.colors.text_medium};
  }
`

export const Select = styled.select<{ value: string }>`
  width: 100%;
  height: 100%;
  border: none;
  padding: ${({ value }) => (value ? '26px 36px 10px 12px' : '0 12px')};
  font-size: 16px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text_medium};
  border: 1px solid ${(props) => props.theme.colors.text_light};
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2rem;
  background-color: ${({ theme }) => theme.colors.background_standard};

  &:focus {
    border: none;
    outline: 2px solid ${(props) => props.theme.colors.text_standard};
  }
`
