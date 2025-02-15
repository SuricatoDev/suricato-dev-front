import React from 'react';
import * as S from './styles';
import { StepHeader } from '../StepHeader';

type HeaderProps = {
  isLogin: boolean;
  currentStep: number;
};

export function Header({ isLogin, currentStep }: HeaderProps) {
  return (
    <S.Header>
      <S.Logo source={require('@/assets/images/logo-white.png')} />
      {isLogin ? (
        <>
          <S.Title>Comece aqui</S.Title>
          <S.Subtitle>Crie uma conta ou faça login para explorar</S.Subtitle>
        </>
      ) : (
        <StepHeader currentStep={currentStep} steps={4} />
      )}
    </S.Header>
  );
}
