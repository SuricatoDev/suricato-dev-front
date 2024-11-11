import { Heading } from '@components/Heading';
import * as S from './styles';
import { SingleHeader } from '@components/SingleHeader';
import { InfoTextWithButton } from '@components/infoTextWithButton';
import { Divider } from 'react-native-paper';
import { Button } from '@components/Button';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@hooks/store';

export function AccessInfo() {
  const navigation = useNavigation();
  const phone = useAppSelector(state => state.user.phone);

  const handleEditAccessInfo = () => {
    navigation.navigate('EditAccessInfo');
  };
  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir conta',
      'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Exclusão cancelada'),
          style: 'cancel'
        },
        {
          text: 'Excluir',
          onPress: () => {
            console.log('Conta excluída');
            navigation.navigate('Home');
          },
          style: 'destructive'
        }
      ],
      { cancelable: true }
    );
  };
  return (
    <>
      <S.Container>
        <SingleHeader title="Informações de acesso" />
        <Heading
          title="Dados de acesso"
          subtitle="Estes dados são a sua forma de acesso ao Excursionistas. Seu e-mail não pode ser alterado, porque é a informação principal de acesso à sua conta"
        />
        <InfoTextWithButton onPress={handleEditAccessInfo} title="E-mail" subtitle="paulo@gmail.com" disabled />
        <InfoTextWithButton onPress={handleEditAccessInfo} title="Telefone" subtitle={`${phone}`} />
        <S.Spacing>
          <Divider />
        </S.Spacing>
        <Heading title="Dados de contato" subtitle="Estes dados servem para acompanhar suas excursões e promoções" />
        <InfoTextWithButton title="Telefone" subtitle="(15) 99123-4567" />
        <S.Spacing>
          <Divider />
        </S.Spacing>
        <Button onPress={handleDeleteAccount} type="ATTENTION">
          EXCLUIR CONTA
        </Button>
      </S.Container>
    </>
  );
}
