import * as S from './styles';
import { SingleHeader } from '@components/SingleHeader';
import { ListItem } from '@components/ListItem';
import { useNavigation } from '@react-navigation/native';

export function AccountSettings() {
  const navigation = useNavigation();

  function handlePersonalInfo() {
    navigation.navigate('PersonalInfo');
  }

  function handleAccessInfo() {
    navigation.navigate('AccessInfo');
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
