import { TextInputProps, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as S from './styles';
import { Label } from '@components/Label';
import { ErrorText } from '@components/ErrorText';

interface MaskedInputProps extends TextInputProps {
  label: string;
  error?: string;
  editable?: boolean;
  touched?: boolean;
  maskType?: any;
}

export function MaskedInput({
  label,
  error,
  touched = false,
  editable = true,
  maskType = undefined,
  ...rest
}: MaskedInputProps) {
  const theme = useTheme();

  const isValid = touched && !error;

  return (
    <View>
      <Label>{label}</Label>
      <S.StyledMaskInput
        mask={maskType}
        hasError={!!error}
        editable={editable}
        isValid={isValid}
        placeholderTextColor={theme.COLORS.base_dark16}
        {...rest}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </View>
  );
}
