import { DefaultTheme } from 'styled-components'
import { defaultTheme } from '@/styles/themes/default'

export const createTheme = (dynamicTheme: {
  [key: string]: unknown
}): DefaultTheme => {
  return {
    ...defaultTheme,
    ...dynamicTheme,
    common: {
      ...defaultTheme.common,
      ...((dynamicTheme.common as object) || {})
    }
  } as DefaultTheme
}
