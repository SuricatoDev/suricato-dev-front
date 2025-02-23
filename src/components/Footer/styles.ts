import { device } from '@/styles/breakpoints'
import styled from 'styled-components'

export const Wrapper = styled.footer`
  @media (${device.md}) {
    z-index: 9;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: center;
    gap: 16px;
    background-color: ${(props) => props.theme.colors.background_standard};
    transition: background-color
      ${(props) => props.theme.common.transition.default};
    flex-wrap: wrap;
    padding: 0.875rem;
    border-top: 1px solid #dddddd;

    p,
    a {
      font-size: ${(props) => props.theme.common.font.sizes.body.medium};
      color: ${(props) => props.theme.colors.text_standard};
      font-weight: ${(props) => props.theme.common.font.weight.semibold};
      transition: color ${(proprs) => proprs.theme.common.transition.default};
      text-align: center;
      line-height: 1.7;
    }

    a:hover {
      text-decoration: underline;
    }
  }

  display: none;
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

export const PointerDivider = styled.span`
  width: 2px;
  height: 2px;
  background-color: ${(props) => props.theme.colors.text_standard};
  margin: 0 9px;
  border-radius: 999px;
`
