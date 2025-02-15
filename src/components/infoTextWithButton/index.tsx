import { View } from 'react-native';
import * as S from './styles';
import { useTheme } from 'styled-components/native';
import { IconSymbol } from '../ui/IconSymbol';

export type InfoTextWithButtonProps = {
  title: string;
  subtitle: string;
  disabled?: boolean;
  onPress?: () => void;
};

export function InfoTextWithButton({
  title,
  subtitle,
  disabled = false,
  onPress,
}: InfoTextWithButtonProps) {
  const theme = useTheme();
  return (
    <S.Container disabled={disabled} {...(!disabled && { onPress })}>
      <View>
        <S.Title>{title}</S.Title>
        <S.Subtitle disabled={disabled}>{subtitle}</S.Subtitle>
      </View>

      {!disabled && (
        <IconSymbol name='chevron.right' color={theme.COLORS.text_standard} size={24} />
      )}
    </S.Container>
  );
}
