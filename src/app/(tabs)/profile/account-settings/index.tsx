import { ListItem } from '@/components/ListItem';
import { SingleHeader } from '@/components/SingleHeader';
import * as S from '@/styles/global';
import { usePathname, useRouter } from 'expo-router';

export default function AccountSettings() {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <S.Container>
      <SingleHeader title='Dados da Conta' />
      <ListItem
        title='Informações pessoais'
        subtitle='Nome completo e CPF'
        onPress={() => {
          console.log('Navegar para informações pessoais');
          router.push(`${currentPath}/personal-info`);
        }}
      />
      <ListItem
        title='Informações de acesso'
        subtitle='Dados de contato e acesso a sua conta'
        onPress={() => {
          console.log('Navegar para informações de acesso');
          router.push(`${currentPath}/access-info`);
        }}
      />
      <ListItem
        title='Publicidade'
        subtitle='Gerenciar permissão'
        onPress={() => {
          console.log('Gerenciar permissão de publicidade');
        }}
      />
    </S.Container>
  );
}
