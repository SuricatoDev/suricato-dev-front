import { useNavigation } from '@react-navigation/native';
import * as S from './styles';
import { ListItem } from '@components/ListItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import { AvatarIcon } from '@components/AvatarIcon';
import { ROUTES } from '@routes/navigationConfig';

export function Profile() {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleAccountSettings() {
    navigation.navigate(ROUTES.ACCOUNT_SETTINGS_STACK, {
      screen: ROUTES.ACCOUNT_SETTINGS
    });
  }

  return (
    <S.Container>
      <AvatarIcon name="Paulo Silva" />
      <S.LastConfigs>
        <ListItem
          title="Dados da conta"
          subtitle="Minhas informações da conta"
          icon={<Icon name="account-circle-outline" size={20} color={theme.COLORS.GRAY_400} />}
          onPress={handleAccountSettings}
        />

        <ListItem
          title="Configurações"
          subtitle="Notificações, idioma, privacidade"
          icon={<Icon name="cog-outline" size={20} color={theme.COLORS.GRAY_400} />}
          onPress={function (): void {
            console.error('Function not implemented.');
          }}
        />
        <ListItem
          title="Segurança"
          subtitle="Configurações de segurança"
          icon={<Icon name="shield-account-outline" size={20} color={theme.COLORS.GRAY_400} />}
          onPress={function (): void {
            console.error('Function not implemented.');
          }}
        />
        <ListItem
          title="Sugerir excursões"
          subtitle="Sugerir excursões para a comunidade"
          icon={<Icon name="wallet-travel" size={20} color={theme.COLORS.GRAY_400} />}
          onPress={function (): void {
            console.error('Function not implemented.');
          }}
        />
        <ListItem
          title="Ajuda"
          subtitle="Precisa de ajuda?"
          icon={<Icon name="help-circle-outline" size={20} color={theme.COLORS.GRAY_400} />}
          onPress={function (): void {
            console.error('Function not implemented.');
          }}
        />
      </S.LastConfigs>
    </S.Container>
  );
}
