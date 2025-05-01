import { createGlobalStyle } from 'styled-components'

import { device } from './breakpoints'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    transition: background-color ${(props) => props.theme.common.transition.default},
    color ${(props) => props.theme.common.transition.default},
    border ${(props) => props.theme.common.transition.default},
    filter ${(props) => props.theme.common.transition.default};
    font-family: 'Inter', sans-serif;
  }

  :root {
  --swiper-pagination-color: ${({ theme }) => theme.colors.text_ultralight};
  --swiper-pagination-bullet-inactive-color: ${({ theme }) =>
    theme.colors.base_dark56};
  --swiper-pagination-bullet-inactive-opacity: 1;
  --swiper-pagination-bullet-size: 11px;
  --toastify-toast-padding: 16px 24px 16px 16px;

    @media ${device.md} {
        --swiper-pagination-bullet-size: 9px;
    }
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    -webkit-tap-highlight-color: transparent;
    background-color: ${(props) => props.theme.colors.background_standard};
    transition: background-color ${(props) => props.theme.common.transition.default};

    min-height: 100vh;
  }

  #__next, #modal-root {
        min-height: 100vh;
  }

  input, select, button {
    font-family: inherit;
  }

  h1, h2, h3, h4, h5, p, span {
    -webkit-font-smoothing: antialiased;
    line-height: normal;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.text_standard}
  }

  .container {
    position: relative;
    max-width: 1440px;
    padding: 0;
    margin: 0 auto;
    width: 100%;

    @media(${device.md}) {
    padding: 0 1rem;
    }

    &-small {
      padding: 0 10px;
    }
  }

  body::-webkit-scrollbar {
    width: 1em;
  }

  body::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background_standard};
    border-left: 1px solid ${(props) => props.theme.colors.background_dark}22;
  }

  body::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primary_medium}cc;
    border-radius:8px;
    border-inline: 2px solid ${(props) => props.theme.colors.background_standard};
  }

  body::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.colors.primary_light};
    cursor: pointer;
  }

  .image-gallery-index {
    margin: 8px 8px 0 0%;
    border-radius: 4px;
    background-color: rgba(0,0,0,0.6);
    font-size: 0.875rem ;
  }

  .hide-in-mobile {
    display: none;
    @media(${device.md}) {
      display: block;
    }
  }


  .hide-in-desktop {
    display: block;
    @media(${device.md}) {
      display: none;
    }
  }

  * {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  *::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  .swiper-pagination {
    pointer-events: none;
  }

.swiper-pagination-bullet {
  pointer-events: all;
}
`
