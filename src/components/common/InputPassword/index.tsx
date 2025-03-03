import React, { useState, useEffect, InputHTMLAttributes } from 'react'
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
}

export default function InputPassword({
  value,
  onChange,
  userName,
  userEmail,
  $error,
  $showErrorMessage,
  ...rest
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState(false)

  const [hasMinLength, setHasMinLength] = useState(false)
  const [hasNumberOrSymbol, setHasNumberOrSymbol] = useState(false)
  const [notContainsUserData, setNotContainsUserData] = useState(true)

  useEffect(() => {
    const pwd = value ?? ''
    const result = checkPasswordStrength(pwd, userName, userEmail)
    setStrength(result)

    setHasMinLength(pwd.length >= 8)
    setHasNumberOrSymbol(/\d|[!@#$%^&*(),.?":{}|<>]/.test(pwd))

    let containsUserData = false
    if (userName && pwd.toLowerCase().includes(userName.toLowerCase())) {
      containsUserData = true
    }
    if (userEmail) {
      const emailPart = userEmail.split('@')[0]
      if (pwd.toLowerCase().includes(emailPart.toLowerCase())) {
        containsUserData = true
      }
    }
    setNotContainsUserData(!containsUserData)
  }, [value, userName, userEmail])

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <>
      <S.Wrapper>
        <Input
          {...rest}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder="Senha"
          $error={$error}
          $showErrorMessage={$showErrorMessage}
        />
        <S.ToggleButton type="button" onClick={toggleShowPassword}>
          {showPassword ? <Eye size={28} /> : <EyeSlash size={28} />}
        </S.ToggleButton>
      </S.Wrapper>

      {value && (
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
      {$error && $showErrorMessage && <ErrorMessage $error={$error} />}
    </>
  )
}
