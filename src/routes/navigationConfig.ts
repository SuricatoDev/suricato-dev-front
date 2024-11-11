export const ROUTES = {
  PROFILE_STACK: 'ProfileStack' as const,
  ACCOUNT_SETTINGS_STACK: 'AccountSettingsStack' as const,
  PROFILE: 'Profile' as const,
  ACCOUNT_SETTINGS: 'AccountSettings' as const,
  ACCESS_INFO: 'AccessInfo' as const,
  PERSONAL_INFO: 'PersonalInfo' as const,
  HOME: 'Home' as const,
  SEARCH: 'Search' as const,
  TRIPS: 'Trips' as const
};

export const defaultNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right'
};

export const themeConfig = {
  dark: false,
  colors: {
    primary: '#6200EE',
    background: '#FFFFFF',
    card: '#F8F9FA',
    text: '#000000',
    border: '#E0E0E0'
  }
};
