import { createTheme } from '@/helpers/themeUtils'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from '@/styles/global'
import { defaultTheme } from '@/styles/themes/default'

interface LayoutProps {
  children: React.ReactNode
  theme?: undefined
}

export default function Layout({ children, theme }: LayoutProps) {
  const selectedTheme = defaultTheme

  const finalTheme = createTheme({
    ...selectedTheme,
    common: defaultTheme.common
  })

  return (
    <>
      <ThemeProvider theme={finalTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  )
}
