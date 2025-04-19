import { useEffect } from 'react'

import Layout from '@/containers/Layout'
import { AccessibilityContextProvider } from '@/providers/AccessibilityContextProvider'
import isPropValid from '@emotion/is-prop-valid'
import { SessionProvider, getSession } from 'next-auth/react'
import App, { AppContext, AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import { StyleSheetManager } from 'styled-components'

import { GoogleMapsProvider } from '@/contexts/GoogleMapsProvider'

import PWAInstallPrompt from '@/components/common/PWAInstallPrompt'
import { SessionUpdater } from '@/components/common/SessionUpdater'
import MobileFooter from '@/components/sections/MobileFooter'

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

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()

  const hideMobileFooter =
    router.pathname.startsWith('/anuncios/novo') ||
    router.pathname.startsWith('/anuncios/overview')

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
              <div className={inter.className} id="modal-root">
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

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const session = await getSession(appContext.ctx)
  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      session
    }
  }
}

export default MyApp
