import { Stack } from 'expo-router';

const AccountSettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'AccountSettings', headerShown: false }} />
      <Stack.Screen name='access-info' options={{ title: 'AccessInfo', headerShown: false }} />
    </Stack>
  );
};

export default AccountSettingsLayout;
