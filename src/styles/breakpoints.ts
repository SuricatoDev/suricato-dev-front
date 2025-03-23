interface Size {
  xs: string
  xxsm: string
  xsm: string
  sm: string
  md: string
  lg: string
  xl: string
}

export const size: Size = {
  xs: '0px', 
  xxsm: '360px',
  xsm: '520px',
  sm: '768px', 
  md: '960px', 
  lg: '1440px', 
  xl: '1920px' 
}

export const device = {
  xs: `(min-width: ${size.xs})`,
  xxsm: `(min-width: ${size.xxsm})`,
  xsm: `(min-width: ${size.xsm})`,
  sm: `(min-width: ${size.sm})`,
  md: `(min-width: ${size.md})`,
  lg: `(min-width: ${size.lg})`,
  xl: `(min-width: ${size.xl})`
}
