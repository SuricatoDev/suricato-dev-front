import React, { useState, useEffect, InputHTMLAttributes, useRef } from 'react'
import Input from '@/components/common/Input'
import * as S from './styles'
import { ErrorIcon, ValidIcon } from '../Icons'
import { Eye } from '@phosphor-icons/react/dist/ssr/Eye'
import { EyeSlash } from '@phosphor-icons/react/dist/ssr/EyeSlash'
import { checkPasswordStrength } from '@/utils/validations'
import ErrorMessage from '../ErrorMessage'

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  userName?: string
  userEmail?: string
  $error?: string
  $showErrorMessage?: boolean
  $showStrengthMeter?: boolean
  label?: string
}

export default function InputPassword({
  value,
  onChange,
  userName,
  userEmail,
  label,
  $error,
  $showErrorMessage = false,
  $showStrengthMeter = true,
  ...rest
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState(false)
  const [hasMinLength, setHasMinLength] = useState(false)
  const [hasNumberOrSymbol, setHasNumberOrSymbol] = useState(false)
  const [notContainsUserData, setNotContainsUserData] = useState(true)

  
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!value || !$showStrengthMeter) return

    const result = checkPasswordStrength(value, userName, userEmail)
    setStrength(result)

    setHasMinLength(value.length >= 8)
    setHasNumberOrSymbol(/\d|[!@#$%^&*(),.?":{}|<>]/.test(value))

    let containsUserData = false
    if (userName && value.toLowerCase().includes(userName.toLowerCase())) {
      containsUserData = true
    }
    if (userEmail) {
      const emailPart = userEmail.split('@')[0]
      if (value.toLowerCase().includes(emailPart.toLowerCase())) {
        containsUserData = true
      }
    }
    setNotContainsUserData(!containsUserData)
  }, [value, userName, userEmail, $showStrengthMeter])

  const toggleShowPassword = () => {
    if (inputRef.current) {
      const selectionStart = inputRef.current.selectionStart
      const selectionEnd = inputRef.current.selectionEnd

      setShowPassword((prev) => !prev)

      setTimeout(() => {
        if (
          inputRef.current &&
          selectionStart !== null &&
          selectionEnd !== null
        ) {
          inputRef.current.setSelectionRange(selectionStart, selectionEnd)
        }
      }, 0)
    } else {
      setShowPassword((prev) => !prev)
    }
  }

  return (
    <>
      <div>
        <S.Wrapper>
          <Input
            {...rest}
            ref={inputRef}
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={(e) => onChange?.(e)}
            $error={$error}
            $showErrorMessage={$showErrorMessage}
            label={label ?? 'Senha'}
            $largePaddingRight
          />
          <S.ToggleButton
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleShowPassword}
          >
            {showPassword ? <Eye size={28} /> : <EyeSlash size={28} />}
          </S.ToggleButton>
        </S.Wrapper>
        {$showErrorMessage && $showStrengthMeter && $error && (
          <ErrorMessage $error={$error} />
        )}
      </div>
      {$showStrengthMeter && value && (
        <S.Requirements>
          <S.Validation $isValid={strength}>
            {strength ? <ValidIcon /> : <ErrorIcon />}
            {`Força da senha: ${strength ? 'boa' : 'fraca'}`}
          </S.Validation>

          {!strength && (
            <>
              <S.Validation $isValid={hasMinLength}>
                {!hasMinLength ? <ErrorIcon /> : <ValidIcon />}
                <p>Pelo menos 8 caracteres</p>
              </S.Validation>
              <S.Validation $isValid={hasNumberOrSymbol}>
                {!hasNumberOrSymbol ? <ErrorIcon /> : <ValidIcon />}
                Contém um número ou símbolo
              </S.Validation>
              <S.Validation $isValid={notContainsUserData}>
                {!notContainsUserData ? <ErrorIcon /> : <ValidIcon />}
                Não pode conter seu nome nem seu endereço de email
              </S.Validation>
            </>
          )}
        </S.Requirements>
      )}
    </>
  )
}
