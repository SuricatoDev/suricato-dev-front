import { useEffect, useState } from 'react'
import { ReactNode } from 'react'

import ReactDOM from 'react-dom'

const Portal = ({ children }: { children: ReactNode }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const div = document.createElement('div')
    div.classList.add('portal-root')
    setContainer(div)
  }, [])

  useEffect(() => {
    if (container) {
      const modalRoot = document.getElementById('modal-root') || document.body
      modalRoot.appendChild(container)
      return () => {
        modalRoot.removeChild(container)
      }
    }
  }, [container])

  return container ? ReactDOM.createPortal(children, container) : null
}

export default Portal
