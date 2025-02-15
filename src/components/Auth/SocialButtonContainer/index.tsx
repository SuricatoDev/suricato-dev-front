import React from 'react';
import googleIcon from '@/assets/images/google-icon.png';
import facebookIcon from '@/assets/images/facebook-icon.png';
import { SocialButton } from '../SocialButton';
import * as S from './styles';

export function SocialButtonsContainer() {
  const handleGoogleLogin = () => {
    console.log('Login com Google');
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
