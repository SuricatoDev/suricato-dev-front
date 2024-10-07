import React from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as S from './styles';
import { Label } from '@components/Label';
import { ErrorText } from '@components/ErrorText';

interface MaskedInputProps extends TextInputProps {
  label: string;
  error?: string;
  touched?: boolean;
  maskType?: any;
}

export function MaskedInput({
  label,
  error,
  touched = false,
  maskType = undefined,
  ...rest
}: MaskedInputProps) {
  const theme = useTheme();

  const isValid = touched && !error;

  return (
    <S.Container>
      <Label>{label}</Label>
      <S.StyledMaskInput
        mask={maskType}
        hasError={!!error}
        isValid={isValid}
        placeholderTextColor={theme.COLORS.GRAY_200}
        {...rest}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </S.Container>
  );
}
