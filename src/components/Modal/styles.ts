// src/components/Modal/styles.ts
import { Slider } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: auto;
  text-align: center;
`

export const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`

export const StyledSlider = styled(Slider)`
  position: absolute;
  width: 100%;
  transform: translateY(-50%);
`
