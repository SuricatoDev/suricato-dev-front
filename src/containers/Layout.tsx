import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '@/styles/global'
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
        {children}
      </ThemeProvider>
    </>
  )
}

export default Layout
