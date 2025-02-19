import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import * as S from './styles'

export interface WaveDividerProps {
  position?: 'top' | 'bottom'
  background?: string
  fill?: string
}

export default function WaveDivider({
  position = 'top',
  background,
  fill
}: WaveDividerProps) {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      <S.Wrapper background={background}>
        {position === 'bottom' ? (
          <>
            <svg
              className="divider divider-desktop"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 42"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1440 0L0 0.00277811V28.0901C147.613 41.3609 330.941 31.0342 476.91 22.812L476.911 22.812L476.911 22.8119C528.741 19.8924 575.861 17.2382 615 15.9999C790.173 10.4578 938.313 21.2137 1066.55 30.5249C1213.62 41.2027 1334.51 49.9805 1440 30.0997V0Z"
                fill={fill}
              />
            </svg>
            <svg
              className="divider divider-mobile"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 395 36"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 22.6686C15.8315 21.0626 31.8265 19.1438 47.9194 17.2132L47.9195 17.2132C89.3028 12.2488 131.333 7.20682 172.891 7.20683C211.878 7.20683 246.986 13.8634 283.758 20.8355C317.922 27.3131 353.522 34.063 395.005 36.0001V8.55006e-05L0 0L0 22.6686Z"
                fill={fill}
              />
            </svg>
          </>
        ) : (
          <>
            <svg
              className="divider divider-desktop"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 42"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 41.9779L1440 41.9752L1440 13.8879C1292.39 0.617114 1109.06 10.9438 963.09 19.166L963.089 19.166L963.089 19.1661C911.259 22.0856 864.139 24.7398 825 25.9781C649.827 31.5202 501.687 20.7642 373.446 11.4531C226.382 0.775189 105.486 -8.00264 2.6314e-06 11.8782L0 41.9779Z"
                fill={fill}
              />
            </svg>
            <svg
              className="divider divider-mobile"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 395 36"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M395.006 13.3314C379.174 14.9374 363.179 16.8562 347.086 18.7868L347.086 18.7868C305.703 23.7512 263.673 28.7932 222.115 28.7932C183.127 28.7931 148.02 22.1366 111.248 15.1645C77.0843 8.68691 41.484 1.93693 0.000644016 -0.000183306L0.000640869 35.9999L395.006 36L395.006 13.3314Z"
                fill={fill}
              />
            </svg>
          </>
        )}
      </S.Wrapper>
    </StyleSheetManager>
  )
}
