import { Inter } from 'next/font/google'
import { AppProps } from 'next/app'
import { AccessibilityContextProvider } from '@/providers/AccessibilityContextProvider'
import { SessionProvider } from 'next-auth/react'
import MobileFooter from '@/components/sections/MobileFooter'
import Layout from '@/containers/Layout'
import { ToastContainer } from 'react-toastify'
import PWAInstallPrompt from '@/components/common/PWAInstallPrompt'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SessionUpdater } from '@/components/common/SessionUpdater'
import { GoogleMapsProvider } from '@/contexts/GoogleMapsProvider'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'

export const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    "'Segoe UI'",
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    "'Open Sans'",
    "'Helvetica Neue'",
    'sans-serif'
  ]
})

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  const router = useRouter()

  const hideMobileFooter =
    router.pathname.startsWith('/anunciar/novo') ||
    router.pathname.startsWith('/anunciar/overview')
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister())
      })
    }
  }, [])

  return (
    <AccessibilityContextProvider>
      <SessionProvider session={session}>
        <SessionUpdater />
        <GoogleMapsProvider>
          <Layout>
            <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
              <div className={`${inter.className}`} id="modal-root">
                <Component {...pageProps} />
                <PWAInstallPrompt />
                <ToastContainer position="bottom-center" autoClose={5000} />
                {!hideMobileFooter && <MobileFooter />}
              </div>
            </StyleSheetManager>
          </Layout>
        </GoogleMapsProvider>
      </SessionProvider>
    </AccessibilityContextProvider>
  )
}
