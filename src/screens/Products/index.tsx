import React from 'react';
import { ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import backgroundImg from '@assets/background.png';
import * as S from './styles';
import NavigationBar from '@components/NavigationBar';

export function Products() {
  const navigation = useNavigation();

  function handleLogin() {
    navigation.navigate('AuthScreen');
  }

  return (
    <ImageBackground source={backgroundImg} style={{ flex: 1 }} resizeMode="cover">
      <NavigationBar />
      <S.Container></S.Container>
    </ImageBackground>
  );
}
