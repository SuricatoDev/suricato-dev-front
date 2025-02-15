import { categories } from '@constants/categories';
export declare global {
  namespace ReactNavigation {
    type CategoryRoute = (typeof categories)[number]['route'];
    interface RootParamList {
      WelcomeScreen: undefined;
      AuthScreen: undefined;
      Products: undefined;
      AccountSettings: undefined;
      PersonalInfo: undefined;
      AccessInfo: undefined;
      AccountSettingsStack: {
        screen?: 'AccountSettings' | 'AccessInfo' | 'PersonalInfo';
      };
      ProfileStack: undefined;
      EditAccessInfo: undefined;
      Category: {
        route: CategoryRoute;
      };
    }
  }
}
