import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { defaultNavigationOptions } from '@routes/navigationConfig';
import { AccountSettings } from '@screens/AccountSettings';
import { AccessInfo } from '@screens/AccountSettings/AccessInfo';
import { PersonalInfo } from '@screens/AccountSettings/PersonalInfo';

const AccountSettingsStackNavigator = createNativeStackNavigator();

export function AccountSettingsStack() {
  return (
    <AccountSettingsStackNavigator.Navigator>
      <AccountSettingsStackNavigator.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={defaultNavigationOptions}
      />
      <AccountSettingsStackNavigator.Screen
        name="AccessInfo"
        component={AccessInfo}
        options={defaultNavigationOptions}
      />
      <AccountSettingsStackNavigator.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={defaultNavigationOptions}
      />
    </AccountSettingsStackNavigator.Navigator>
  );
}
