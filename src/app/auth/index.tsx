import { useMemo, useState } from 'react';
import * as S from '@/styles/(auth)/';
import { ImageBackground, ScrollView, Platform, KeyboardAvoidingView, View } from 'react-native';

import backgroundImg from '@/assets/images/background-1.png';
import { LoginForm } from '@/components/Auth/Login';
import React from 'react';
import { Header } from '@/components/Header';
import { SocialButtonsContainer } from '@/components/Auth/SocialButtonContainer';
import { FormProvider } from '@/contexts/SignUpContext';
import { Divider } from '@/components/Divider';
import { SignupForm } from '@/components/Auth/SignUp';
import { useTheme } from 'styled-components/native';

export default function AuthScreen() {
  const theme = useTheme();
  const loginForm = useMemo(() => <LoginForm />, []);
  const [isLogin, setIsLogin] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <View style={{ flex: 1, backgroundColor: theme.COLORS.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps='handled'
          keyboardDismissMode='none'
        >
          <ImageBackground source={backgroundImg} resizeMode='cover'>
            <Header isLogin={isLogin} currentStep={currentStep} />
          </ImageBackground>
          <S.Container>
            <S.Card>
              <S.ToggleButtonContainer>
                <S.ToggleButton isActive={isLogin} onPress={() => setIsLogin(true)}>
                  <S.ToggleButtonText isActive={isLogin}>Login</S.ToggleButtonText>
                </S.ToggleButton>
                <S.ToggleButton isActive={!isLogin} onPress={() => setIsLogin(false)}>
                  <S.ToggleButtonText isActive={!isLogin}>Cadastre-se</S.ToggleButtonText>
                </S.ToggleButton>
              </S.ToggleButtonContainer>
              <S.Wrapper>
                {isLogin ? (
                  <>
                    <SocialButtonsContainer />
                    <Divider text='ou' />
                    {loginForm}
                  </>
                ) : (
                  <FormProvider>
                    <SocialButtonsContainer />
                    <SignupForm currentStep={currentStep} setCurrentStep={setCurrentStep} />
                  </FormProvider>
                )}
              </S.Wrapper>
            </S.Card>
          </S.Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
