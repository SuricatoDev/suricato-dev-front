import { Heading } from '@components/Heading';
import * as S from './styles';
import { SingleHeader } from '@components/SingleHeader';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';
import { Button } from '@components/Button';
import { ButtonWrapper } from '@screens/SignUp/steps/styles';
import { useAppDispatch } from '@hooks/store';
import { login } from '@store/reducers/user';

export function EditAccessInfo() {
  const theme = useTheme();
  const [text, setText] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  const handleSave = () => {
    dispatch(login({ phone: text }));
    setButtonDisabled(true);
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <S.Container>
      <SingleHeader />
      <Heading title="Qual o número do seu celular?" subtitle="" />
      <TextInput
        ref={textInputRef}
        label="Celular"
        placeholder="(00) 0 0000-0000"
        value={text}
        onChangeText={text => setText(text)}
        mode="outlined"
        activeOutlineColor={theme.COLORS.GRAY_300}
        render={props => {
          const { ref, ...rest } = props;
          return (
            <TextInputMask
              {...rest}
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) '
              }}
              value={text}
              onChangeText={text => setText(text)}
            />
          );
        }}
      />
      <S.ActionButtons>
        <S.ButtonWrapper>
          <Button disabled={buttonDisabled} onPress={handleBack} type="SECONDARY">
            Voltar
          </Button>
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <Button disabled={buttonDisabled} onPress={handleSave} type="PRIMARY">
            Salvar
          </Button>
        </S.ButtonWrapper>
      </S.ActionButtons>
    </S.Container>
  );
}
