import { createGlobalStyle } from 'styled-components'
import { device } from './breakpoints'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    -webkit-font-smoothing: antialiased;
    font-family: 'Montserrat', sans-serif;
    overflow-x: hidden;
    -webkit-tap-highlight-color: transparent;

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
    border-radius: 10px;
    border-inline: 2px solid ${(props) => props.theme.colors.background_standard};
  }

  body::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.colors.primary_light};
    cursor: pointer;
  }

  main {
    height: 5000px;
  }
`
