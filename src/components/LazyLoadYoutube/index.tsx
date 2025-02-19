import Image from 'next/image'
import { useState } from 'react'
import * as S from './styles'
import {
  getYouTubeThumbnailUrl,
  getYouTubeVideoId
} from '@/utils/getYoutubeInfos'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import { firePlayVideoDatalayer } from '@/common/dataLayer'
import { useGlobalContext } from '@/providers/GlobalContext'

export interface LazyLoadYouTubeProps {
  video_url: string
  thumbnail_url?: string
  altText: string
  width?: number
  height?: number
  background_color?: string
  onClick?: () => void
}

export default function LazyLoadYouTube({
  video_url,
  thumbnail_url,
  altText = '',
  width = 960,
  height = 540,
  background_color = '#000000',
  onClick
}: LazyLoadYouTubeProps) {
  const [isVideoLoaded, setVideoLoaded] = useState<boolean>(false)
  const { brand, pageName } = useGlobalContext()

  const videoId = getYouTubeVideoId(video_url)

  const videoEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`

  const handlePlayVideoVideo = () => {
    setVideoLoaded(true)
    firePlayVideoDatalayer({
      eventCategory: `${brand}:${pageName}`,
      eventStep: 'home',
      videoName: altText
    })

    if (onClick) {
      onClick()
    }
  }

  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      <S.Wrapper background_color={background_color}>
        {!isVideoLoaded && (
          <>
            <Image
              className="youtube-thumbnail"
              src={
                thumbnail_url
                  ? thumbnail_url
                  : getYouTubeThumbnailUrl(video_url)
              }
              width={width}
              height={height}
              alt={altText}
              onClick={handlePlayVideoVideo}
              style={{
                width: '100%'
              }}
              quality={90}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 104 104"
              fill="none"
              className="play-button"
              onClick={handlePlayVideoVideo}
            >
              <path
                opacity="1"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M52.4023 0.907227C23.9103 0.907227 0.8125 24.005 0.8125 52.497C0.8125 80.989 23.9103 104.087 52.4023 104.087C80.8943 104.087 103.992 80.989 103.992 52.497C103.992 24.005 80.8943 0.907227 52.4023 0.907227ZM35.2074 26.7021L78.1972 52.497L35.2074 78.2919V26.7021Z"
                fill="white"
              />
            </svg>
          </>
        )}
        {isVideoLoaded ? (
          <iframe
            className="youtube-iframe"
            src={videoEmbedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        ) : null}
      </S.Wrapper>
    </StyleSheetManager>
  )
}
