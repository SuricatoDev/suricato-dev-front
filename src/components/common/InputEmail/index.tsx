import { useState, useRef, useEffect, InputHTMLAttributes } from 'react'
import Input from '@/components/common/Input'
import * as S from './styles'
import ErrorMessage from '../ErrorMessage'

interface EmailInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  $error?: string
  label?: string
  showDropdown?: boolean
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
  $error,
  label = 'Email',
  showDropdown = true,
  ...props
}: EmailInputProps) {
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
            placeholder={isFocused ? 'Digite seu email' : ''}
            value={value}
            onChange={handleChangeInternal}
            onKeyDown={handleKeyDownInternal}
            onFocus={handleFocus}
            onBlur={handleBlur}
            label={label}
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
        {$error && <ErrorMessage $error={$error} />}
      </div>
    </>
  )
}
