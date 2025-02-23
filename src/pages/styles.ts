import styled from 'styled-components'
import background from '@/assets/img/background.png'
import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  background-color: gray;
`
export const Hero = styled.div`
  background:
    linear-gradient(rgba(10, 12, 44, 0.5) 3rem, transparent) center center /
      cover,
    url(${background.src}) left center / cover;
  align-items: flex-start;
  padding-top: 7.5rem;
  height: 100vh;
  max-height: 720px;
  padding: 15rem 0 6rem;
`

export const Main = styled.main`
  background-color: ${({ theme }) => theme.colors.background_standard};
  padding-top: calc(138px + 1rem);

  @media (${device.md}) {
    padding-top: 300px;
  }
`

export const ProductsContainer = styled.div`
  padding: 0 1rem;
  --breakpoint-grid_columns: 1;
  display: grid;
  grid-gap: 2rem;
  grid-auto-flow: row dense;
  grid-template-columns: var(
    --breakpoint-grid_column-template,
    repeat(var(--breakpoint-grid_columns, 1), minmax(0, 1fr))
  );
  grid-auto-rows: var(
    --breakpoint-grid_auto-rows,
    minmax(min-content, max-content)
  );

  @media (${device.xsm}) {
    --breakpoint-grid_columns: 2;
  }

  @media (${device.sm}) {
    --breakpoint-grid_columns: 3;
  }

  @media (${device.md}) {
    padding: 0;
    --breakpoint-grid_columns: 4;
  }

  @media (${device.lg}) {
    --breakpoint-grid_columns: 5;
  }
`
