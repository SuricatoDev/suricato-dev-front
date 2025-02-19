import * as S from './styles'
import { MouseEventHandler, useEffect, useState } from 'react'
import Button from '../Button'
import { fireDefaultDatalayer } from '@/common/dataLayer'
import { useGlobalContext } from '@/providers/GlobalContext'

export interface FloaterButtonProps {
  text_button: string
  link_button?: string
  when_hide_ids: string[]
  on_click?: MouseEventHandler<HTMLButtonElement>
}

export default function FloaterButton({
  text_button,
  when_hide_ids,
  on_click
}: FloaterButtonProps) {
  const [showStoryButton, setShowStoryButton] = useState(false)
  const { brand, pageName } = useGlobalContext()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting)
        setShowStoryButton(!isVisible)
      },
      {
        root: null,
        threshold: 0.1
      }
    )

    when_hide_ids.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      when_hide_ids.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
      observer.disconnect()
    }
  }, [when_hide_ids])

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    fireDefaultDatalayer({
      eventCategory: `${brand}:${pageName}`,
      eventAction: 'clique:botao',
      eventLabel: text_button,
      eventStep: 'home',
      event: 'event'
    })

    if (on_click) {
      on_click(event)
    }
  }
  return (
    <S.Wrapper className={`floater-button ${showStoryButton ? 'show' : ''}`}>
      <Button onClick={handleClick} full_width>
        {text_button}
      </Button>
    </S.Wrapper>
  )
}
