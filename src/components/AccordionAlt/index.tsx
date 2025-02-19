import React, { useEffect, useState } from 'react'
import * as S from './styles'

export interface AccordionAltProps {
  answer: string | null
  ask: string | null
  is_open?: boolean
  on_toggle?: () => void
}

export default function AccordionAlt({
  answer,
  ask,
  is_open,
  on_toggle
}: AccordionAltProps) {
  const [internalOpen, setInternalOpen] = useState(is_open)

  useEffect(() => {
    if (on_toggle && is_open) {
      setInternalOpen(is_open)
    }
  }, [is_open, on_toggle])

  const handleClick = () => {
    if (on_toggle) {
      on_toggle()
    } else {
      setInternalOpen(!internalOpen)
    }
  }

  const isOpen = on_toggle ? is_open : internalOpen

  if (!ask || !answer) return null

  return (
    <S.Wrapper>
      <S.AccordionAltContainer>
        <div
          className={`accordion-alt-question ${isOpen ? 'openned' : ''}`}
          onClick={handleClick}
          aria-expanded={isOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
          <h3>{ask}</h3>
          <span className="accordion-alt-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
            >
              <path
                d="M15.5791 0.899703C15.4465 0.772999 15.289 0.672476 15.1157 0.60389C14.9423 0.535304 14.7565 0.5 14.5688 0.5C14.3812 0.5 14.1953 0.535304 14.022 0.60389C13.8486 0.672476 13.6912 0.772999 13.5586 0.899703L7.99875 6.20275L2.43891 0.899703C2.30624 0.773165 2.14875 0.67279 1.97541 0.604309C1.80208 0.535827 1.6163 0.500579 1.42868 0.500579C1.24106 0.500579 1.05528 0.535827 0.881948 0.604309C0.708611 0.67279 0.551114 0.773165 0.418448 0.899703C0.285784 1.02624 0.18055 1.17646 0.108752 1.34179C0.0369539 1.50712 9.53674e-07 1.68432 9.53674e-07 1.86327C9.53674e-07 2.04222 0.0369539 2.21942 0.108752 2.38475C0.18055 2.55008 0.285784 2.7003 0.418448 2.82684L6.99569 9.1003C7.12825 9.227 7.28572 9.32752 7.45907 9.39611C7.63242 9.4647 7.81825 9.5 8.00592 9.5C8.19359 9.5 8.37942 9.4647 8.55276 9.39611C8.72611 9.32752 8.88358 9.227 9.01615 9.1003L15.5934 2.82684C16.1379 2.30747 16.1379 1.43274 15.5791 0.899703Z"
                fill="#F94D12"
              />
            </svg>
          </span>
        </div>
        <div className={`accordion-alt-answer ${isOpen ? 'openned' : ''}`}>
          <div>
            <p>{answer}</p>
          </div>
        </div>
      </S.AccordionAltContainer>
    </S.Wrapper>
  )
}
