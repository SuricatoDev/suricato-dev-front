// .storybook/darkTheme.ts
import { create } from '@storybook/theming/create'

export default create({
  base: 'dark',
  brandTitle: 'Excursionistas Design System',
  brandImage: 'https://suricatodev.s3.sa-east-1.amazonaws.com/assets/logo.png',
  colorPrimary: '#FF7148',
  colorSecondary: '#3176BB',

  appContentBg: '#1D1D1D',
  appBorderRadius: 4,

  textColor: '#E0E0E0',
  textInverseColor: '#121212',

  textMutedColor: '#888888',

  inputBg: '#1E1E1E',
  inputTextColor: '#E0E0E0',
  codeColor: '#E0E0E0',
  barTextColor: '#E0E0E0',

  barBg: '#1D1D1D',

  inputBorderRadius: 4,

  appBorderWidth: 1
})
