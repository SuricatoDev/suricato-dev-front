import React, { useEffect, useRef, useState } from 'react'
import * as S from './styles'

interface AccordionItemProps {
  isOpen: boolean
  children: React.ReactNode
}

export function AccordionItem({ isOpen, children }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !contentRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight)
      }
    })

    resizeObserver.observe(contentRef.current)

    return () => resizeObserver.disconnect()
  }, [isOpen])

  return (
    <S.AccordionContent height={height}>
      <div ref={contentRef}>{children}</div>
    </S.AccordionContent>
  )
}
