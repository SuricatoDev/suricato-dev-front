import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '@screens/Home';
import { AuthScreen } from '@screens/AuthScreen';
import { Products } from '@screens/Products';
import { AccountSettings } from '@screens/AccountSettings';
import { PersonalInfo } from '@screens/AccountSettings/PersonalInfo';
import { AccessInfo } from '@screens/AccountSettings/AccessInfo';
import { defaultNavigationOptions } from './navigationConfig';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={defaultNavigationOptions}>
      <Screen name="Home" component={Home} />
      <Screen name="AuthScreen" component={AuthScreen} />
      <Screen name="Products" component={Products} />
      <Screen name="AccountSettings" component={AccountSettings} />
      <Screen name="PersonalInfo" component={PersonalInfo} />
      <Screen name="AccessInfo" component={AccessInfo} />
    </Navigator>
  );
}
