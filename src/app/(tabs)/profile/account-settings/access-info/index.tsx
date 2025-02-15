import { Heading } from '@/components/Heading';
import * as S from '@/styles/(tabs)/profile/accountSettings/accessInfo';
import { SingleHeader } from '@/components/SingleHeader';
import { InfoTextWithButton } from '@/components/infoTextWithButton';
import Button from '@/components/Button';
import { Alert } from 'react-native';
import { useAppSelector } from '@/hooks/store';
import { Divider } from '@/components/Divider';
import { Container } from '@/styles/global';
import { usePathname, useRouter } from 'expo-router';

export default function AccessInfo() {
  const router = useRouter();
  const currentPath = usePathname();
  const phone = useAppSelector((state) => state.user.phoneNumber);

  const handleEditAccessInfo = () => {
    router.push(`${currentPath}/edit`);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir conta',
      'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Exclusão cancelada'),
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            console.log('Conta excluída');
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <Container>
      <S.Wrapper>
        <SingleHeader title='Informações de acesso' />
        <Heading
          title='Dados de acesso'
          subtitle='Estes dados são a sua forma de acesso ao Excursionistas. Seu e-mail não pode ser alterado, porque é a informação principal de acesso à sua conta'
        />
        <InfoTextWithButton
          onPress={handleEditAccessInfo}
          title='E-mail'
          subtitle='paulo@gmail.com'
          disabled
        />
        <InfoTextWithButton onPress={handleEditAccessInfo} title='Telefone' subtitle={`${phone}`} />
        <Divider marginVertical={4} />
        <Heading
          title='Dados de contato'
          subtitle='Estes dados servem para acompanhar suas excursões e promoções'
        />
        <InfoTextWithButton title='Telefone' subtitle='(15) 99123-4567' />
        <Divider marginVertical={4} />
        <Button onPress={handleDeleteAccount} variant='attention'>
          EXCLUIR CONTA
        </Button>
      </S.Wrapper>
    </Container>
  );
}
