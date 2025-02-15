import { useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormContext } from '@/contexts/SignUpContext';
import { CustomTextInput } from '@/components/CustomTextInput';
import * as S from './styles';
import { TextInput } from 'react-native-paper';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Por favor, insira um e-mail válido no formato exemplo@dominio.com')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Insira um e-mail válido no formato exemplo@dominio.com'
    )
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não conferem')
    .required('Confirmação de senha é obrigatória'),
});

export function Step1() {
  const { formData, setFormData, errors, setErrors, setValidation } = useFormContext();
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
        setValidation(1, true);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const newErrors: Record<string, string> = {};
          err.inner.forEach((error) => {
            if (error.path) newErrors[error.path] = error.message;
          });
          setErrors(newErrors);
          setValidation(1, false);
        }
      }
    };

    validateFields();
  }, [formData, setErrors]);

  return (
    <S.Container>
      <CustomTextInput
        label='Email*'
        value={formData.email}
        keyboardType='email-address'
        placeholder='exemplo@dominio.com'
        returnKeyType='next'
        autoCapitalize='none'
        blurOnSubmit={false}
        onChangeText={(text) => setFormData({ email: text })}
        onFocus={() => setTouched((prev) => ({ ...prev, email: true }))}
        onSubmitEditing={() => passwordInputRef.current?.focus()}
        hasError={!!touched.email && !!errors.email}
        errorMessage={touched.email ? errors.email : undefined}
      />

      <CustomTextInput
        label='Senha*'
        value={formData.password}
        placeholder='********'
        secureTextEntry={!showPassword}
        returnKeyType='next'
        inputRef={passwordInputRef}
        blurOnSubmit={false}
        onChangeText={(text) => setFormData({ password: text })}
        onFocus={() => setTouched((prev) => ({ ...prev, password: true }))}
        onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
        hasError={!!touched.password && !!errors.password}
        errorMessage={touched.password ? errors.password : undefined}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      <CustomTextInput
        label='Confirme sua senha*'
        value={formData.confirmPassword}
        placeholder='********'
        secureTextEntry={!showConfirmPassword}
        returnKeyType='done'
        inputRef={confirmPasswordInputRef}
        onChangeText={(text) => setFormData({ confirmPassword: text })}
        onFocus={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
        hasError={!!touched.confirmPassword && !!errors.confirmPassword}
        errorMessage={touched.confirmPassword ? errors.confirmPassword : undefined}
        right={
          <TextInput.Icon
            icon={showConfirmPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        }
      />
    </S.Container>
  );
}
