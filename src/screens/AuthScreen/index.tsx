import React, { useState } from 'react';
import * as S from './styles';
import {
  Image,
  ImageBackground,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { LoginForm } from '@screens/Login';
import { SignupForm } from '@screens/SignUp';
import backgroundImg from '@assets/background-1.png';
import { Divider } from '@components/Divider';
import { StepHeader } from '@components/StepHeader';

export function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
      >
        <ImageBackground source={backgroundImg} resizeMode="cover">
          <S.Header>
            <S.Logo source={require('@assets/logo-white.png')} />
            {isLogin ? (
              <>
                <S.Title>Comece aqui</S.Title>
                <S.Subtitle>
                  Crie uma conta ou faça login para explorar
                </S.Subtitle>
              </>
            ) : (
              <StepHeader currentStep={1} steps={4} />
            )}
          </S.Header>
        </ImageBackground>
        <S.Container>
          <S.Card>
            <S.ToggleButtonContainer>
              <S.ToggleButton
                isActive={isLogin}
                onPress={() => setIsLogin(true)}
              >
                <S.ToggleButtonText isActive={isLogin}>
                  Login
                </S.ToggleButtonText>
              </S.ToggleButton>
              <S.ToggleButton
                isActive={!isLogin}
                onPress={() => setIsLogin(false)}
              >
                <S.ToggleButtonText isActive={!isLogin}>
                  Cadastre-se
                </S.ToggleButtonText>
              </S.ToggleButton>
            </S.ToggleButtonContainer>

            <S.SocialButtonsContainer>
              <S.SocialButton>
                <Image source={require('@assets/facebook-icon.png')} />
                <S.SocialButtonText>Facebook</S.SocialButtonText>
              </S.SocialButton>
              <S.SocialButton>
                <Image source={require('@assets/google-icon.png')} />
                <S.SocialButtonText>Google</S.SocialButtonText>
              </S.SocialButton>
            </S.SocialButtonsContainer>

            <Divider />

            {isLogin ? <LoginForm /> : <SignupForm />}
          </S.Card>
        </S.Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
