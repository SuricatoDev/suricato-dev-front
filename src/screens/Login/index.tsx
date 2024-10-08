import React, { useState, useRef } from 'react';
import * as S from './styles';
import { TouchableOpacity, View } from 'react-native';
import { Eye, EyeSlash, Check } from 'phosphor-react-native';
import { Input } from '@components/Input';
import { Label } from '@components/Label';
import { Button } from '@components/Button';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const passwordInputRef = useRef<any>(null);

  return (
    <S.FormContainer>
      <View>
        <Input
          label="Email*"
          keyboardType="email-address"
          placeholder="Email"
          returnKeyType="next"
          autoCapitalize="none"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        <Label>Senha*</Label>
        <S.PasswordField>
          <Input
            placeholder="Senha"
            secureTextEntry={!showPassword}
            inputRef={passwordInputRef}
            returnKeyType="done"
            style={{ flex: 1, paddingRight: 40 }}
          />
          <S.EyeButton onPress={() => setShowPassword(!showPassword)}>
            {!showPassword ? <EyeSlash size={20} color="#A0A0A0" /> : <Eye size={20} color="#A0A0A0" />}
          </S.EyeButton>
        </S.PasswordField>
      </View>
      <S.OptionsContainer>
        <S.RememberMeContainer>
          <S.StyledCheckbox isActive={rememberMe} onPress={() => setRememberMe(!rememberMe)} underlayColor="#e0e0e0">
            <S.CheckboxContent>{rememberMe && <Check size={10} color="#FFFFFF" weight="bold" />}</S.CheckboxContent>
          </S.StyledCheckbox>
          <S.RememberMeText>Lembre-se de mim</S.RememberMeText>
        </S.RememberMeContainer>
        <TouchableOpacity>
          <S.ForgotPasswordText>Esqueceu a senha?</S.ForgotPasswordText>
        </TouchableOpacity>
      </S.OptionsContainer>

      <Button fullWidth>Entrar</Button>
    </S.FormContainer>
  );
}
