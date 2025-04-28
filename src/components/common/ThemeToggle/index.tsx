import { useDarkMode } from '@/providers/AccessibilityContextProvider'

import { Moon } from '@phosphor-icons/react/dist/ssr/Moon'
import { Sun } from '@phosphor-icons/react/dist/ssr/Sun'

import * as S from './styles'

export default function ThemeToggle() {
  const { themeDarkMode, updatedDarkMode } = useDarkMode()

  return (
    <button
      onClick={() => updatedDarkMode(!themeDarkMode)}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer'
      }}
      aria-label="Alternar tema"
    >
      {themeDarkMode ? (
        <S.IconSun>
          <Sun weight="fill" size={24} />
        </S.IconSun>
      ) : (
        <S.IconMoon>
          <Moon weight="fill" size={24} />
        </S.IconMoon>
      )}
    </button>
  )
}
