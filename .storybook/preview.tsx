import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../src/styles/global'
import { defaultTheme } from '../src/styles/themes/default'
import { GlobalProvider } from '../src/providers/GlobalContext'

export const decorators = [
  (Story) => (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalProvider brand="" pageName="">
          <GlobalStyle />
          <Story />
        </GlobalProvider>
      </ThemeProvider>
    </>
  )
]
