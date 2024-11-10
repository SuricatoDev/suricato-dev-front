import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from '@screens/Profile';
import { AccountSettingsStackScreen } from '../AccountSettings';

const ProfileStack = createNativeStackNavigator();

export function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <ProfileStack.Screen
        name="AccountSettingsStack"
        component={AccountSettingsStackScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}
