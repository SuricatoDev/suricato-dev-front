import styled from 'styled-components'
import { device } from '../../styles/breakpoints'

export const Wrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 54px;
  max-height: 54px;
  z-index: 9999;
  background-color: ${(props) => props.theme.colors.primary.bg};
  transition: background-color
    ${(props) => props.theme.common.transition.default};

  @media ${device.md} {
    height: 90px;
    max-height: 90px;
    transition:
      height ${(props) => props.theme.common.transition.default},
      background-color ${(props) => props.theme.common.transition.default};

    &.scrolling {
      height: 61px !important;
    }
  }

  .menu-and-logo {
    max-width: 1440px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .toggle-menu-and-logo {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .menuToggle {
    display: flex;
    flex-direction: column;
    gap: 3px;
    position: relative;
    -webkit-user-select: none;
    user-select: none;
    background: none;
    border: none;
    cursor: pointer;

    @media ${device.md} {
      display: none;
    }

    span {
      position: relative;
      display: block;
      width: 23px;
      height: 3px;
      position: relative;
      background-color: ${(props) => props.theme.colors.primary.bg_inverse};
      border-radius: 8px;
      z-index: 1;
      transform-origin: 4px 0px;
      transition:
        transform 0.3s cubic-bezier(0.77, 0.2, 0.05, 1),
        background-color ${(props) => props.theme.common.transition.default},
        opacity ${(props) => props.theme.common.transition.default};
      &:first-child {
        transform-origin: 0% 0%;
      }
      &:nth-last-child(2) {
        transform-origin: 0% 100%;
      }
    }

    &.openned {
      span {
        background-color: ${(props) => props.theme.colors.secondary.orange};
      }
      span:nth-child(1) {
        transform: rotate(45deg) translate(0.5px, -3.25px);
      }
      span:nth-child(2) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }
      span:nth-child(3) {
        opacity: 1;
        transform: rotate(-45deg) translate(-0.5px, -1px);
      }
    }
  }

  .slider-menu {
    ul {
      display: flex;
      list-style: none;

      li {
        font-size: ${(props) => props.theme.common.font.sizes.body.xsmall};
        text-transform: uppercase;
        font-weight: ${(props) => props.theme.common.font.weight.bold};

        @media ${device.md} {
          text-align: center;
        }

        a {
          text-decoration: none;
          color: ${(props) => props.theme.colors.primary.bg_inverse};
          transition: color ${(props) => props.theme.common.transition.default};
          position: relative;

          &:hover {
            color: ${(props) => props.theme.colors.secondary.orange};
          }
        }
      }
    }

    &.mobile {
      position: absolute;
      left: -100%;
      top: 54px;
      width: 100%;
      height: calc(100vh - 54px);
      overflow-y: auto;
      background-color: ${(props) => props.theme.colors.primary.bg};
      z-index: 3;
      border-top: 1px solid
        ${(props) => props.theme.colors.primary.bg_inverse}20; //opacidade de 20%
      transition:
        left 0.3s cubic-bezier(0, 0, 0, 1),
        background-color ${(props) => props.theme.common.transition.default};

      @media ${device.md} {
        display: none;
      }

      ul {
        flex-direction: column;
        gap: 0.875rem;
        padding: 0.875rem 0;

        li a {
          padding: 0.875rem;
          display: block;
        }
      }
    }

    &.desktop {
      display: none;
      padding: 0 1rem;

      @media ${device.md} {
        display: block;
        height: 100%;

        nav,
        ul,
        li,
        a {
          height: 100%;
        }

        li a {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 0.5em;
          transition: padding
            ${(props) => props.theme.common.transition.default};

          @media ${device.lg} {
            padding: 0 1em;
          }

          &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 4px;
            bottom: 0px;
            left: 0px;
            background-color: ${(props) => props.theme.colors.secondary.orange};
            visibility: hidden;
            transform: scaleX(0);
            transition: all ${(props) => props.theme.common.transition.default};
          }

          &:hover::before {
            transform: scaleX(1);
            visibility: visible;
          }
        }
      }
    }

    &.openned {
      left: 0;
    }
  }
  .switcher-and-cta-container {
    display: flex;
    align-items: center;
    gap: 1em;
    position: relative;
  }

  .switch {
    input {
      opacity: 0;
      position: absolute;

      &:checked + label .ball {
        transform: translateX(16px);
      }
    }

    label {
      cursor: pointer;
      user-select: none;
      background-color: ${(props) => props.theme.colors.primary.bg};
      transition:
        background-color ${(props) => props.theme.common.transition.default},
        border ${(props) => props.theme.common.transition.default};
      border: 1px solid ${(props) => props.theme.colors.primary.text};
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 3px;
      border-radius: 32px;
      position: relative;
      width: 36px;
      height: 20px;
    }

    .ball {
      background-color: ${(props) => props.theme.colors.primary.text};
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: 2px;
      width: 14px;
      height: 14px;
      transition: transform 0.2s linear;
    }

    .sun {
      width: 12px;
      height: 12px;
    }

    .moon {
      width: 10px;
      height: 10px;
    }
  }
`

export const MenuAndLogoContainer = styled.div`
  height: 100%;
  box-shadow: 0px 16px 32px -6px rgba(0, 0, 0, 0.18);
  width: 100%;

  .container {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
  }
`
