import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 265px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary.bg};
  border-radius: 24px;
  gap: 24px;

  .card-image-and-description-image {
    height: 100%;
    max-height: 190px;
    width: 100%;
    object-fit: contain;
  }
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px 24px;
  gap: 4px;
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary.default};
  font-size: ${({ theme }) => theme.common.font.sizes.heading.xxsmall};
  font-weight: ${({ theme }) => theme.common.font.weight.bold};
  line-height: normal;
`

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.primary.text};
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};
  line-height: normal;
`
