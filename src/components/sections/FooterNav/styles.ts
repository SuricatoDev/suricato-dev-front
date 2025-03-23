// styles.ts
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`

export const FooterNavContainer = styled.div`
  background: #fff;
  border-top: 1px solid #eee;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
`

export const ProgressBarContainer = styled.div`
  position: relative; /* Necessário para posicionar as divisórias */
  background-color: #eee;
  height: 6px;
  overflow: hidden;
`

export const ProgressBarFill = styled.div<{ width: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${({ theme }) => theme.colors.primary_medium};
  transition: width 0.3s ease-in-out;
`

/**
 * Cada DividerLine é uma linha vertical que "corta" a barra
 * para mostrar as divisões entre as partes.
 */
export const DividerLine = styled.div<{ left: number }>`
  position: absolute;
  top: 0;
  left: ${(props) => props.left}%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background-color: #fff;
`

export const Back = styled.button`
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  transition: all 0.3s ease;
  border: none;
  background: transparent;
  margin-left: -10px;
  margin-right: -10px;
  padding: 10px;
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};
  color: ${({ theme }) => theme.colors.text_standard};
  cursor: pointer;
  font-weight: 500;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.text_medium};
    background-color: #f7f7f7;
  }
`
