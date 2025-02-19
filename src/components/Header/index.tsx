import { useContext, useEffect, useState } from 'react'

import { ApiContext } from '@/providers/AccessibilityContextProvider'

import Logo, { LogoProps } from '@/components/Logo'
import ButtonLink from '../ButtonLink'

import * as S from './styles'

export type MenuItems = {
  label: string
  url: string
}

export interface HeaderProps {
  menu_items?: MenuItems[]
  have_switcher_theme?: boolean
  logo?: LogoProps
  cta_link: string
  cta_label: string
}

export default function Header({
  menu_items,
  have_switcher_theme,
  logo,
  cta_link,
  cta_label
}: HeaderProps) {
  const [menu, setMenu] = useState(false)
  const [isShrunk, setIsShrunk] = useState(false)
  const { themeDarkMode, updatedDarkMode } = useContext(ApiContext)

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 90)
    }

    window.addEventListener('scroll', handleScroll)

    document.body.style.overflow = menu ? 'hidden' : ''

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.style.overflow = ''
    }
  }, [menu])

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked

    updatedDarkMode(isChecked)
  }

  const toggleMenu = (change?: boolean) => {
    setMenu(change ?? !menu)
  }

  return (
    <S.Wrapper className={`header ${isShrunk ? 'scrolling' : ''}`}>
      <S.MenuAndLogoContainer>
        <div className="container">
          <div className="menu-and-logo">
            <div className="toggle-menu-and-logo">
              <button
                aria-label="Menu Hamburguer"
                onClick={() => {
                  toggleMenu()
                }}
                className={`menuToggle ${menu ? 'openned' : ''}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              {logo?.image_url && logo?.logo_link && (
                <Logo
                  image_url={logo.image_url}
                  image_alt_text={logo.image_alt_text}
                  logo_link={logo.logo_link}
                  contrast={themeDarkMode}
                />
              )}
            </div>
            <div className="slider-menu desktop">
              <nav>
                <ul>
                  {menu_items?.map((item, index) => {
                    return (
                      <li key={index}>
                        <a href={item.url}>{item.label}</a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
            <div className="switcher-and-cta-container">
              {!!have_switcher_theme && (
                <div className="switch">
                  <input
                    aria-label="Seletor de tema"
                    type="checkbox"
                    className="switch-mode"
                    name="switch-mode"
                    id="switch-mode"
                    onChange={handleThemeChange}
                    checked={themeDarkMode}
                  />
                  <label htmlFor="switch-mode">
                    <svg
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="sun"
                    >
                      <g id="div.icon">
                        <g id="Vector">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.59912 2.94737C8.71271 2.94737 9.72137 3.39649 10.4539 4.12348C10.4575 4.1271 10.4612 4.13072 10.4648 4.13435C10.4684 4.13799 10.472 4.14163 10.4756 4.14527C11.2026 4.87778 11.6518 5.88644 11.6518 7C11.6518 9.23823 9.83735 11.0526 7.59912 11.0526C5.36091 11.0526 3.54649 9.23823 3.54649 7C3.54649 4.76179 5.36091 2.94737 7.59912 2.94737Z"
                            fill="#DFE2EA"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.59912 2.21053C7.39565 2.21053 7.2307 2.04558 7.2307 1.84211V0.368421C7.2307 0.164948 7.39565 8.89413e-09 7.59912 0C7.80259 -8.89413e-09 7.96754 0.164948 7.96754 0.368421V1.84211C7.96754 2.04558 7.80259 2.21053 7.59912 2.21053Z"
                            fill="#DFE2EA"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.9858 3.61327C10.8419 3.46939 10.8419 3.23612 10.9858 3.09225L12.0278 2.05019C12.1717 1.90631 12.405 1.90631 12.5489 2.05019C12.6928 2.19407 12.6928 2.42734 12.5489 2.57122L11.5068 3.61327C11.3629 3.75715 11.1297 3.75715 10.9858 3.61327Z"
                            fill="#DFE2EA"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.3886 6.63158C12.3886 6.42811 12.5536 6.26316 12.757 6.26316H14.2307C14.4341 6.26316 14.5991 6.42811 14.5991 6.63158C14.5991 6.83505 14.4341 7 14.2307 7H12.757C12.5536 7 12.3886 6.83505 12.3886 6.63158Z"
                            fill="#DFE2EA"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.2463 10.1261C11.3902 9.98222 11.6235 9.98222 11.7673 10.1261L12.8094 11.1682C12.9532 11.3121 12.9532 11.5453 12.8094 11.6892C12.6655 11.8331 12.4322 11.8331 12.2883 11.6892L11.2463 10.6471C11.1024 10.5032 11.1024 10.27 11.2463 10.1261Z"
                            fill="#DFE2EA"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.59912 14C7.39565 14 7.2307 13.835 7.2307 13.6316V12.1579C7.2307 11.9545 7.39565 11.7895 7.59912 11.7895C7.80259 11.7895 7.96754 11.9545 7.96754 12.1579V13.6316C7.96754 13.835 7.80259 14 7.59912 14Z"
                            fill="#DFE2EA"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.64939 11.9497C2.50552 11.8058 2.50552 11.5725 2.64939 11.4286L3.69144 10.3866C3.83532 10.2428 4.06859 10.2428 4.21247 10.3866C4.35635 10.5305 4.35635 10.7638 4.21247 10.9076L3.17042 11.9497C3.02654 12.0936 2.79327 12.0936 2.64939 11.9497Z"
                            fill="#DFE2EA"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.599121 6.63158C0.599121 6.42811 0.764069 6.26316 0.967542 6.26316H2.44123C2.6447 6.26316 2.80965 6.42811 2.80965 6.63158C2.80965 6.83505 2.6447 7 2.44123 7H0.967542C0.764069 7 0.599121 6.83505 0.599121 6.63158Z"
                            fill="#DFE2EA"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.90987 1.78969C3.05374 1.64582 3.28701 1.64582 3.43089 1.78969L4.47294 2.83174C4.61682 2.97563 4.61682 3.2089 4.47294 3.35277C4.32907 3.49665 4.0958 3.49665 3.95191 3.35277L2.90987 2.31072C2.76599 2.16685 2.76599 1.93357 2.90987 1.78969Z"
                            fill="#DFE2EA"
                          />
                        </g>
                      </g>
                    </svg>

                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="moon"
                    >
                      <g id="SVG" clipPath="url(#clip0_4205_18844)">
                        <path
                          id="Vector"
                          d="M5.5 11C8.53757 11 11 8.53757 11 5.5C11 5.22319 10.5861 5.17545 10.4351 5.40741C9.81074 6.36614 8.72939 7 7.5 7C5.567 7 4 5.433 4 3.5C4 2.2706 4.63386 1.18925 5.59259 0.564927C5.82455 0.413874 5.77681 0 5.5 0C2.46243 0 0 2.46243 0 5.5C0 8.53757 2.46243 11 5.5 11Z"
                          fill="#4D4D4D"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4205_18844">
                          <rect width="11" height="11" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <div className="ball"></div>
                  </label>
                </div>
              )}

              <ButtonLink
                size="sm"
                size_desktop="md"
                href={cta_link}
                variant="primary"
                target="_blank"
              >
                {cta_label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </S.MenuAndLogoContainer>
      <div className={`slider-menu mobile ${menu ? 'openned' : ''}`}>
        <nav>
          <ul>
            {menu_items?.map((item, index) => {
              return (
                <li key={index}>
                  <a
                    onClick={() => {
                      toggleMenu(false)
                    }}
                    href={item.url}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </S.Wrapper>
  )
}
