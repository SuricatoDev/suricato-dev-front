// FooterNav.tsx
import React from 'react'
import * as S from './styles'
import Button from '@/components/common/Button'

type FooterNavProps = {
  /** Parte atual do formulário (1 a 3) */
  step: number
  /** Quantidade total de partes (3 no seu caso) */
  totalSteps: number
  /** Função chamada ao clicar em "Voltar" */
  onBack: () => void
  /** Função chamada ao clicar em "Avançar" */
  onNext: () => void
  /** Se o botão "Avançar" deve ficar habilitado ou não */
  canProceed?: boolean
}

const FooterNav: React.FC<FooterNavProps> = ({
  step,
  totalSteps,
  onBack,
  onNext,
  canProceed = true
}) => {
  // Ex.: se step=1, activeStep=0; se step=2, activeStep=1, etc.
  const activeStep = Math.max(step - 1, 0)
  // Calcula a porcentagem de preenchimento (0% a 100%)
  const percentage = (activeStep / (totalSteps - 1)) * 100

  return (
    <S.Wrapper>
      {/* Barra de progresso */}
      <S.ProgressBarContainer>
        <S.ProgressBarFill width={percentage} />

        {/* Duas divisórias, se forem 3 partes */}
        {totalSteps === 3 && (
          <>
            <S.DividerLine left={33} />
            <S.DividerLine left={66} />
          </>
        )}
      </S.ProgressBarContainer>

      {/* Botões de navegação */}
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
