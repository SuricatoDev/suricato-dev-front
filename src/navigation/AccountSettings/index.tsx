import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountSettings } from '@screens/AccountSettings';
import { AccessInfo } from '@screens/AccountSettings/AccessInfo';
import { PersonalInfo } from '@screens/AccountSettings/PersonalInfo';

const AccountSettingsStack = createNativeStackNavigator();

export function AccountSettingsStackScreen() {
  return (
    <AccountSettingsStack.Navigator>
      <AccountSettingsStack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{ headerShown: false }}
      />
      <AccountSettingsStack.Screen name="AccessInfo" component={AccessInfo} options={{ headerShown: false }} />
      <AccountSettingsStack.Screen name="PersonalInfo" component={PersonalInfo} options={{ headerShown: false }} />
    </AccountSettingsStack.Navigator>
  );
}
