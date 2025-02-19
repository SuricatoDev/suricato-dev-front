import * as S from './styles'

type BackToTopProps = {
  targetId?: string
  onClick?: () => void
}

export default function BackToTop({ targetId, onClick }: BackToTopProps) {
  const scrollToElement = () => {
    if (targetId) {
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <S.Wrapper
      onClick={() => {
        scrollToElement()
        onClick?.()
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -70 450 450"
        height="16"
        width="16"
        style={{ transform: 'matrix(1, 0, 0, -1, 0, 0)' }}
      >
        <path
          fill="currentColor"
          d="M6.10059 88.707c-4.68652 4.68555 -4.68652 12.2842 0 16.9707l209.413 209.414c4.6875 4.68652 12.2852 4.68652 16.9717 0l209.415 -209.413c4.68555 -4.68652 4.68555 -12.2852 0 -16.9707l-19.7998 -19.7988c-4.68652 -4.68652 -12.2842 -4.68652 -16.9707 0 l-181.13 180.698l-181.129 -180.699c-4.6875 -4.68652 -12.2852 -4.68652 -16.9707 0z"
        ></path>
      </svg>
    </S.Wrapper>
  )
}
