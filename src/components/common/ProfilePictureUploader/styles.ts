import styled from 'styled-components'

interface RangeInputProps {
  $progress: string
}

export const Container = styled.div`
  padding: 1rem;
  width: 100%;
`

export const Header = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  h2 {
    margin: 0;
    font-size: 1.2rem;
  }
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const CropperWrapper = styled.div`
  position: relative;
  width: calc(100vw - 4rem);
  max-width: 500px;
  height: calc(100dvh - 4rem);
  max-height: 350px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background_standard};
  border-radius: 8px;
  overflow: hidden;
`

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const ControlButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
`

export const RangeInput = styled.input.attrs({
  type: 'range'
})<RangeInputProps>`
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: transparent;
  outline: none;

  background-image: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary_medium}
      ${({ $progress }) => $progress},
    #ddd ${({ $progress }) => $progress}
  );
  background-repeat: no-repeat;

  &::-webkit-slider-runnable-track {
    background: transparent;
    height: 4px;
    border-radius: 2px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary_medium};
    cursor: pointer;
    margin-top: -8px;
  }

  &::-moz-range-track {
    background: transparent;
    height: 4px;
    border-radius: 2px;
  }

  &::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary_medium};
    cursor: pointer;
  }
`

export const Footer = styled.div`
  display: flex;

  gap: 1rem;
  margin-top: 1rem;
`
