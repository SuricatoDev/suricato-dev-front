import { useTheme } from 'styled-components/native';

import * as S from './styles';
import { View } from 'react-native';
import { IconSymbol } from '../ui/IconSymbol';

interface SelectProps {
  title: string;
  icon?: React.ReactNode;
  subtitle?: string;
  onPress: () => void;
}

export function ListItem({ title, subtitle, icon, onPress }: SelectProps) {
  const theme = useTheme();

  return (
    <S.Container onPress={onPress}>
      <S.Content>
        {icon && icon}
        <View>
          <S.Title>{title}</S.Title>
          {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
        </View>
      </S.Content>
      <IconSymbol
        name="chevron.right"
        size={24}
        color={theme.COLORS.text_standard}
      />
    </S.Container>
  );
}
