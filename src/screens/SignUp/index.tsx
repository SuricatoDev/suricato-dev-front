import React, { useState, useEffect } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';

import { Button } from '@components/Button';

import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3PF } from './steps/Step3PF';
import { Step3PJ } from './steps/Step3PJ';
import { Step4PF } from './steps/Step4PF';
import { Step4PJ } from './steps/Step4PJ';

import * as S from './styles';

interface SignupFormProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const SignupForm = ({ currentStep, setCurrentStep }: SignupFormProps) => {
  const [formData, setFormData] = useState({
    userType: '',
    fullName: '',
    gender: '',
    birthDate: '',
    cpf: '',
    phone: '',
    cep: '',
    bairro: '',
    logradouro: '',
    cidade: '',
    uf: '',
    complemento: '',
    numero: '',
    cnpj: '',
    razaoSocial: '',
    nomeFantasia: '',
    email: '',
    password: '',
    confirmPassword: '',
    objective: '',
    telefone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [currentStep, setCurrentStep]);

  const nextStep = () => {
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <View>
      {currentStep === 1 && (
        <Step1
          formData={formData}
          setFormData={(data: Partial<typeof formData>) => setFormData(prev => ({ ...prev, ...data }))}
          onValidate={setIsValid}
          errors={errors}
          setErrors={setErrors}
          goToNextStep={() => setCurrentStep(currentStep + 1)}
        />
      )}

      {currentStep === 2 && (
        <Step2
          formData={formData}
          setFormData={(data: Partial<typeof formData>) => setFormData(prev => ({ ...prev, ...data }))}
          onValidate={setIsValid}
        />
      )}

      {currentStep === 3 && formData.userType === 'PF' && (
        <Step3PF
          formData={formData}
          setFormData={(data: Partial<typeof formData>) => setFormData(prev => ({ ...prev, ...data }))}
          onValidate={setIsValid}
        />
      )}
      {currentStep === 3 && formData.userType === 'PJ' && (
        <Step3PJ
          formData={formData}
          setFormData={(data: Partial<typeof formData>) => setFormData(prev => ({ ...prev, ...data }))}
          onValidate={setIsValid}
        />
      )}

      {currentStep === 4 && formData.userType === 'PF' && (
        <Step4PF
          formData={formData}
          setFormData={(data: Partial<typeof formData>) => setFormData(prev => ({ ...prev, ...data }))}
          onValidate={setIsValid}
        />
      )}
      {currentStep === 4 && formData.userType === 'PJ' && (
        <Step4PJ
          formData={formData}
          setFormData={(data: Partial<typeof formData>) => setFormData(prev => ({ ...prev, ...data }))}
          onValidate={setIsValid}
        />
      )}

      <S.ButtonContainer>
        {currentStep < 4 && (
          <Button fullWidth onPress={nextStep} disabled={!isValid}>
            Próximo
          </Button>
        )}
        {currentStep === 4 && (
          <Button
            fullWidth
            onPress={() => {
              /* aqui vai o POST para o BD */
            }}
          >
            Finalizar Cadastro
          </Button>
        )}
      </S.ButtonContainer>
    </View>
  );
};

export default SignupForm;
