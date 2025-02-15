import * as S from './styles';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { IconSymbol } from '../ui/IconSymbol';
import { useRouter } from 'expo-router';

type SingleHeaderProps = {
  title?: string;
};

export function SingleHeader({ title }: SingleHeaderProps) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <View>
      <S.Container>
        <S.IconContainer>
          <TouchableOpacity onPress={() => router.back()}>
            <IconSymbol name='chevron.left' color={theme.COLORS.text_standard} size={32} />
          </TouchableOpacity>
          {/* <Icon
            onPress={() => router.back();}
            name='chevron-left'
            color={theme.COLORS.ORANGE_500}
            size={32}
          /> */}
        </S.IconContainer>
        {title && <S.Title>{title}</S.Title>}
      </S.Container>
    </View>
  );
}
