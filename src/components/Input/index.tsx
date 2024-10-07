import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as S from './styles';
import { Label } from '@components/Label';
import { ErrorText } from '@components/ErrorText';

interface InputProps extends TextInputProps {
  inputRef?: React.RefObject<TextInput>;
  label?: string;
  editable?: boolean;
  touched?: boolean;
  error?: string;
}

export function Input({
  inputRef,
  label,
  editable = true,
  touched = false,
  error,
  ...rest
}: InputProps) {
  const { COLORS } = useTheme();

  const isValid = touched && !error;

  return (
    <S.Container>
      {label && <Label>{label}</Label>}
      <S.TextInputStyle
        ref={inputRef}
        placeholderTextColor={COLORS.GRAY_200}
        editable={editable}
        hasError={!!error}
        isValid={isValid}
        {...rest}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </S.Container>
  );
}
