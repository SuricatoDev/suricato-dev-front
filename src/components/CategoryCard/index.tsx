import { ImageSourcePropType } from 'react-native';
import * as S from './styles';
import { useNavigation } from '@react-navigation/native';

interface CategoryCardProps {
  title: string;
  image: ImageSourcePropType | undefined;
  size: 'lg' | 'md';
  onPress: () => void;
}

export function CategoryCard({ title, image, size = 'lg', onPress }: CategoryCardProps) {
  return (
    <S.Container size={size} onPress={onPress}>
      <S.Title>{title}</S.Title>
      <S.Image source={image} />
    </S.Container>
  );
}
