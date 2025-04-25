import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'

import { checkPasswordStrength } from '@/utils/validations'

import { Eye } from '@phosphor-icons/react/dist/ssr/Eye'
import { EyeSlash } from '@phosphor-icons/react/dist/ssr/EyeSlash'

import Input from '@/components/common/Input'

import { ErrorIcon, ValidIcon } from '../Icons'
import * as S from './styles'

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  userName?: string
  userEmail?: string
  $error?: string
  $showErrorMessage?: boolean
  $showStrengthMeter?: boolean
  label?: string
  showPassword?: boolean
  onToggleShow?: () => void
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
  showPassword: controlledShow,
  onToggleShow,
  ...rest
}: PasswordInputProps) {
  const [internalShow, setInternalShow] = useState(false)
  const showPassword = controlledShow ?? internalShow

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
  }, [value, userName, userEmail, $showStrengthMeter])

  const toggleShowPassword = () => {
    if (onToggleShow) {
      onToggleShow()
    } else {
      setInternalShow((prev) => !prev)
    }

    if (inputRef.current) {
      const { selectionStart, selectionEnd } = inputRef.current
      setTimeout(() => {
        inputRef.current?.setSelectionRange(selectionStart!, selectionEnd!)
      }, 0)
    }
  }

  return (
    <>
      <S.Wrapper>
        <Input
          {...rest}
          ref={inputRef}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
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

      {$showStrengthMeter && value && (
        <S.Requirements>
          <S.Validation $isValid={strength}>
            {strength ? <ValidIcon /> : <ErrorIcon />}
            Força da senha: {strength ? 'boa' : 'fraca'}
          </S.Validation>

          {!strength && (
            <>
              <S.Validation $isValid={hasMinLength}>
                {hasMinLength ? <ValidIcon /> : <ErrorIcon />}
                Pelo menos 8 caracteres
              </S.Validation>
              <S.Validation $isValid={hasNumberOrSymbol}>
                {hasNumberOrSymbol ? <ValidIcon /> : <ErrorIcon />}
                Contém um número ou símbolo
              </S.Validation>
              <S.Validation $isValid={notContainsUserData}>
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
