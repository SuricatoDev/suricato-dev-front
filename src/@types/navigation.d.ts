// navigation.d.ts
export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      AuthScreen: undefined;
      Products: undefined;
      AccountSettings: undefined;
      PersonalInfo: undefined;
      AccessInfo: undefined;
      AccountSettingsStack: {
        screen?: 'AccountSettings' | 'AccessInfo' | 'PersonalInfo';
      };
      ProfileStack: undefined;
    }
  }
}
