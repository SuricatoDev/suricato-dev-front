import { device } from '@/styles/breakpoints'
import styled from 'styled-components'

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .accordion-question {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    color: ${(props) => props.theme.colors.primary.text_monocromatic};
    cursor: pointer;
    padding: 23px 20px;
    box-shadow: 0px 4px 16px 0px rgba(29, 29, 29, 0.12);
    border-radius: 24px;
    background-color: #fcfcfc;
    z-index: 1;

    @media ${device.md} {
      transition: filter ${(props) => props.theme.common.transition.default};

      &:hover {
        filter: brightness(0.95);
      }
    }

    h3 {
      font-size: ${(props) => props.theme.common.font.sizes.heading.xxxsmall};
      font-weight: 700;
      line-height: normal;
    }

    .accordion-arrow {
      transform: rotate(0deg);
      transition: transform ${(props) => props.theme.common.transition.default};
    }

    &.openned {
      .accordion-arrow {
        transform: rotate(-180deg);
      }
    }
  }

  .accordion-response {
    font-size: ${(props) => props.theme.common.font.sizes.body.large};
    color: ${(props) => props.theme.colors.primary.text};
    padding: 0 16px;
    background-color: #fcfcfc;

    display: grid;
    grid-template-rows: 0fr; /* Inicia fechado */
    transition:
      grid-template-rows ${(props) => props.theme.common.transition.default},
      opacity ${(props) => props.theme.common.transition.default},
      padding ${(props) => props.theme.common.transition.default},
      margin ${(props) => props.theme.common.transition.default};
    opacity: 0;

    p {
      line-height: 1.65;
      margin-bottom: 8px;
    }

    ul,
    ol {
      margin: 10px 0px 10px 20px;
      line-height: 26px;
    }

    &.openned {
      margin-top: -24px;
      grid-template-rows: 1fr;
      padding: 40px 20px 20px 20px;
      opacity: 1;
      margin-bottom: 10px;
      border-radius: 0 0 20px 20px;
    }

    div {
      overflow: hidden;
    }
  }
`
