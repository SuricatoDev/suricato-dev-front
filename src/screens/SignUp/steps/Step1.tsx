import { useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import { Eye, EyeSlash } from 'phosphor-react-native';
import * as Yup from 'yup';

import { Label } from '@components/Label';
import { Input } from '@components/Input';

import * as S from './styles';
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
  email: Yup.string()
    .email('Por favor, insira um e-mail válido no formato exemplo@dominio.com')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Insira um e-mail válido no formato exemplo@dominio.com'
    )
    .required('O e-mail é obrigatório'),
  password: Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não conferem')
    .required('Confirmação de senha é obrigatória')
});

export function Step1({ formData, setFormData, onValidate, errors, setErrors, goToNextStep }: Step1Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordInputRef = useRef<any>(null);
  const confirmPasswordInputRef = useRef<any>(null);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false
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
    <S.Container>
      <View>
        <Input
          label="Email*"
          value={formData.email}
          keyboardType="email-address"
          placeholder="exemplo@dominio.com"
          returnKeyType="next"
          autoCapitalize="none"
          blurOnSubmit={false}
          onChangeText={text => setFormData({ email: text })}
          onFocus={() => setTouched(prev => ({ ...prev, email: true }))}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
          error={touched.email && errors.email ? errors.email : undefined}
          touched={touched.email}
        />
      </View>
      <View>
        <Label>Senha*</Label>
        <S.PasswordField>
          <Input
            value={formData.password}
            placeholder="********"
            secureTextEntry={!showPassword}
            inputRef={passwordInputRef}
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={text => setFormData({ password: text })}
            onFocus={() => setTouched(prev => ({ ...prev, password: true }))}
            onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            touched={touched.password}
            error={touched.password && errors.password ? errors.password : undefined}
          />
          <S.EyeButton onPress={() => setShowPassword(!showPassword)}>
            {!showPassword ? <EyeSlash size={20} color="#A0A0A0" /> : <Eye size={20} color="#A0A0A0" />}
          </S.EyeButton>
        </S.PasswordField>
      </View>
      <View>
        <Label>Confirme sua senha*</Label>
        <S.PasswordField>
          <Input
            value={formData.confirmPassword}
            placeholder="********"
            secureTextEntry={!showConfirmPassword}
            inputRef={confirmPasswordInputRef}
            returnKeyType="done"
            onChangeText={text => setFormData({ confirmPassword: text })}
            onFocus={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
            onSubmitEditing={goToNextStep}
            touched={touched.confirmPassword}
            error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
          />
          <S.EyeButton onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            {!showConfirmPassword ? <EyeSlash size={20} color="#A0A0A0" /> : <Eye size={20} color="#A0A0A0" />}
          </S.EyeButton>
        </S.PasswordField>
      </View>
    </S.Container>
  );
}
