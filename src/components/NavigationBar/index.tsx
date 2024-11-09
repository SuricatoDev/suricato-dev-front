import React from 'react';
import { View, StyleSheet } from 'react-native';

import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import { Profile } from '@screens/Profile';

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          activeColor={theme.COLORS.GRAY_400}
          inactiveColor={theme.COLORS.GRAY_300}
          theme={{ colors: { secondaryContainer: theme.COLORS.ORANGE_100, shadow: '100' } }}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              typeof options.tabBarLabel === 'string'
                ? options.tabBarLabel
                : typeof options.title === 'string'
                  ? options.title
                  : route.name;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Tela Inicial"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          }
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Busca',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="magnify" size={size} color={color} />;
          }
        }}
      />
      <Tab.Screen
        name="Trips"
        component={TripsScreen}
        options={{
          tabBarLabel: 'Viagens',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="receipt" size={size} color={color} />;
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account" size={size} color={color} />;
          }
        }}
      />
    </Tab.Navigator>
  );
}

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

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Settings!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
