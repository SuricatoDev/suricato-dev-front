import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from '@screens/Profile';
import { AccountSettingsStack } from './AccountSettingsStack';
import { defaultNavigationOptions } from '@routes/navigationConfig';

const ProfileStack = createNativeStackNavigator();

export function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} options={defaultNavigationOptions} />
      <ProfileStack.Screen
        name="AccountSettingsStack"
        component={AccountSettingsStack}
        options={defaultNavigationOptions}
      />
    </ProfileStack.Navigator>
  );
}
