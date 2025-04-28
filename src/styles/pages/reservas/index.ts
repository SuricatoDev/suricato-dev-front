import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background_standard};
  min-height: 100vh;
`

export const Main = styled.main`
  background-color: ${({ theme }) => theme.colors.background_standard};
  padding-top: 1.5rem;
  min-height: calc(100vh - 100px);

  @media (${device.md}) {
    padding: calc(100px + 1.5rem) 1.5rem calc(53px + 1.5rem);
    min-height: 100vh;
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

  @media (${device.xsm}) {
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

export const EmptyMessage = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text_foggy};
  padding: 4rem 1rem;
  width: 100%;
  min-height: 60vh;

  @media ${device.md} {
    font-size: 1.5rem;
    svg {
      width: 90px;
      height: 90px;
    }
  }
`

export const Title = styled.h1`
  display: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text_standard};
  padding: 2rem 0;

  @media (${device.md}) {
    font-size: 2rem;
    display: flex;
  }
`

export const SpacingMobile = styled.div`
  padding: 0 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (${device.md}) {
    padding: 0;
  }
`
