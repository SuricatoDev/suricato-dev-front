import React, { useEffect, useState } from 'react'
import * as S from './styles'

export interface AccordionProps {
  answer: string | null
  ask: string | null
  is_open?: boolean
  on_toggle?: () => void
}

export default function Accordion({
  answer,
  ask,
  is_open,
  on_toggle
}: AccordionProps) {
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
      <S.AccordionContainer>
        <div
          className={`accordion-question ${isOpen ? 'openned' : ''}`}
          onClick={handleClick}
          aria-expanded={isOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
          <h3>{ask}</h3>
          <span className="accordion-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="9"
              viewBox="0 0 16 9"
              fill="none"
            >
              <path
                d="M15.3518 1.25227C15.5085 1.40895 15.5085 1.6623 15.3485 1.81894L8.31516 8.85564C8.15849 9.01231 7.90513 9.01231 7.74849 8.85564L0.715161 1.81894C0.558488 1.6623 0.558488 1.40895 0.715161 1.25227L0.951815 1.01562C1.10849 0.858946 1.36181 0.858946 1.51848 1.01562L8.03515 7.53229L14.5485 1.01562C14.7051 0.858946 14.9585 0.858946 15.1151 1.01562L15.3518 1.25227Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
        <div className={`accordion-answer ${isOpen ? 'openned' : ''}`}>
          <div>
            <p>{answer}</p>
          </div>
        </div>
        <span className="accordion-line"></span>
      </S.AccordionContainer>
    </S.Wrapper>
  )
}
