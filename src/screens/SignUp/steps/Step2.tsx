import React, { useState, useEffect } from 'react';
import * as S from './Step2.styles';
import { Label } from '@components/Label';

interface Step2Props {
  formData: {
    userType: string;
    objective: string;
  };
  setFormData: (data: Partial<Step2Props['formData']>) => void;
  onValidate: (isValid: boolean) => void;
}

export function Step2({ formData, setFormData, onValidate }: Step2Props) {
  const [selectedType, setSelectedType] = useState(formData.userType || '');
  const [selectedObjective, setSelectedObjective] = useState(
    formData.objective || '',
  );

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
        <S.SelectButton
          active={selectedObjective === 'Viajar'}
          onPress={() => handleSelectObjective('Viajar')}
        >
          <S.ButtonText active={selectedObjective === 'Viajar'}>
            Viajar
          </S.ButtonText>
        </S.SelectButton>

        <S.SelectButton
          active={selectedObjective === 'Oferecer Viagens'}
          onPress={() => handleSelectObjective('Oferecer Viagens')}
        >
          <S.ButtonText active={selectedObjective === 'Oferecer Viagens'}>
            Oferecer Viagens
          </S.ButtonText>
        </S.SelectButton>
      </S.ButtonWrapper>

      <Label>Qual tipo de cadastro?</Label>
      <S.ButtonWrapper>
        <S.SelectButton
          active={selectedType === 'PF'}
          onPress={() => handleSelectType('PF')}
        >
          <S.ButtonText active={selectedType === 'PF'}>
            Pessoa Física
          </S.ButtonText>
        </S.SelectButton>
        <S.SelectButton
          active={selectedType === 'PJ'}
          onPress={() => handleSelectType('PJ')}
        >
          <S.ButtonText active={selectedType === 'PJ'}>
            Pessoa Jurídica
          </S.ButtonText>
        </S.SelectButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}
