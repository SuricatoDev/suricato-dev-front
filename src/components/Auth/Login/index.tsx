import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { CustomTextInput } from '@/components/CustomTextInput';
import Button from '@/components/Button';

import * as S from './styles';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleInputChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isFormValid = () => validateEmail(formState.email) && formState.password.length > 6;

  useEffect(() => {
    setButtonDisabled(!isFormValid());
  }, [formState]);

  return (
    <View>
      <S.Wrapper>
        <CustomTextInput
          label='Email*'
          value={formState.email}
          onChangeText={(text) => handleInputChange('email', text)}
          hasError={!validateEmail(formState.email)}
          errorMessage='Email inválido'
          keyboardType='email-address'
        />

        <CustomTextInput
          label='Senha*'
          value={formState.password}
          onChangeText={(text) => handleInputChange('password', text)}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      </S.Wrapper>

      <S.ForgotPassword>
        <S.ForgotPasswordText>Esqueceu a senha?</S.ForgotPasswordText>
      </S.ForgotPassword>

      <Button disabled={buttonDisabled} fullWidth>
        Entrar
      </Button>
    </View>
  );
}
