import { useNavigation } from '@react-navigation/native';
import * as S from './styles';
import { useTheme } from 'styled-components/native';
import { SingleHeader } from '@components/SingleHeader';
import NavigationBar from '@components/NavigationBar';

export function AccountSettings() {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleLogin() {
    navigation.navigate('AuthScreen');
  }

  return (
    <>
      <S.Container>
        <SingleHeader title="Dados da Conta" />
      </S.Container>
    </>
  );
}
