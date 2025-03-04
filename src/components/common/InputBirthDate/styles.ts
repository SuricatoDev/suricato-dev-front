import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid ${(props) => props.theme.colors.text_light};
  border-radius: 8px;

  width: 100%;
  height: 56px;
  height: 100%;
  background-color: #fff;
`

export const Divider = styled.div`
  width: 1px;
  height: 56px;
  background-color: ${(props) => props.theme.colors.text_light};
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
    color: #999;
    pointer-events: none;
  }

  svg {
    position: absolute;
    right: 12px;
  }
`

export const Select = styled.select<{ value: string }>`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  padding: ${({ value }) => (value ? '26px 36px 10px 12px' : '0 12px')};
  font-size: 16px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text_medium};

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2rem;

  &:focus {
    outline: none;
  }
`
