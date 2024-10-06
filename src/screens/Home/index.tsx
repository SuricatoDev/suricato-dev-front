import { ImageBackground, Text } from 'react-native';
import { Button } from '@components/Button';
import logoImg from '@assets/logo-white.png';
import backgroundImg from '@assets/background.png';
import * as S from './styles';

export function Home() {
  return (
    <ImageBackground
      source={backgroundImg}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <S.Container>
        <S.Header>
          <S.Logo source={logoImg} />
          <Button type="SECONDARY">Login</Button>
        </S.Header>

        <S.Content>
          <Text style={{ textAlign: 'center' }}>
            <S.HighlightText>Sua</S.HighlightText>
            <S.MainText> melhor experiência </S.MainText>
            <S.HighlightText>a um clique de distância</S.HighlightText>
          </Text>
        </S.Content>
        <S.CtaContainer>
          <Button fullWidth icon="CARET_RIGHT">
            Explorar Caravanas
          </Button>
        </S.CtaContainer>
      </S.Container>
    </ImageBackground>
  );
}
