import { useDarkMode } from '@/providers/AccessibilityContextProvider'

import { Moon, Sun } from '@phosphor-icons/react'

import * as S from './styles'

export default function ThemeToggle() {
  const { themeDarkMode, updatedDarkMode } = useDarkMode()

  return (
    <S.ToggleButton
      onClick={() => updatedDarkMode(!themeDarkMode)}
      aria-label="Alternar tema"
      data-dark={themeDarkMode ? 'false' : 'true'}
    >
      <S.SunWrapper>
        <Sun width={24} height={24} weight="fill" />
      </S.SunWrapper>
      <S.MoonWrapper>
        <Moon width={24} height={24} weight="fill" />
      </S.MoonWrapper>
    </S.ToggleButton>
  )
}
