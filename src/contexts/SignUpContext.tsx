import { createContext, useState, useContext, PropsWithChildren } from 'react';

interface FormData {
  userType: string;
  fullName: string;
  gender: string;
  birthDate: string;
  cpf: string;
  phone: string;
  cep: string;
  bairro: string;
  logradouro: string;
  cidade: string;
  uf: string;
  complemento: string;
  numero: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  email: string;
  password: string;
  confirmPassword: string;
  objective: string;
  telefone: string;
}

interface FormContextType {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  validation: { [step: number]: boolean };
  setValidation: (step: number, valid: boolean) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
}

const initialFormData: FormData = {
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
};

const FormContext = createContext<FormContextType | undefined>(undefined);

function FormProvider({ children }: PropsWithChildren<{}>) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [validation, setValidationState] = useState<{ [step: number]: boolean }>({
    1: false,
    2: false,
    3: false,
    4: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const setValidation = (step: number, valid: boolean) => {
    setValidationState(prev => ({ ...prev, [step]: valid }));
  };

  return (
    <FormContext.Provider
      value={{ formData, setFormData: updateFormData, validation, setValidation, errors, setErrors }}
    >
      {children}
    </FormContext.Provider>
  );
}

function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext deve ser usado dentro de um FormProvider');
  }
  return context;
}

export { FormProvider, useFormContext };
