import styled from 'styled-components'

export const AccordionContent = styled.div<{ height: number }>`
  overflow: hidden;
  transition:
    height 0.3s ease,
    opacity 0.3s ease,
    margin-top 0.3s ease;
  height: ${({ height }) => height}px;
  opacity: ${({ height }) => (height > 0 ? 1 : 0)};
  margin-top: ${({ height }) => (height > 0 ? '1rem' : '0')};
`
