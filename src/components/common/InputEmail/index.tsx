import { useState, useRef, useEffect, InputHTMLAttributes } from 'react'
import * as S from './styles'
import ErrorMessage from '../ErrorMessage'

interface EmailInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  $error?: string
}

const domains = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'live.com'
]

export default function InputEmail({
  value: initialValue = '',
  onChange,
  onBlur,
  onKeyDown,
  $error
}: EmailInputProps) {
  const [value, setValue] = useState<string>(initialValue)
  const [ghost, setGhost] = useState<string>('')

  const [filteredDomains, setFilteredDomains] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const [offset, setOffset] = useState<number>(0)
  const [containerWidth, setContainerWidth] = useState<number>(0)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const hiddenSpanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (wrapperRef.current) {
      setContainerWidth(wrapperRef.current.offsetWidth)
    }
  }, [])

  useEffect(() => {
    const atIndex = value.indexOf('@')
    if (atIndex !== -1) {
      const typedDomain = value.slice(atIndex + 1).toLowerCase()
      const filtered = typedDomain
        ? domains.filter((domain) => domain.startsWith(typedDomain))
        : domains
      setFilteredDomains(filtered)
      setSelectedIndex(filtered.length > 0 ? 0 : -1)
      if (filtered.length > 0) {
        const remainder = filtered[0].slice(typedDomain.length)
        setGhost(remainder)
      } else {
        setGhost('')
      }
    } else {
      setGhost('')
      setFilteredDomains([])
      setSelectedIndex(-1)
    }
  }, [value])

  useEffect(() => {
    if (hiddenSpanRef.current) {
      setOffset(hiddenSpanRef.current.offsetWidth)
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setFilteredDomains([])
        setSelectedIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const completeSuggestion = (domain: string) => {
    const atIndex = value.indexOf('@')
    if (atIndex !== -1) {
      const username = value.slice(0, atIndex)
      const newValue = `${username}@${domain}`
      setValue(newValue)
      setFilteredDomains([])
      setGhost('')
      setSelectedIndex(-1)
      onChange && onChange(newValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredDomains.length > 0) {
      if (e.key === 'Tab' && ghost) {
        e.preventDefault()
        completeSuggestion(filteredDomains[0])
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < filteredDomains.length - 1 ? prev + 1 : 0
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredDomains.length - 1
        )
      } else if (e.key === 'Enter' && selectedIndex !== -1) {
        e.preventDefault()
        completeSuggestion(filteredDomains[selectedIndex])
      }
    } else {
      onKeyDown && onKeyDown(e)
    }
  }

  const handleSuggestionClick = (domain: string) => {
    completeSuggestion(domain)
  }

  const handleBlur = () => {
    setGhost('')
    setFilteredDomains([])
    setSelectedIndex(-1)
    onBlur && onBlur()
  }

  const dropdownOpen = filteredDomains.length > 0

  const leftPos = Math.min(offset + 8, containerWidth - 16)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange && onChange(e.target.value)
  }

  return (
    <S.Wrapper ref={wrapperRef}>
      <S.InputContainer>
        <S.GhostText style={{ left: `${leftPos}px` }}>{ghost}</S.GhostText>
        <S.InputStyled
          type="email"
          placeholder="Digite seu email"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          $dropdownOpen={dropdownOpen}
        />
        <S.HiddenSpan ref={hiddenSpanRef}>{value}</S.HiddenSpan>
      </S.InputContainer>

      {dropdownOpen && (
        <S.SuggestionsList>
          {filteredDomains.map((domain, index) => (
            <S.SuggestionItem
              key={domain}
              $isSelected={index === selectedIndex}
              onMouseDown={(e) => {
                e.preventDefault()
                handleSuggestionClick(domain)
              }}
            >
              {value.split('@')[0]}@{domain}
            </S.SuggestionItem>
          ))}
        </S.SuggestionsList>
      )}
      {$error && <ErrorMessage $error={$error} />}
    </S.Wrapper>
  )
}
