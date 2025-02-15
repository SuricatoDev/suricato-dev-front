import { useState, useEffect } from 'react';
import { useTheme } from 'styled-components/native';

import { useFormContext } from '@/contexts/SignUpContext';

import * as S from './styles';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { SingleText } from '@/components/SimpleText';

export function Step2() {
  const { formData, setFormData, setValidation } = useFormContext();
  const theme = useTheme();

  const [selectedType, setSelectedType] = useState(formData.userType || '');
  const [selectedObjective, setSelectedObjective] = useState(formData.objective || '');

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setFormData({ userType: type });
  };

  const handleSelectObjective = (objective: string) => {
    setSelectedObjective(objective);
    setFormData({ objective });
  };

  useEffect(() => {
    const isFormValid = !!selectedType && !!selectedObjective;
    setValidation(2, isFormValid);
  }, [selectedType, selectedObjective]);

  return (
    <S.Container>
      <SingleText color={theme.COLORS.text_soft}>Qual é o seu objetivo?</SingleText>
      <S.ButtonWrapper>
        <S.SelectButton
          active={selectedObjective === 'Viajar'}
          onPress={() => handleSelectObjective('Viajar')}
        >
          <IconSymbol
            name='airplane'
            color={selectedObjective === 'Viajar' ? theme.COLORS.primary : theme.COLORS.base_dark32}
            size={24}
          />
          <S.ButtonText active={selectedObjective === 'Viajar'}>Viajar</S.ButtonText>
        </S.SelectButton>

        <S.SelectButton
          active={selectedObjective === 'Oferecer Viagens'}
          onPress={() => handleSelectObjective('Oferecer Viagens')}
        >
          <IconSymbol
            name='briefcase'
            color={
              selectedObjective === 'Oferecer Viagen'
                ? theme.COLORS.primary
                : theme.COLORS.base_dark32
            }
            size={24}
          />
          <S.ButtonText active={selectedObjective === 'Oferecer Viagens'}>
            Oferecer Viagens
          </S.ButtonText>
        </S.SelectButton>
      </S.ButtonWrapper>

      <SingleText color={theme.COLORS.text_soft}>Qual tipo de cadastro?</SingleText>
      <S.ButtonWrapper>
        <S.SelectButton active={selectedType === 'PF'} onPress={() => handleSelectType('PF')}>
          <IconSymbol
            name='person'
            color={selectedType === 'PF' ? theme.COLORS.primary : theme.COLORS.base_dark32}
            size={24}
          />
          <S.ButtonText active={selectedType === 'PF'}>Pessoa Física</S.ButtonText>
        </S.SelectButton>

        <S.SelectButton active={selectedType === 'PJ'} onPress={() => handleSelectType('PJ')}>
          <IconSymbol
            name='building.2'
            color={selectedType === 'PJ' ? theme.COLORS.primary : theme.COLORS.base_dark32}
            size={24}
          />
          <S.ButtonText active={selectedType === 'PJ'}>Pessoa Jurídica</S.ButtonText>
        </S.SelectButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}
