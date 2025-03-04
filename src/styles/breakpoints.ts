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
  xs: '0px', //  0 - xs
  xxsm: '360px',
  xsm: '520px',
  sm: '768px', // 768 ~ 0 - 50px sm - tablet
  md: '960px', // 960 ~ 768 - 50px md - desktop
  lg: '1440px', // 1440 ~ 960 - 100px lg - desktopHD
  xl: '1920px' // 1920 ~ 1280 - 100px xl - desktopWD
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
