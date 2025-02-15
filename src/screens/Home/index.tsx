import { CategoryCard } from '@components/CategoryCard';
import * as S from './styles';
import { categories } from '@constants/categories';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const navigation = useNavigation();

  const handleNavigate = (route: string) => {
    navigation.navigate('Category', { route });
  };

  return (
    <S.Container>
      <S.GreetingMessage>Olá, Paulo</S.GreetingMessage>
      <S.Categories>
        {categories.map((category, index) => (
          <S.CategoryCardWrapper key={index} large={category.size === 'lg'}>
            <CategoryCard
              title={category.title}
              size={index < 2 ? 'lg' : 'md'}
              image={category.image}
              onPress={() => handleNavigate(category.route)}
            />
          </S.CategoryCardWrapper>
        ))}
      </S.Categories>
    </S.Container>
  );
}
