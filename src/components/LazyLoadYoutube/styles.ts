import styled from 'styled-components'

interface WrapperProps {
  background_color: string
}

export const Wrapper = styled.div<WrapperProps>`
  background-color: ${({ background_color }) => background_color || '#000000'};
  display: block;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  position: relative;
  z-index: 999;
  border-radius: 14px;
  overflow: hidden;
  aspect-ratio: 16 / 9;

  &:hover {
    .play-button {
      opacity: 0.7;
    }
  }

  .play-button {
    opacity: 0.44;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 11%;
    cursor: pointer;
    transition: opacity ${(props) => props.theme.common.transition.default};
  }

  .youtube-thumbnail {
    cursor: pointer;
    object-fit: cover;
    object-position: center;
    height: auto;
  }

  .youtube-iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    border-radius: 12px;
  }
`
