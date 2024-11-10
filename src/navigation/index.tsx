import { ROUTES, defaultNavigationOptions } from '../configs/navigationConfig';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from '@screens/Profile';
import { AccountSettings } from '@screens/AccountSettings';

const MainStack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <MainStack.Navigator screenOptions={defaultNavigationOptions}>
      <MainStack.Screen name={ROUTES.PROFILE_STACK} component={Profile} />
      <MainStack.Screen name={ROUTES.ACCOUNT_SETTINGS_STACK} component={AccountSettings} />
    </MainStack.Navigator>
  );
}
