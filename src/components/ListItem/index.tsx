import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as S from './styles';

interface SelectProps {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  subtitle?: string;
}

export function ListItem({ title, subtitle, icon, onPress }: SelectProps) {
  const theme = useTheme();

  return (
    <S.Container onPress={onPress}>
      <S.Content>
        <S.IconContainer>{icon}</S.IconContainer>
        <S.InfoContainer>
          <S.Title>{title}</S.Title>
          {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
        </S.InfoContainer>
      </S.Content>
      <Icon name="chevron-right" size={24} color={theme.COLORS.GRAY_300} />
    </S.Container>
  );
}
