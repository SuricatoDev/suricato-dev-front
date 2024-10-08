import React from 'react';
import * as S from './styles';

type StepHeaderProps = {
  steps: number;
  currentStep: number;
};

export function StepHeader({ steps, currentStep }: StepHeaderProps) {
  const stepsArray = Array.from({ length: steps }, (_, index) => index + 1);

  return (
    <S.Container>
      <S.StepLineContainer>
        {stepsArray.map(step => (
          <React.Fragment key={step}>
            <S.Step>
              <S.StepCircle isActive={step <= currentStep} />
              <S.StepText isActive={step <= currentStep}>
                Etapa {step}
              </S.StepText>
            </S.Step>

            {step < steps && <S.Line isActive={step < currentStep} />}
          </React.Fragment>
        ))}
      </S.StepLineContainer>
    </S.Container>
  );
}
