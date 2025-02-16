import Constants, { ExecutionEnvironment } from 'expo-constants';

let GoogleSignin: any;
let isErrorWithCode: any;
let statusCodes: any;

if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
  GoogleSignin = {
    hasPlayServices: async () => false,
    signIn: async () => {
      console.warn('GoogleSignin não está disponível no Expo Go.');
      return {};
    },
    configure: () => {},
  };
  isErrorWithCode = () => false;
  statusCodes = {
    SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
    IN_PROGRESS: 'IN_PROGRESS',
    PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
  };
} else {
  const googleModule = require('@react-native-google-signin/google-signin');
  GoogleSignin = googleModule.GoogleSignin;
  isErrorWithCode = googleModule.isErrorWithCode;
  statusCodes = googleModule.statusCodes;
}

export const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('Usuário:', userInfo);
  } catch (error: any) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.log('Login cancelado pelo usuário');
          break;
        case statusCodes.IN_PROGRESS:
          console.log('Login em andamento');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('Google Play Services não disponível ou desatualizado');
          break;
        default:
          console.log('Erro desconhecido', error);
      }
    } else {
      console.log('Erro', error);
    }
  }
};
