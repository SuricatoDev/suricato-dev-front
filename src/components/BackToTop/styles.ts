import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  right: 0;
  width: 2.75rem;
  height: 2.75rem;
  position: fixed;
  border-radius: 9999px 0 0 0;
  border: 0;
  background: ${({ theme }) => theme.colors.primary.text}70;
  backdrop-filter: blur(8px);
  color: ${({ theme }) => theme.colors.primary.text_inverse};
  padding: 0.6rem 0 0 0.6rem;
  z-index: 99;
  text-decoration: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.default};
    color: #fff;
  }
`
