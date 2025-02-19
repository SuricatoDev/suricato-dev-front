// import { useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '@/styles/global'
// import { ApiContext } from '@/providers/AccessibilityContextProvider'
import { createTheme } from '@/helpers/themeUtils'
import { defaultTheme } from '@/styles/themes/default'

interface LayoutProps {
  children: React.ReactNode
  theme?: undefined
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const selectedTheme = defaultTheme

  const finalTheme = createTheme({
    ...selectedTheme,
    common: defaultTheme.common
  })

  return (
    <>
      <ThemeProvider theme={finalTheme}>
        <GlobalStyle />
        <main>{children}</main>
      </ThemeProvider>
    </>
  )
}

export default Layout
