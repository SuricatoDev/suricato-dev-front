import React from 'react';
import { Alert } from 'react-native';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import googleIcon from '@/assets/images/google-icon.png';
import facebookIcon from '@/assets/images/facebook-icon.png';
import { SocialButton } from '../SocialButton';
import * as S from './styles';
import { signIn } from '@/configs/signin';

const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

let GoogleSignin: { configure: any; hasPlayServices: any; signIn: any };
if (!isExpoGo) {
  GoogleSignin = require('@react-native-google-signin/google-signin').GoogleSignin;
} else {
  GoogleSignin = {
    configure: () => console.warn('GoogleSignin não está disponível no Expo Go.'),
    hasPlayServices: async () => false,
    signIn: async () => {
      console.warn('GoogleSignin não está disponível no Expo Go.');
      return {};
    },
  };
}

if (!isExpoGo) {
  const webClientId = Constants.expoConfig?.extra?.WEB_CLIENT_ID;
  GoogleSignin.configure({
    webClientId,
    scopes: ['profile', 'email'],
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });
}

export function SocialButtonsContainer() {
  const handleGoogleLogin = async () => {
    console.log('Login com Google 2');
    if (isExpoGo) {
      Alert.alert('Indisponível', 'Google Signin não está disponível no Expo Go.');
      return;
    }
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google login sucesso:', userInfo);
      signIn();
    } catch (error) {
      console.error('Erro no login com Google:', error);
      Alert.alert('Erro', 'Falha ao fazer login com Google');
    }
  };

  const handleFacebookLogin = () => {
    console.log('Login com Facebook');
  };

  return (
    <S.Wrapper>
      <SocialButton icon={facebookIcon} text='Facebook' onPress={handleFacebookLogin} />
      <SocialButton icon={googleIcon} text='Google' onPress={handleGoogleLogin} />
    </S.Wrapper>
  );
}
