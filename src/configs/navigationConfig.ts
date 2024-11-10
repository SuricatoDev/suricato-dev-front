// navigationConfig.js

// Constantes com os nomes das rotas para evitar erros de digitação
export const ROUTES = {
  PROFILE_STACK: 'ProfileStackScreen',
  ACCOUNT_SETTINGS_STACK: 'AccountSettingsStackScreen',
  PROFILE: 'Profile',
  ACCOUNT_SETTINGS: 'AccountSettings',
  ACCESS_INFO: 'AccessInfo',
  PERSONAL_INFO: 'PersonalInfo',
  HOME: 'Home',
  SEARCH: 'Search',
  TRIPS: 'Trips'
};

// Configurações padrão de navegação (opcional)
export const defaultNavigationOptions = {
  headerShown: false, // Oculta o header padrão
  animation: 'slide_from_right' // Animação padrão
};

// Temas personalizados de navegação (opcional)
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
