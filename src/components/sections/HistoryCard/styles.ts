import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const CardContainer = styled.div`
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background_standard};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.text_ultrafoggy};
`

export const CardHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 1.5rem;
  cursor: pointer;

  .icon {
    display: none;
  }

  .field-orig,
  .field-dest,
  .field-date,
  .status-field {
    flex: 1 1 calc(50% - 0.5rem);
  }

  @media ${device.md} {
    justify-content: unset;

    .status-field {
      margin-left: auto;
    }

    .icon {
      display: block;
    }

    .field-orig,
    .field-dest,
    .field-date,
    .status-field {
      flex: unset;
    }
  }
`
export const SummaryField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.text_standard};

  svg {
    min-width: 20px;
  }
`

export const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.span`
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.text_foggy};
  text-transform: uppercase;
  line-height: 1;
  font-weight: 500;
`

export const Value = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text_standard};
  line-height: 1.2;
  font-weight: 600;
`

export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.text_ultrafoggy};
  background-color: ${({ theme }) => theme.colors.background_standard};
`

export const CardTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text_standard};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  user-select: none;
`

export const ToggleIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`

export const MoreDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  gap: 1.5rem;

  @media ${device.md} {
    flex-direction: row;
    gap: 2rem;
  }
`

export const ActionsContainer = styled.div`
  h3 {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text_standard};
    padding-bottom: 1rem;
  }

  .divider {
    display: none;
  }

  @media ${device.md} {
    width: 210px;

    h3 {
      padding-bottom: 0;
    }

    .divider {
      display: block;
    }
  }
`

export const ActionItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.background_standard};
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;

  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text_standard};
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text_medium};
    font-weight: 500;
    line-height: 1.25;
  }

  strong {
    width: 100%;
    display: inline-block;
    padding: 1rem 0 0.5rem;
    font-size: ${({ theme }) => theme.common.font.sizes.heading.xxsmall};
  }
`

export const ModalButtons = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;

  & > button {
    flex: 1 1;
    white-space: nowrap;
  }
`

export const Stars = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
`

export const StarButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  color: ${({ theme }) => theme.colors.primary_medium};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
