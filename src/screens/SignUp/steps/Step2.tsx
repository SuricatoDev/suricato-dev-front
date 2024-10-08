import React, { useState, useEffect } from 'react';
import { useTheme } from 'styled-components/native';
import { Airplane, Briefcase, User, Buildings } from 'phosphor-react-native';

import { Label } from '@components/Label';

import * as S from './styles';

interface Step2Props {
  formData: {
    userType: string;
    objective: string;
  };
  setFormData: (data: Partial<Step2Props['formData']>) => void;
  onValidate: (isValid: boolean) => void;
}

export function Step2({ formData, setFormData, onValidate }: Step2Props) {
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
    onValidate(isFormValid);
  }, [selectedType, selectedObjective, onValidate]);

  return (
    <S.Container>
      <Label>Qual é o seu objetivo?</Label>
      <S.ButtonWrapper>
        <S.SelectButton active={selectedObjective === 'Viajar'} onPress={() => handleSelectObjective('Viajar')}>
          <Airplane
            size={20}
            color={selectedObjective === 'Viajar' ? theme.COLORS.ORANGE_500 : theme.COLORS.GRAY_200}
          />
          <S.ButtonText active={selectedObjective === 'Viajar'}>Viajar</S.ButtonText>
        </S.SelectButton>

        <S.SelectButton
          active={selectedObjective === 'Oferecer Viagens'}
          onPress={() => handleSelectObjective('Oferecer Viagens')}
        >
          <Briefcase
            size={20}
            color={selectedObjective === 'Oferecer Viagens' ? theme.COLORS.ORANGE_500 : theme.COLORS.GRAY_200}
          />
          <S.ButtonText active={selectedObjective === 'Oferecer Viagens'}>Oferecer Viagens</S.ButtonText>
        </S.SelectButton>
      </S.ButtonWrapper>

      <Label>Qual tipo de cadastro?</Label>
      <S.ButtonWrapper>
        <S.SelectButton active={selectedType === 'PF'} onPress={() => handleSelectType('PF')}>
          <User size={20} color={selectedType === 'PF' ? theme.COLORS.ORANGE_500 : theme.COLORS.GRAY_200} />
          <S.ButtonText active={selectedType === 'PF'}>Pessoa Física</S.ButtonText>
        </S.SelectButton>

        <S.SelectButton active={selectedType === 'PJ'} onPress={() => handleSelectType('PJ')}>
          <Buildings size={20} color={selectedType === 'PJ' ? theme.COLORS.ORANGE_500 : theme.COLORS.GRAY_200} />
          <S.ButtonText active={selectedType === 'PJ'}>Pessoa Jurídica</S.ButtonText>
        </S.SelectButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}
