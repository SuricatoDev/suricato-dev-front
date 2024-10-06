import React, { useState, useRef } from 'react';
import * as S from './styles';
import { Eye, EyeSlash } from 'phosphor-react-native';
import { Input } from '@components/Input';
import { Label } from '@components/Label';
import { Button } from '@components/Button';

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordInputRef = useRef<any>(null);
  const confirmPasswordInputRef = useRef<any>(null);

  return (
    <S.FormContainer>
      <Label>Email</Label>
      <Input
        keyboardType="email-address"
        placeholder="Email"
        returnKeyType="next"
        autoCapitalize="none"
        blurOnSubmit={false}
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />

      <Label>Senha</Label>
      <S.PasswordField>
        <Input
          placeholder="Senha"
          secureTextEntry={!showPassword}
          inputRef={passwordInputRef}
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
          style={{ flex: 1, paddingRight: 40 }}
        />
        <S.EyeButton onPress={() => setShowPassword(!showPassword)}>
          {!showPassword ? (
            <EyeSlash size={20} color="#A0A0A0" />
          ) : (
            <Eye size={20} color="#A0A0A0" />
          )}
        </S.EyeButton>
      </S.PasswordField>

      <Label>Confirme sua senha</Label>
      <S.PasswordField>
        <Input
          placeholder="Confirme sua senha"
          secureTextEntry={!showConfirmPassword}
          inputRef={confirmPasswordInputRef}
          returnKeyType="done"
          style={{ flex: 1, paddingRight: 40 }}
        />
        <S.EyeButton
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {!showConfirmPassword ? (
            <EyeSlash size={20} color="#A0A0A0" />
          ) : (
            <Eye size={20} color="#A0A0A0" />
          )}
        </S.EyeButton>
      </S.PasswordField>

      <Button fullWidth>Próximo</Button>
    </S.FormContainer>
  );
}
