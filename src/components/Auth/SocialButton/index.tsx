import React from 'react';
import { ImageSourcePropType } from 'react-native';
import * as S from './styles';

interface SocialButtonProps {
  icon: ImageSourcePropType;
  text: string;
  onPress: () => void;
}

export function SocialButton({ icon, text, onPress }: SocialButtonProps) {
  return (
    <S.Button onPress={onPress}>
      <S.Icon source={icon} />
      <S.ButtonText>{text}</S.ButtonText>
    </S.Button>
  );
}
