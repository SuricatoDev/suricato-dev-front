import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '@screens/Home';
import { AuthScreen } from '@screens/AuthScreen';
import { Products } from '@screens/Products';
import { AccountSettings } from '@screens/AccountSettings';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" title="Home" component={Home} />
      <Screen name="AuthScreen" title="AuthScreen" component={AuthScreen} />
      <Screen name="Products" title="Products" component={Products} />
      <Screen name="AccountSettings" title="AccountSettings" component={AccountSettings} />
    </Navigator>
  );
}
