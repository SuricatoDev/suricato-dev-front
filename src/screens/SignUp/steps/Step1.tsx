import React, { useRef, useState, useEffect } from 'react';
import * as S from './Step1.styles';
import { Label } from '@components/Label';
import { Input } from '@components/Input';
import { Eye, EyeSlash } from 'phosphor-react-native';
import * as Yup from 'yup';

interface Step1Props {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  setFormData: (data: Partial<Step1Props['formData']>) => void;
  onValidate: (isValid: boolean) => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  goToNextStep: () => void;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('O email é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não conferem')
    .required('Confirmação de senha é obrigatória'),
});

export function Step1({
  formData,
  setFormData,
  onValidate,
  errors,
  setErrors,
  goToNextStep,
}: Step1Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordInputRef = useRef<any>(null);
  const confirmPasswordInputRef = useRef<any>(null);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const validateFields = () => {
      try {
        validationSchema.validateSync(formData, { abortEarly: false });
        setErrors({});
        onValidate(true);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const newErrors: Record<string, string> = {};
          err.inner.forEach(error => {
            if (error.path) newErrors[error.path] = error.message;
          });
          setErrors(newErrors);
          onValidate(false);
        }
      }
    };

    validateFields();
  }, [formData, setErrors, onValidate]);

  return (
    <S.FormContainer>
      <Label>Email</Label>
      <Input
        value={formData.email}
        keyboardType="email-address"
        placeholder="Email"
        returnKeyType="next"
        autoCapitalize="none"
        blurOnSubmit={false}
        onChangeText={text => setFormData({ email: text })}
        onFocus={() => setTouched(prev => ({ ...prev, email: true }))}
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />
      {touched.email && errors.email && (
        <S.ErrorText>{errors.email}</S.ErrorText>
      )}

      <Label>Senha</Label>
      <S.PasswordField>
        <Input
          value={formData.password}
          placeholder="Senha"
          secureTextEntry={!showPassword}
          inputRef={passwordInputRef}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={text => setFormData({ password: text })}
          onFocus={() => setTouched(prev => ({ ...prev, password: true }))}
          onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
          style={{ flex: 1, paddingRight: 40 }}
        />
        <S.EyeButton onPress={() => setShowPassword(!showPassword)}>
          {!showPassword ? (
            <EyeSlash size={20} color="#A0A0A0" />
          ) : (
            <Eye size={20} color="#A0A0A0" />
          )}
        </S.EyeButton>
      </S.PasswordField>
      {touched.password && errors.password && (
        <S.ErrorText>{errors.password}</S.ErrorText>
      )}

      <Label>Confirme sua senha</Label>
      <S.PasswordField>
        <Input
          value={formData.confirmPassword}
          placeholder="Confirme sua senha"
          secureTextEntry={!showConfirmPassword}
          inputRef={confirmPasswordInputRef}
          returnKeyType="done"
          onChangeText={text => setFormData({ confirmPassword: text })}
          onFocus={() =>
            setTouched(prev => ({ ...prev, confirmPassword: true }))
          }
          onSubmitEditing={goToNextStep}
          style={{ flex: 1, paddingRight: 40 }}
        />
        <S.EyeButton
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {!showConfirmPassword ? (
            <EyeSlash size={20} color="#A0A0A0" />
          ) : (
            <Eye size={20} color="#A0A0A0" />
          )}
        </S.EyeButton>
      </S.PasswordField>
      {touched.confirmPassword && errors.confirmPassword && (
        <S.ErrorText>{errors.confirmPassword}</S.ErrorText>
      )}
    </S.FormContainer>
  );
}
