import { ChangeEvent, useEffect, useState } from 'react'

import { checkPasswordStrength } from '@/utils/validations'

import { ErrorIcon, ValidIcon } from '@/components/common/Icons'
import InputPassword from '@/components/inputs/InputPassword'
import * as S from '@/components/inputs/InputPassword/styles'

export interface PasswordInputWithConfirmationProps {
  newPassword: string
  confirmPassword: string
  onNewPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
  onConfirmPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
  userName: string
  userEmail: string
}

export default function PasswordInputWithConfirmation({
  newPassword,
  confirmPassword,
  onNewPasswordChange,
  onConfirmPasswordChange,
  userName,
  userEmail
}: PasswordInputWithConfirmationProps) {
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [strength, setStrength] = useState(false)
  const [hasMinLength, setHasMinLength] = useState(false)
  const [hasNumberOrSymbol, setHasNumberOrSymbol] = useState(false)
  const [notContainsUserData, setNotContainsUserData] = useState(true)

  useEffect(() => {
    if (!newPassword) {
      setStrength(false)
      setHasMinLength(false)
      setHasNumberOrSymbol(false)
      setNotContainsUserData(true)

      return
    }

    setStrength(checkPasswordStrength(newPassword, userName, userEmail))
    setHasMinLength(newPassword.length >= 8)
    setHasNumberOrSymbol(/\d|[!@#$%^&*(),.?":{}|<>]/.test(newPassword))

    let contains = false
    if (
      userName &&
      newPassword.toLowerCase().includes(userName.toLowerCase())
    ) {
      contains = true
    }
    if (userEmail) {
      const emailPart = userEmail.split('@')[0]
      if (newPassword.toLowerCase().includes(emailPart.toLowerCase())) {
        contains = true
      }
    }
    setNotContainsUserData(!contains)
  }, [newPassword, userName, userEmail])

  const passwordsMatch =
    confirmPassword === '' || newPassword === confirmPassword

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%'
      }}
    >
      <InputPassword
        label="Nova senha"
        placeholder="Digite sua nova senha"
        value={newPassword}
        onChange={onNewPasswordChange}
        userName={userName}
        userEmail={userEmail}
        showStrengthMeter={false}
        showPassword={showNew}
        error={
          newPassword.length !== 0 && (!passwordsMatch || !strength)
            ? 'Senha inválida'
            : undefined
        }
        onToggleShow={() => {
          setShowNew((v) => !v)
        }}
        showErrorMessage={false}
      />
      <div>
        <InputPassword
          label="Confirme a nova senha"
          placeholder="Repita sua nova senha"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          userName={userName}
          userEmail={userEmail}
          showStrengthMeter={false}
          error={
            confirmPassword.length !== 0 && (!passwordsMatch || !strength)
              ? 'Senha inválida'
              : undefined
          }
          showErrorMessage={false}
          showPassword={showConfirm}
          onToggleShow={() => {
            setShowConfirm((v) => !v)
          }}
        />

        {newPassword.length > 0 && (
          <S.Requirements>
            <S.Validation isValid={strength}>
              {strength ? <ValidIcon /> : <ErrorIcon />}
              Força da senha: {strength ? 'Boa' : 'Fraca'}
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

            {!passwordsMatch && (
              <S.Validation isValid={passwordsMatch}>
                <ErrorIcon />
                As senhas devem coincidir
              </S.Validation>
            )}
          </S.Requirements>
        )}
      </div>
    </div>
  )
}
