import styled, { css } from 'styled-components'

export const ToggleButton = styled.button`
  position: relative;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`

const iconCss = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  transition:
    opacity ${({ theme }) => theme.common.transition.slow},
    transform ${({ theme }) => theme.common.transition.slow};
  transform: translate(-50%, -50%);
`

export const SunWrapper = styled.div`
  ${iconCss};

  svg {
    fill: #ffbc4a !important;
  }
  opacity: 1;
  transform: translate(-50%, -50%) rotate(0deg) scale(1);

  ${ToggleButton}[data-dark='true'] & {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(90deg) scale(0.5);
  }
`

export const MoonWrapper = styled.div`
  ${iconCss};

  svg {
    fill: ${({ theme }) => theme.colors.text_foggy} !important;
  }

  opacity: 0;
  transform: translate(-50%, -50%) rotate(-90deg) scale(0.5);

  ${ToggleButton}[data-dark='true'] & {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
  }
`
