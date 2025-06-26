import { useEffect, useRef, useState } from 'react'

import Input, { InputProps } from '@/components/inputs/Input'

import ErrorMessage from '../../common/ErrorMessage'
import * as S from './styles'

export interface InputEmailProps
  extends Omit<InputProps, 'type' | 'onChange' | 'onBlur' | 'onKeyDown'> {
  showDropdown?: boolean
  onChange?: (value: string) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onBlur?: () => void
  value?: string
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
  label = 'E-mail',
  showDropdown = true,
  error,
  ...props
}: InputEmailProps) {
  const [value, setValue] = useState<string>(initialValue)
  const [isFocused, setIsFocused] = useState(false)
  const [ghost, setGhost] = useState<string>('')

  const [filteredDomains, setFilteredDomains] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const [offset, setOffset] = useState<number>(0)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const hiddenSpanRef = useRef<HTMLSpanElement>(null)

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
      const rect = hiddenSpanRef.current.getBoundingClientRect()
      setOffset(rect.width)
    }
  }, [value])

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setFilteredDomains([])
    setSelectedIndex(-1)
    onBlur && onBlur()
  }

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

  const handleKeyDownInternal = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  const handleChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange && onChange(e.target.value)
  }

  const dropdownOpen = filteredDomains.length > 0 && ghost !== ''

  const leftPos = 13 + offset

  return (
    <>
      <div>
        <S.Wrapper ref={wrapperRef}>
          <Input
            type="email"
            inputMode="email"
            value={value}
            onChange={handleChangeInternal}
            onKeyDown={handleKeyDownInternal}
            onFocus={handleFocus}
            onBlur={handleBlur}
            label={label}
            placeholder={isFocused ? 'Digite seu e-mail' : ''}
            showErrorMessage={false}
            error={error}
            {...props}
          />
          <S.InputContainer>
            <S.GhostText style={{ left: `${leftPos}px` }}>{ghost}</S.GhostText>
            <S.HiddenSpan ref={hiddenSpanRef}>{value}</S.HiddenSpan>
          </S.InputContainer>
          {dropdownOpen && showDropdown && (
            <S.SuggestionsList>
              {filteredDomains.map((domain, index) => (
                <S.SuggestionItem
                  key={domain}
                  $isSelected={index === selectedIndex}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    completeSuggestion(domain)
                  }}
                >
                  {value.split('@')[0]}@{domain}
                </S.SuggestionItem>
              ))}
            </S.SuggestionsList>
          )}
        </S.Wrapper>
        {error && <ErrorMessage error={error} />}
      </div>
    </>
  )
}
