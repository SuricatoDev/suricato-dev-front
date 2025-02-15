import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import { ProfileStackScreen } from '@navigation/ProfileStack';
import { useTheme } from 'styled-components/native';
import { Home } from '@screens/Home';

function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text variant='headlineMedium'>Busca</Text>
    </View>
  );
}

function TripsScreen() {
  return (
    <View style={styles.container}>
      <Text variant='headlineMedium'>Viagens</Text>
    </View>
  );
}

export default function NavigationBar() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Inicio', focusedIcon: 'home' },
    { key: 'search', title: 'Busca', focusedIcon: 'magnify' },
    { key: 'trips', title: 'Viagens', focusedIcon: 'receipt' },
    { key: 'profileStack', title: 'Perfil', focusedIcon: 'account' },
  ]);

  const theme = useTheme();

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    search: SearchScreen,
    trips: TripsScreen,
    profileStack: ProfileStackScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }} // Não passamos o key diretamente aqui
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor={theme.COLORS.base_dark88}
      inactiveColor={theme.COLORS.base_dark32}
      barStyle={{ backgroundColor: theme.COLORS.WHITE_100 }}
      theme={{
        colors: { secondaryContainer: theme.COLORS.ORANGE_100 },
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
