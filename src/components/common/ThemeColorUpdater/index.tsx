import { useEffect } from 'react'

import { useTheme } from 'styled-components'

export default function ThemeColorUpdater() {
  const theme = useTheme()

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.colors.background_light)
    }
  }, [theme])

  return null
}
