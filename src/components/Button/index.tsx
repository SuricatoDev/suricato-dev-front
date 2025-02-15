import React from 'react';
import { ButtonProps } from 'react-native-paper';
import * as S from './styles';
export interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'attention';
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function CustomButton({
  variant = 'primary',
  fullWidth = false,
  disabled,
  ...props
}: CustomButtonProps) {
  return (
    <S.StyledButton variant={variant} fullWidth={fullWidth} disabled={disabled} {...props}>
      {props.children}
    </S.StyledButton>
  );
}
