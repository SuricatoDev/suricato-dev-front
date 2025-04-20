import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background_standard};
`

export const Main = styled.main`
  background-color: ${({ theme }) => theme.colors.background_standard};
  padding-top: calc(138px + 1rem);

  @media (${device.md}) {
    padding: 300px 0 150px 0;
  }
`

export const ProductsContainer = styled.div`
  padding: 0 1rem 1rem;
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

  @media (${device.sm}) {
    --breakpoint-grid_columns: 2;
  }

  @media (${device.md}) {
    padding: 0;
    --breakpoint-grid_columns: 3;
  }

  @media (${device.lg}) {
    --breakpoint-grid_columns: 4;
  }
`
