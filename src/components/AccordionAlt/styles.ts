import { device } from '@/styles/breakpoints'
import styled from 'styled-components'

export const Wrapper = styled.div``

export const AccordionAltContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .accordion-alt-question {
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

    .accordion-alt-arrow {
      transform: rotate(0deg);
      transition: transform ${(props) => props.theme.common.transition.default};
    }

    &.openned {
      .accordion-alt-arrow {
        transform: rotate(-180deg);
      }
    }
  }

  .accordion-alt-answer {
    font-size: ${(props) => props.theme.common.font.sizes.body.large};
    color: ${(props) => props.theme.colors.primary.text};
    padding: 0 16px;

    display: grid;
    grid-template-rows: 0fr;
    transition:
      grid-template-rows ${(props) => props.theme.common.transition.default},
      opacity ${(props) => props.theme.common.transition.default},
      padding ${(props) => props.theme.common.transition.default},
      margin ${(props) => props.theme.common.transition.default};
    opacity: 0;
    background-color: #fcfcfc;

    p {
      line-height: 1.65;
    }

    &.openned {
      margin-top: -24px;
      grid-template-rows: 1fr;
      padding-bottom: 22px;
      padding-top: 48px;
      opacity: 1;
      margin-bottom: 10px;
    }

    div {
      overflow: hidden;
    }
  }

  .accordion-alt-line {
    width: 100%;
    height: 1px;

    background-color: ${(props) => props.theme.colors.primary.line};
  }
`
