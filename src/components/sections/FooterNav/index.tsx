
import React from 'react'
import * as S from './styles'
import Button from '@/components/common/Button'

type FooterNavProps = {
  
  step: number
  
  totalSteps: number
  
  onBack: () => void
  
  onNext: () => void
  
  canProceed?: boolean
}

const FooterNav: React.FC<FooterNavProps> = ({
  step,
  totalSteps,
  onBack,
  onNext,
  canProceed = true
}) => {
  
  const activeStep = Math.max(step - 1, 0)
  
  const percentage = (activeStep / (totalSteps - 1)) * 100

  return (
    <S.Wrapper>
      {}
      <S.ProgressBarContainer>
        <S.ProgressBarFill width={percentage} />

        {}
        {totalSteps === 3 && (
          <>
            <S.DividerLine left={33} />
            <S.DividerLine left={66} />
          </>
        )}
      </S.ProgressBarContainer>

      {}
      <S.FooterNavContainer>
        <S.Back onClick={onBack} disabled={step <= 1}>
          Voltar
        </S.Back>
        <Button onClick={onNext} disabled={!canProceed || step >= totalSteps}>
          {step < totalSteps ? 'Avançar' : 'Concluir'}
        </Button>
      </S.FooterNavContainer>
    </S.Wrapper>
  )
}

export default FooterNav
