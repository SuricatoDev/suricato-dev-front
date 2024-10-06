import React, { forwardRef } from 'react';
import { Text, TextProps } from 'react-native';
import * as S from './styles';

type LabelProps = TextProps;

export const Label = forwardRef<Text, LabelProps>((props, ref) => {
  return <S.Container ref={ref} {...props} />;
});
