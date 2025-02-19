import { device } from '@/styles/breakpoints'
import styled from 'styled-components'

export const Wrapper = styled.div``

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;

  .accordion-question {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    color: ${(props) => props.theme.colors.primary.text_monocromatic};
    cursor: pointer;
    padding: 23px 16px 22px;

    @media ${device.md} {
      transition: opacity ${(props) => props.theme.common.transition.default};

      &:hover {
        opacity: 0.7;
      }
    }

    h3 {
      font-size: ${(props) => props.theme.common.font.sizes.heading.xxsmall};
      line-height: 1.33;
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

  .accordion-answer {
    font-size: ${(props) => props.theme.common.font.sizes.body.large};
    color: ${(props) => props.theme.colors.primary.text};
    padding: 0 16px;
    display: grid;
    grid-template-rows: 0fr;
    transition:
      grid-template-rows ${(props) => props.theme.common.transition.default},
      opacity ${(props) => props.theme.common.transition.default};
    opacity: 0;

    p {
      line-height: 1.65;
    }

    &.openned {
      grid-template-rows: 1fr;
      padding-bottom: 22px;
      opacity: 1;
    }

    div {
      overflow: hidden;
    }
  }

  .accordion-line {
    width: 100%;
    height: 1px;

    background-color: ${(props) => props.theme.colors.primary.line};
  }
`
