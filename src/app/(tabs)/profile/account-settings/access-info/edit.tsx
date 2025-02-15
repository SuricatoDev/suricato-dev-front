import { Heading } from '@/components/Heading';
import * as S from '@/styles/(tabs)/profile/accountSettings/accessInfo/edit';
import { SingleHeader } from '@/components/SingleHeader';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'styled-components/native';
import { useAppDispatch } from '@/hooks/store';
import { setPhoneNumber } from '@/store/user';
import { Container } from '@/styles/global';
import Button from '@/components/Button';
import { TextInputMask } from 'react-native-masked-text';

export default function EditAccessInfo() {
  const theme = useTheme();
  const [text, setText] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const textInputMaskRef = useRef<TextInputMask>(null);

  const handleSave = () => {
    dispatch(setPhoneNumber(text));
    setButtonDisabled(true);
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const inputElement = (textInputMaskRef.current as any)?.getElement();
    inputElement?.focus();
  }, []);

  return (
    <Container>
      <S.Wrapper>
        <SingleHeader />
        <Heading title='Qual o número do seu celular?' subtitle='' />
        <TextInput
          label='Celular'
          placeholder='(00) 0 0000-0000'
          value={text}
          onChangeText={setText}
          mode='outlined'
          activeOutlineColor={theme.COLORS.text_medium}
          style={{ backgroundColor: theme.COLORS.background }}
          render={(props) => (
            <TextInputMask
              {...props}
              ref={textInputMaskRef}
              type='cel-phone'
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              value={text}
              onChangeText={setText}
            />
          )}
        />
        <S.ActionButtons>
          <S.ButtonWrapper>
            <Button disabled={buttonDisabled} onPress={handleBack} variant='secondary'>
              Voltar
            </Button>
          </S.ButtonWrapper>
          <S.ButtonWrapper>
            <Button disabled={buttonDisabled} onPress={handleSave} variant='primary'>
              Salvar
            </Button>
          </S.ButtonWrapper>
        </S.ActionButtons>
      </S.Wrapper>
    </Container>
  );
}
