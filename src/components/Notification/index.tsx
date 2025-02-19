import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import { useEffect, useState } from 'react'

import * as S from './styles'

export interface NotificationProps {
  message: string
  duration?: number
  onClose: () => void
}

const Notification: React.FC<NotificationProps> = ({
  message,
  duration = 2500,
  onClose
}) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 500)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      <S.Wrapper visible={visible}>
        <p>{message}</p>
      </S.Wrapper>
    </StyleSheetManager>
  )
}

export default Notification
