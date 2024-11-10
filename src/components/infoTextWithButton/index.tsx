import { View } from 'react-native';
import * as S from './styles';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type InfoTextWithButtonProps = {
  title: string;
  subtitle: string;
  disabled?: boolean;
};

export function InfoTextWithButton({ title, subtitle, disabled = false }: InfoTextWithButtonProps) {
  const theme = useTheme();
  return (
    <S.Container disabled={disabled}>
      <View>
        <S.Title>{title}</S.Title>
        <S.Subtitle disabled={disabled}>{subtitle}</S.Subtitle>
      </View>
      {!disabled && <Icon name="chevron-right" color={theme.COLORS.GRAY_300} size={16} />}
    </S.Container>
  );
}
