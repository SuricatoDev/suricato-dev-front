import React, {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useRef,
  useState
} from 'react'

import { checkPasswordStrength } from '@/utils/validations'

import { Eye } from '@phosphor-icons/react/dist/ssr/Eye'
import { EyeSlash } from '@phosphor-icons/react/dist/ssr/EyeSlash'

import { ErrorIcon, ValidIcon } from '@/components/common/Icons'
import Input, { InputProps } from '@/components/inputs/Input'

import * as S from './styles'

export interface InputPasswordProps extends Omit<InputProps, 'type'> {
  value: string
  userName?: string
  userEmail?: string
  showStrengthMeter?: boolean
  showPassword?: boolean
  onToggleShow?: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
}

export default function InputPassword({
  value,
  label = 'Senha',
  userName,
  userEmail,
  showStrengthMeter = true,
  showPassword: controlledShow,
  onToggleShow,
  onChange,
  onBlur,
  ...inputProps
}: InputPasswordProps) {
  const [internalShow, setInternalShow] = useState(false)
  const showPassword = controlledShow ?? internalShow

  const [strength, setStrength] = useState(false)
  const [hasMinLength, setHasMinLength] = useState(false)
  const [hasNumberOrSymbol, setHasNumberOrSymbol] = useState(false)
  const [notContainsUserData, setNotContainsUserData] = useState(true)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!value || !showStrengthMeter) return

    const result = checkPasswordStrength(value, userName, userEmail)
    setStrength(result)
    setHasMinLength(value.length >= 8)
    setHasNumberOrSymbol(/\d|[!@#$%^&*(),.?":{}|<>]/.test(value))

    let contains = false
    if (userName && value.toLowerCase().includes(userName.toLowerCase())) {
      contains = true
    }
    if (userEmail) {
      const emailPart = userEmail.split('@')[0]
      if (value.toLowerCase().includes(emailPart.toLowerCase())) {
        contains = true
      }
    }
    setNotContainsUserData(!contains)
  }, [value, userName, userEmail, showStrengthMeter])

  const toggleShowPassword = () => {
    if (onToggleShow) {
      onToggleShow()
    } else {
      setInternalShow((v) => !v)
    }

    if (inputRef.current) {
      const start = inputRef.current.selectionStart
      const end = inputRef.current.selectionEnd
      setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.setSelectionRange(start!, end!)
      }, 0)
    }
  }

  return (
    <>
      <S.Wrapper>
        <Input
          ref={inputRef}
          type={showPassword ? 'text' : 'password'}
          label={label}
          largePaddingRight
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...inputProps}
        />

        <S.ToggleButton
          tabIndex={-1}
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={toggleShowPassword}
        >
          {showPassword ? <Eye size={28} /> : <EyeSlash size={28} />}
        </S.ToggleButton>
      </S.Wrapper>

      {showStrengthMeter && value && (
        <S.Requirements>
          <S.Validation isValid={strength}>
            {strength ? <ValidIcon /> : <ErrorIcon />}
            Força da senha: {strength ? 'boa' : 'fraca'}
          </S.Validation>

          {!strength && (
            <>
              <S.Validation isValid={hasMinLength}>
                {hasMinLength ? <ValidIcon /> : <ErrorIcon />}
                Pelo menos 8 caracteres
              </S.Validation>
              <S.Validation isValid={hasNumberOrSymbol}>
                {hasNumberOrSymbol ? <ValidIcon /> : <ErrorIcon />}
                Contém um número ou símbolo
              </S.Validation>
              <S.Validation isValid={notContainsUserData}>
                {notContainsUserData ? <ValidIcon /> : <ErrorIcon />}
                Não pode conter seu nome nem seu email
              </S.Validation>
            </>
          )}
        </S.Requirements>
      )}
    </>
  )
}
