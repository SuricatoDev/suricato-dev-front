import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;

  > svg {
    position: absolute;
    left: 1rem;
    color: ${({ theme }) => theme.colors.text_medium};
    z-index: 1;
  }
`

export const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 2.5rem;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  height: 56px;
  background: ${({ theme }) => theme.colors.background_light};
  color: ${({ theme }) => theme.colors.text_standard};

  &:focus,
  &:active {
    border: 2px solid ${(props) => props.theme.colors.text_standard};
  }
`

export const List = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.background_standard};
  border-radius: 0 0 16px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 0rem;
  list-style: none;
  padding: 0;
  z-index: -1;
  margin-top: -2rem;
  padding-top: 2.5rem;
`

export const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  cursor: pointer;
  font-size: 0.95rem;

  &:hover {
    background: ${({ theme }) => theme.colors.background_light};
  }
`

export const Icon = styled.div`
  display: flex;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background_light};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.text_foggy};
  border: 1px solid
    ${({ theme }) =>
      theme.title === 'dark' ? theme.colors.base_dark32 : 'transparent'};
`
export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`
export const PlaceName = styled.span`
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text_standard};
`

export const PlaceAddress = styled.span`
  display: block;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text_foggy};
  margin-top: 2px;
`
