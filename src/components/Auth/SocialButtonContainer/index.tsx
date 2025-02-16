import React from 'react';
import googleIcon from '@/assets/images/google-icon.png';
import facebookIcon from '@/assets/images/facebook-icon.png';
import { SocialButton } from '../SocialButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as S from './styles';
import { signIn } from '@/configs/signin';
import Constants from 'expo-constants';

const webClientId = Constants.expoConfig?.extra?.WEB_CLIENT_ID;

GoogleSignin.configure({
  webClientId,
  scopes: ['profile', 'email'],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

export function SocialButtonsContainer() {
  const handleGoogleLogin = () => {
    console.log('Login com Google 2');
    signIn();
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
