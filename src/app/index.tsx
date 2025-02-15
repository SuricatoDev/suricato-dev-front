import { ImageBackground, Text } from 'react-native';
import logoImg from '@/assets/images/logo-white.png';
import backgroundImg from '@/assets/images/background.png';
import * as S from '@/styles';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth');
  };

  return (
    <ImageBackground source={backgroundImg} style={{ flex: 1 }} resizeMode='cover'>
      <S.Container>
        <S.Header>
          <S.Logo source={logoImg} />
          <Button mode='contained' onPress={handleLogin}>
            Entrar
          </Button>
        </S.Header>

        <S.Content>
          <Text style={{ textAlign: 'center' }}>
            <S.HighlightText>Sua</S.HighlightText>
            <S.MainText> melhor experiência </S.MainText>
            <S.HighlightText>a um clique de distância</S.HighlightText>
          </Text>
        </S.Content>
        <S.CtaContainer>
          <Button
            fullWidth
            mode='contained'
            contentStyle={{ flexDirection: 'row-reverse' }}
            icon='chevron-right'
            onPress={() => {
              router.push('/(tabs)');
            }}
          >
            Explorar Caravanas
          </Button>
        </S.CtaContainer>
      </S.Container>
    </ImageBackground>
  );
}
