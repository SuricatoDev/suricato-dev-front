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

export default function FooterNav({
  step,
  totalSteps,
  onBack,
  onNext,
  canProceed = true
}: FooterNavProps) {
  const getPartInfo = (step: number) => {
    if (step <= 1) return { part: 0, min: 2, max: 6, base: 0 }
    if (step <= 6) return { part: 1, min: 2, max: 6, base: 0 }
    if (step <= 11) return { part: 2, min: 7, max: 11, base: 33.33 }
    return { part: 3, min: 12, max: totalSteps, base: 66.66 }
  }

  const { min, max, base } = getPartInfo(step)
  const stepsInPart = max - min + 1
  const stepInPart = Math.min(step - min + 1, stepsInPart)
  const localPercentage = (stepInPart / stepsInPart) * 33.33
  const totalPercentage = base + localPercentage

  return (
    <S.Wrapper>
      <S.ProgressBarContainer>
        <S.ProgressBarFill width={totalPercentage} />

        <S.DividerLine left={33.33} />
        <S.DividerLine left={66.66} />
      </S.ProgressBarContainer>

      <S.FooterNavContainer>
        <S.Back hide={step <= 1} onClick={onBack} disabled={step <= 1}>
          Voltar
        </S.Back>
        <Button onClick={onNext}>
          {step < totalSteps ? 'Avançar' : 'Concluir'}
        </Button>
      </S.FooterNavContainer>
    </S.Wrapper>
  )
}
