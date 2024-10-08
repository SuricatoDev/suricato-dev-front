import { useEffect } from 'react';
import { View, BackHandler, Linking } from 'react-native';

import { useFormContext } from '@contexts/SignUpContext';

import { Button } from '@components/Button';
import { Step1, Step2, Step3PF, Step3PJ, Step4PF, Step4PJ } from './steps';

import * as S from './styles';

interface SignupFormProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export function SignupForm({ currentStep, setCurrentStep }: SignupFormProps) {
  const { formData, validation } = useFormContext();

  useEffect(() => {
    const backAction = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [currentStep, setCurrentStep]);

  const nextStep = () => {
    if (validation[currentStep]) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <View>
      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && formData.userType === 'PF' && <Step3PF />}
      {currentStep === 3 && formData.userType === 'PJ' && <Step3PJ />}
      {currentStep === 4 && formData.userType === 'PF' && <Step4PF />}
      {currentStep === 4 && formData.userType === 'PJ' && <Step4PJ />}

      <S.ButtonContainer>
        {currentStep < 4 && (
          <Button fullWidth onPress={nextStep} disabled={!validation[currentStep]}>
            Próximo
          </Button>
        )}
        {currentStep === 4 && (
          <Button
            fullWidth
            onPress={() => {
              /* POST para o BD */
            }}
            disabled={!validation[currentStep]}
          >
            Finalizar Cadastro
          </Button>
        )}
      </S.ButtonContainer>

      {currentStep === 1 && (
        <S.TjContainer>
          <S.TjText>
            Ao se cadastrar, você aceita nossos{' '}
            <S.LinkText onPress={() => Linking.openURL('https://examplo.com/termos')}>Termos de Uso</S.LinkText> e nossa{' '}
            <S.LinkText onPress={() => Linking.openURL('https://examplo.com/politica')}>
              Política de Privacidade
            </S.LinkText>
            .
          </S.TjText>
        </S.TjContainer>
      )}
    </View>
  );
}
