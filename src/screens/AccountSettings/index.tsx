import * as S from './styles';
import { SingleHeader } from '@components/SingleHeader';
import { ListItem } from '@components/ListItem';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/navigationConfig';

export function AccountSettings() {
  const navigation = useNavigation();

  function handlePersonalInfo() {
    navigation.navigate(ROUTES.ACCOUNT_SETTINGS_STACK, {
      screen: ROUTES.PERSONAL_INFO
    });
  }

  function handleAccessInfo() {
    navigation.navigate(ROUTES.ACCOUNT_SETTINGS_STACK, {
      screen: ROUTES.ACCESS_INFO
    });
  }
  return (
    <>
      <S.Container>
        <SingleHeader title="Dados da Conta" />
        <ListItem title="Informações pessoais" subtitle="Nome completo e CPF" onPress={handlePersonalInfo} />
        <ListItem
          title="Informações de acesso"
          subtitle="Dados de contato e acesso a sua conta"
          onPress={handleAccessInfo}
        />
        <ListItem
          title="Publicidade"
          subtitle="Gerenciar permissão"
          onPress={function (): void {
            console.error('Function not implemented.');
          }}
        />
      </S.Container>
    </>
  );
}
