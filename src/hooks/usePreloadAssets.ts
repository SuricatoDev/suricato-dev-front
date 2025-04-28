import { useEffect } from 'react'

export function usePreloadAssets(assets: string[]) {
  useEffect(() => {
    assets.forEach((asset) => {
      const img = new Image()
      img.src = asset
    })
  }, [assets])
}
