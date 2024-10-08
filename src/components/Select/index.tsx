import React from 'react';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import { useTheme } from 'styled-components/native';
import { CaretDown } from 'phosphor-react-native';
import * as S from './styles';
import { Label } from '@components/Label';
import { ErrorText } from '@components/ErrorText';

interface SelectProps extends PickerSelectProps {
  label: string;
  error?: string;
  touched?: boolean;
}

export function Select({
  label,
  value,
  onValueChange,
  items,
  error,
  touched = false,
  placeholder,
  ...rest
}: SelectProps) {
  const theme = useTheme();
  const isValid = touched && !error;
  const hasError = !!error;

  return (
    <S.Container>
      <Label>{label}</Label>
      <S.StyledPickerContainer>
        <RNPickerSelect
          value={value}
          onValueChange={onValueChange}
          items={items}
          placeholder={placeholder}
          Icon={() => <CaretDown size={20} color={isValid ? theme.COLORS.GRAY_600 : theme.COLORS.GRAY_300} />}
          style={S.pickerStyle(theme, hasError, isValid)}
          useNativeAndroidPickerStyle={false}
          {...rest}
        />
      </S.StyledPickerContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </S.Container>
  );
}
