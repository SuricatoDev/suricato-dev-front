import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProfileStackScreen } from 'src/navigation/Profile';
import { useTheme } from 'styled-components/native';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Inicio</Text>
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Busca</Text>
    </View>
  );
}

function TripsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Viagens</Text>
    </View>
  );
}

export default function NavigationBar() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'home',
      title: 'Inicio',
      focusedIcon: ({ color, size }: { color: string; size: number }) => <Icon name="home" size={size} color={color} />
    },
    {
      key: 'search',
      title: 'Busca',
      focusedIcon: ({ color, size }: { color: string; size: number }) => (
        <Icon name="magnify" size={size} color={color} />
      )
    },
    {
      key: 'trips',
      title: 'Viagens',
      focusedIcon: ({ color, size }: { color: string; size: number }) => (
        <Icon name="receipt" size={size} color={color} />
      )
    },
    {
      key: 'profileStack',
      title: 'Perfil',
      focusedIcon: ({ color, size }: { color: string; size: number }) => (
        <Icon name="account" size={size} color={color} />
      )
    }
  ]);

  const theme = useTheme();

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    search: SearchScreen,
    trips: TripsScreen,
    profileStack: ProfileStackScreen
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor={theme.COLORS.GRAY_400}
      inactiveColor={theme.COLORS.GRAY_300}
      barStyle={{
        backgroundColor: theme.COLORS.WHITE_100
      }}
      theme={{ colors: { secondaryContainer: theme.COLORS.ORANGE_100 } }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
