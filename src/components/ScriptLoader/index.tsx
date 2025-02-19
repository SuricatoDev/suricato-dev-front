import { useEffect } from 'react'

interface ScriptLoaderProps {
  data: Omit<Scripts, 'id'>
}

export default function ScriptLoader({ data }: ScriptLoaderProps) {
  useEffect(() => {
    const loadScriptsFromHTML = (htmlString: string) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlString, 'text/html')

      doc.querySelectorAll('script').forEach((script) => {
        if (
          script.src &&
          !document.querySelector(`script[src="${script.src}"]`)
        ) {
          const newScript = document.createElement('script')
          newScript.src = script.src
          if (script.type) newScript.type = script.type
          newScript.async = script.async
          document.head.appendChild(newScript)
        } else if (!script.src && script.textContent) {
          const inlineScriptContent = script.textContent.trim()
          if (
            !Array.from(document.scripts).some(
              (s) => s.textContent?.trim() === inlineScriptContent
            )
          ) {
            const newScript = document.createElement('script')
            newScript.textContent = inlineScriptContent
            if (script.type) newScript.type = script.type
            document.head.appendChild(newScript)
          }
        }
      })

      doc.querySelectorAll('noscript').forEach((noscript) => {
        document.body.appendChild(noscript.cloneNode(true))
      })
    }

    if (data?.scripts_without_lazyload) {
      loadScriptsFromHTML(data.scripts_without_lazyload)
    }

    const loadLazyLoadedScripts = () => {
      if (data?.scripts_with_lazyload) {
        loadScriptsFromHTML(data.scripts_with_lazyload)
      }
    }

    const userInteractionEvents: (keyof WindowEventMap)[] = [
      'keydown',
      'touchstart',
      'touchmove',
      'wheel',
      'click'
    ]

    const triggerLazyLoad = () => {
      loadLazyLoadedScripts()
      userInteractionEvents.forEach((event) => {
        window.removeEventListener(event, triggerLazyLoad as EventListener)
      })
    }

    userInteractionEvents.forEach((event) => {
      window.addEventListener(event, triggerLazyLoad as EventListener, {
        passive: true
      })
    })

    const timerId = setTimeout(() => {
      loadLazyLoadedScripts()
    }, data.lazyload_delay * 1000)

    return () => {
      clearTimeout(timerId)
      userInteractionEvents.forEach((event) => {
        window.removeEventListener(event, triggerLazyLoad as EventListener)
      })
    }
  }, [
    data.scripts_without_lazyload,
    data.scripts_with_lazyload,
    data.lazyload_delay
  ])

  return null
}
