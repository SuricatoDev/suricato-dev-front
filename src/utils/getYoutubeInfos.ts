export const getYouTubeVideoId = (url: string): string | null => {
  try {
    const urlObj = new URL(url)
    const videoId = urlObj.searchParams.get('v')
    return videoId
  } catch (error) {
    console.error('Invalid URL', error)
    return null
  }
}

export const getYouTubeThumbnailUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    const videoId = urlObj.searchParams.get('v')
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }
    console.error('No video ID found in the URL')
    return ''
  } catch (error) {
    console.error('Invalid URL', error)
    return ''
  }
}
