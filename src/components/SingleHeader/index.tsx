import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import * as S from './styles';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';

type SingleHeaderProps = {
  title: string;
};

export function SingleHeader({ title }: SingleHeaderProps) {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View>
      <S.Container>
        <S.IconContainer>
          <Icon onPress={() => navigation.goBack()} name="chevron-left" color={theme.COLORS.ORANGE_500} size={32} />
        </S.IconContainer>
        <S.Title>{title}</S.Title>
      </S.Container>
    </View>
  );
}
