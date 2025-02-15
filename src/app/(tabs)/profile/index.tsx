import { ListItem } from '@/components/ListItem';
import { AvatarIcon } from '@/components/AvatarIcon';

import * as S from '@/styles/(tabs)/profile/index';
import { Divider } from '@/components/Divider';
import { usePathname, useRouter } from 'expo-router';
import { Container } from '@/styles/global';

export default function Profile() {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <Container>
      <AvatarIcon name='Paulo Silva' />
      <S.LastConfigs>
        <ListItem
          title='Dados da conta'
          subtitle='Minhas informações da conta'
          onPress={() => {
            router.push(`${currentPath}/account-settings`);
          }}
        />
        <Divider />
        <ListItem
          title='Configurações'
          subtitle='Notificações, idioma, privacidade'
          onPress={function (): void {
            console.error('Function not implemented.');
          }}
        />
        <Divider />

        <ListItem
          title='Segurança'
          subtitle='Configurações de segurança'
          onPress={function (): void {
            console.error('Function not implemented.');
          }}
        />
        <Divider />
        <ListItem
          title='Sugerir excursões'
          subtitle='Sugerir excursões para a comunidade'
          onPress={function (): void {
            console.error('Function not implemented.');
          }}
        />
        <Divider />
        <ListItem
          title='Ajuda'
          subtitle='Precisa de ajuda?'
          onPress={function (): void {
            console.error('Function not implemented.');
          }}
        />
      </S.LastConfigs>
    </Container>
  );
}
